import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.initGeocoder = this.initGeocoder.bind(this);
    this.state = {showme:'amusement_park'};
  }

  // componentWillReceiveProps(nextProps) {
  //   alert(nextProps.theCity);
  // }

  initGeocoder(mapProps, map) {
    const { populatePlaces, theCity } = this.props;
    if (theCity[0] !== null && theCity[1] !== null) {
      const {google} = mapProps;
      const geocoder = new google.maps.Geocoder();
      const service = new google.maps.places.PlacesService(map);
      const infowindow = new google.maps.InfoWindow();

      function callback(results, status, pagination) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            service.getDetails({ placeId: results[i].place_id
            // eslint-disable-next-line no-loop-func
            }, function(details, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('place Details:', details);
                if (details.photos && details.reviews && details.reviews.length > 0 
                    && details.reviews[0].text !== ""){
                  createMarker(results[i]);
                  populatePlaces([details]);
                }
              }
            });
          }
        }
        if (pagination && pagination.hasNextPage) {
          pagination.nextPage();
        }
      }
      function createMarker(place) {
        const { lat, lng } = place.geometry.location;
        const latLng = new google.maps.LatLng(lat(), lng());
        const marker = new google.maps.Marker({
          position: latLng,
          visible: true
        });
        marker.setMap(map);
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      console.log('theCity:', theCity[0], theCity[1]);
      geocoder.geocode({'address': this.props.theCity[0]}, function(results, status) {
        if (status === 'OK') {
          const targetCity = results[0].geometry.location;
          map.setCenter(targetCity);
          service.nearbySearch({
            location: targetCity,
            radius: 40000,
            // type: ['store','amusement_park','aquarium','art_gallery',
            //        'bar','book_store','cafe','casino',
            //        'church','city_hall','library','movie_theater',
            //        'museum','night_club','park','restaurant','shopping_mall',
            //        'stadium','zoo']
            type: [theCity[1]],
          }, callback);
        }
        else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
  render() {
    return (
      <Map style={{height: '400px', width: '100%'}} 
           google={this.props.google} zoom={11}
           onReady={this.initGeocoder.bind(this)}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.props.theCity}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyDF1Pi0BntYuAH6L3VWBJcsx88_PQVsEPU',
    theCity: props.theCity
  }
))(MapContainer)