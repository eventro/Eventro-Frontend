import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor() {
    super();
    this.state = {
      followersNo: 0,
      followeesNo:0
    }
  }
  getNumberOfFollowers(){
    // fetch(`http://localhost:3000/users/${this.props.user.id}/events?auth_token=${getToken()}`)
    fetch(`http://localhost:3000/users/${this.props.user.id}/countfollowers`)
    .then( response => response.json())
    .then( data => {
      console.log('dddd',data);
      this.setState({
        followersNo: data
      })
      console.log('followers', this.state.followers)
    })
    .catch( error => {
      console.log(error)
    })
  }

  getNumberOfFollowees(){
    // fetch(`http://localhost:3000/users/${this.props.user.id}/events?auth_token=${getToken()}`)
    fetch(`http://localhost:3000/users/${this.props.user.id}/countfollowees`)
    .then( response => response.json())
    .then( data => {
      console.log('dddd',data);
      this.setState({
        followeesNo: data
      })
      console.log('followers', this.state.followers)
    })
    .catch( error => {
      console.log(error)
    })
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>HELLO THIS IS THE PROFILE SCREEN</Text>



        </View>
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
});
