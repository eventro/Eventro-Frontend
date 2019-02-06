import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

class SignupScreen extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            username: "",
            name: "",
            dob: "",
            errorMessage: ""
        }
    }

    handleChange(event) {
        this.setState({ email: event.target.value })
    }

    handleSubmit() {
        // event.preventDefault();
        // console.log("HELLO I AM IN HANDLE SUBMIT!!!!!!!!!!!!!!!!!!!!!!!!")
        const url = "https://peaceful-anchorage-79063.herokuapp.com/users"
        console.log("THE PASSWORD: ", this.state.password)

        const data = {
            user: {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                name: this.state.name,
                date_of_birth: this.state.dob
            }
        }
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.email !== undefined) {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n SignUp successful for: ", data);
                    AsyncStorage.setItem("user", JSON.stringify(data));
                    this.props.setUser(data);
                }
                else {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nGOT SHITTY DATA", data)
                    this.setState({ errorMessage: JSON.stringify(data) })
                }
            })
            .catch(error => {
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n ", error);
            })
    }

    // renderErrors() {
    //     return Object.keys(this.state.errorMessage).map((key) => {
    //         return (
    //             <Text style={styles.label}>
    //                 {key}: {this.state.errorMessage[key]}
    //             </Text>
    //         )
    //     })
    // }

    render() {

        return (
            <Container>
                <Header>
                    <Text style={styles.heading}>Sign Up</Text>
                </Header>
                <Content>
                    {/* {this.renderErrors()} */}
                    <Text style={styles.label}>
                        {this.state.errorMessage}
                    </Text>
                    <Form>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input style={styles.textInput} onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                autoCapitalize="none" />
                        </Item>
                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input style={styles.textInput} onChangeText={(password) => this.setState({ password })}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                value={this.state.password} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input style={styles.textInput} onChangeText={(username) => this.setState({ username })}
                                value={this.state.username}
                                autoCapitalize="none" />
                        </Item>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input style={styles.textInput} onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                autoCapitalize="none" />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Date of birth (dd/mm/yyyy)</Label>
                            <Input style={styles.textInput} onChangeText={(dob) => this.setState({ dob })}
                                value={this.state.dob}
                                autoCapitalize="none" />
                        </Item>
                        {/* <Container style={styles.container}> */}
                        <Button block primary style={styles.button}
                            onPress={() => this.handleSubmit()}>
                            <Text>Register</Text>
                        </Button>
                        {/* </Container> */}
                    </Form>
                    <TouchableOpacity onPress={() => this.props.toggleNewUser()}>
                        <Text style={styles.label}>
                            Already have an account? Click here!
                        </Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 40
        // alignItems: 'center',
    },
    textInput: {
        width: 100,
        marginBottom: 10,
        backgroundColor: "#FFF"
    },
    button: {
        marginLeft: 5,
        marginRight: 5,
        color: "#ffffff"

    },
    heading: {
        fontSize: 24
    },
    label: {
        textAlign: "center",
        marginTop: 10
    }
});