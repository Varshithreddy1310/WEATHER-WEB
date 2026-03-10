import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './weather.css';
function Searchbox(){
    const API_KEY = "590c6dfad18975b07e0b2c16f780f3f7"; 
    let ini = {
        temp_max : 0,
        temp_min : 0,
        temp : 0,
        humidity : 0,
        pressure : 0,
        feels_like : 0
    }
    let [city,setcity] = useState("");
    let [weather,setweather] = useState(ini);
    function handlechange(event){
        setcity(event.target.value);
    }
    function handlesubmit(event){
        event.preventDefault();
        console.log(city);
        fetchWeatherData(city);
    }
    async function fetchWeatherData(city) {
        let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
        let jsonresponse  = await response.json();
        let result = {
            temp_max : jsonresponse.main.temp_max,
            temp_min : jsonresponse.main.temp_min,
            temp : jsonresponse.main.temp,
            humidity : jsonresponse.main.humidity,
            pressure : jsonresponse.main.pressure,
            feels_like : jsonresponse.main.feels_like
        }
        setweather(result);
    }
    function resetfun(){
        setcity("");
        setweather(ini);
    }
    return(
    <div className="search-box">
        <h1>Search For The Weather</h1>
        <form onSubmit={handlesubmit}>
            <TextField id="outlined-basic" label="city-name" variant="outlined" value={city} onChange={handlechange} required InputLabelProps={{
    style: { color: "white", fontSize: "18px" }  
  }}
 />

            <br></br>
            <br></br>
            <Button type="submit" variant="contained">SEARCH</Button>
            <hr></hr>
            <div className="data">
                <h2>Weather Data</h2>
                <p>Temperature: {weather.temp} °C</p>
                <p>Max Temperature: {weather.temp_max} °C</p>
                <p>Min Temperature: {weather.temp_min} °C</p>
                <p>Humidity: {weather.humidity} %</p>
                <p>Pressure: {weather.pressure} hPa</p>
                <p>Feels Like: {weather.feels_like} °C</p>
                <Button onClick={()=>resetfun()} variant="contained">RESET</Button>
            </div>
        </form>
    </div>
    );
}
export default Searchbox;