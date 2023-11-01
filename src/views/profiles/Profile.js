import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Link,
  Modal,
  Box
} from '@mui/material';
import { MailOutline, Edit, Delete } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExperienceItem from './ExperienceItem';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Przykładowe dane użytkownika
  const userData = {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    province: 'Mazowieckie',
    earnings: '60,000 PLN',
    specialties: ['Hydraulik', 'Tynkarz'],
    shortInfo: 'Jestem doświadczonym hydraulikiem i tynkarzem.',
    school: 'Politechnika Warszawska',
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

  const lastDayLogins = 10; 
  const lastMonthLogins = 100; 

  const handleAddToFavorites = () => {

  };

  const handleSendEmail = () => {
  };

  const handleDeleteProfile = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    navigate('/dashboard');
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };


  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              {userData.firstName.charAt(0)}
              {userData.lastName.charAt(0)}
            </Avatar>
          }
          title={`${userData.firstName} ${userData.lastName}`}
          subheader={`Województwo: ${userData.province}`}
          action={
            <div>
              <Button color='grey2'
                onClick={() => toggleFavorite(userData.id)}>
                {isFavorite(userData.id) ? (
                  <FavoriteIcon className="text-gray-600" />
                ) : (
                  <FavoriteBorderIcon className="text-gray-600" />
                )}
              </Button>
              <Link href={`/edit_profile/${userData.id}`}>
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>
              <IconButton onClick={handleDeleteProfile}>
                <Delete />
              </IconButton>
            </div>
          }
        />
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Informacje o użytkowniku:
          </Typography>
          <Typography>Imię: {userData.firstName}</Typography>
          <Typography>Nazwisko: {userData.lastName}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Interesujące zarobki: {userData.earnings}</Typography>
          <Typography>Specjalizacje: {userData.specialties.join(', ')}</Typography>
          <Typography>Krótki opis: {userData.shortInfo}</Typography>
          <Typography>Ukończona szkoła: {userData.school}</Typography>

          <div className="my-3">
            <Typography variant="subtitle1" gutterBottom>
              Doświadczenie:
            </Typography>
            <ExperienceItem from='22.02.1999' to='22.02.2001' company="Hydraulik Company" description="Pracowałem jako hydraulik przez 5 lat" />
            <ExperienceItem from='22.02.1999' to='22.02.2001' company="Tynkarska Sp. z o.o." description="Miałem 7 lat doświadczenia jako tynkarz" />
          </div>

          <Typography>Statystyki odwiedzin profilu:</Typography>
          <ul>
            <li>Ostatni dzień: {lastDayLogins} razy</li>
            <li>Ostatni miesiąc: {lastMonthLogins} razy</li>
          </ul>
        </CardContent>
        <div className="flex justify-end p-4">
          <Button
            startIcon={<MailOutline />}
            onClick={handleSendEmail}
            variant="contained"
            color="primary"
          >
            Wyślij maila
          </Button>
        </div>
      </Card>
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box className="bg-white border border-gray-200 p-4 rounded-md text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Typography variant="h6" gutterBottom>
            Czy na pewno chcesz usunąć swój profil?
          </Typography>
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              variant="contained"
              color="info"
              onClick={handleCloseDeleteModal}
            >
              Nie
            </Button>
            <Button color="red" variant="contained" onClick={handleConfirmDelete}>
              Tak
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
