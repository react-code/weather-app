import React from 'react';
import './App.css';
import unsplash from './api/unsplash';
import "weather-icons/css/weather-icons.css";
import Searchbar from "./components/Searchbar";
import Weather from "./components/Weather";
import classNames from 'classnames'

class App extends React.Component {

  state = {
    city: '',
    country: '',
    temperature: null,
    weather: null,
    icon: null
  }

  weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  }

  calCelsius(temp){
    return Math.floor(temp - 273.15);
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  /*-------------- API CALL withour async & await ------------------*/
  /* onSearchSubmit(term){
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: term, appid: '323b66833c45fac7aff596bfe48cb04b' }
    }).then((response) => {
      console.log(response);
    });
  }*/

  /*-------------- api call using async & await ------------------*/
  /*onSearchSubmit = async (term) => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: term, appid: '323b66833c45fac7aff596bfe48cb04b' }
    });

    this.setState({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: this.calCelsius(response.data.main.temp),
      weather: response.data.weather[0].main
    });

    this.getWeatherIcon(this.weatherIcon, response.data.weather[0].id)
    console.log(response);
  }*/

  /*-------------- api call using async & await (after making seperate file for axios) ------------------*/

  onSearchSubmit = async (term) => {
    const response = await unsplash.get('', {
        params: { q: term, appid: '323b66833c45fac7aff596bfe48cb04b' }
    });

    this.setState({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: this.calCelsius(response.data.main.temp),
      weather: response.data.weather[0].main
    });

    this.getWeatherIcon(this.weatherIcon, response.data.weather[0].id)
    // console.log(response);
  }
  

  render() {
    let weatherClass = classNames({
      'app': true,
      'app-cloudy': this.state.weather === 'Clouds',
      'app-clear': this.state.weather === 'Clear',
      'app-rainy': this.state.weather === 'Rain',
      'app-thunderstorm': this.state.weather === 'Thunderstorm',
      'app-haze': this.state.weather === 'Haze',
      'app-sunny': this.state.weather === 'Sunny',
    });

    return (
      // <div className={typeof this.state.weather != undefined ? (this.state.temperature > 20 ? 'app-warm' : 'app-thunderstorm') : 'app'}>
      <div className={weatherClass}>
        <div className="container">
          <Searchbar onSubmit={this.onSearchSubmit} />
          <Weather 
            city={this.state.city}
            country={this.state.country}
            temperature={this.state.temperature}
            description={this.state.weather}
            icon={this.state.icon}
          />
        </div>
      </div>
    );
  }
}

export default App;
