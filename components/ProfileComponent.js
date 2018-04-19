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
  ListItem,
  Badge
} from 'native-base';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

function ProfileComponent({
  authenticatedUser,
  meetups,
  onEdit,
  onDelete,
  onShowHistory
}) {
  _handleToHistory = event => {
    onShowHistory();
  };
  return (
    <Container>
      <Header hasTabs style={{ backgroundColor: '#f9fbfc' }}>
        <Left />
        <Body>
          <Title
            style={{ fontFamily: 'Helvetica', color: '#17d3c3', fontSize: 14 }}>
            Glance
          </Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: 'white' }}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.justBold}>
                  {authenticatedUser.name}
                </Text>
                <Text note>
                  {moment().format('MMM Do YYYY')}
                </Text>
              </Body>
            </Left>
            <Right />
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {authenticatedUser.bar_info}
              </Text>
              <Badge style={{ width: 100, height: 10 }} />
            </Body>
          </CardItem>
        </Card>
        <Button
          rounded
          onPress={this._handleToHistory}
          style={{
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderStyle: 'solid',
            borderWidth: 1,
            margin: 3,
            width: '100%'
          }}>
          <Text style={styles.buttonColor}>View History</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: `red`,
    fontSize: 12,
    textAlign: 'left'
  },
  buttonColor: {
    color: `white`,
    fontSize: 15,
    textAlign: 'center'
  },
  bg: {
    backgroundColor: `blue`
  },
  bold: {
    fontSize: 14
  },
  box: {
    borderBottomWidth: 3,
    padding: 4,
    width: 115,
    height: 32
  },
  justBold: {
    fontWeight: `bold`,
    fontSize: 20,
    color: '#17d3c3'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  }
});

export default ProfileComponent;
