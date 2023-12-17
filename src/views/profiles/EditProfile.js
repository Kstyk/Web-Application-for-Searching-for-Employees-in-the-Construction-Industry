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

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
});

const EditProfile = ({ profile, onClose, onProfileEdited }) => {
    const [userData, setUserData] = useState(profile);
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

    const fetchQualification = async () => {

        await api.get('/qualifications', {})
            .then((res) => {
                setQualifications(res.data);
            })
            .catch((err) => {
                console.error('Error fetching qualification');
            });
    };

    fetchQualification();

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
    }, [register]);

    useEffect(() => {
        setValue('firstName', userData.firstName);
        setValue('lastName', userData.lastName);
        setValue('email', userData.email);
        setValue('aboutMe', userData?.aboutMe || null);
        setValue('education', userData?.education || null);
        setValue('voivodeship', userData?.voivodeship || null);
        setValue('requiredPayment', userData?.requiredPayment || null);
        setValue('qualificationsToAdd', userData?.qualificationsToAdd || []);
        setValue('userExperiences', userData?.userExperiences || []);
        setValue('userQualifications', userData?.userQualifications || []);
    }, [userData, setUserData]);


    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        setUserData({
            ...userData,
            [name]: checked,
        });
    };

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(userData);
        console.log(data);
        const updateUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await api.put('/account/update', data, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                onProfileEdited(data)
            } catch (error) {
                console.error('Error editing user profile:', error.message);
            }

        };
        updateUserProfile();
        onClose();
    };

    const getFilteredOptions = (allOptions, selectedOptions) => {
        const selectedIds = selectedOptions.map((item) => item.id);
        return allOptions.filter((option) => !selectedIds.includes(option.id));
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
                Dodaj nowe zadanie
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isProfileVisible"
                                        checked={userData.isProfileVisible}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                }
                                label="Profil widoczny dla innych użytkowników"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Imię"
                                        variant="outlined"
                                        fullWidth
                                    />
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
                                    <TextField
                                        {...field}
                                        label="Nazwisko"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                            {errors.lastName && (
                                <Typography variant="caption" color="error">
                                    {errors.lastName.message}
                                </Typography>
                            )}
                        </Grid>
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
                                            setValue('qualificationsToAdd', newValue.map(item => item.id));
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
                                        name="isDataVisible"
                                        checked={userData.isDataVisible}
                                        onChange={handleSwitchChange}
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
                                        type='number'
                                    />
                                )}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isDataVisible"
                                        checked={userData.isDataVisible}
                                        onChange={handleSwitchChange}
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
                                    <TextField
                                        {...field}
                                        label="Krótki opis"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isDataVisible"
                                        checked={userData.isDataVisible}
                                        onChange={handleSwitchChange}
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
                                    <TextField
                                        {...field}
                                        label="Ukończona szkoła"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isDataVisible"
                                        checked={userData.isDataVisible}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                }
                                label="Widoczne dla innych"
                            />
                        </Grid>
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
