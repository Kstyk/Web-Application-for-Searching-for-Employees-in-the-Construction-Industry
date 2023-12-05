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
  Box
} from '@mui/material';
import { MailOutline, Edit, Delete } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ExperienceItem from './ExperienceItem';

import { useAuth } from '../../contexts/AuthContext';

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
  });

const Profile = () => {
  const { isLoggedIn } = useAuth();

  const [userData, setUserData] = useState({
    id: 0,
    roleId: 0,
    email: 'string',
    firstName: 'string',
    lastName: 'string',
    aboutMe: 'string',
    education: 'string',
    voivodeship: 0,
    requiredPayment: 0,
    userQualifications: [
      {
        id: 0,
        name: 'string',
      },
    ],
    userExperiences: [
      {
        id: 0,
        experienceId: 0,
        experience: {
          id: 0,
          startYear: 0,
          endYear: 0,
          description: 'string',
          company: 'string',
          userExperiences: ['string'],
        },
        employeeId: 0,
        employee: {
          id: 0,
          roleId: 0,
          role: {
            id: 0,
            name: 'string',
          },
          email: 'string',
          password: 'string',
          firstName: 'string',
          lastName: 'string',
          aboutMe: 'string',
          education: 'string',
          voivodeship: 0,
          requiredPayment: 0,
          userQualifications: [
            {
              userId: 0,
              user: 'string',
              qualificationId: 0,
              qualification: {
                id: 0,
                name: 'string',
                userQualifications: ['string'],
              },
            },
          ],
          userExperiences: ['string'],
          savedProfiles: [
            {
              id: 0,
              employeeId: 0,
              employee: 'string',
              recruiterId: 0,
              recruiter: 'string',
            },
          ],
          invitationsHistory: [
            {
              id: 0,
              company: 'string',
              dateOfSending: '2023-12-04T22:55:19.556Z',
              recruiterId: 0,
              recruiter: 'string',
              employeeId: 0,
              employee: 'string',
              title: 'string',
              message: 'string',
            },
          ],
          userPreferences: {
            id: 0,
            employeeId: 0,
            employee: 'string',
            isVisibleProfile: true,
            isVisibleAboutMe: true,
            isVisibleSkills: true,
            isVisibleExperience: true,
            isVisibleEducation: true,
            isVisibleVoivodeship: true,
            isVisibleRequiredPayment: true,
          },
        },
      },
    ],
  });

  useEffect(() => {
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
    fetchUserProfile();
  }, [isLoggedIn]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  /*const userData = {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    province: 'Mazowieckie',
    earnings: '60,000 PLN',
    specialties: ['Hydraulik', 'Tynkarz'],
    shortInfo: 'Jestem doświadczonym hydraulikiem i tynkarzem.',
    school: 'Politechnika Warszawska',
  };*/

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
              {userData.firstName ? userData.firstName.charAt(0) : ''}
              {userData.lastName ? userData.lastName.charAt(0) : ''}
            </Avatar>
          }
          title={`${userData.firstName} ${userData.lastName}`}
          subheader={`Województwo: ${userData.voivodeship}`}
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
              <Link href={`/edit_profile`}>
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
          <Typography>Interesujące zarobki: {userData.requiredPayment}</Typography>
          <Typography>Specjalizacje: {userData.userQualifications.map(qualification => qualification.name).join(', ')}</Typography>
          <Typography>Krótki opis: {userData.aboutMe}</Typography>
          <Typography>Ukończona szkoła: {userData.education}</Typography>

          <div className="my-3">
            <Typography variant="subtitle1" gutterBottom>
              Doświadczenie:
            </Typography>
            {userData.userExperiences.map(experience => (
              <ExperienceItem
                key={experience.id}
                from={experience.experience.startYear}
                to={experience.experience.endYear}
                company={experience.experience.company}
                description={experience.experience.description}
              />
            ))}
          </div>

          <Typography>Statystyki odwiedzin profilu:</Typography>
          <ul>
            <li>Ostatni dzień: {lastDayLogins} razy</li>
            <li>Ostatni miesiąc: {lastMonthLogins} razy</li>
          </ul>
        </CardContent>
        <div className="flex justify-end p-4">
          <Link to={`/mail_send/${id}`}>
            <Button
              startIcon={<MailOutline />}
              onClick={handleSendEmail}
              variant="contained"
              color="primary"
            >
              Wyślij maila
            </Button>
          </Link>
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
