import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    lat: null,
    lng: null,
    breweries: [],
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const address = event.target.elements.address.value;

    try {
      const { lat, lng } = await getLatLngFromAddress(address);
      const breweries = await getBreweries(lat, lng);
      const nearestBreweries = findNearestBreweries(breweries, lat, lng);
      this.setState({ lat, lng, breweries: nearestBreweries });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { lat, lng, breweries } = this.state;
  }
}

export default App;
