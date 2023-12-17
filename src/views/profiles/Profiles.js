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
  Paper,
  Link,
  Autocomplete,
} from '@mui/material';
import Pagination from '@mui/lab/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const api = axios.create({
  baseURL: 'http://localhost:5072/api',
});

const Profiles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  const [profilesData, setProfilesData] = useState([]);
  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCriteria, setFilterCriteria] = useState();
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const token = localStorage.getItem('token');

      await api.get('/employees', {})
        .then((res) => {
          if (Array.isArray(res.data.items)) {
            setProfilesData(res.data.items);
          } else {
            console.error('Invalid user data:', res.data.items);
          }
        })
        .catch((err) => {
          console.error('Error fetching user profile');

        });
    };
    const fetchQualification = async () => {
      // const token = localStorage.getItem('token');

      await api.get('/qualifications', {})
        .then((res) => {
          // if (Array.isArray(res.data.items)) {
          setQualifications(res.data);
          // } else {
          //   console.error('Invalid user data:', res.data.items);
          // }
        })
        .catch((err) => {
          console.error('Error fetching qualification');

        });
    };

    fetchQualification();
    fetchUserProfiles();
  }, []);

  useEffect(() => {
    const updatedFilteredProfiles = profilesData.filter((profile) => {
      const firstName = profile.firstName ? profile.firstName.toLowerCase() : '';
      const lastName = profile.lastName ? profile.lastName.toLowerCase() : '';
      const email = profile.email ? profile.email.toLowerCase() : '';

      const fullName = firstName + ' ' + lastName;

      if (!filterCriteria || (profile.userQualifications && profile.userQualifications.some(qualification => qualification.name.includes(filterCriteria)))) {
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase())
        );
      }
      return false;
    });
    setFilteredProfiles(updatedFilteredProfiles);
  }, [profilesData, filterCriteria, searchTerm]);

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * (a.firstName + ' ' + a.lastName).localeCompare(b.firstName + ' ' + b.lastName);
  });

  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;

  const profilesToDisplay = sortedProfiles.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleFavorite = (profileId) => {
    const newFavoriteProfiles = new Set(favoriteProfiles);
    if (newFavoriteProfiles.has(profileId)) {
      newFavoriteProfiles.delete(profileId);
    } else {
      newFavoriteProfiles.add(profileId);
    }
    setFavoriteProfiles(newFavoriteProfiles);
  };

  const isFavorite = (profileId) => favoriteProfiles.has(profileId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profile pracowników</h1>
      <div className="flex space-x-2 mb-4">
        <TextField
          className="w-1/4"
          label="Szukaj"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Autocomplete
          className="w-1/4"
          value={filterCriteria}
          onChange={(event, newValue) => setFilterCriteria(newValue)}
          options={[...qualifications.map((qualification) => qualification.name)]}
          renderInput={(params) => (
            <TextField {...params} label="Wybierz kwalifikację" />
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>LP</TableCell>
              <TableCell>Pracownik</TableCell>
              <TableCell>Kwalifikacje</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Link profilu</TableCell>
              <TableCell>Ulubione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profilesToDisplay.map((profile, index) => (
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
                <TableCell>
                  <Link href={`/profile/${profile.id}`}>Zobacz profil</Link>
                </TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredProfiles.length / profilesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="mt-4"
      />
    </div>
  );
};

export default Profiles;