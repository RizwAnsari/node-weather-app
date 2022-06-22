const alertDanger = document.querySelector('.alert-weather')
const weatherForm = document.querySelector('#weather-form')
const card = document.querySelector('.card')
const cardTitle = document.querySelector('.card-title')
const cardText = document.querySelector('.card-text')
const cardImage = document.querySelector('.card-img-top')
const listItems = document.querySelectorAll('.list-group-item')

const submitHnadler = function(evt){
    evt.preventDefault()
    const place = evt.target[0].value;
    // console.log(evt.target[0].value);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {

        const {error, location, weather_descriptions, temperature, feelslike, weather_icons, wind_speed, pressure} = JSON.parse(this.responseText)
        
        if (error) {
            alertDanger.style.display = 'block'
            alertDanger.innerText = error
            return
        }
        if (!error) {
            alertDanger.style.display = 'none'
        }
        
        card.style.display = "block"
        cardImage.setAttribute('src', weather_icons);
        cardTitle.innerText = location;
        cardText.innerText = weather_descriptions;
        listItems[0].innerText = `Temperature: ${temperature}`;
        listItems[1].innerText = `Feelslike: ${feelslike}`;
        listItems[2].innerText = `wind Speed: ${wind_speed}`;
        listItems[3].innerText = `Pressure: ${pressure}`;
    }

    xhttp.open("POST", "/weather?place="+place);
    xhttp.send();
}

weatherForm.addEventListener("submit", submitHnadler)