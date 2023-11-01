import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Container,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const EditProfile = () => {
    const [userData, setUserData] = useState({
        id: 5,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        province: 'Mazowieckie',
        earnings: '60,000 PLN',
        specialties: ['Hydraulik', 'Tynkarz'],
        experience: {
            hydraulik: '5 lat',
            tynkarz: '7 lat',
        },
        shortInfo: 'Jestem doświadczonym hydraulikiem i tynkarzem.',
        school: 'Politechnika Warszawska',
        isDataVisible: true,
        isProfileVisible: true,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        setUserData({
            ...userData,
            [name]: checked,
        });
    };

    const handleSubmit = () => {
        // Tutaj możesz dodać logikę zapisu zmian w danych użytkownika
    };

    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Edytuj profil
                    </Typography>
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
                            <TextField
                                name="firstName"
                                label="Imię"
                                variant="outlined"
                                fullWidth
                                value={userData.firstName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="lastName"
                                label="Nazwisko"
                                variant="outlined"
                                fullWidth
                                value={userData.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="province"
                                label="Województwo"
                                variant="outlined"
                                fullWidth
                                value={userData.province}
                                onChange={handleInputChange}
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
                            <TextField
                                name="earnings"
                                label="Zarobki"
                                variant="outlined"
                                fullWidth
                                value={userData.earnings}
                                onChange={handleInputChange}
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
                            <TextField
                                name="shortInfo"
                                label="Krótki opis"
                                variant="outlined"
                                fullWidth
                                value={userData.shortInfo}
                                onChange={handleInputChange}
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
                            <TextField
                                name="school"
                                label="Ukończona szkoła"
                                variant="outlined"
                                fullWidth
                                value={userData.school}
                                onChange={handleInputChange}
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
                    <Grid container justifyContent="flex-end">
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
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EditProfile;
