import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const SendMail = () => {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Card className="w-1/2 mx-auto">
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Wysyłanie maila do użytkownika Joe Doe
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Controller
                            name="company"
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
                            name="title"
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
                            name="message"
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
                        <Link to="/mail_history">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon />}
                            >
                                Send
                            </Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default SendMail;
