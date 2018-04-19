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

function RequestsListItemsComponent({
  meetups,
  userId,
  onEdit,
  onDelete,
  onUpdateStatus
}) {
  const showTheseMeetups = meetups.filter(
    a => a.status == '' && a.creator !== userId
  );
  const resizeMode = 'stretch';

  return (
    <Content>
      <List
        dataArray={showTheseMeetups}
        renderRow={meetup =>
          <ListItem style={styles.listItem}>
            <Content>
              <View>
                <TouchableOpacity>
                  <Card>
                    <Body>
                      <View style={styles.bottom}>
                        <Text style={styles.bold}>
                          {meetup.creator_name} invited you to
                        </Text>
                      </View>
                      <Text style={styles.justBold}>
                        {meetup.name_of_meetup}
                      </Text>
                    </Body>
                    <View style={styles.bottom2}>
                      <Text style={styles.bold}>
                        @{meetup.location_name} on
                      </Text>
                      <Text> </Text>
                      <Text style={styles.time}>
                        {meetup.time_meetup}
                      </Text>
                    </View>

                    <View style={styles.bottomButton}>
                      <Button
                        block
                        transparent
                        rounded={false}
                        style={styles.button}
                        onPress={() =>
                          onUpdateStatus(meetup.id, {
                            user_id: userId,
                            meetup_id: meetup.id,
                            status: 'ACCEPT',
                            time_remaining: '',
                            time_arrived: '',
                            already_there: ''
                          })}>
                        <Text>Accept</Text>
                      </Button>
                      <Button
                        block
                        transparent
                        rounded={false}
                        danger
                        style={styles.button}
                        onPress={() =>
                          onUpdateStatus(meetup.id, {
                            user_id: userId,
                            meetup_id: meetup.id,
                            status: 'REJECT',
                            time_remaining: '',
                            time_arrived: '',
                            already_there: ''
                          })}>
                        <Text>Reject</Text>
                      </Button>
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
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  box: {
    borderBottomWidth: 3,
    padding: 4,
    width: 115,
    height: 32
  },
  justBold: {
    fontWeight: `bold`,
    fontSize: 15,
    color: '#17d3c3'
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  bottomButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#f7f7f7',
    borderTopWidth: 1
  },
  bottom2: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RequestsListItemsComponent;
