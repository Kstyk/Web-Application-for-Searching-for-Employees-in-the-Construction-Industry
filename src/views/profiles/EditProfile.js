import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  IconButton,
  Grid,
  Switch,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';

const api = axios.create({
  baseURL: 'http://localhost:5072/api',
});

const EditProfile = ({ profile, onClose, onProfileEdited, fetchUserProfile }) => {
  const [userData, setUserData] = useState(profile);
  const [editingErrors, setEditingErrors] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const voivodeships = [
    'dolnośląskie',
    'kujawskoPomorskie',
    'lubelskie',
    'lubuskie',
    'łódzkie',
    'małopolskie',
    'mazowieckie',
    'opolskie',
    'podkarpackie',
    'podlaskie',
    'pomorskie',
    'śląskie',
    'świętokrzyskie',
    'warmińskoMazurskie',
    'wielkopolskie',
    'zachodnioPomorskie',
  ];

  useEffect(() => {
    const fetchQualification = async () => {
      await api
        .get('/qualifications', {})
        .then((res) => {
          setQualifications(res.data);
        })
        .catch((err) => {
          console.error('Error fetching qualification');
        });
    };

    fetchQualification();
  }, []);

  useEffect(() => {
    register('firstName', { required: 'To pole jest wymagane' });
    register('lastName', { required: 'To pole jest wymagane' });
    register('email');
    register('aboutMe');
    register('education');
    register('voivodeship');
    register('requiredPayment');
    register('qualificationsToAdd');
    register('userExperiences');
    register('userQualifications');

    if (userData.userPreferences) {
      register('userPreferences.isVisibleProfile');
      register('userPreferences.isVisibleAboutMe');
      register('userPreferences.isVisibleSkills');
      register('userPreferences.isVisibleExperience');
      register('userPreferences.isVisibleEducation');
      register('userPreferences.isVisibleVoivodeship');
      register('userPreferences.isVisibleRequiredPayment');
    }
  }, [register]);

  useEffect(() => {
    setValue('firstName', userData.firstName);
    setValue('lastName', userData.lastName);
    setValue('email', userData.email);
    setValue('aboutMe', userData?.aboutMe || null);
    setValue('education', userData?.education || null);
    setValue('voivodeship', userData?.voivodeship || null);
    setValue('requiredPayment', userData?.requiredPayment || null);

    let arr = [];
    userData?.userQualifications?.map((obj) => arr.push(obj.id));

    setValue('qualificationsToAdd', arr || []);
    // setValue('userExperiences', userData?.userExperiences || []);
    setValue(
      'userExperiences',
      (userData?.userExperiences || []).map((experience) => ({
        ...experience,
        endYear: experience.endYear === 0 ? null : experience.endYear,
      })),
    );
    setValue('userQualifications', userData?.userQualifications || []);

    if (userData.userPreferences) {
      setValue('userPreferences.isVisibleProfile', userData?.userPreferences?.isVisibleProfile);
      setValue('userPreferences.isVisibleAboutMe', userData?.userPreferences?.isVisibleAboutMe);
      setValue('userPreferences.isVisibleSkills', userData?.userPreferences?.isVisibleSkills);
      setValue(
        'userPreferences.isVisibleExperience',
        userData?.userPreferences?.isVisibleExperience,
      );
      setValue('userPreferences.isVisibleEducation', userData?.userPreferences?.isVisibleEducation);
      setValue(
        'userPreferences.isVisibleVoivodeship',
        userData?.userPreferences?.isVisibleVoivodeship,
      );
      setValue(
        'userPreferences.isVisibleRequiredPayment',
        userData?.userPreferences?.isVisibleRequiredPayment,
      );
    }
  }, []);

  const onSubmit = async (data) => {
    // console.log(userData);
    console.log(data);
    const updateUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.put('/account', data, {
          headers: {
            Authorization: `${token}`,
          },
        });
        onProfileEdited();
        fetchUserProfile();
        onClose();
      } catch (error) {
        const errorMessages = Object.values(error.response?.data.errors || {}).flatMap(
          (errorArray) => errorArray,
        );
        // console.log(errorMessages);
        setEditingErrors(errorMessages);
      }
    };
    updateUserProfile();
  };

  const getFilteredOptions = (allOptions, selectedOptions) => {
    const selectedIds = selectedOptions.map((item) => item.id);
    return allOptions.filter((option) => !selectedIds.includes(option.id));
  };

  const handleSwitchChange = (fieldName) => {
    setUserData((prevUserData) => {
      const updatedPreferences = {
        ...prevUserData.userPreferences,
        [fieldName]: !prevUserData.userPreferences[fieldName],
      };

      setValue(`userPreferences.${fieldName}`, updatedPreferences[fieldName]);

      return {
        ...prevUserData,
        userPreferences: updatedPreferences,
      };
    });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Edytuj profil
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {userData?.roleId == 2 && (
                <FormControlLabel
                  control={
                    <Switch
                      name="isVisibleProfile"
                      checked={userData.userPreferences.isVisibleProfile}
                      onChange={() => handleSwitchChange('isVisibleProfile')}
                      color="primary"
                    />
                  }
                  label="Profil widoczny dla innych użytkowników"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Imię" variant="outlined" fullWidth />
                )}
              />
              {errors.firstName && (
                <Typography variant="caption" color="error">
                  {errors.firstName.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Nazwisko" variant="outlined" fullWidth />
                )}
              />
              {errors.lastName && (
                <Typography variant="caption" color="error">
                  {errors.lastName.message}
                </Typography>
              )}
            </Grid>
            {userData.roleId == 2 && (
              <>
                <Grid item xs={12}>
                  <Controller
                    name="userQualifications"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        className="my-3"
                        multiple
                        id="tags-outlined"
                        options={getFilteredOptions(qualifications, field.value)}
                        getOptionLabel={(qualification) => qualification.name}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setValue('userQualifications', newValue);
                          setValue(
                            'qualificationsToAdd',
                            newValue.map((item) => item.id),
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Kwalifikacje"
                            placeholder=""
                            variant="outlined"
                          />
                        )}
                      />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isVisibleSkills"
                        checked={userData.userPreferences.isVisibleSkills}
                        onChange={() => handleSwitchChange('isVisibleSkills')}
                        color="primary"
                      />
                    }
                    label="Widoczne dla innych"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="voivodeship"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={voivodeships}
                        onChange={(event, newValue) => {
                          setValue('voivodeship', newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Województwo"
                            variant="outlined"
                            fullWidth
                            helperText={errors.voivodeship && errors.voivodeship.message}
                          />
                        )}
                      />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isVisibleVoivodeship"
                        checked={userData.userPreferences.isVisibleVoivodeship}
                        onChange={() => handleSwitchChange('isVisibleVoivodeship')}
                        color="primary"
                      />
                    }
                    label="Widoczne dla innych"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="requiredPayment"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Zarobki"
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isVisibleRequiredPayment"
                        checked={userData.userPreferences.isVisibleRequiredPayment}
                        onChange={() => handleSwitchChange('isVisibleRequiredPayment')}
                        color="primary"
                      />
                    }
                    label="Widoczne dla innych"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="aboutMe"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField {...field} label="Krótki opis" variant="outlined" fullWidth />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isVisibleAboutMe"
                        checked={userData.userPreferences.isVisibleAboutMe}
                        onChange={() => handleSwitchChange('isVisibleAboutMe')}
                        color="primary"
                      />
                    }
                    label="Widoczne dla innych"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="education"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField {...field} label="Ukończona szkoła" variant="outlined" fullWidth />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isVisibleEducation"
                        checked={userData.userPreferences.isVisibleEducation}
                        onChange={() => handleSwitchChange('isVisibleEducation')}
                        color="primary"
                      />
                    }
                    label="Widoczne dla innych"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Doświadczenia zawodowe</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isVisibleExperience"
                        checked={userData.userPreferences.isVisibleExperience}
                        onChange={() => handleSwitchChange('isVisibleExperience')}
                        color="primary"
                      />
                    }
                    label="Widoczne dla innych"
                  />
                  {userData.userExperiences.map((experience, index) => (
                    <div key={index}>
                      <Grid container spacing={2} mt={2} mb={2}>
                        <Grid item xs={3}>
                          <Controller
                            name={`userExperiences[${index}].startYear`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Rok rozpoczęcia"
                                type="number"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Controller
                            name={`userExperiences[${index}].endYear`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Rok zakończenia"
                                type="number"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Controller
                            name={`userExperiences[${index}].company`}
                            control={control}
                            render={({ field }) => <TextField {...field} label="Firma" fullWidth />}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <DeleteIcon
                            fullWidth
                            style={{ height: '100%', cursor: 'pointer' }}
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              setValue(
                                'userExperiences',
                                userData.userExperiences.filter((_, i) => i !== index),
                              );
                              setUserData((prevUserData) => {
                                const updatedUserExperiences = [...prevUserData.userExperiences];
                                updatedUserExperiences.splice(index, 1);

                                return {
                                  ...prevUserData,
                                  userExperiences: updatedUserExperiences,
                                };
                              });
                            }}
                            // startIcon={< />}
                          >
                            Usuń
                          </DeleteIcon>
                        </Grid>
                        <Grid item xs={12}>
                          <Controller
                            name={`userExperiences[${index}].description`}
                            control={control}
                            render={({ field }) => (
                              <TextField {...field} label="Opis" multiline rows={4} fullWidth />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  {/* Przycisk do dodawania nowego doświadczenia */}
                  <div className="mt-3 text-center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setUserData((prevUserData) => ({
                          ...prevUserData,
                          userExperiences: [
                            ...prevUserData.userExperiences,
                            {
                              id: uuidv4(),
                              startYear: null,
                              endYear: null,
                              description: null,
                              company: null,
                            },
                          ],
                        }));
                      }}
                    >
                      Dodaj nowe doświadczenie
                    </Button>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
          {/* <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={`/profile/${userData.id}`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Zapisz zmiany
                                </Button>
                            </Link>
                        </Grid>
                    </Grid> */}
          {editingErrors && (
            <div className="text-center my-3">
              {editingErrors.map((error, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  color="error"
                  style={{ display: 'block', width: '100%' }}
                >
                  {error}
                </Typography>
              ))}
            </div>
          )}

          <DialogActions>
            <Button onClick={onClose} size="medium" variant="outlined" color="primary">
              Anuluj
            </Button>
            <Button type="submit" size="medium" variant="contained" color="primary">
              Edytuj profil
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
