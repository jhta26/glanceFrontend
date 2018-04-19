import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
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
  Segment
} from 'native-base';

import {
  StyleSheet,
  View,
  ListView,
  Dimensions,
  StatusBar
} from 'react-native';
var sortBy=require('lodash.sortby')

import CurrentListItemsComponent from './CurrentListItemsComponent';

export default function CurrentComponent({
  meetups,
  authenticatedUser,
  onCheck,
  onSearch,
  onView
}) {
  _handleState = event => {
    onCheck();
  };
  _handleSearch = event => {
    onSearch();
  };
  return (
    <Container>
      <Header
        hasTabs
        iosBarStyle="light-content"
        style={{ backgroundColor: 'white' }}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          iosStatusBarColor="white"
        />
        
  
        <Left/>
        <Body>
          <Title
            style={{ fontFamily: 'Helvetica', color: '#17d3c3', fontSize: 14 }}>
           Glance
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={() => Actions.CREATEREQ()}>
            <Icon style={{ color: 'black' }} name="add" />
          </Button>
        </Right>
      </Header>

      <Content padder style={styles.contentStyle}>
        <CurrentListItemsComponent
          meetups={sortBy(meetups,'time_meetup')}
          onView={onView}
          authenticatedUser={authenticatedUser}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentStyle: { flexDirection: 'column', backgroundColor: 'white' },

  row: { height: 3 },
  text1: { backgroundColor: '#f1f8ff', fontSize: 20, textAlign: 'center' },
  buttonLabelText: {
    backgroundColor: 'white',
    fontSize: 15,
    fontFamily: 'Chalkboard SE',
    color: 'black',
    textAlign: 'center',
    margin: 5
  },
  createButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 3
  },
  submitButton: { color: 'white', fontFamily: 'Arial' },
  buttonStyles: { flexDirection: 'row', backgroundColor: 'white' },
  sortButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  pageHeaderStyle: {
    color: 'white',
    textShadowColor: 'white',
    fontSize: 17,
    fontFamily: 'Arial'
  },
  createButtonView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  sortButtonStyle: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 3
  },
  mainHeader: { backgroundColor: 'green' }
});
