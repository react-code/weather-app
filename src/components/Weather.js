import React, { Component } from 'react'

export class Weather extends Component {

    render() {
        return (
            <div className="weather-app">

                {this.props.city==='' && this.props.temperature===null ? (<h1 className="default-text">Please Enter the city name to view the weather details</h1>) : ''}

                {this.props.city ? (
                    <h3 className="location">{this.props.city}, {this.props.country}</h3>
                ) : null}

                <span className="weather-icon"><i className={`wi ${this.props.icon} display-1`} /></span>

                {this.props.temperature ? (
                    <div className="temperature">
                        <span>{this.props.temperature}°C</span>
                    </div>
                ) : null}

                <h4 className="weather">{this.props.description}</h4>
            </div>
        )
    }
}

export default Weather;
