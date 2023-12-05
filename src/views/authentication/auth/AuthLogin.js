import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

import { useAuth } from '../../../contexts/AuthContext'

const AuthLogin = ({ subtitle }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const { login } = useAuth();

    const handleFormSubmit = (e) => {
      e.preventDefault();

      login(credentials);
    };

    return (
      <>
        <form onSubmit={ handleFormSubmit }>
          <Stack>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                Email
              </Typography>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                value={ credentials.email }
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}

              />
            </Box>
            <Box className="mt-6">
              <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                Hasło
              </Typography>
              <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                value={ credentials.password } 
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </Box>
          </Stack>
          <Box className="mt-8">
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Zaloguj
            </Button>
          </Box>
        </form>
        {subtitle}
      </>
    );
}

export default AuthLogin;
