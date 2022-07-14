import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
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
    if (value) {
    galleryRef.innerHTML = '';
    inputNotification.innerHTML = '';
    }
    if (value.length === 0){
    galleryRef.innerHTML = '';
    inputNotification.innerHTML = '';
    }
}

function renderCountry (country) {
    console.log (country)
    console.log(country.length)
    if (country.length >1 && country.length < 10) {
        let listSerchItemCountry = country.map(elem => {
            const {name} = elem;
            return `
             <li class ='input-help-text'>${name.common}</li>
            `
        }).join('');

        inputNotification.insertAdjacentHTML('beforeend',listSerchItemCountry);
   
        defaultModules.set(PNotifyMobile, {});
        alert({
          text: 'To many matches found.Please enter a more specific !'
        })
    }
    else if (country.length == 1) {
        let listItemsCountry = country.map( elem => {
            const {name, capital, population, languages,coatOfArms:{png}} = elem;
            return `<div class="country">
                        <h1 class="country__title">${name.common}</h1>
                    <div class="country__content">
                        <div class="country__content-info">
                            <p class="country__content-info--name">Capital:${capital}</p>
                            <p class="country__content-info--name">Population:${population} people</p>
                            <p class="country__content-info--name">Language:</p>
                                <ul class="country__content-info--list">
                                  <li class="country__content-info--item">${languages}</li>
                                  <li class="country__content-info--item"></li>
                                  <li class="country__content-info--item"></li>
                                </ul>
                        </div>
                             <img class = 'country__content-img' src="${png}" alt="${name.common}">
                    </div>
                </div>`}).join('')
    
    galleryRef.insertAdjacentHTML('beforeend',listItemsCountry);
    }
}





 