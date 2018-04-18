import React, { Component } from 'react';
import { Button, Text, Item, Input, Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';

export default class SignUpComponent extends Component {
  state = {
    username: '',
    password: '',
    name: ''
  };
  _handleSignIn = event => {
    this.props.signIn();
  };
  _handleCancel = event => {
    this.props.cancel();
  };

  _handleSignUp = event => {
    this.props.signUp(
      (info = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
    );
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
          <View style={styles.pwValidationForm}>
            <Text style={styles.pwValidationText}>
              {' '}Passwords must be at least 6 characters long
            </Text>
          </View>
          <View style={styles.div}>
            <Item rounded style={styles.inputBox}>
              <Input
                style={styles.inputText}
                name="names"
                autoCapitilize="none"
                placeholder="Name"
                secureTextEntry={true}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </Item>
          </View>
          <Button
            rounded
            onPress={this._handleSignUp}
            style={styles.signUpOrCancel}>
            <Text style={styles.signUpOrCancelText}>Sign Up</Text>
          </Button>
        </Form>
        <Button onPress={() => Actions.LOGIN()} style={styles.signUpOrCancel}>
          <Text style={styles.signUpOrCancelText}>Cancel</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  div: { flexDirection: 'row' },
  row: { height: 30 },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17d3c3'
  },
  inputFormat: { margin: 10, backgroundColor: '#17d3c3' },
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
  pwValidationForm: {
    flex: 0.01,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pwValidationText: { color: 'white', fontSize: 12 },
  headerFont: { fontSize: 42, color: 'white', fontFamily: 'Futura' },
  signUpOrCancel: {
    backgroundColor: '#17d3c3',
    borderColor: '#17d3c3',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 3
  },
  signUpOrCancelText: {
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Futura',
    color: 'white'
  }
});