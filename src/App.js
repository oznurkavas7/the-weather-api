import React, { useState } from 'react';
import './App.css';
import WeatherResult from './WeatherResult';
import {
  TextField, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [input, setInput] = useState("");
  const [resultError, setResultError] = useState("");
  const [day, setDay] = React.useState('3');

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  function cityText(e) {
    setInput(e.target.value);
  }

  async function getData(value) {
    if (value !== "") {
      const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_KEY}&q=${value}&days=${day}&aqi=no&alerts=no&lang=tr
      `)
      const result = await data.json();
      if (result.error) {
        setResultError(result.error.message);
        setWeatherData([]);
      }
      else {
        setWeatherData(result.forecast.forecastday);
      }
    }
  }

  return (
    <div>
      <div className="search">
        <TextField
          label="City"
          style={{ display: 'flex', width: "calc(20%)" }}
          placeholder="Search a city..."
          value={input}
          onInput={(e) => setInput(e.target.value)}
          onChange={(e) => cityText(e)}
          id="outlined-basic"
          variant="outlined"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={day}
            label="Day"
            onChange={handleChange}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => getData(input)}>Search</Button>
      </div>
      {weatherData.length > 0 ?
        <WeatherResult weatherData={weatherData}></WeatherResult> : <div className="centered">{resultError}</div>
      }
    </div>
  );
}

export default App;
