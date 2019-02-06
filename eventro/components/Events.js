import React from 'react';
import { View, Header, Text, Left, Icon, Container, Button } from 'native-base';
// import Event from './Event';
import {Image, TouchableOpacity} from 'react-native'


export default class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
<<<<<<< HEAD
            activeEvent: ""
        }
    }
    componentDidMount() {
        if (this.props.eventsMode === "show") {
            //CHANGE USER_ID IN ENDPOINT DEPENDING ON HOW THE USER SHOW PAGE WILL BE
            const url = `https://peaceful-anchorage-79063.herokuapp.com/users/${this.props.screenProps.user.id}/attendees`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n **********Show Events", data)
                    this.setState({
                        events: data
                    })
=======
            activeEvent : {}
        }
    }
    componentDidMount() {

        const url = 'https://peaceful-anchorage-79063.herokuapp.com/events'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("\n\n\n\n\n\n\n\n\n\n\n\n\ **********Events", data)
                this.setState({
                    events: data
>>>>>>> d2d7c02b4fcdfb5c1e29646e5bafd93029253065
                })
                .catch(error => {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n ", error)
                })
        }
        else if (this.props.eventsMode === "profile") {
            const url = `https://peaceful-anchorage-79063.herokuapp.com/users/${this.props.screenProps.user.id}/attendees`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n **********Profile Events", data)
                    this.setState({
                        events: data
                    })
                })
                .catch(error => {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n ", error)
                })
        }
        else {
            const url = 'https://peaceful-anchorage-79063.herokuapp.com/events'
            fetch(url, {
                method: 'GET',
                body: null,
            })
                .then(response => response.json())
                .then(data => {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n **********All Events", data)
                    this.setState({
                        events: data
                    })
                })
                .catch(error => {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n ", error)
                })
        }
    }


    renderEvents() {
        return this.state.events.map((event, index) => {
            // console.log("event: ", event);
            return (
<<<<<<< HEAD

                <View key={index} onPress={() => {

                    this.props.setCurrentevent(event);
                    this.props.setView("eventshow");
                    return (

                        <Event activeEvent={this.state.activeEvent} />
                    )
                }}>
                    <Image source={event.logo} />
                    <Text>{event.name}</Text>
                    {/* <Image source={event.image_url} /> */}
                    {/* <Text>Attendee {event.attendees}</Text> */}
                    {/* <Text>Description : {event.description}</Text> */}
                    <Text>Start date : {event.start_date} End date : {event.end_date}</Text>
                    {/* <Text>Location: {event.location}</Text> */}
                    {/* <Button onPress>More Info</Button> */}
                </View>
=======
                
                <TouchableOpacity key={index} style={{borderRadius: 4, borderColor: "black"}} 
                onPress={() => { 
                    console.log("\n\n\n\n\n\n\n\n\n\n\ ", event);
                    this.props.setActiveEvent(event)   
                   this.props.toggleEvent()
                         
                }}> 
                <Image style= {{width: 100, height: 100}}source= {{uri: event.logo}} />
                <Text>{event.name}</Text>
                <Text>Start date : {event.start_date} </Text>
                <Text> End date : {event.end_date}</Text>
                
                
                </TouchableOpacity>
>>>>>>> d2d7c02b4fcdfb5c1e29646e5bafd93029253065
            )
        })
    }

    render() {
        return (
            <View>
                <Header>
                    <Text>Events </Text>
                </Header>
                {this.state.events ? this.renderEvents()
                    : <Text>No Event Found.</Text>}
            </View>
        )
    }
}

