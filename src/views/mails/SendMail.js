import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
});

const SendMail = () => {
    const { isLoggedIn } = useAuth();

    const navigate = useNavigate();

    const [showInfoBox, setShowInfoBox] = useState(false);
    const { handleSubmit, control } = useForm();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [senderId, setSenderId] = useState("");
    const [ userId, setUserId ] = useState(5);// useParams();

    console.log(userId);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
    
            const recruiterResponse = await api.get('/account/my-profile', {
              headers: {
                Authorization: `${token}`,
              },
            });
            setSenderId(recruiterResponse.data.id);
    
            const userResponse = await api.get(`/employees/${userId}`);
            setEmail(userResponse.data.email);
            setName(`${userResponse.data.firstName} ${userResponse.data.lastName}`);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
    }, [userId]); // Include userId as a dependency if it's used inside useEffect
    
    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');    

            const formData = {
                ...data,
                ToEmail: email,
                //employeeId: senderId,
            };

            const response = await api.post('/invitation', formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setShowInfoBox(true);

                setTimeout(() => {
                    navigate('/mail_history');
                }, 3000);
            } else {
                console.error('Failed to send mail:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Card className="w-1/2 mx-auto">
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Wysyłanie maila do użytkownika {name}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Controller
                            name="Company"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Company"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <Controller
                            name="Subject"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <Controller
                            name="Body"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Message"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                        >
                            Send
                        </Button>
                    </div>
                </form>
                {showInfoBox && (
                    <div className="mt-3 p-2 bg-green-200 text-green-800 rounded">
                        Mail sent successfully! Redirecting...
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SendMail;
