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
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

function HistoryListItemsComponent({ meetups, onEdit, onDelete }) {
  const showTheseMeetups = meetups.filter(a => a.active == 'NO');
  const resizeMode = 'stretch';

  return (
    <Content>
      <List
        dataArray={showTheseMeetups}
        renderRow={meetup =>
          <ListItem style={styles.listItem}>
            <Content>
              <View onPress={() => Actions.details([meetup, thisProps])}>
                <TouchableOpacity
                  onPress={() => Actions.details([meetup, thisProps])}>
                  <Card>
                    <Body>
                      <Text style={styles.justBold}>
                        {meetup.name_of_meetup}
                      </Text>
                    </Body>
                    <View style={styles.bottom}>
                      <Text style={styles.bold}>
                        @{meetup.location_meetup}
                      </Text>
                      <Text style={styles.bold}>
                        {meetup.time_meetup}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              </View>
            </Content>
          </ListItem>}
      />
    </Content>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: `red`,
    fontSize: 12,
    textAlign: 'left'
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
    color: 'red'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  }
});

export default HistoryListItemsComponent;
