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

    return (
      <div className="words">
        <h1>Nearest Breweries</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="address" placeholder="Enter Address" />
          <button type="submit">Search</button>
        </form>
        {lat && lng && <Map lat={lat} lng={lng} breweries={breweries} />}
        {breweries.length > 0 && <Breweries breweries={breweries} />}
      </div>
    );
  }
}

export default App;
