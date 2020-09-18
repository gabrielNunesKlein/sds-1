import React, { useState, useEffect } from 'react';
import Filters from '../../Components/Filters';
import './styles.CSS';
import { barOptions, pieOptions } from './chart-options';
import Chart from 'react-apexcharts';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers';
import axios from 'axios';
//import { type } from 'os';

type PieCharDate = {
    labels: string[];
    series: number[];
}

type BarChartDate = {
    x: string;
    y: number;
}

const initialPieDate = {
    labels: [],
    series: []
}

const BASE_URL = 'http://localhost:8081'

const Charts = () => {
    const [barChartData, setBarChartDate] = useState<BarChartDate[]>([]);
    const [platformData, setPlatformData] = useState<PieCharDate>(initialPieDate);
    const [GenderformData, setGenderformData] = useState<PieCharDate>(initialPieDate);

    useEffect(() =>{
        async function getData() {
            const recordsResponse = await axios.get(`${BASE_URL}/records`);
            const gamesResponse = await axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartDate(barData);

            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);

            const genderChartData = getGenderChartData(recordsResponse.data.content);
            setGenderformData(genderChartData);
        }

        getData();
    }, [])

    return (
        <div className="page-container">
            <Filters link="/records" linkText="VER TABELA"/>
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais votados
                    </h1>
                    <div className="gamer-container">
                        <Chart 
                            options={barOptions}
                            type="bar"
                            width="900"
                            height="650"
                            series={[{ data: barChartData}]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataforma</h2>
                        <Chart 
                            options={{...pieOptions, labels: platformData?.labels}}
                            type="donut"
                            series={[platformData?.series]}
                            width="350"
                        />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Gênero</h2>
                        <Chart 
                            options={{...pieOptions, labels: GenderformData?.labels}}
                            type="donut"
                            series={[GenderformData?.series]}
                            width="350"
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Charts;