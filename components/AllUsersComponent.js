import React, { Component } from 'react';
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

import { StyleSheet, View } from 'react-native';

import AllUsersListItemsComponent from './AllUsersListItemsComponent';

export default function AllUsersComponent(
  {
    // classes,
    // onEdit,
    // onSubmit,
    // onDelete,
    // onSort,
    // onSortLast,
    // onClickCreateRubric,
    // onClickCreateClass,
    // onGoBack
  }
) {
  // _handleSort = event => {
  //   onSort();
  // };
  // _handleSub = event => {
  //   onSubmit(classes);
  // };
  // _handleSortLast = event => {
  //   onSortLast();
  // };
  // _handleClickCreateRubric = event => {
  //   onClickCreateRubric();
  // };
  // _handleClickCreateClass = event => {
  //   onClickCreateClass();
  // };
  // _handleBack = event => {
  //   onGoBack();
  // };

  return (
    <Container>
      <Header hasTabs style={{ backgroundColor: '#f9fbfc' }}>
        <Left />
        <Body>
          <Title
            style={{ fontFamily: 'Helvetica', color: '#17d3c3', fontSize: 20 }}>
            All Users
          </Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon style={{ color: 'black' }} name="add" />
          </Button>
        </Right>
      </Header>

      <Content style={styles.contentStyle}>
        <List>
          <AllUsersListItemsComponent
            meetups={{ name: 'one' }}
            // onEdit={onEdit}
            // onDelete={onDelete}
          />
        </List>
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
