import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Slider,
  Paper,
  Link,
  Autocomplete,
  Typography
} from '@mui/material';
import Pagination from '@mui/lab/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { filter } from 'lodash';
import { useAuth } from '../../contexts/AuthContext';

const api = axios.create({
  baseURL: 'http://localhost:5072/api',
});

const Profiles = () => {
  const [profilesData, setProfilesData] = useState([]);
  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState();
  const [paymentRange, setPaymentRange] = useState([0, 100000]);
  const [maxPayment, setMaxPayment] = useState(100000);
  const [sliderChanged, setSliderChanged] = useState(0);

  const [qualificationId, setQualificationId] = useState();
  const [qualifications, setQualifications] = useState([]);
  const [voivodeship, setVoivodeship] = useState();
  const [voivodeships, setVoivodeships] = useState([]);

  const profilesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [awfulMapping, setAwfulMapping] = useState();  // used because backend api doesnt delete fav profile based on profileId, but on id

  const { userRole } = useAuth();

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/employees/saved-profiles', {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        const profiles = response.data.map(profile => {
          const { id, profileId } = profile;

          return {
            id,
            profileId,
          };
        });

        setFavoriteProfiles(new Set(profiles.map(profile => profile.profileId)));

        const idMap = new Map(profiles.map(profile => [profile.profileId, profile.id]));
        setAwfulMapping(new Map(idMap));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  useEffect(() => {
    fetchProfiles();

    const fetchMaxPayment = async () => {
      const profilesResponse = await api.get('/employees', {});
      
      // Find max salary
      const maxRequiredPayment = Math.max(...profilesResponse.data.items.map(profile => profile.requiredPayment));
      setMaxPayment(maxRequiredPayment);
    };

    fetchMaxPayment();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch qualifications
        const qualificationsResponse = await api.get('/qualifications', {});
        setQualifications(qualificationsResponse.data);

        // Fetch user profiles
        const profilesResponse = await api.get('/employees', {
          params: {
            itemsFrom: (currentPage - 1) * profilesPerPage + 1,
            itemsTo: currentPage * profilesPerPage,
            pageNumber: currentPage,
            sortBy: sortBy,
            sortDirection: sortOrder,
            searchText: searchTerm,
            minimumPayment: paymentRange[0],
            maximumPayment: paymentRange[1],
            voivodeship: voivodeship,
            qualificationId: qualificationId,
          },
        });
        if (Array.isArray(profilesResponse.data.items)) {
          setProfilesData(profilesResponse.data.items);

          setTotalItemsCount(profilesResponse.data.totalItemsCount);
          console.log(totalItemsCount);

          // Gather unique voivodeships
          const uniqueVoivodeships = new Set();

          profilesResponse.data.items.forEach((profile) => {
            uniqueVoivodeships.add(profile.voivodeship);
          });

          const voivodeshipsArray = Array.from(uniqueVoivodeships);
          setVoivodeships(voivodeshipsArray);
        } else {
          console.error('Invalid user data:', profilesResponse.data.items);
        }
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    };

    fetchData();

  }, [currentPage, searchTerm, sortBy, sortOrder, voivodeship, qualificationId, sliderChanged]);

  /*useEffect(() => {
    const gatherVoivodeships = async () => {
      
    }
    gatherVoivodeships();
    console.log(voivodeships.length);
  }, [profilesData]);*/


  const toggleFavorite = (profileId) => {
    const newFavoriteProfiles = new Set(favoriteProfiles);
    if (newFavoriteProfiles.has(profileId)) {
      newFavoriteProfiles.delete(profileId);
      handleDeleteProfile(profileId);
    } else {
      newFavoriteProfiles.add(profileId);
      handleAddToFavorites(profileId);
    }
    setFavoriteProfiles(newFavoriteProfiles);
  };

  //const handleDeleteConfirmation = (profile) => {
  //  setSelectedProfile(profile);
  //};

  const handleAddToFavorites = async (profileId) => {
    if (profileId) {
      try {
        const token = localStorage.getItem('token');

        await api.post(`/employees/${profileId}`, {
          employeeId: profileId,
        }, {
          headers: {
            Authorization: `${token}`,
          },
        });

        fetchProfiles();

      } catch (error) {
        console.error('Error deleting profile:', error.message);
      }
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (profileId) {
      try {
        const token = localStorage.getItem('token');

        await api.delete(`/employees/${awfulMapping.get(profileId)}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setProfilesData((prevProfiles) =>
          prevProfiles.filter((profile) => profile.profileId !== profileId)
        );

        //toggleFavorite(profileId);
        //setSelectedProfile(null);
        fetchProfiles();
      } catch (error) {
        console.error('Error deleting profile:', error.message);
      }
    }
  };

  const isFavorite = (profileId) => favoriteProfiles.has(profileId);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profile pracowników</h1>
      <div className="flex justify-between space-x-2 mb-4">
        <TextField
          className="w-1/4"
          label="Szukaj"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handlePageChange(null, 1);
          }}
        />
        <Autocomplete
          className="w-1/4"
          value={qualificationId}
          onChange={(e, newValue) => {
            setQualificationId(newValue ? newValue.id : null);
            handlePageChange(null, 1);
          }}
          options={qualifications}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          renderInput={(params) => (
            <TextField {...params} label="Wybierz kwalifikację" />
          )}
        />
        <Autocomplete
          className="w-1/4"
          value={voivodeship}
          onChange={(e, newValue) => {
            setVoivodeship(newValue);
            handlePageChange(null, 1);
          }}
          options={voivodeships}
          renderInput={(params) => (
            <TextField {...params} label="Wybierz województwo" />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {`Sortuj ${sortOrder === 'asc' ? 'rosnąco' : 'malejąco'}`}
        </Button>
      </div>
      <div className="flex space-x-2 mb-4">
        <Typography id="payment-range-slider" gutterBottom>
          Przedział Zarobków
        </Typography>
        <Slider
          value={paymentRange}
          onChange={(event, newValue) => setPaymentRange(newValue)}
          onChangeCommitted={(event, newValue) => setSliderChanged(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} zł`}
          max={maxPayment}
          min={0}
          aria-labelledby="earnings-range-slider"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>LP</TableCell>
              <TableCell>
              <TableSortLabel
                  active={sortBy === 'LastName'}
                  direction={sortBy === 'LastName' ? sortOrder : 'asc'}
                  onClick={() => {
                    if (sortBy === "LastName") {
                      if (sortOrder === 'asc') setSortOrder('desc');
                      if (sortOrder === 'desc') setSortOrder('asc');
                    }
                    else setSortOrder('asc');
                    setSortBy('LastName');
                  }}
                >
                  Pracownik
                </TableSortLabel>
              </TableCell>
              <TableCell>Kwalifikacje</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Email'}
                  direction={sortBy === 'Email' ? sortOrder : 'asc'}
                  onClick={() => {
                    if (sortBy === "Email") {
                      if (sortOrder === 'asc') setSortOrder('desc');
                      if (sortOrder === 'desc') setSortOrder('asc');
                    }
                    else setSortOrder('asc');
                    setSortBy('Email');
                  }}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'RequiredPayment'}
                  direction={sortBy === 'RequiredPayment' ? sortOrder : 'asc'}
                  onClick={() => {
                    if (sortBy === "RequiredPayment") {
                      if (sortOrder === 'asc') setSortOrder('desc');
                      if (sortOrder === 'desc') setSortOrder('asc');
                    }
                    setSortBy('RequiredPayment');
                  }}
                >
                  Preferowane Zarobki
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Voivodeship'}
                  direction={sortBy === 'Voivodeship' ? sortOrder : 'asc'}
                  onClick={() => {
                    if (sortBy === "Voivodeship") {
                      if (sortOrder === 'asc') setSortOrder('desc');
                      if (sortOrder === 'desc') setSortOrder('asc');
                    }
                    setSortBy('Voivodeship');
                  }}
                >
                  Województwo
                </TableSortLabel>
              </TableCell>
              <TableCell>Link profilu</TableCell>
              {userRole == 1 &&
                <TableCell>Ulubione</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {profilesData && profilesData.length > 0 ? (
              profilesData.map((profile, index) => (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${profile.firstName} ${profile.lastName}`}</TableCell>
                  <TableCell>
                    {profile.userQualifications && profile.userQualifications.length > 0 ? (
                      <ul>
                        {profile.userQualifications.map((qualification) => (
                          <li key={qualification.id}>{qualification.name}</li>
                        ))}
                      </ul>
                    ) : (
                      ' brak '
                    )}

                  </TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>{profile.requiredPayment}</TableCell>
                  <TableCell>{profile.voivodeship}</TableCell>
                  <TableCell>
                    <Link href={`/profile/${profile.id}`}>Zobacz profil</Link>
                  </TableCell>
                  {userRole == 1 &&
                    <TableCell>
                      <Button
                        color='grey2'
                        onClick={() => toggleFavorite(profile.id)}
                      >
                        {isFavorite(profile.id) ? (
                          <FavoriteIcon className="text-gray-600" />
                        ) : (
                          <FavoriteBorderIcon className="text-gray-600" />
                        )}
                      </Button>
                    </TableCell>
                  }
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No profiles found.</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalItemsCount / profilesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="mt-4"
      />
    </div>
  );
};

export default Profiles;