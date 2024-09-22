let id = '9505fd1df737e20152fbd78cdb289b6a'; // Identifiant API pour OpenWeatherMap
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id + '&lang=fr';
let city = document.querySelector('.name'); // Élément pour afficher le nom de la ville
let form = document.querySelector("form"); // Formulaire de recherche
let temperature = document.querySelector('.temperature'); // Élément pour afficher la température
let description = document.querySelector('.description'); // Élément pour afficher la description météo
let valueSearch = document.getElementById('name'); // Champ de saisie pour la recherche
let clouds = document.getElementById('clouds'); // Élément pour afficher les nuages
let humidity = document.getElementById('humidity'); // Élément pour afficher l'humidité
let pressure = document.getElementById('pressure'); // Élément pour afficher la pression
let main = document.querySelector('main'); // Élément principal du document
let backgroundVideo = document.getElementById('background-video'); // Élément vidéo
let video = document.getElementById('video'); // Élément vidéo

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const valueSearch = document.querySelector('#valueSearch');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (valueSearch.value !== '') {
            searchWeather();
        }
    });
});


// Fonction pour mettre à jour la vidéo d'arrière-plan
export const updateBackgroundVideo = (weatherDescription) => {
    console.log('Mise à jour de la vidéo d\'arrière-plan avec la description :', weatherDescription);
    if (weatherDescription.includes('pluie')) {
        backgroundVideo.src = 'public/asset/pluie.mp4';
    } else if (weatherDescription.includes('clair')) {
        backgroundVideo.src = 'public/asset/jour.mp4';
    } else if (weatherDescription.includes('nuage')) {
        backgroundVideo.src = 'public/asset/nuit.mp4';
    } else {
        backgroundVideo.src = 'public/asset/nuit.mp4'; // Valeur par défaut
    }
};

export const searchWeather = () => {
    const city = document.querySelector('#city'); // Assure-toi que ces sélecteurs correspondent à ton HTML
    const temperature = document.querySelector('#temperature');
    const description = document.querySelector('#description');
    const clouds = document.querySelector('#clouds');
    const humidity = document.querySelector('#humidity');
    const pressure = document.querySelector('#pressure');
    const main = document.querySelector('#main');
    const valueSearch = document.querySelector('#valueSearch'); // Ajoute ceci pour pouvoir l'utiliser

    const url = 'URL_DE_TA_RECHERCHE'; // Remplace par ton URL API

    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;
                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
                updateBackgroundVideo(data.weather[0].description);
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données météo :', error);
        });
};


