import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

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
