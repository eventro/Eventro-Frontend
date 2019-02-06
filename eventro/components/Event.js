import React from 'react'
import { View, Header, Text, Left, Image, Button } from 'native-base';



export default class Event extends React.Component {
    constructor() {
        super()
        this.state = {
            attendees: 0,
            organizer: "",
        }
    }

    renderOrganizer() {
        const url = `http://10.51.0.126:3000/events/${this.props.activeEvent.id}/organizers/${this.props.organizer.id}`
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

        const url = `http://10.51.0.126:3000/events/${this.props.activeEvent.id}/countattendees`
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

        renderOrganizer();
        renderComments();
    }

    render() {
        return (
            <View>
                <Image source={this.props.activeEvent.logo} />
                <Text>{this.props.activeEvent.name}</Text>
                <Image source={props.activeEvent.image_url} />
                <Text>Attendee {this.state.attendees}</Text>
                <Text>Description : <br /> {this.props.activeEvent.description}</Text>
                <Text>Start date : {this.props.activeEvent.start_date} End date : {this.props.activeEvent.end_date}</Text>
                <Text>Location: {this.props.location}</Text>
                <Text>Organizer : {this.props.organizer.name}</Text>
                <Text>Organizer Email: {this.props.email}</Text>
                <Text>Organizer Phone : {this.props.phone}</Text>
                <Text>Join Us , And add your photo to our </Text>
                <Text onPress={() => this.props.navigation.navigate('Cameraex')}>Live Photo</Text>
            </View>
        )
    }
}