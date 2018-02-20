import axios from 'axios';

export function getAPOD(date = '') {
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=tNetMCoHaNg08mdNH9J0mKqYuOCFxZOONeGEqgeE&date=${date}`);
}
