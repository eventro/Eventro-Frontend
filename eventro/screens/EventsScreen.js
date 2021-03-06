import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';


import { MonoText } from '../components/StyledText';
import Events from '../components/Events';
import Event from '../components/Event';

export default class EventsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      // activeEvent: props.screenProps.activeEvent,
      // toggleEvent: props.screenProps.toggleEvent,
      // setActiveEvent: props.screenProps.setActiveEvent
    }
  }
  static navigationOptions = {
    // header: null,
    title: "Events"
  };

  componentDidMount(){
    console.log("NANANANANNANA/n/n/n/n/n/n//n", this.props.screenProps)
  }

 

  render() {
    return (
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <Text>HELLO THIS IS THE EVENTS SCREEN </Text>
         {this.props.screenProps.activeEvent ? <Event 
         user={this.props.screenProps.user}
         toggleEvent={this.props.screenProps.toggleEvent}
        activeEvent={this.props.screenProps.activeEvent}
        setActiveEvent={this.props.screenProps.setActiveEvent}/> 
         : <Events
         toggleEvent={this.props.screenProps.toggleEvent}
        //  activeEvent={this.props.screenProps.activeEvent}
        setActiveEvent={this.props.screenProps.setActiveEvent}
        navigation={this.props.navigation}/>}
       
          
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  // mainContainer: {
  //   marginTop: 20
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    // marginTop: 10,
    marginBottom: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


     // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //   <View style={styles.welcomeContainer}>
      //     <Image
      //       source={
      //         __DEV__
      //           ? require('../assets/images/robot-dev.png')
      //           : require('../assets/images/robot-prod.png')
      //       }
      //       style={styles.welcomeImage}
      //     />
      //   </View>

      //   <View style={styles.getStartedContainer}>

      //     <Text style={styles.getStartedText}>HI THERE, RAED HERE</Text>

      //   </View>

      // </ScrollView>

      // <View style={styles.tabBarInfoContainer}>
      //   <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

      //   <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
      //     <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
      //   </View>
      // </View>

  // _maybeRenderDevelopmentModeWarning() {
  //   if (__DEV__) {
  //     const learnMoreButton = (
  //       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
  //         Learn more
  //       </Text>
  //     );

  //     return (
  //       <Text style={styles.developmentModeText}>
  //         Development mode is enabled, your app will be slower but you can use useful development
  //         tools. {learnMoreButton}
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         You are not in development mode, your app will run at full speed.
  //       </Text>
  //     );
  //   }
  // }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };