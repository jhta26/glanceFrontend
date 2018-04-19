/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
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
  ListItem
} from 'native-base';
import { StyleSheet, DatePickerIOS, View,StatusBar } from 'react-native';
import { Router, Scene, Stack, Route } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import setupStore from './redux/setUpStore';
import CurrentComponentContainer from './redux/containers/CurrentComponentContainer';
import MainScreenComponentContainer from './redux/containers/MainScreenComponentContainer';
import HistoryComponentContainer from './redux/containers/HistoryComponentContainer';
import ProfileComponentContainer from './redux/containers/ProfileComponentContainer';
import CreateRequestSearchComponentContainer from './redux/containers/CreateRequestSearchComponentContainer';
import UpdateMeetupComponentContainer from './redux/containers/UpdateMeetupComponentContainer'
import CreateRequestComponentContainer from './redux/containers/CreateRequestComponentContainer';
import RequestsComponentContainer from './redux/containers/RequestsComponentContainer';
import RequestsComponent from './components/RequestsComponent';
import AllUsersComponent from './components/AllUsersComponent';
import CurrentListItemsComponent from './components/CurrentListItemsComponent';
import CreateRequestComponent from './components/CreateRequestComponent';
import CreateRequestSearchComponent from './components/CreateRequestSearchComponent';
import LogInComponentContainer from './redux/containers/LogInComponentContainer';
import SignUpComponentContainer from './redux/containers/SignUpComponentContainer';
const store = setupStore();

class TabIcon extends Component {
  render() {
    var color = this.props.color;
    console.disableYellowBox = true;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 18
        }}>
        <Icon
          style={{ color: '#17d3c3' }}
          name={this.props.iconName || 'circle'}
          size={18}
          active={true}
        />
        <Text style={{ color: '#17d3c3', fontSize: 12, fontFamily: 'Arial' }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene key="tabbar2" tabs={false} hideNavBar={true}>
              <Scene
                key="LOGIN"
                component={LogInComponentContainer}
                title="Login"
                hideNavBar
                initial={true}
              />

              <Scene
                key="SIGNUP"
                component={SignUpComponentContainer}
                title="SignUp"
                hideNavBar
              />
              <Scene
                key="CREATEREQ"
                component={CreateRequestComponentContainer}
                title="CreateReq"
                hideNavBar
              />
              <Scene
                key="MEETUP"
                component={MainScreenComponentContainer}
                title="Meetup"
                hideNavBar
              />
         
           
              <Scene
                key="CREATEREQSEARCH"
                component={CreateRequestSearchComponentContainer}
                title="CreateReqSearch"
                hideNavBar
              />
                   <Scene
                key="UPDATE"
                component={UpdateMeetupComponentContainer}
                title="Update"
                hideNavBar
              />
              <Scene
                key="HISTORY"
                component={HistoryComponentContainer}
                hideNavBar
              />
            </Scene>

            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: 'black' }}
              hideNavBar={true}>
              <Scene
                key="CURRENT"
                component={CurrentComponentContainer}
                icon={TabIcon}
                iconName="pulse"
                hideNavBar
                color='#17d3c3'
                tabBarLabel="Current"
                tabBarStyle={styles.tabBarStyle1}
              />

              <Scene
                key="REQUESTS"
                component={RequestsComponentContainer}
                icon={TabIcon}
                iconName="warning"
                hideNavBar
                color='#17d3c3'
                tabBarLabel="Requests"
                tabBarStyle={styles.tabBarStyle1}
              />

              <Scene
                key="PROFILE"
                component={ProfileComponentContainer}
                icon={TabIcon}
                iconName="person"
                hideNavBar
                color='#17d3c3'
                tabBarLabel="Profile"
                tabBarStyle={styles.tabBarStyle1}
              />
            </Scene>
          </Stack>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  master: { flexDirection: 'column' },
  div: { flexDirection: 'row' },
  group: { flex: 1, fontSize: 15 },
  groupName: { flex: 1, fontWeight: 'bold' },
  table: { flex: 1 },
  text: { marginLeft: 5 },
  row: { height: 30 },
  text1: { backgroundColor: '#f1f8ff', fontSize: 20, textAlign: 'center' },
  tabBarStyle1: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    backgroundColor: 'white',
    opacity: 0
  }
});

//

// import React,{Component} from 'react'
// import {AppRegistry,StyleSheet,View} from 'react-native'
// import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'


// export default class App extends Component {
//   render() {
//     return (
//   <MapView
//   provider={PROVIDER_GOOGLE}
//   style={styles.container}
//   initialRegion={{latitude:39.7392,
//     longitude:-104.9903,
//     latitudeDelta:0.0922,
//     longitudeDelta:0.0421
//   }}
//   />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   height:'100%',
//   width:'100%'
//   }

// });
