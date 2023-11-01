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
} from '@mui/material';
import Pagination from '@mui/lab/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Profiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  const profilesData = [
    { id: 1, name: 'Doe John', occupation: ['Developer'], email: 'john@example.com' },
    { id: 5, name: 'Nowak Bob', occupation: ['Plumber'], email: 'nowak@example.com' },
    { id: 2, name: 'Smith Jane', occupation: ['Designer', 'Manager'], email: 'jane@example.com' },
  ];

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

  const isFavorite = (profileId) => favoriteProfiles.has(profileId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profile pracowników</h1>
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
                  <Button color='grey2'
                    onClick={() => toggleFavorite(profile.id)}>
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