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
  Modal,
} from '@mui/material';
import Pagination from '@mui/lab/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useAuth } from '../../contexts/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
});

const SavedProfiles = () => {
  const { isLoggedIn } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [sortedProfiles, setSortedProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  //const [totalItemsCount, setTotalItemsCount] = useState(0);
  const profilesPerPage = 10;

/*{ id: 1, name: 'Doe John', occupation: ['Developer'], email: 'john@example.com' },
  { id: 5, name: 'Nowak Bob', occupation: ['Plumber'], email: 'nowak@example.com' },
  { id: 2, name: 'Smith Jane', occupation: ['Designer', 'Manager'], email: 'jane@example.com' },*/
  const [profilesData, setProfilesData] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
        if (isLoggedIn) {
            try {
                const token = localStorage.getItem('token');
    
                const response = await api.get('/employees/saved-profiles', {
                  headers: {
                    Authorization: `${token}`,
                  },
                });
    
                if (Array.isArray(response.data) && response.data.length > 0) {
                  const profiles = response.data.map(profile => {
                    const { id, profileId, employeeEmail, employeeFirstName, employeeLastName } = profile;
                    
                    return {
                      id,
                      profileId,
                      email: employeeEmail,
                      firstName: employeeFirstName,
                      lastName: employeeLastName,
                      name: `${employeeFirstName} ${employeeLastName}`,
                      occupation: profile.qualifications,
                    };
                  });
        
                  setProfilesData(profiles);
                  console.log(Math.ceil(profilesToDisplay.length));
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        }
    };
    fetchProfiles();
  }, [currentPage]); 

  useEffect(() => {
    console.log(profilesData[0]);
    const filteredProfiles = Array.isArray(profilesData) ? profilesData.filter((profile) => {
      if (filterCriteria === 'all' || profile.occupation.some((qualification) => qualification.name === filterCriteria)) {
        return (
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false;
    }) : [];

    setFilteredProfiles(filteredProfiles);

    const sortedProfiles = [...filteredProfiles].sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return order * a.name.localeCompare(b.name);
    });

    setSortedProfiles(sortedProfiles);
  }, [profilesData, searchTerm, filterCriteria, sortOrder]);

  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());

  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;

  const profilesToDisplay = sortedProfiles.slice(startIndex, endIndex); // profilesData;

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

  const handleDeleteConfirmation = (profile) => {
    setSelectedProfile(profile);
  };

  const handleDeleteProfile = async () => {
    console.log(selectedProfile);
    if (selectedProfile) {
      try {
        const token = localStorage.getItem('token');
  
        await api.delete(`/employees/${selectedProfile.id}`, {  // api wymaga wlasny rodzaj id, teoretycznie tu powinien byc profileId
          headers: {
            Authorization: `${token}`,
          },
        });
  
        setProfilesData((prevProfiles) =>
          prevProfiles.filter((profile) => profile.profileId !== selectedProfile.profileId)
        );
  
        toggleFavorite(selectedProfile.profileId);
        setSelectedProfile(null);
      } catch (error) {
        console.error('Error deleting profile:', error.message);
      }
    }
  };

  const uniqueOccupations = [...new Set(profilesData.flatMap((profile) => 
    profile.occupation.map((qualification) => qualification.name)
  ))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profiles</h1>
      <div className="flex space-x-2 mb-4">
        <TextField
          label="Szukaj"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handlePageChange(null, 1); 
          }}
        />
        <Select
          value={filterCriteria}
          onChange={(e) => {
            setFilterCriteria(e.target.value);
            handlePageChange(null, 1); 
          }}
        >
          <MenuItem value="all">All</MenuItem>
            {
              uniqueOccupations.map((occupation) => (
                <MenuItem key={occupation} value={occupation}>
                    {occupation}
                </MenuItem>
              ))
            }
        </Select>
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
              { <TableCell>Specjalność</TableCell> }
              <TableCell>Email</TableCell>
              <TableCell>Link profilu</TableCell>
              <TableCell>Ulubione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profilesToDisplay.map((profile, index) => (
              <TableRow key={profile.profileId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{profile.name}</TableCell>
                <TableCell>
                  {profile.occupation && profile.occupation.length > 0
                    ? profile.occupation.map((occupation) => occupation.name).join(', ')
                    : 'No occupations'}
                </TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>
                  <Link href={`/profile/${profile.profileId}`}>Zobacz profil</Link>
                </TableCell>
                <TableCell>
                  <Button
                    color="grey2"
                    onClick={() => handleDeleteConfirmation(profile)}
                  >
                    <FavoriteIcon className="text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(sortedProfiles.length / profilesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="mt-4"
      />
      <Modal open={Boolean(selectedProfile)} onClose={() => setSelectedProfile(null)}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black bg-opacity-60 absolute top-0 left-0 w-full h-full z-10" />
          <div className="bg-white p-4 rounded shadow-lg text-center relative z-20">
            <h2 className="text-xl font-semibold">
              Czy na pewno chcesz usunąć pracownika {selectedProfile?.name} z ulubionych?
            </h2>
            <div className="mt-4 flex justify-center space-x-4">
              <Button variant="contained" color="info" onClick={() => setSelectedProfile(null)}>
                Nie
              </Button>
              <Button variant="contained" color="red" onClick={handleDeleteProfile}>
                Tak
              </Button>
            </div>
          </div>
        </div>
      </Modal>

    </div >
  );
};

export default SavedProfiles;
