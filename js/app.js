import {
    enableSearchBtn
} from './searchBtn.js';

import {
    getCityWeather
} from './api.js';

window.addEventListener('DOMContentLoaded', () => {

    enableSearchBtn();
    getCityWeather();
});