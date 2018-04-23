import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import UpdateParticipants from '../api/UpdateParticipants';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Image,
  DatePickerIOS,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import timer from 'moment-timer';
import StreetView from 'react-native-streetview';

var uniq = require('lodash.uniq');
var filter = require('lodash.filter');
var sortBy=require('lodash.sortby')
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
  Badge,
  Spinner
} from 'native-base';
import Polyline from '@mapbox/polyline';
import Geocoder from 'react-native-geocoding';
import SocketIOClient from 'socket.io-client';
import { Actions } from 'react-native-router-flux';

Geocoder.setApiKey('AIzaSyCU_nFkSTYnkmbTY0rRUNYMnPGCu7f29oA');
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MainScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:8000');
    this._storeParts = this._storeParts.bind(this);
    this.onJoined = this.onJoined.bind(this);
    this.onPartsReceived = this.onPartsReceived.bind(this);
    this.socket.on('participants', this.onPartsReceived);
    this.socket.on('userJoined', this.onJoined);
    this.state = {
      timer: '',
      loading: true,
      location: '',
      date: 0,
      region: {
              latitude: LATITUDE|37.785834,
              longitude: LONGITUDE|-122.406417,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
          },
          coords: [],
          locationCoords: {
              latitude: LATITUDE|37.785834,
              longitude: LONGITUDE|-122.406417,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
          },
          locationRegion: {
              latitude: LATITUDE|37.785834,
              longitude: LONGITUDE|-122.406417,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA},
      partsLoc: [],
      date: '',
      name_of_meetup: '',
      distance: '',
      duration: '',
      participants: [],
      showTraffic: false,
      showBuilding: false,
      alreadyThere: []
    };
  }
  componentDidMount() {
    this.setState({loading:false})
    this.socket.emit('userJoined', this.props.selectedMeetup.meetup_id);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.socket.emit(
          'location',
          position.coords.latitude.toString() +
            ', ' +
            position.coords.longitude.toString(),
            this.props.authenticatedUser.id
        );
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          center: {
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
      this.socket.emit(
        'location',
        position.coords.latitude.toString() +
          ', ' +
          position.coords.longitude.toString(),
        this.props.authenticatedUser.id
      );
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  
  }
  onJoined(participants) {
    var parts2 = participants.filter(
      a => a.name !== this.props.authenticatedUser.name && a.status == 'ACCEPT'
    );
    parts2.map(
      part =>
        (part.directionInfo = this.getPartsDirections(
          `${part.current_lat_lon.split(', ')[0]},${part.current_lat_lon.split(
            ', '
          )[1]}`,
          this.props.selectedMeetup.location_lat_lon,
          `${part.name}`,
          part.userId,
          part.current_lat_lon,
          part.id,
          part.already_there
        ))
    );
    this._storeParts(parts2);
  }
  _storeParts(participants) {
    this.setState(() => {

      return {
        participants: participants
      };
    });
  }
  _goBack = event => {
    this.setState(() => {
      return {
        location: '',
        date: 0,
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        coords: [],
         locationCoords: {},
         locationRegion: {
             latitude: LATITUDE,
             longitude: LONGITUDE,
             latitudeDelta: LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA
         },
         steps: '',
         partsLoc: [],
        date: '',
        name_of_meetup: '',
        distance: '',
        duration: '',
        participants: [],
        showTraffic: false,
        showBuilding: false,
        lat_lon: []
      };
    });
    this.props.goBack();
  };
  _handleUse = event => {
    this.props.onUse({
      location_name: this.state.location,
      location_coords: this.state.locationCoords,
      date: this.state.date,
      name_of_meetup: this.state.name_of_meetup
    });
  };
  onPartsReceived(parts) {
    var parts2 = parts.filter(
      a => a.name !== this.props.authenticatedUser.name
    );
    parts2.map(
      part =>
        (part.directionInfo = this.getPartsDirections(
          `${part.current_lat_lon.split(', ')[0]},${part.current_lat_lon.split(
            ', '
          )[1]}`,
          this.props.selectedMeetup.location_lat_lon,
          `${part.name}`,
          part.userId,
          part.current_lat_lon,
          part.id,
          part.already_there
        ))
    );
    
    this._storeParts(parts2);
  }

  onStoreLocation(location) {
    this.props.storeLocation(location);
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&arrival_time=${this
          .props.selTime}&alternatives=true`
      );
      let respJson = await resp.json();

      let lat = respJson.routes[0].legs[0].end_location.lat|37.785834;
      let lon = respJson.routes[0].legs[0].end_location.lng|-122.406417;

      let distanceString = respJson.routes[0].legs[0].distance.text;
      let durationString = respJson.routes[0].legs[0].duration.text;
      let steps = respJson.routes[0].legs[0].steps[0].html_instructions.replace(
        /[<b>\/]/g,
        ''
      );
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({
        coords: coords,
        duration: durationString,
        distance: distanceString,
        steps: steps,
        lat: lat,
        lon: lon
      });
      console.log('ASYNC GET DIRECTIONS >>>>>>>>>', this.state.lat_lon[0]);
      return coords, durationString, distanceString;
    } catch (error) {
      throw error;
      return error;
    }
  }
  async getPartsDirections(
    startLoc,
    destinationLoc,
    name,
    userId,
    current_lat_lon,
    partId,
    already_there
  ) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&arrival_time=${this
          .props.selTime}&alternatives=true`
      );
      let respJson = await resp.json();
      let partName = name;

      let distanceString = respJson.routes[0].legs[0].distance.text;
      let durationString = respJson.routes[0].legs[0].duration.text;
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState(previousState => {
        return {
          partsLoc: filter(
            [
              previousState.partsLoc[0],
              {
                userId: userId,
                partId: partId,
                current_lat_lon: current_lat_lon,
                name: partName,
                coords: coords,
                duration: durationString,
                distance: distanceString,
                alreadyThere: already_there
              }
            ],
            'name'
          )
        };
      });

      return { coords, durationString, distanceString };
    } catch (error) {
      throw error;
      return error;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.region !== this.state.region) {
      this.getDirections(
        `${this.state.region.latitude.toString()},${this.state.region.longitude.toString()}`,
        this.props.selectedMeetup.location_lat_lon
      );
    }
    if (prevState.participants !== this.state.participants) {
      var filteredParts = this.state.participants.filter(
        a =>
          a.meetup_id == this.props.selectedMeetup.id &&
          a.name !== this.props.authenticatedUser.name
      );
      filteredParts.map(
        part =>
          part.time_arrived !== ''
            ? (part.directionInfo = this.getPartsDirections(
                `${part.current_lat_lon.split(
                  ', '
                )[0]},${part.current_lat_lon.split(', ')[1]}`,
                this.props.selectedMeetup.location_lat_lon,
                part.name,
                part.userId,
                part.current_lat_lon,
                part.id,
                part.already_there
              ))
            : null
      );
    }

    this.state.partsLoc.map(
      a =>
        a.duration == '1 min' ||
        (a.duration == '0 min' && a.alreadyThere !== 'YES')
          ? this.props.onUpdateStatus(a.partId, {
              meetup_id: this.props.selectedMeetup.id,
              status: 'ACCEPT',
              time_remaining: '',
              time_arrived: moment().format('MMMM Do YYYY, h:mm:ss a'),
              already_there: 'YES'
            })
          : a
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    var theseParticipants = this.state.participants
      .slice()
      .filter(
        a =>
          a.name !== this.props.authenticatedUser.name && a.status == 'ACCEPT'
      );

    var slicedLocation = this.props.location.toString();
    var latToUse = parseFloat(slicedLocation.split(',')[0]);
    var longToUse = parseFloat(slicedLocation.split(',')[1]);
    var locationDictionary = {
      latitude: latToUse,
      longitude: longToUse,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    var showSteps = this.state.steps;
    var showSteps = showSteps;
    // var timer = setInterval(
    //   () =>
    //     this.setState({
    //       timer: moment(
    //         `${this.props.selectedMeetup.time_meetup}`,
    //         'MMMM Do YYYY, h:mm:ss a'
    //       ).fromNow()
    //     }),
    //   1000
    // );
    // var timer=()=>{
    //     setInterval(function(){ return `${meetup.time_meetup}`, 'MMMM Do YYYY, h:mm:ss a').fromNow()}, 3000)
    // }

    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: '#f9fbfc' }}>
        <Left>
        <Button transparent onPress={()=>Actions.CURRENT()}>
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
{this.state.loading?<Spinner color='green' />:
<MapView
          ref="map"
          provider={PROVIDER_GOOGLE}
          zoom={10}
          fitToElements={true}
          style={styles.container}
          showsUserLocation={true}
          followsUserLocation={true}
          fitToSuppliedMarkers={true}
          showsCompass={true}
          showsBuildings={true}
          center={this.state.center}
          region={this.state.center}
          onRegionChange={region => this.onStoreLocation({ region })}
          onRegionChangeComplete={region => this.onStoreLocation({ region })}>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="blue"
          />

          <MapView.Marker pinColor="blue" coordinate={this.state.region} />
          <MapView.Marker
            pinColor="red"
            coordinate={{
              latitude: parseFloat(
                this.props.selectedMeetup.location_lat_lon.split(', ')[0]
              ),
              longitude: parseFloat(
                this.props.selectedMeetup.location_lat_lon.split(', ')[1]
              ),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
          />
          <MapView.Marker
            pinColor="blue"
            coordinate={this.state.locationRegion}
          />
          {theseParticipants.map(part =>
            <MapView.Marker
              label={part.username}
              pinColor="#17d3c3"
              coordinate={{
                latitude: parseFloat(part.current_lat_lon.split(', ')[0]),
                longitude: parseFloat(part.current_lat_lon.split(', ')[1]),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
            />
          )}
          {this.state.partsLoc.map(part =>
            <MapView.Polyline
              coordinates={part.coords}
              strokeWidth={2}
              strokeColor="#17d3c3"
            />
          )}
        </MapView>
      }
        
        
        <View style={styles.container2}>
        {this.props.selectedMeetup.creator==this.props.authenticatedUser.id?
            <View style={{flexDirection:'row'}}>
            <Button
              transparent
              onPress={() =>
                this.props.onDelete(this.props.selectedMeetup.meetup_id)}>
              
              <Text style={{fontSize:12,fontWeight:'bold',fontFamily: 'Helvetica',
                color: '#17d3c3'}}>Delete</Text>
            </Button>
            <Button
              transparent
              onPress={() => Actions.UPDATE()}>
              
              <Text style={{fontSize:12,fontWeight:'bold',fontFamily: 'Helvetica',
                color: '#17d3c3'}}>Update</Text>
            </Button>
            </View>:null}
          <View
            style={{
              backgroundColor: '#f9fafc',
              width: '100%',
              flex: 0.7,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: 3,

              borderTopColor: '#17d3c3',
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
              Where is Everyone?
            </Text>
            <View
              style={{
                backgroundColor: '#f9fafc',
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 3,

                padding: 10
              }}>
              {this.state.partsLoc.length > 1
                ? this.state.partsLoc.map(part =>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#17d3c3',
                        backgroundColor: 'white',
                        padding: 6
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            center: {
                              latitude: parseFloat(
                                part.current_lat_lon.split(', ')[0]
                              ),
                              longitude: parseFloat(
                                part.current_lat_lon.split(', ')[1]
                              ),
                              latitudeDelta: LATITUDE_DELTA,
                              longitudeDelta: LONGITUDE_DELTA
                            }
                          })}>
                        <Text
                          style={{
                            color: '#17d3c3',
                            fontSize: 14,
                            fontWeight: 'bold'
                          }}>
                          {part.name}
                        </Text>
                        <Text
                          style={{
                            color: '#17d3c3',
                            fontSize: 12,
                            fontWeight: 'bold'
                          }}>
                          {part.duration == '1 min' || part.duration == '0 min'
                            ? 'Arrived'
                            : part.duration}
                        </Text>
                        <Text
                          style={{
                            color: '#17d3c3',
                            fontSize: 12,
                            fontWeight: 'bold'
                          }}>
                          {part.duration == '1 min' || part.duration == '0 min'
                            ? null
                            : part.distance}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                : <Text
                    style={{
                      color: '#17d3c3',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}>
                    Waiting On Responses
                  </Text>}
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#f9fafc',
              borderTopColor: 'blue',
              borderTopWidth: 2,
              width: '100%',
              flex: 0.6,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: 6
            }}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: 'blue',
                fontSize: 15,
                fontWeight: 'bold'
              }}>
              How far are you?
            </Text>
            <View
              style={{
                backgroundColor: '#f9fafc',
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 3,
                padding: 10
              }}>
              <View
                style={{
                  
                  backgroundColor: 'white',
                  padding: 6,
                  margin:1,
                  width:'50%',
                  flexDirection: 'row'
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({ center: this.state.region })}>
                  <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                    {this.state.duration}
                  </Text>
                  <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                    {this.state.distance}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  
                  backgroundColor: 'white',
                  padding: 6,
                  margin:1,
                  width:'50%',
                  flexDirection: 'row'
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({ center: this.state.region })}>
                  <Text
                    style={{ color: 'blue', fontWeight: 'bold', fontSize: 11 }}>
                    {showSteps}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#f9fafc',
              borderTopColor: 'red',
              borderTopWidth: 2,
              width: '100%',
              flex: 0.3,
              flexDirection: 'column',
              alignItems: 'center',
              padding: 10
            }}>
            <View
              style={{
                backgroundColor: '#f9fafc',
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 3,

                padding: 10
              }}>
              <Text style={{ fontSize: 12, color: 'red' }}>
                {this.props.selectedMeetup.name_of_meetup}
              </Text>
              <Text style={{ fontSize: 12, color: 'red' }}>
                {this.props.selectedMeetup.location_name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#f9fafc',
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 3,
                margin: 1,
                padding: 10
              }}>
              <Text style={{ fontSize: 12,color:'red',fontWeight:'bold' }}>
                {moment(
             `${this.props.selectedMeetup.time_meetup}`,
             'MMMM Do YYYY, h:mm:ss a'
           ).fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    height: '45%',
    width: '100%'
  },
  container2: {
    height: '45%',
    width: '100%'
  }
});