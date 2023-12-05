import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

import { Stack } from '@mui/system';
import { InputLabel, MenuItem, FormControl, Select, Box, Typography, Button } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';


const AuthRegister = ({ subtitle }) => {
    const { isLoggedIn, register } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
        navigate('/dashboard'); 
        }
    }, [isLoggedIn, navigate]);

    const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '',  roleId: 1});

    const handleFormSubmit = (e) => {
        e.preventDefault();
  
        register(userData);

        navigate('/dashboard'); 
    }; 

    return (
        <>
            <form onSubmit={ handleFormSubmit }>
                <Box>
                    <Stack mb={3}>
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email</Typography>
                        <CustomTextField 
                            id="email" 
                            variant="outlined" 
                            fullWidth 
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Hasło</Typography>
                        <CustomTextField 
                            id="password" 
                            variant="outlined" 
                            fullWidth 
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='confirmPassword' mb="5px" mt="25px">Potwierdź hasło</Typography>
                        <CustomTextField 
                            id="confirmPassword" 
                            variant="outlined" 
                            fullWidth 
                            value={userData.confirmPassword}
                            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                        />

                        <Box className="mt-12 mb-3" sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Konto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userData.roleId}
                                    label="roleId"
                                    onChange={(e) => setUserData({ ...userData, roleId: e.target.value })}
                                >
                                    <MenuItem value={1}>Pracownik</MenuItem>
                                    <MenuItem value={2}>Rekruter</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>
                    <Button type="submit" color="primary" variant="contained" size="large" fullWidth  >
                        Zarejestruj
                    </Button>
                </Box>
            </form>
            {subtitle}
        </>
    );
};

export default AuthRegister;
