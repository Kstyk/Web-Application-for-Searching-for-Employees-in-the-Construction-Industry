import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AuthRegister = ({ subtitle }) => {
    const [role, setRole] = useState(0);

    return (
        <>

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Imię</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='surname' mb="5px" mt="25px">Nazwisko</Typography>
                    <CustomTextField id="surname" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Hasło</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth />

                    <Box className="mt-12 mb-3" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Konto</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="role"
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <MenuItem value={0}>Pracownik</MenuItem>
                                <MenuItem value={1}>Rekruter</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login">
                    Zarejestruj
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
