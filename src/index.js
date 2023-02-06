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

const inputValue = e.target.value.trim ()
if (inputValue === "") {

countryCard.innerHTML = "";
countryList.innerHTML = "";

return ;
}

countries.fetchCountries(inputValue).then(country => {
    
    if (country.length === 1){
       createCard(country[0]);
        countryList.innerHTML= "";
        return;
    }

    if (country.length>=2 && country.length <= 10){
   createList(country);

    }
    if  (country.length >10){
        Notiflix.Notify.failure ("Too many matches found. Please enter a more specific name.")
        countryList.innerHTML = ""
        //return ;
    }

   if  (country.status === 404){
   Notiflix.Notify.failure ("Oops, there is no country with that name");
   countryCard.innerHTML= "" ;
   countryList.innerHTML= "";
    }
});
}

function createCard ({name,population,capital,languages,flags}) {

    const allLanguage = Object.values(languages)
    
            const card = `
      <div>
      <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> 
      <h1> ${name.official}</h1> 
      <p> <span class = "info-country"> Capital: </span> ${capital} </p>
      <p> <span class = "info-country"> Population: </span> ${population} </p>
      <p> <span class = "info-country"> Languages: </span> ${allLanguage} </p>
     
     </div>
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
    