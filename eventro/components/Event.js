import React from 'react'
import { View, Header, Text, Left, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native'
import Cameraex from './Cameraex';



export default class Event extends React.Component {
    constructor() {
        super()
        this.state = {
            attendees: 0,
            organizer: [],
            showCamera: false,
            attended: false
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

    fetchAttendeeCount() {
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
    }

    fetchAttendees() {
        const url = `https://peaceful-anchorage-79063.herokuapp.com/events/${this.props.activeEvent.id}/attendees`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("ALL ATTENDEES: ", data);
                data.forEach((element) => {
                    if (element.email == this.props.user.email) {
                        this.setState({ attended: true })
                    }
                })
            })
    }

    postAttend() {
        const url = `https://peaceful-anchorage-79063.herokuapp.com/events/${this.props.activeEvent.id}/attendees?auth_token=${this.props.user.auth_token}`;
        fetch(url, {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                this.fetchAttendeeCount();
                this.setState({ attended: true })
            })
    }

    deleteAttend() {
        const url = `https://peaceful-anchorage-79063.herokuapp.com/events/${this.props.activeEvent.id}/attendees?auth_token=${this.props.user.auth_token}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                this.fetchAttendeeCount();
                this.setState({ attended: false })
            })
    }

    componentDidMount() {
        this.fetchAttendeeCount();
        this.renderOrganizer();
        this.fetchAttendees();
        // renderComments();
    }

    toggleCamera() {
        this.setState({
            showCamera: !this.state.showCamera
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.setActiveEvent(null)}><Text>Back</Text></TouchableOpacity>
                <Image style={{ width: 80, height: 80 }} source={{ uri: this.props.activeEvent.logo }} />
                <Text>{this.props.activeEvent.name}</Text>
                <Image style={{ width: 120, height: 120 }} source={{ uri: this.props.activeEvent.image_url }} />
                <Text>Attendee:  {this.state.attendees}</Text>
                {
                    this.state.attended ?
                        <Button
                            onPress={() => this.deleteAttend()}
                        >
                            <Text>
                                Unattend
                            </Text>
                        </Button>
                        :
                        <Button
                            onPress={() => this.postAttend()}
                        >
                            <Text>
                                Attend
                            </Text>
                        </Button>
                }

                <Text>Description :  {this.props.activeEvent.description}</Text>
                <Text>Start date : {this.props.activeEvent.start_date} </Text>
                <Text>End date : {this.props.activeEvent.end_date}</Text>
                <Text>Location: {this.props.location}</Text>
                <Text>Organizer : {this.state.organizer.name}</Text>
                <Text>Organizer Email: {this.state.organizer.email}</Text>
                <Text>Organizer Phone : {this.state.organizer.phone}</Text>
                <Text>Join Us , And add your photo to ours </Text>
                {this.state.showCamera ? <Cameraex /> : null}
                <TouchableOpacity onPress={() => this.toggleCamera()}><Text>{this.state.showCamera ? 'close camera' : 'Live Photo'}</Text></TouchableOpacity>
                {/* this.props.navigation.navigate('Cameraex') */}
            </View>
        )
    }
}