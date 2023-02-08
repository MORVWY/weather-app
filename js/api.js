function getCityWeather() {
    const form = document.querySelector('.search-form__input'),
        searchBtn = document.querySelector('.search-form__search'),
        locationBtn = document.querySelector('.search-form__location'),
        item = document.querySelector('.item'),
        weatherImage = document.querySelector('.item__image'),
        cityText = document.querySelector('.item-header__city'),
        countryText = document.querySelector('.item-header__country'),
        temperatureText = document.querySelector('.item-header__temperature'),
        descriptionText = document.querySelector('.item-list__description'),
        feelsLikeText = document.querySelector('.item-list__feelsLike'),
        humidityText = document.querySelector('.item-list__humidity'),
        wikiLink = document.querySelector('.item-links__wiki'),
        dangerAlert = document.querySelector('.alert');

    const key = 'e7fb9ae0f2a33058f296c0716e2a97a2';


    function getCityWeather() {
        const value = form.value;
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${key}`;

        fetchApi(api);
    }

    function getLocationWeather(position) {
        const {
            latitude,
            longitude
        } = position.coords;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

        fetchApi(api);
    }

    function onError(error) {
        dangerAlert.innerHTML = error.message;
        dangerAlert.style.display = 'block';

        setTimeout(() => {
            dangerAlert.style.display = 'none';
        }, 3000)
    }

    const fetchApi = async (api) => {
        const res = await fetch(api);
        const data = await res.json();

        weatherDetails(data);
    };

    function weatherDetails(data) {
        if (data.cod == '404') {
            dangerAlert.innerHTML = 'City not found';
            dangerAlert.style.display = 'block';

            setTimeout(() => {
                dangerAlert.style.display = 'none';
            }, 3000)
        } else {
            item.style.display = 'block';

            const city = data.name;
            const country = data.sys.country;
            const countryName = new Intl.DisplayNames(['en'], {
                type: 'region'
            });

            const {
                description,
                id
            } = data.weather[0];

            const {
                feels_like,
                humidity,
                temp
            } = data.main;

            if (id == 800) {
                weatherImage.src = 'images/weatherIcons/clear.svg';
            } else if (id >= 200 && id <= 232) {
                weatherImage.src = 'images/weatherIcons/storm.svg';
            } else if (id >= 600 && id <= 622) {
                weatherImage.src = 'images/weatherIcons/snow.svg';
            } else if (id >= 701 && id <= 781) {
                weatherImage.src = 'images/weatherIcons/haze.svg';
            } else if (id >= 801 && id <= 804) {
                weatherImage.src = 'images/weatherIcons/cloud.svg';
            } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
                weatherImage.src = 'images/weatherIcons/rain.svg';
            }

            cityText.innerHTML = city;
            countryText.innerHTML = countryName.of(country);
            temperatureText.innerHTML = `${Math.round(temp)}&#8451`;
            descriptionText.innerHTML = `Description: ${description}`;
            feelsLikeText.innerHTML = `Feels like: ${Math.round(feels_like)}&#8451`;
            humidityText.innerHTML = `Humidity: ${humidity}%`;

            wikiLink.setAttribute('href', `https://en.wikipedia.org/wiki/${countryText.innerHTML}`);
        }
    }

    searchBtn.addEventListener('click', getCityWeather);
    locationBtn.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(getLocationWeather, onError);
    });
}

export {
    getCityWeather
};