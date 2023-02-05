function enableSearchBtn() {
    const searchForm = document.querySelector('.search-form__input'),
        searchBtn = document.querySelector('.search-form__search');

    searchForm.addEventListener('input', (e) => {
        if (e.target.value != '') {
            searchBtn.removeAttribute('disabled');
        } else {
            searchBtn.setAttribute('disabled', 'disabled');
        }
    });
}

export {
    enableSearchBtn
};