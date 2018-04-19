import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Segment,
  Form
} from 'native-base';

import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  DatePickerIOS
} from 'react-native';
var uniq = require('lodash.uniq');
var filter = require('lodash.filter');

export default class CreateRequestSearchComponent extends Component {
  state = {
    users: [this.props.authenticatedUser],
    filtered: ''
  };
  _handleState = event => {
    this.props.onCheck();
  };
  _handleBack = event => {
    this.props.onGoBack();
  };
  _handleCreate = event => {
    console.log('HANDLECREATE',this.state.users);
    this.props.onCreateParts({
      users: this.state.users
    });
  };
  //ACTIONS CURRENT HAS TO BE CHANGED TO HANDLE METHOD SO YOU CAN CREATE A MEETUP
  render() {
    const slicedUsers = this.props.users.slice();
    var usersToShow = filter(slicedUsers, ['username', this.state.filtered]);
    var usersToAdd = [];
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Container>
          <Header searchBar rounded>
            <Button transparent onPress={() => Actions.CURRENT()}>
              <Icon name="arrow-back" />
            </Button>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search Users"
                name="users"
                onChangeText={filtered => this.setState({ filtered })}
                value={this.state.filtered}
              />
              <Icon name="ios-people" />
            </Item>

            <Button transparent onPress={this._handleCreate}>
              <Text>Create</Text>
            </Button>
          </Header>
          <Content>
            <View
              style={{
                backgroundColor: 'white',
                margin: 2,
                width: '100%',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  color: '#17d3c3',
                  fontSize: 15,
                  fontWeight: 'bold'
                }}>
                Search Results
              </Text>
              <List
                style={{ width: '100%' }}
                dataArray={usersToShow}
                renderRow={user =>
                  <ListItem
                    style={{ color: '#17d3c3', fontSize: 18, width: '100%' }}>
                    <Left>
                      <Text>
                        {user.username}
                      </Text>
                    </Left>
                    <Right>
                      <Button
                        transparent
                        onPress={users =>
                          this.setState(prevState => ({
                            users: uniq([...prevState.users, user]),
                            filtered: ''
                          }))}>
                        <Icon style={{ color: 'black' }} name="add" />
                      </Button>
                    </Right>
                  </ListItem>}
              />
            </View>
          </Content>
        </Container>
        <Container>
          <View
            style={{
              backgroundColor: 'white',
              margin: 2,
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: '#17d3c3',
                fontSize: 15,
                fontWeight: 'bold'
              }}>
              Who's Going?
            </Text>

            <List
              dataArray={this.state.users}
              renderRow={user =>
                <ListItem>
                  <Text
                    style={{ color: '#17d3c3', fontSize: 18, width: '100%' }}>
                    {user.username}
                  </Text>
                </ListItem>}
            />
          </View>
        </Container>
      </Container>
    );
  }
}
