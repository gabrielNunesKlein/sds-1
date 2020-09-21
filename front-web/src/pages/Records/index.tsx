import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.CSS';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Filters from '../../Components/Filters';
const BASE_URL = 'https://sds1-gnk.herokuapp.com';

const Records = () => {

    const [ recordResponse, setRecordsResponse ] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0);

    console.log(recordResponse);
    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`).then(response => setRecordsResponse(response.data));
    
    }, [activePage]);

    const handlePage = (index: number) => {
        setActivePage(index)
    }

    return (                    //className="records-table" cellPadding="0" cellSpacing="0"
    <div className="page-container">
        <Filters link="/charts" linkText="VER GRÁFICO"/>
        <table border-radius="10" >
            <thead>
                <tr>
                    <th>INSTANTE</th>
                    <th>NOME</th>
                    <th>IDADE</th>
                    <th>PLATAFORMA</th>
                    <th>GÊNERO</th>
                    <th>TÍTULO DO GAME</th>
                </tr>
            </thead>
            <tbody>
                {recordResponse?.content.map(records => (
                    <tr key={records.id}>
                    <td>{formatDate(records.moment)}</td>
                    <td>{records.name}</td>
                    <td>{records.age}</td>
                    <td className="text-secondary">{records.gamePlatform}</td>
                    <td>{records.genreName}</td>
                    <td className="text-primary">{records.gameTitle}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination 
            activePage={activePage}
            goToPage={handlePage}
            totalPages={recordResponse?.totalPages}
        />
    </div>
    );
} 

export default Records;