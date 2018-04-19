/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Image,
  DatePickerIOS
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Button,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  List,
  ListItem,
  Badge
} from 'native-base';
import Polyline from '@mapbox/polyline';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCU_nFkSTYnkmbTY0rRUNYMnPGCu7f29oA');
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class UpdateMeetupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      date: 0,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      coords: [],
      locationCoords: null,
      locationRegion: null,
      date: '',
      name_of_meetup: '',
      distance: '',
      duration: '',
      destination_address: ''
    };
  }
  _handleUse = event => {
    console.log('HANDLEUSE',this.props.selectedMeetup.id,this.state)
    this.props.onUse(this.props.selectedMeetup.id,{
      creator_name:this.props.selectedMeetup.creator_name,
      destination_address:this.props.selectedMeetup.destination_address,
      location_lat_lon:this.state.locationCoords,
      location_name: this.state.location||this.props.selectedMeetup.location_name,
      time_meetup: this.state.date||this.props.selectedMeetup.time_meetup,
      name_of_meetup: this.state.name_of_meetup||this.props.selectedMeetup.name_of_meetup,
      active:this.props.selectedMeetup.active,
      private:this.props.selectedMeetup.private
      
    });
  };



    

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&arrival_time=${this
          .props.selTime}&alternatives=true`
      );
      let respJson = await resp.json();

      let distanceString = respJson.routes[0].legs[0].distance.text;
      let destinationAddress = respJson.routes[0].legs[0].end_address;
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
  
      this.setState({
        coords: coords,
        destination_address: destinationAddress,
        distance: distanceString
      });
      console.log('>>>>>>>>>>>>>>', this.state);
      return coords, durationString, distanceString;
    } catch (error) {
      throw(error);
      return error;
    }
  }
  componentDidMount() {
    console.log('LOOK HERE>>>>>>>>>>>>',this.props.selectedMeetup)
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
    this.refs.map.fitToElements(true);
    console.log(this.state);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    var colorOfButton = this.state.location ? '#17d3c3' : 'gray';
    var colorOfButton2 =
      this.state.locationCoords 
        ? '#17d3c3'
        : 'gray';
    var disabled = this.state.location ? null : true;
    var disabled2 =
      this.state.locationCoords 
        ? null
        : true;
    return (
      <Container>
      <Header hasTabs style={{ backgroundColor: '#f9fbfc' }}>
        <Left>
        <Button transparent onPress={()=>Actions.MEETUP()}>
        <Icon name="arrow-back" />
        </Button>
          </Left>
          <Body>
            <Title
              style={{
                fontFamily: 'Helvetica',
                color: '#17d3c3',
                fontSize: 14
              }}>
              {this.props.selectedMeetup.name_of_meetup}
            </Title>
          </Body>
          <Right>
          
          </Right>
        </Header>
      
        <MapView
          ref="map"
          provider={PROVIDER_GOOGLE}
          zoom={7}
          fitToElements={true}
          style={styles.container}
          showsUserLocation={true}
          followsUserLocation={true}
          fitToSuppliedMarkers={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          center={this.state.region}
          region={this.state.region}>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={3}
            strokeColor="blue"
          />
          <MapView.Marker coordinate={this.state.region} />
          <MapView.Marker
            pinColor="blue"
            coordinate={this.state.locationRegion}
          />
        </MapView>

        <Container>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: 3,
              margin: 1,
              borderTopColor: '#17d3c3',
              borderTopStyle: 'dotted',
              borderTopWidth: 2,
              padding: 10
            }}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: '#17d3c3',
                fontSize: 15,
                fontWeight: 'bold',
                marginTop: 0
              }}>
              Change Location
            </Text>

            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder={this.props.selectedMeetup.location_name}
                name="locations"
                onChangeText={location => this.setState({ location })}
                value={this.state.location}
              />
              <Icon name="ios-people" />
            </Item>
            <Item>
              <Button
                style={{
                  backgroundColor: `${colorOfButton}`,
                  margin: 1,
                  height: 24,
                  width: '100%',
                  flex: 1,
                  justifyContent: 'center',
                  padding: 4
                }}
                transparent
                disabled={disabled}
                onPress={() =>
                  Geocoder.getFromLocation(this.state.location)
                    .then(
                      json => {
                        var location = json.results[0].geometry.location;
                        this.setState({
                          locationCoords:
                            location.lat.toString() +
                            ', ' +
                            location.lng.toString(),
                          locationRegion: {
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: LATITUDE_DELTA,
                            LONGITUDE_DELTA: LONGITUDE_DELTA
                          }
                        });
                      },
                      error => {
                        throw(error);
                      }
                    )
                    .then(() => {
                      this.getDirections(
                        `${this.state.region.latitude.toString()},${this.state.region.longitude.toString()}`,
                        this.state.locationCoords
                      );
                    })}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Search
                </Text>
              </Button>
            </Item>
            {this.state.distance
              ? <Text style={{ fontSize: 10, flex: 1 }}>
                  {this.state.distance} away from your current location
                </Text>
              : <Text> </Text>}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              margin: 1,
              width: '100%',
              flex: 0.4,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: 10
            }}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: 'blue',
                fontSize: 15,
                fontWeight: 'bold'
              }}>
              Change Name
            </Text>

            <Item>
              <Input
                placeholder={this.props.selectedMeetup.name_of_meetup}
                name="Name"
                onChangeText={name_of_meetup =>
                  this.setState({ name_of_meetup })}
                value={this.state.name_of_meetup}
                style={{ textAlign: 'center' }}
              />
            </Item>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              margin: 0.5,
              width: '100%',
              flex: 0.6,
              flexDirection: 'column',
              alignItems: 'center',
              padding: 10
            }}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: 'red',
                fontSize: 15,
                fontWeight: 'bold'
              }}>
              Change Time
            </Text>

            <DatePicker
              style={{ width: 300, margin: 10 }}
              date={this.state.date}
              mode="datetime"
              placeholder={this.props.selectedMeetup.time_meetup}
              format="MMMM Do YYYY, h:mm a"
              minDate={moment().format()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: '#e5e5e5',
              width: '100%',
              flex: 0.3,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: 20,
              padding: 10
            }}>
            <Item>
              <Button
                onPress={this._handleUse}
                disabled={disabled2}
                style={{
                  backgroundColor: `${colorOfButton2}`,
                  margin: 1,
                  height: 30,
                  width: '100%',
                  flex: 1,
                  justifyContent: 'center'
                }}>
                <Text style={{ color: 'white' }}>Submit</Text>
              </Button>
            </Item>
          </View>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%'
  },
  container2: {
    height: '60%',
    width: '100%'
  }
});
