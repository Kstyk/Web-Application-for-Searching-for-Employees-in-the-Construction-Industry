import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

import { Stack } from '@mui/system';
import { InputLabel, MenuItem, FormControl, Select, Box, Typography, Button } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form';


const AuthRegister = ({ subtitle }) => {
    const { isLoggedIn, register: authRegister } = useAuth();
    const [registerError, setRegisterError] = useState(null);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const navigate = useNavigate();

    useEffect(() => {
        register('firstName', { required: 'To pole jest wymagane' });
        register('lastName', { required: 'To pole jest wymagane' });
        register('email', {
            required: 'To pole jest wymagane',
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Wprowadzona wartość powinna być adresem email',
            },
        });
        register('password', { required: 'To pole jest wymagane' });
        register('confirmPassword', { required: 'To pole jest wymagane' });
        register('roleId', { required: 'To pole jest wymagane' });
    }, [register]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    const onSubmit = async (data) => {
        try {
            await authRegister(data);
        } catch (error) {
            const errorsArray = Object.entries(error.response?.data.errors).map(([field, messages]) => (
                messages[0]
            ));
    
            setRegisterError(errorsArray[0]);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Stack spacing={2} mb={2}>
                        <Box>
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='firstName' mb="5px" mt="25px">Imię</Typography>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        id="firstName"
                                        variant="outlined"
                                        fullWidth
                                        {...field}
                                        error={!!fieldState.error}
                                    />
                                )}
                            />
                            {errors.firstName && (
                                <Typography variant="caption" color="error">
                                    {errors.firstName.message}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='lastName' mb="5px" mt="25px">Nazwisko</Typography>
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        id="lastName"
                                        variant="outlined"
                                        fullWidth
                                        {...field}
                                        error={!!fieldState.error}
                                    />
                                )}
                            />
                            {errors.lastName && (
                                <Typography variant="caption" color="error">
                                    {errors.lastName.message}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email</Typography>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        id="email"
                                        variant="outlined"
                                        fullWidth
                                        {...field}
                                        error={!!fieldState.error}
                                    />
                                )}
                            />
                            {errors.email && (
                                <Typography variant="caption" color="error">
                                    {errors.email.message}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Hasło</Typography>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        id="password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                        {...field}
                                        error={!!fieldState.error}
                                    />
                                )}
                            />
                            {errors.password && (
                                <Typography variant="caption" color="error">
                                    {errors.password.message}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='confirmPassword' mb="5px" mt="25px">Potwierdź hasło</Typography>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        id="confirmPassword"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                        {...field}
                                        error={!!fieldState.error}
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <Typography variant="caption" color="error">
                                    {errors.confirmPassword.message}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                    <Box mt={3} mb={3}>
                        <Controller
                            name="roleId"
                            control={control}
                            defaultValue={2}
                            render={({ field, fieldState }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Konto</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="roleId"
                                        {...field}
                                        error={!!fieldState.error}
                                    >
                                        <MenuItem value={2}>Pracownik</MenuItem>
                                        <MenuItem value={1}>Rekruter</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {errors.roleId && (
                            <Typography variant="caption" color="error">
                                {errors.roleId.message}
                            </Typography>
                        )}
                    </Box>

                    {registerError && (
                        <div className="text-center mb-4">
                            <Typography variant="caption" color="error">
                                {registerError}
                            </Typography>
                        </div>
                    )}

                    <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
                        Zarejestruj
                    </Button>
                </Box>
            </form >
            {subtitle}
        </>
    );
};

export default AuthRegister;
