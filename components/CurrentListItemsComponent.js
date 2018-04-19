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

import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import moment from 'moment';

class CurrentListItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.region !== this.state.region) {
      this.getDirections(
        `${this.state.region.latitude.toString()},${this.state.region.longitude.toString()}`,
        this.props.selectedMeetup.location_lat_lon
      );
    }
    console.log('COMPONENTDIDUPDATE', prevState, this.state);
    if (prevState.participants !== this.state.participants) {
      this.forceUpdate();
    }
  }

  render() {
    const showTheseMeetups = this.props.meetups.filter(
      a =>(!moment(`${a.time_meetup}`, 'MMMM Do YYYY, h:mm a').fromNow().includes('ago')&&
        a.status == 'ACCEPT' && a.active == 'YES') ||
        (!moment(`${a.time_meetup}`, 'MMMM Do YYYY, h:mm a').fromNow().includes('ago')&&a.creator == this.props.authenticatedUser.id && a.active == 'YES')
    );
    const resizeMode = 'stretch';
    var rightNow = moment().format('MMMM Do YYYY, h:mm a');

    var timeLeft = (time) => {
      return moment(`${meetup.time_meetup}`, 'MMMM Do YYYY, h:mm a').fromNow()
    };

    return (
      <ScrollView style={{ flex: 1 }}>
        <List
          dataArray={showTheseMeetups}
          renderRow={meetup =>
            <ListItem style={styles.listItem}>
              <Content>
                <View>
                  <TouchableOpacity onPress={() => this.props.onView(meetup)}>
                    <Card style={{ width: 320,overflow:'visible' }}>
                      <View style={styles.card1}>
                        <Text style={styles.labelFont}>
                          {meetup.name_of_meetup} @ {meetup.location_name}
                        </Text>

                        <Text style={styles.labelFont2}>
                          {moment(`${meetup.time_meetup}`, 'MMMM Do YYYY, h:mm a').fromNow()}
                        </Text>
                      </View>

                      <View style={styles.bottom3}>
                        <Text style={styles.bold}>
                          on {meetup.time_meetup}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                </View>
              </Content>
            </ListItem>}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textColor: {
    color: `#6dfff2`,
    fontSize: 12,
    textAlign: 'left'
  },
  bg: {
    backgroundColor: `blue`
  },
  listItem: {
    flex: 1,
    flexDirection: 'column',
    overflow:'visible'
  },
  bold: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 4,
    color: 'white',
    overflow:'visible'
  },
  box: {
    borderBottomWidth: 3,
    padding: 4,
    width: 115,
    height: 32
  },
  labelFont: {
    fontWeight: `bold`,
    fontSize: 15,
    color: '#17d3c3',
    overflow:'visible'
  },
  labelFont2: {
    fontSize: 15,
    color: 'white',
    overflow:'visible',
    fontWeight:'bold'

  },
  card1: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: 'black',
    flex: 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow:'visible'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },
  bottom2: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gray',
    flex: 1,
    flexDirection: 'row'
  },
  bottom3: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gray',
    flex: 1,
    flexDirection: 'row'
  },
  listItem: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default CurrentListItemsComponent;
