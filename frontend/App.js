import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import './App.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function App() {
    const [apodData, setApodData] = useState(null);
    const [marsPhotos, setMarsPhotos] = useState([]);
    const [earthDate, setEarthDate] = useState('2023-10-01');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // axios.get('http://localhost:5000/apod')
        axios.get('https://bounce-project.onrender.com/apod')
            .then(response => setApodData(response.data))
            .catch(error => console.error(error));

        fetchMarsPhotos(earthDate);
    }, []);

    const fetchMarsPhotos = (date) => {
        setLoading(true);
        setError(null);
        axios.get(`https://bounce-project.onrender.com/mars-rover-photos?earth_date=${date}`)
            .then(response => {
                setMarsPhotos(response.data.photos);
                if (response.data.photos.length === 0) {
                    setError('No photos available for this date.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Failed to fetch Mars Rover photos.');
                setLoading(false);
            });
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setEarthDate(newDate);
        fetchMarsPhotos(newDate);
    };

    const apodChartData = {
        labels: ['Media Type', 'HD Image Available', 'Copyright'],
        datasets: [
            {
                label: 'APOD Metadata',
                data: [
                    apodData?.media_type === 'image' ? 1 : 0,
                    apodData?.hdurl ? 1 : 0,
                    apodData?.copyright ? 1 : 0,
                ],
                backgroundColor: ['#007bff', '#28a745', '#dc3545'],
            },
        ],
    };

    const marsChartData = {
        labels: ['Photos Taken'],
        datasets: [
            {
                label: 'Mars Rover Photos',
                data: [marsPhotos.length],
                backgroundColor: ['#ffc107'],
            },
        ],
    };

    return (
        <div className="App">
            <h1>NASA Data Explorer</h1>

            <section className="apod-section">
                <h2>Astronomy Picture of the Day</h2>
                {apodData && (
                    <div className="apod-card">
                        <h3>{apodData.title}</h3>
                        <img src={apodData.url} alt={apodData.title} className="apod-image" />
                        <p>{apodData.explanation}</p>
                        <a href={apodData.hdurl} target="_blank" rel="noopener noreferrer" className="hd-link">
                            View HD Image
                        </a>
                        <div className="chart-container">
                            <h4>APOD Metadata</h4>
                            <Pie data={apodChartData} />
                        </div>
                    </div>
                )}
            </section>

            <section className="mars-section">
                <h2>Mars Rover Photos</h2>
                <label>
                    Select Earth Date:
                    <input
                        type="date"
                        value={earthDate}
                        onChange={handleDateChange}
                        min="2012-08-06" 
                        max={new Date().toISOString().split('T')[0]} 
                        className="date-picker"
                    />
                </label>
                {loading && <div className="loading-spinner"></div>}
                {error && <p className="error-message">{error}</p>}
                <div className="chart-container">
                    <h4>Mars Rover Photos Taken</h4>
                    <Bar data={marsChartData} />
                </div>
                <div className="photo-grid">
                    {marsPhotos.map(photo => (
                        <div key={photo.id} className="photo-card">
                            <img
                                src={photo.img_src}
                                alt={`Mars Rover Photo ${photo.id}`}
                                className="mars-image"
                            />
                            <p>Photo ID: {photo.id}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
