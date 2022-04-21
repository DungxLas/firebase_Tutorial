import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import Button from 'react-native-button';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.unsubcriber = null;
    this.state = {
      isAuthenticated: false,
      typedEmail: '  ',
      typedPassword: '  ',
      user: null,
    };
  }

  componentDidMount() {
    this.unsubcriber = firebase.auth().onAuthStateChanged((changeUser) => {
      this.setState({ user: changeUser });
    });
  }

  componentWillUnmount() {
    if (this.unsubcriber) {
      this.unsubcriber();
    }
  }

  onAnonymuosLogin = () => {
    firebase.auth().signInAnonymously()
      .then(() => {
        console.log(`Login successfully`);
        this.setState({
          isAuthenticated: true,
        });
      })
      .catch((error) => {
        console.log(`Login faild. Error = ${error}`);
      })
  }

  onLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
      .then((loggedInUser) => {
        console.log(`Login successfully with user: ${JSON.stringify(loggedInUser.user)}`);
      })
      .catch((error) => {
        console.log(`Login faild. Error = ${error}`);
      })
  }

  onRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
      .then((loggedInUser) => {
        this.setState({
          user: loggedInUser,
        });
        console.log(`Register successfully with user: ${JSON.stringify(loggedInUser.user)}`);
      })
      .catch((error) => {
        console.log(`Register faild. Error = ${error}`);
      })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 34 : 0
        }}
      >
        <Text
          style={{
            fontSize: 20,
            margin: 40,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Login with firebase
        </Text>
        <Button
          containerStyle={{
            padding: 10,
            borderRadius: 4,
            backgroundColor: 'rgb(226, 161, 184)',
            width: 200,
            alignSelf: 'center',
          }}
          style={{
            fontSize: 18,
            color: 'white',
          }}
          onPress={this.onAnonymuosLogin}
        >
          Login anonymous
        </Button>
        <Text
          style={{
            fontSize: 15,
            margin: 20,
            alignSelf: 'center'
          }}
        >
          {this.state.isAuthenticated == true ? 'Logged in anonymuos' : '  '}
        </Text>
        <TextInput
          style={{
            height: 40,
            width: 200,
            margin: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 2,
            color: 'black',
            alignSelf: 'center',
          }}
          keyboardType='email-address'
          placeholder='Enter your email'
          autoCapitalize='none'
          onChangeText={
            (text) => {
              this.setState({ typedEmail: text });
            }
          }
        />
        <TextInput
          style={{
            height: 40,
            width: 200,
            margin: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 2,
            color: 'black',
            alignSelf: 'center',
          }}
          keyboardType='default'
          placeholder='Enter your password'
          secureTextEntry={true}
          onChangeText={
            (text) => {
              this.setState({ typedPassword: text });
            }
          }
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center'
          }}
        >
          <Button
            containerStyle={{
              padding: 10,
              margin: 10,
              borderRadius: 4,
              backgroundColor: 'blue',
              width: 100,
            }}
            style={{
              fontSize: 17,
              color: 'white',
            }}
            onPress={this.onLogin}
          >
            Login
          </Button>
          <Button
            containerStyle={{
              padding: 10,
              margin: 10,
              borderRadius: 4,
              backgroundColor: 'green',
              width: 100,
            }}
            style={{
              fontSize: 17,
              color: 'white',
            }}
            onPress={this.onRegister}
          >
            Register
          </Button>
        </View>
      </View>
    );
  }
}