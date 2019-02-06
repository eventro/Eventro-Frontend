import React from 'react'
import { View, Header, Text, Left, Button } from 'native-base';
import {Image, TouchableOpacity} from 'react-native'
import Cameraex from './Cameraex';



export default class Event extends React.Component {
    constructor() {
        super()
        this.state = {
            attendees: 0,
            organizer: []
        }
    }

    renderOrganizer() {
        const url = `https://peaceful-anchorage-79063.herokuapp.com/organizers/${this.props.activeEvent.organizer_id}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Organizer", data)
                this.setState({
                    organizer: data
                }, function () { console.log(this.state.organizer) })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {

        const url = `https://peaceful-anchorage-79063.herokuapp.com/events/${this.props.activeEvent.id}/countattendees`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Attendees", data)
                this.setState({
                    attendees: data
                }, function () { console.log(this.state.attendees) })
            })
            .catch(error => {
                console.log(error)
            })

        this.renderOrganizer();
        // renderComments();
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.setActiveEvent(null)}><Text>Back</Text></TouchableOpacity>
                <Image style={{width: 80, height: 80}} source={{uri: this.props.activeEvent.logo}} />
                <Text>{this.props.activeEvent.name}</Text>
                <Image style={{width: 120, height: 120}} source={{uri: this.props.activeEvent.image_url}} />
                <Text>Attendee:  {this.state.attendees}</Text>
                <Text>Description :  {this.props.activeEvent.description}</Text>
                <Text>Start date : {this.props.activeEvent.start_date} </Text>
                <Text>End date : {this.props.activeEvent.end_date}</Text>
                <Text>Location: {this.props.location}</Text>
                <Text>Organizer : {this.state.organizer.name}</Text>
                <Text>Organizer Email: {this.state.organizer.email}</Text>
                <Text>Organizer Phone : {this.state.organizer.phone}</Text>
                <Text>Join Us , And add your photo to our </Text>
                {/* <TouchableOpacity onPress={() => <Cameraex/>}><Text>Live Photo</Text></TouchableOpacity> */}
                {/* this.props.navigation.navigate('Cameraex') */}
            </View>
        )
    }
}