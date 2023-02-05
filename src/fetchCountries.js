//const API_URL  = "https://restcountries.com/v3.1/name/";


function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/$(name)?fields=name,capital,population,flags, languages`)
    .then(
        response =>{
            return response.json();
        },
    );
}

export default {fetchCountries};