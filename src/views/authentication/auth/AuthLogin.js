import React from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ subtitle }) => (
    <>
        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Email</Typography>
                <CustomTextField id="username" variant="outlined" fullWidth />
            </Box>
            <Box className="mt-6">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Hasło</Typography>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth />
            </Box>
        </Stack>
        <Box className="mt-8">
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                to="/"
                type="submit"
            >
                Zaloguj
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthLogin;
