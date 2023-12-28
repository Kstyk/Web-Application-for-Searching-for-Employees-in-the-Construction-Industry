import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Modal,
  Box,
} from '@mui/material';
import { MailOutline, Edit, Delete } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import clsx from 'clsx';

import ExperienceItem from './ExperienceItem';

import { useAuth } from '../../contexts/AuthContext';

import axios from 'axios';
import EditProfile from './EditProfile';

const api = axios.create({
  baseURL: 'http://localhost:5072/api',
});

const Profile = () => {
  const { isLoggedIn, logout } = useAuth();
  const [userData, setUserData] = useState();
  const [editingProfile, setEditingProfile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUserProfile = async () => {
    if (isLoggedIn) {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/account/my-profile', {
          headers: {
            Authorization: `${token}`,
          },
        });

        const user = response.data;

        setUserData(user);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (editingProfile) {
      setSuccessMessage('');
    }
  }, [editingProfile]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // const toggleFavorite = (profileId) => {
  //   const newFavoriteProfiles = new Set(favoriteProfiles);
  //   if (newFavoriteProfiles.has(profileId)) {
  //     newFavoriteProfiles.delete(profileId);
  //   } else {
  //     newFavoriteProfiles.add(profileId);
  //   }
  //   setFavoriteProfiles(newFavoriteProfiles);
  // };

  const isFavorite = (profileId) => favoriteProfiles.has(profileId);

  const lastDayLogins = 10;
  const lastMonthLogins = 100;

  const handleAddToFavorites = () => {};

  // const handleSendEmail = () => {
  // };

  const handleDeleteProfile = () => {
    setDeleteModalOpen(true);
    setSuccessMessage('');
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');

    await api
      .delete('/account', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        logout();
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Error fetching user profile:', err.message);
      });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleProfileEdited = () => {
    setSuccessMessage('Pomyślnie zaktualizowano profil');
  };

  return (
    <div className="container mx-auto">
      {successMessage && (
        <div className={clsx('bg-blue-200', 'text-blue-800', 'p-4', 'rounded', 'mb-4')}>
          {successMessage}
        </div>
      )}
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              {userData?.firstName ? userData?.firstName.charAt(0) : ''}
              {userData?.lastName ? userData?.lastName.charAt(0) : ''}
            </Avatar>
          }
          title={`${userData?.firstName} ${userData?.lastName}`}
          subheader={userData?.voivodeship ? `Województwo: ${userData?.voivodeship}` : ''}
          action={
            <div>
              {/* <Link href={`/edit_profile`}> */}
              <IconButton onClick={() => setEditingProfile(userData)}>
                <Edit />
              </IconButton>
              {/* </Link> */}
              <IconButton onClick={handleDeleteProfile}>
                <Delete />
              </IconButton>
            </div>
          }
        />

        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Informacje o użytkowniku
          </Typography>
          <Typography>Imię: {userData?.firstName}</Typography>
          <Typography>Nazwisko: {userData?.lastName}</Typography>
          <Typography>Email: {userData?.email}</Typography>
          {userData?.requiredPayment && (
            <Typography>Interesujące zarobki: {userData?.requiredPayment}</Typography>
          )}
          {userData?.userQualifications.length > 0 && (
            <Typography>
              Specjalizacje:{' '}
              {userData?.userQualifications.map((qualification) => qualification.name).join(', ')}
            </Typography>
          )}
          {userData?.aboutMe && <Typography>Krótki opis: {userData?.aboutMe}</Typography>}
          {userData?.education && <Typography>Ukończona szkoła: {userData?.education}</Typography>}

          {userData?.userExperiences.length > 0 && (
            <div className="my-3">
              <Typography variant="subtitle1" gutterBottom>
                Doświadczenie:
              </Typography>
              {userData?.userExperiences.map((experience) => (
                <ExperienceItem
                  key={experience?.id}
                  from={experience?.startYear}
                  to={experience?.endYear}
                  company={experience?.company}
                  description={experience?.description}
                />
              ))}
            </div>
          )}

          <Typography marginTop={3}>Statystyki odwiedzin profilu:</Typography>
          <ul>
            <li>Ostatni dzień: {userData?.counterDaily} razy</li>
            <li>Ostatni miesiąc: {userData?.counterMonthly} razy</li>
            <li>Wszystkie: {userData?.counterAll} razy</li>
          </ul>
        </CardContent>
      </Card>

      {editingProfile && (
        <EditProfile
          profile={editingProfile}
          onClose={() => setEditingProfile(null)}
          onProfileEdited={handleProfileEdited}
          fetchUserProfile={fetchUserProfile}
        />
      )}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box className="bg-white border border-gray-200 p-4 rounded-md text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Typography variant="h6" gutterBottom>
            Czy na pewno chcesz usunąć swój profil?
          </Typography>
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="contained" color="info" onClick={handleCloseDeleteModal}>
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
