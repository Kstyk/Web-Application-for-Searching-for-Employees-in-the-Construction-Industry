import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Modal,
    Button,
    TextField,
    Select,
    MenuItem,
    Pagination,
} from '@mui/material';

import { useAuth } from '../../contexts/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
});

/*  = [
        {
            id: 1,
            company: 'Company A',
            date: '2023-11-01',
            title: 'Mail 1',
            message: 'Treść maila 1',
            recruiterId: 1,
        },
        {
            id: 2,
            company: 'Company B',
            date: '2023-11-02',
            title: 'Mail 2',
            message: 'Treść maila 2',
            recruiterId: 2,
        },
    ];*/

    /*const recruiters = {
        1: {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
        },
        2: {
            name: 'Jane',
            surname: 'Smith',
            email: 'jane.smith@example.com',
        },
    };*/

const HistoryMails = () => {
    const { isLoggedIn } = useAuth();
    const [mails, setMails] = useState([]); 

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [recruiter, setRecruiter] = useState({
        id: null,
        email: null,
        firstName: null,
        lastName: null,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [filterCriteria, setFilterCriteria] = useState('all');
    const [sortedData, setSortedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Recruiter
            if (isLoggedIn) {
                try {
                    const token = localStorage.getItem('token');
            
                    const recruiterResponse = await api.get('/account/my-profile', {
                        headers: {
                            Authorization: `${token}`,
                        },
                    });
            
                    const { id, email, firstName, lastName } = recruiterResponse.data;
            
                    setRecruiter({
                        id,
                        email,
                        firstName,
                        lastName,
                    });

                    // {"employeeEmail": "jane@gmail.com","company": "komkor","createdAt": "18.12.2023 23:09","status": "Nowe"}
                    // Fetch Mails
                    if (id !== null) {
                        try {
                            const mailsResponse = await api.get(`/invitations/${id}`, {
                                headers: {
                                    Authorization: `${token}`,
                                },
                            });
                
                            const receivedMails = mailsResponse.data.map(mail => ({
                                ...mail,
                                email: mail.employeeEmail,
                                //title: "title", // Replace with the actual title property
                                //message: "message", // Replace with the actual message property
                              }));
                              
                            setMails(receivedMails);
                            setData(receivedMails);
                        } catch (mailsError) {
                            console.error('Error fetching mails:', mailsError.message);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error.message);
                }
            }
        };
        fetchData();
    }, []);        

    const handleOpenModal = async (mail) => {
        setSelectedMail(mail);
        setOpen(true);

        const recruiterData = recruiter;
    };

    const handleCloseModal = () => {
        setSelectedMail(null);
        setOpen(false);
    };

    useEffect(() => {
        console.log('Data:', data);
      
        const filteredData = data.filter((mail) => {
          if (filterCriteria === 'all' || (mail.company && mail.company.toLowerCase() === filterCriteria.toLowerCase())) {
            return mail.title.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      
        console.log('Filtered Data:', filteredData);
      
        const sortedData = [...filteredData].sort((a, b) => {
          const order = sortOrder === 'asc' ? 1 : -1;
      
          const dateA = new Date(a.createdAt.replace(/(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
          const dateB = new Date(b.createdAt.replace(/(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
      
          return order * (dateA - dateB);
        });
      
        console.log('Sorted Data:', sortedData);
      
        setFilteredData(filteredData);
        setSortedData(sortedData);
      }, [data, searchTerm, filterCriteria, sortOrder]);

    /*const filteredData = data.filter((mail) => {
        if (filterCriteria === 'all' || mail.company.toLowerCase() === filterCriteria.toLowerCase()) {
          return mail.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });

    const sortedData = filteredData.sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        return order * a.date.localeCompare(b.date);
    });*/

    const indexOfLastMail = currentPage * rowsPerPage;
    const indexOfFirstMail = indexOfLastMail - rowsPerPage;
    const currentMails = sortedData.slice(indexOfFirstMail, indexOfLastMail);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const uniqueCompanies = [...new Set(mails.map((mail) => mail.company))];

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                Historia zaproszeń
            </Typography>
            <div className="flex space-x-2 my-4">
                <TextField
                    label="Szukaj"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        paginate(1); 
                    }}
                />
                <Select
                    value={filterCriteria}
                    onChange={(e) => {
                        setFilterCriteria(e.target.value);
                        paginate(1); 
                    }}
                >
                    <MenuItem value="all">All</MenuItem>
                    {uniqueCompanies.map((company) => (
                        <MenuItem key={company} value={company}>
                            {company}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    {`Sortuj ${sortOrder === 'asc' ? 'rosnąco' : 'malejąco'}`}
                </Button>
            </div>
            {isLoading ? (
                <div>Ładowanie...</div>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>LP</TableCell>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Temat</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Firma</TableCell>
                                    <TableCell>Szczegóły</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentMails.map((mail, index) => (
                                    <TableRow key={mail.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{mail.createdAt}</TableCell>
                                        <TableCell>{mail.title}</TableCell>
                                        <TableCell>
                                            <Link to={`/profile/${mail.employeeId}` /* backend nie przysyla id pracownika */}>
                                                {mail.email}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{mail.company}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenModal(mail)}
                                            >
                                                Pokaż szczegóły
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(sortedData.length / rowsPerPage)}
                        page={currentPage}
                        onChange={(e, page) => paginate(page)}
                        className="mt-4"
                    />
                </>
            )}
            <Modal open={open} onClose={handleCloseModal}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white p-4 text-center">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Szczegóły Maila
                    </Typography>
                    {selectedMail && recruiter && (
                        <div>
                            <Typography style={{ margin: '0.5rem 0' }} variant="h6" component="h3">
                                Temat: {selectedMail.title}
                            </Typography>
                            <Typography style={{ margin: '0.5rem 0' }} variant="body1">
                                {selectedMail.message}
                            </Typography>
                            <Typography style={{ margin: '0.5rem 0' }} variant="body1">
                                Rekruter: {recruiter.firstName} {recruiter.lastName} ({recruiter.email})
                            </Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleCloseModal}
                                style={{ margin: '0.5rem 0' }}
                            >
                                Zamknij
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
        </Container>
    );
};

export default HistoryMails;
