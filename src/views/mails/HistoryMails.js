import React, { useState, useEffect } from 'react';
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

const fetchMails = async () => {
    const mails = [
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
    ];

    return mails;
};

const fetchRecruiter = async (recruiterId) => {
    const recruiters = {
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
    };

    return recruiters[recruiterId];
};

const HistoryMails = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [recruiter, setRecruiter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [filterCriteria, setFilterCriteria] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mailsData = await fetchMails();
                setData(mailsData);
            } catch (error) {
                console.error('Błąd podczas pobierania maili', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = async (mail) => {
        setSelectedMail(mail);
        setOpen(true);

        const recruiterData = await fetchRecruiter(mail.recruiterId);
        setRecruiter(recruiterData);
    };

    const handleCloseModal = () => {
        setSelectedMail(null);
        setRecruiter(null);
        setOpen(false);
    };

    const filteredData = data.filter((mail) => {
        if (filterCriteria === 'all' || mail.company.toLowerCase() === filterCriteria.toLowerCase()) {
            return mail.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    const sortedData = filteredData.sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        return order * a.date.localeCompare(b.date);
    });

    const indexOfLastMail = currentPage * rowsPerPage;
    const indexOfFirstMail = indexOfLastMail - rowsPerPage;
    const currentMails = sortedData.slice(indexOfFirstMail, indexOfLastMail);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                Historia zaproszeń
            </Typography>
            <div className="flex space-x-2 my-4">
                <TextField
                    label="Szukaj"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                    value={filterCriteria}
                    onChange={(e) => setFilterCriteria(e.target.value)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="Company A">Company A</MenuItem>
                    <MenuItem value="Company B">Company B</MenuItem>
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
                                        <TableCell>{mail.date}</TableCell>
                                        <TableCell>{mail.title}</TableCell>
                                        <TableCell>
                                            <Link to={`/profile/${mail.recruiterId}`}>
                                                {mail.recruiterId && 'jane.smith@example.com'}
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
                                Zawartość: {selectedMail.message}
                            </Typography>
                            <Typography style={{ margin: '0.5rem 0' }} variant="body1">
                                Pracownik: {recruiter.name} {recruiter.surname} ({recruiter.email})
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
