import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Autocomplete,
    Pagination,
} from '@mui/material';


const api = axios.create({
    baseURL: 'http://localhost:5072/api',
});

const Stat = () => {
    const [statData, setStatData] = useState([]);
    const [qualifications, setQualifications] = useState([]);

    const [sortOrder, setSortOrder] = useState('asc');
    const [filterCriteria, setFilterCriteria] = useState();

    const qualificationsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetchData");
            try {
                // Fetch qualifications
                const qualificationsResponse = await api.get('/qualifications', {});
                setQualifications(qualificationsResponse.data);

                console.log(filterCriteria);

                // Fetch statistics
                const statResponse = await api.get('/stat/qualifications-stat', {
                    params: {
                        itemsFrom: (currentPage - 1) * qualificationsPerPage + 1,
                        itemsTo: currentPage * qualificationsPerPage,
                        pageNumber: currentPage,
                        sortDirection: sortOrder,
                        qualificationId: filterCriteria
                    },
                });
                if (Array.isArray(statResponse.data.items)) {
                    setStatData(statResponse.data.items);

                    setTotalItemsCount(statResponse.data.totalItemsCount);
                    console.log(totalItemsCount);
                    console.log(statResponse.data.items);
                } else {
                    console.error('Invalid user data:', statResponse.data.items);
                }
            } catch (error) {
                console.error('Error fetching data from the backend:', error);
            }
        };

        fetchData();
    }, [currentPage, sortOrder, filterCriteria]);



    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Statystyka Kandydatow</h1>
            <div className="flex space-x-2 mb-4">
                <Autocomplete
                    className="w-1/4"
                    value={filterCriteria}
                    onChange={(e, newValue) => {
                        setFilterCriteria(newValue ? newValue.id : null);
                        handlePageChange(null, 1);
                    }}
                    options={qualifications}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    renderInput={(params) => (
                        <TextField {...params} label="Wybierz kwalifikacje" />
                    )}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    {`Sortuj ${sortOrder === 'asc' ? 'malejaco' : 'rosnaco'}`}
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>LP</TableCell>
                            <TableCell>Kwalifikacja</TableCell>
                            <TableCell>Liczba Kandytatow</TableCell>
                            <TableCell>Oczekiwane Wynagrodzenia</TableCell>
                            <TableCell>Srednie Wynagrodzenie</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statData && statData.length > 0 ? (
                            statData.map((stat, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{stat.name}</TableCell>
                                    <TableCell>{stat.candidatesNum}</TableCell>
                                    <TableCell>{(stat.minSalary > 0) ? `${stat.minSalary}-${stat.maxSalary}` : ""}</TableCell>
                                    <TableCell>{(stat.avgSalary > 0) ? stat.avgSalary : ""}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>No qualifications found.</TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(totalItemsCount / qualificationsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                className="mt-4"
            />
        </div>
    );
};

export default Stat;
