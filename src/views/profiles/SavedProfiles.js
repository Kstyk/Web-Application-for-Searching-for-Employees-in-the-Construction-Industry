import React, { useState } from 'react';
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

const SavedProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const profilesPerPage = 10;

  const [profilesData, setProfilesData] = useState([
    { id: 1, name: 'Doe John', occupation: ['Developer'], email: 'john@example.com' },
    { id: 5, name: 'Nowak Bob', occupation: ['Plumber'], email: 'nowak@example.com' },
    { id: 2, name: 'Smith Jane', occupation: ['Designer', 'Manager'], email: 'jane@example.com' },
  ]);

  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());

  const filteredProfiles = profilesData.filter((profile) => {
    if (filterCriteria === 'all' || profile.occupation.includes(filterCriteria)) {
      return (
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.name.localeCompare(b.name);
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

  const handleDeleteConfirmation = (profile) => {
    setSelectedProfile(profile);
  };

  const handleDeleteProfile = () => {
    if (selectedProfile) {
      // Usuń użytkownika z listy
      setProfilesData((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== selectedProfile.id)
      );
      toggleFavorite(selectedProfile.id);
      setSelectedProfile(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profiles</h1>
      <div className="flex space-x-2 mb-4">
        <TextField
          label="Szukaj"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
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
              <TableCell>Specjalność</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Link profilu</TableCell>
              <TableCell>Ulubione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profilesToDisplay.map((profile, index) => (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.occupation.join(', ')}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>
                  <Link href={`/profile/${profile.id}`}>Zobacz profil</Link>
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
        count={Math.ceil(filteredProfiles.length / profilesPerPage)}
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
