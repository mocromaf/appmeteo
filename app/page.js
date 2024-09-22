'use client';


import Head from 'next/head';
import { useEffect, useState } from 'react';
import BackgroundVideo from '../components/BackgroundVideo';
import '../styles/globals.css';

const id = '9505fd1df737e20152fbd78cdb289b6a'; // API key OpenWeatherMap
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${id}&lang=fr`;

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Paris'); // Default city
  const [videoSource, setVideoSource] = useState('/videos/nuit.mp4'); // Default video source

  useEffect(() => {
    searchWeather('Paris');
  }, []);

  useEffect(() => {
    if (weather) {
      updateBackgroundVideo(weather.weather[0].description);
    }
  }, [weather]);

  const updateBackgroundVideo = (weatherDescription) => {
    console.log('Mise à jour de la vidéo d\'arrière-plan avec la description :', weatherDescription);
    
    if (weatherDescription.includes('pluie')) {
      setVideoSource('/videos/pluie.mp4');
    } else if (weatherDescription.includes('clair')) {
      setVideoSource('/videos/jour.mp4');
    } else if (weatherDescription.includes('nuage')) {
      setVideoSource('/videos/nuit.mp4');
    } else {
      setVideoSource('/videos/nuit.mp4');
    }
  };

  const searchWeather = async (cityName) => {
    try {
      const response = await fetch(`${url}&q=${cityName}`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        console.error('Erreur API :', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo :', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city) {
      searchWeather(city);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Météo</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </Head>

      <BackgroundVideo src={videoSource} />

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Entrez une ville"
            autoComplete="off"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {weather && (
          <section className="result">
            <figure className="name">
              <figcaption>{weather.name}</figcaption>
              <img
                src={`https://flagsapi.com/${weather.sys.country}/shiny/32.png`}
                alt={`Drapeau de ${weather.sys.country}`}
              />
            </figure>

            <figure className="temperature">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="Icône de la météo"
              />
              <figcaption>
                <span>{weather.main.temp}</span>
                <sup>°</sup>
              </figcaption>
            </figure>

            <p className="description">{weather.weather[0].description}</p>

            <ul>
              <li>
                <span>Nuages</span>
                <i className="fa-solid fa-cloud"></i>
                <span id="clouds">{weather.clouds.all}</span>%
              </li>
              <li>
                <span>Humidité</span>
                <i className="fa-solid fa-droplet"></i>
                <span id="humidity">{weather.main.humidity}</span>%
              </li>
              <li>
                <span>Pression</span>
                <i className="fa-solid fa-gauge"></i>
                <span id="pressure">{weather.main.pressure}</span> Pa
              </li>
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
