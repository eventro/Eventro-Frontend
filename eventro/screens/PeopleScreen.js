import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'People',
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>HELLO THIS IS THE PEOPLE SCREEN</Text>
        </View>
      </ScrollView>
    );
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
