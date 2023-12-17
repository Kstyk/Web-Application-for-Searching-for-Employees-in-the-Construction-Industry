import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField
} from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

import { useAuth } from '../../../contexts/AuthContext'
import { useForm } from 'react-hook-form';

const AuthLogin = ({ subtitle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      setLoginError(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            fullWidth
            // type='email'
            {...register('email', {
              required: 'To pole jest wymagane',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Wprowadzona wartość powinna być adresem email',
              },
            })}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email.message}
            </Typography>
          )}
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Hasło
          </Typography>
          <TextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('password', { required: 'To pole jest wymagane' })}
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {errors.password.message}
            </Typography>
          )}
        </Box>

        {loginError && (
          <div className="text-center">
            <Typography variant="caption" color="error">
              {loginError}
            </Typography>
          </div>
        )}

        <Box mt="30px" mb="20px">
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Zaloguj
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
}

export default AuthLogin;
