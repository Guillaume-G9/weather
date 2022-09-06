import React, {useState} from 'react';

const api ={
  key: "26c9d8f041ac998301e7274e92327ac2",
  base:"https://api.openweathermap.org/data/2.5"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const search = evt => {
    if(evt.key ==="Enter") {
      fetch(`${api.base}/weather?q=${query}&appid=${api.key}&units=metric&lang=fr`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather)
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
     <main>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Recherche..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1)}</div>
        </div>
      </div>
      ) : (
        ''
      )}
     </main>
    </div>
  );
}

export default App;
