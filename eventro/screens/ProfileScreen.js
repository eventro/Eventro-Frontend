import React from 'react';
import { ScrollView, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import Events from '../components/Events'

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.screenProps.user,
      followeesCount: 0,
      followersCount: 0
    }
  }
  static navigationOptions = {
    title: 'Profile',
  };

  componentDidMount(){
    let url = `https://peaceful-anchorage-79063.herokuapp.com/users/${this.state.user.id}/countfollowees`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log("FOLLOWEE COUNT: ", data)
      this.setState({followeesCount: data})
    })
    .catch(error  => console.log(error))

    url = `https://peaceful-anchorage-79063.herokuapp.com/users/${this.state.user.id}/countfollowers`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log("FOLLOWER COUNT: ", data)
      this.setState({followersCount: data})
    })
    .catch(error  => console.log(error))
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* <Text style={styles.userInfo}>HELLO THIS IS THE PROFILE SCREEN</Text> */}
          <Text style={styles.userInfo}>Email: {this.state.user.email}</Text>
          <Text style={styles.userInfo}>Username: {this.state.user.username}</Text>
          <Text style={styles.userInfo}>Name: {this.state.user.name}</Text>
          <Text style={styles.userInfo}>Date of Birth: {this.state.user.date_of_birth}</Text>
          <Text style={styles.userInfo}>Following: {this.state.followeesCount}</Text>
          <Text style={styles.userInfo}>Followers: {this.state.followersCount}</Text>
        </View>

        <Events eventsMode="profile" user={this.props.screenProps.user}
        setActiveEvent={this.props.screenProps.setActiveEvent}
        toggleEvent={this.props.screenProps.toggleEvent}
        navigation={this.props.navigation}/>
        <Button block danger style={styles.button}
          onPress={() => {
            AsyncStorage.clear();
            this.props.screenProps.setUser(null);
          }}>
          <Text>Log Out</Text>
        </Button>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  userInfo: {
    // marginTop: 10,
    marginBottom: 10
  },
  button: {
    height: 30,
    // width: 100,
    marginLeft: 100,
    marginRight: 100,
    color: "#ffffff"
  },
});
