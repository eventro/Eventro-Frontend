import React from 'react';
import { View, Header, Text, Left, Icon, Image } from 'native-base';
import Event from './Event';

export default class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            activeEvent : ""
        }
    }
    componentDidMount() {

        const url = 'http://10.51.0.126:3000/events'
        fetch(url, {
            method: 'GET',
            body: null,
        })
            .then(response => response.json())
            .then(data => {
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\ **********Events", data)
                this.setState({
                    events: data
                })
            })
            .catch(error => {
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n ",error)
            })
    }

    
    renderEvents() {
        return this.state.events.map((event, index) => {
            // console.log("event: ", event);
            return (
                
                <View key={index} onPress={() => {

                    this.props.setCurrentevent(event);
                    this.props.setView("eventshow");
                    return(

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
                    :<Text>No Event Found.</Text> }
            </View>
        )
    }
}

