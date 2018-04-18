import React, { Component } from 'react';
import { Title, Button, Text, Item, Input, Form } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

export default class LogInComponent extends Component {
  state = {
    username: '',
    password: ''
  };
  _handleSignIn = event => {
    this.props.signIn({
      username: this.state.username,
      password: this.state.password
    });
  };

  _handleSignUp = event => {
    this.props.signUp();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerFont}>Glance</Text>
        <Form style={styles.inputFormat}>
          <View style={styles.div}>
            <Item rounded style={styles.inputBox}>
              <Input
                style={styles.inputText}
                placeholder="UserName"
                autoCapitilize="none"
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
            </Item>
          </View>

          <View style={styles.div}>
            <Item rounded style={styles.inputBox}>
              <Input
                style={styles.inputText}
                name="names"
                autoCapitilize="none"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                value={this.state.password.toLowerCase()}
              />
            </Item>
          </View>
          <Button
            rounded
            onPress={this._handleSignIn}
            style={styles.buttonStyle}>
            <Text style={styles.logInSignUp}>LogIn</Text>
          </Button>
        </Form>
        <Button onPress={this._handleSignUp} style={styles.buttonStyle}>
          <Text style={styles.logInSignUp}>Sign Up</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  div: { flexDirection: 'row' },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17d3c3'
  },
  inputFormat: { margin: 10, backgroundColor: '#17d3c3' },
  headerFont: { fontSize: 42, color: 'white', fontFamily: 'Futura' },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10
  },
  inputText: {
    textAlign: 'center',
    fontFamily: 'Futura',
    flex: 1
  },
  buttonStyle: {
    backgroundColor: '#17d3c3',
    borderColor: '#17d3c3',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 3
  },
  logInSignUp: {
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Futura',
    color: 'white'
  },
  mainHeader: { backgroundColor: '#17d3c3' }
});