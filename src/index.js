import './css/styles.css';
import debounce from 'lodash.debounce';
import countries from "./fetchCountries";
import Notiflix from "notiflix";


const DEBOUNCE_DELAY = 300;

const inputEL = document.getElementById ("search-box") ;
const countryCard = document.querySelector (".country-info");

const countryList = document.querySelector (".country-list");

inputEL.addEventListener ("input", debounce (onSubmit,DEBOUNCE_DELAY ))

function onSubmit (e) { 
    e.preventDefault ();

const inputValue  = e.target.value.trim ()
if (inputValue === "") {

countryCard.innerHTML= "";
countryList.innerHTML= "";

return ;
}

countries.fetchCountries(inputValue).then(country => {
    
    if (country.length === 1){
       createCard(country[0]);
        countryList.innerHTML= "";
        
    }

    else if (country.length>=2 && country.length <= 10){
   createList(country);
    return; 

    }
    else if (country.length >10){
        Notiflix.Notify.failure ("Too many matches found. Please enter a more specific name.")
        countryList.innerHTML = ""
        return ;
    }

   else if (country.status === 404){
   Notiflix.Notify.failure ("Oops, there is no country with that name");
   countryCard.innerHTML= "" ;
   countryList.innerHTML= "";
    }
});
}


function createCard (country) {

    const allLanguage = Object.values(country.languages);

            const card = `<h2><img src='${country.flags.svg}' alt='flag' width='30' class='country-flag'/>${country.name.common}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${allLanguage}</p>
            `;
    
     countryCard.innerHTML = card ;
    }

function createList (country) {
        const markup = country.map(name => 
            `<li class='list-elem'>
            <p><img src='${name.flags.svg}' alt='flag' width='30' class='country-flag'/>${name.name.common}<p>
            </li>`).join('');
         countryList.innerHTML = markup;   
        }
    