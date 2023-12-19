import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const api = axios.create({
  baseURL: 'http://localhost:5072/api',
});

const Profile = () => {
  const { isLoggedIn } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();
  const [favoriteProfiles, setFavoriteProfiles] = useState(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Przykładowe dane użytkownika
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

  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/employees/${id}`);

        const user = response.data;
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };
    fetchUserProfile();
  }, []);

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
                    const { id } = profile;
                    
                    return {
                      id,
                    };
                  });
        
                  setFavoriteProfiles(new Set(profiles.map(profile => profile.id)));
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        }
    };
    fetchProfiles();
  }, []); 

  const handleDeleteProfile = async (profileId) => {
    if (profileId) {
      try {
        const token = localStorage.getItem('token');
  
        await api.delete(`/employees/${profileId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

      } catch (error) {
        console.error('Error deleting profile:', error.message);
      }
    }
  };

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

      } catch (error) {
        console.error('Error deleting profile:', error.message);
      }
    }
  };

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

  const isFavorite = (profileId) => favoriteProfiles.has(profileId);

  const lastDayLogins = 10;
  const lastMonthLogins = 100;

  const handleSendEmail = () => {
  };


  return (
    <div className="container mx-auto">
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
              <Button color='grey2'
                onClick={() => toggleFavorite(userData?.id)}>
                {isFavorite(userData?.id) ? (
                  <FavoriteIcon className="text-gray-600" />
                ) : (
                  <FavoriteBorderIcon className="text-gray-600" />
                )}
              </Button>
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
          {userData?.requiredPayment && <Typography>Interesujące zarobki: {userData?.requiredPayment}</Typography>}
          {userData?.userQualifications.length > 0 && <Typography>Specjalizacje: {userData?.userQualifications.map(qualification => qualification.name).join(', ')}</Typography>}
          {userData?.aboutMe && <Typography>Krótki opis: {userData?.aboutMe}</Typography>}
          {userData?.education && <Typography>Ukończona szkoła: {userData?.education}</Typography>}

          {userData?.userExperiences.length > 0 &&
            <div className="my-3">
              <Typography variant="subtitle1" gutterBottom>
                Doświadczenie:
              </Typography>
              {userData.userExperiences.map((experience) => (
                <ExperienceItem
                  key={experience.id}
                  from={experience.experience.startYear}
                  to={experience.experience.endYear}
                  company={experience.experience.company}
                  description={experience.experience.description}
                />
              ))}
            </div>
          }

          <Typography mt={3}>Statystyki odwiedzin profilu:</Typography>
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
    </div>
  );
};

export default Profile;
