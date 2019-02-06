import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';

// npm install --save native-base react-navigation @expo/vector-icons

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      //   user: {
      //     id: 1,
      //     email: "ghadeer@gmail.com",
      //     password_digest: "$2a$10$PAHXRPk6YiU1D3sbgYA4Yuww9RZXcwR0JEuJD3YoOBLZKR.3u5/vW",
      //     auth_token: "5VY7R8vPAc237fYGSSqTN8vT",
      //     username: "ghadeer_ga",
      //     name: "Ghadeer",
      //     date_of_birth: "22/3/1993",
      //     created_at: "2019-02-04T16:19:27.283Z",
      //     updated_at: "2019-02-04T16:19:27.283Z"
      // },
      currentEvent: null,
      isLoadingComplete: false,
      newUser: false,
      activeEvent: null
    };
  }

  componentDidMount = async () => {
    // AsyncStorage.clear();
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        // We have data!!
        console.log("HI I'M A USER:", user)
        this.setState({ user: JSON.parse(user) });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  setUser(user) {
    this.setState({ user })
  }

  toggleNewUser() {
    this.setState({ newUser: !this.state.newUser })
  }

  setActiveEvent(event) {
    this.setState({ activeEvent: event });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (!this.state.user) {
      if (!this.state.newUser) {
        return (
          <SigninScreen setUser={this.setUser.bind(this)}
            toggleNewUser={this.toggleNewUser.bind(this)} />
        )
      }
      else {
        return (
          <SignupScreen setUser={this.setUser.bind(this)}
            toggleNewUser={this.toggleNewUser.bind(this)} />
        )
      }
    }
    else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={
            {
              setUser: this.setUser.bind(this),
              user: this.state.user,
              activeEvent: this.state.activeEvent,
              setActiveEvent: this.setActiveEvent.bind(this)
            }
          } />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
