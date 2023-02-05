function getCityWeather() {
    const form = document.querySelector('.search-form__input'),
        searchBtn = document.querySelector('.search-form__search'),
        locationBtn = document.querySelector('.search-form__location'),
        countryImg = document.querySelector('.item__image'),
        cityText = document.querySelector('.item-header__city'),
        countryText = document.querySelector('.item-header__country'),
        temperatureText = document.querySelector('.item-header__temperature'),
        descriptionText = document.querySelector('.item-list__description'),
        feelsLikeText = document.querySelector('.item-list__feelsLike'),
        humidityText = document.querySelector('.item-list__humidity'),
        wikiLink = document.querySelector('.item-links__wiki'),
        anotherLink = document.querySelector('.item-links__another'),
        dangerAlert = document.querySelector('.alert');

    const key = 'e7fb9ae0f2a33058f296c0716e2a97a2';


    function getCityWeather() {
        const value = form.value;
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`;

        fetchApi(api);
    }

    function getLocationWeather(position) {
        const {
            latitude,
            longitude
        } = position.coords;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

        fetchApi(api);
    }

    function onError(error) {
        dangerAlert.innerHTML = error.message;
        dangerAlert.style.display = 'block';

        setTimeout(() => {
            dangerAlert.style.display = 'none';
        }, 3000)
    }

    function fetchApi(api) {
        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                weatherDetails(data);
            })
    }

    function weatherDetails(data) {
        if (data.cod == '404') {
            dangerAlert.innerHTML = 'City not found';
            dangerAlert.style.display = 'block';

            setTimeout(() => {
                dangerAlert.style.display = 'none';
            }, 3000)
        } else {
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

            cityText.innerHTML = city;
            countryText.innerHTML = countryName.of(country);
            temperatureText.innerHTML = temp;
            descriptionText.innerHTML = description;
            feelsLikeText.innerHTML = feels_like;
            humidityText.innerHTML = humidity;

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