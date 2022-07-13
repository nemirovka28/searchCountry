import './sass/index.scss';
import APi from './js/fetchCountries.js'
import countries from './js/countries.json';

const galleryRef = document.querySelector('ul');
function onSearch (event) {
    e.preventDefault();

    APi.fetchCountries(searchQuery)
    .then(renderCountry)

}
function renderCountry (country) {
    console.log(country)
}

// const country = APi.fetchCountries('peru').then( c => console.log(c))
// console.log(country)


// galleryRef.insertAdjacentHTML('beforeend', createCountry(countries));