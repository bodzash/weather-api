const API_KEY = "eff735341103360529abbe301d4dd76c"

const logo = document.querySelector(".logo")
const temp = document.querySelector(".temp")
const desc = document.querySelector(".desc")
const city = document.querySelector(".city")

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position, renderError)
} else {
    temp.style.color = "red"
    temp.innerText = "YOUR BROWSER DOESN'T SUPPORT GEOLOCATION"
}

function position(pos) {
    let lat = pos.coords.latitude
    let lon = pos.coords.longitude
    getWeather(lat ,lon)
}

function renderError() {
    temp.style.color = "orange"
    temp.innerText = "GEOLOCATION IS DISABLED"
}

function getWeather(lat, lon) {
    let API = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${"hu"}`
    
    fetch(API)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            parseWeather(data)
        })
}

/*  */

function kelvinToCelsius(numb) {
    return  Math.floor(numb - 273.15)
}

function parseWeather(data) {
    temp.innerText = kelvinToCelsius(data.main.temp) + "°C"
    desc.innerText = data.weather[0].description
    city.innerText = data.name +", "+ data.sys.country
    getIcon(data, data.weather[0].id)
}

function getIcon(data,numb) {
    //get current time & local sunset in unix
    let currentTime = data.dt
    let sunset = data.sys.sunset
    //clear
    if (numb == 800) {
        if (currentTime >= sunset) {
            logo.style.background = "url('./images/01n.svg')"
        } else {
            logo.style.background = "url('./images/01d.svg')"
        }
    //storm
    } else if (numb >= 200 && numb <= 232 ) {
        logo.style.background = "url('./images/11x.svg')"
    }
    //rain
    else if (numb >= 300 && numb <= 531 ) {
        logo.style.background = "url('./images/10x.svg')"
    }
    //snow
    else if (numb >= 600 && numb <= 622 ) {
        logo.style.background = "url('./images/13x.svg')"
    }
    //atmosphere
    else if (numb >= 701 && numb <= 781 ) {
        logo.style.background = "url('./images/50x.svg')"
    }
    //cloudy
    else if (numb >= 801 && numb <= 804 ) {
        if (currentTime >= sunset) {
            logo.style.background = "url('./images/02n.svg')"
        } else {
            logo.style.background = "url('./images/02d.svg')"
        }
    //unknown
    } else {
        logo.style.background = "url('./images/unknown.svg')"
    }
}