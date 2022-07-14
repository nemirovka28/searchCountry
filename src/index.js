import showError from './js/error.js';
let _ = require('lodash.debounce');
import './sass/index.scss';
import APi from './js/fetchCountries.js';

const galleryRef = document.querySelector('.container');
const inputValue = document.querySelector('.form-control')
                            .addEventListener('input', _(onSearch,500));
const inputNotification = document.querySelector('.input-help');

function onSearch (event) {
    event.preventDefault();
    const value = event.target.value;
    console.log(value)
    APi.fetchCountries(value)
    .then(renderCountry)
    .catch(catchEror=>catchEror);
    if (value) {
        clearMarkup();
    }
    if (value.length === 0){
        clearMarkup();
    }
    if(value.length > 10){
        showError("Country is not found") ;
    }
};
function renderCountry (country) {
    createLiItem(country);
    createContent(country);
    createLanguageContent(country);
};
function createContent(country){
    if (country.length == 1) {
        let listItemsCountry = country.map( elem => {
            const {name, capital, population,coatOfArms:{png}} = elem;
            return `<div class="country">
                        <h1 class="country__title">${name.common}</h1>
                    <div class="country__content">
                        <div class="country__content-info">
                            <p class="country__content-info--name">Capital:${capital}</p>
                            <p class="country__content-info--name">Population:${population} people</p>
                            <p class="country__content-info--name">Language:</p>
                                <ul class="country__content-info--list"></ul>
                        </div>
                             <img class = 'country__content-img' src="${png}" alt="${name.common}">
                    </div>
                </div>`}).join('');
    galleryRef.insertAdjacentHTML('beforeend',listItemsCountry);
    }
};
function  createLiItem (country){
    if (country.length >1 && country.length < 10) {
        let listSerchItemCountry = country.map(elem => {
            const {name} = elem;
            return `
             <li class ='input-help-text'>${name.common}</li>
            `
        }).join('');

        inputNotification.insertAdjacentHTML('beforeend',listSerchItemCountry);
        showError('To many matches found.Please enter a more specific !') ;
    }
};
function  createLanguageContent(country){
    console.log(country)
    const lang = document.querySelector('.country__content-info--list')
    const li = country.map(el => Object.values(el.languages));
    console.log(li)
    const liContent = li.map( el => {
        return `
        <li>${el}</li>
        `
    });
    console.log(liContent)
    lang.insertAdjacentHTML('beforeend',liContent)
};
function clearMarkup () {
    galleryRef.innerHTML = '';
    inputNotification.innerHTML = '';
};



 