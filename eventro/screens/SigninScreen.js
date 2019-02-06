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


class SigninScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }
    }

    handleSubmit() {
        // event.preventDefault();
        const url = "http://10.51.0.126:3000/login"

        const data = {
            email: this.state.email,
            password: this.state.password
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
                    console.log("SignIn successful for: ", data);
                    AsyncStorage.setItem("user", JSON.stringify(data));
                    this.props.setUser(data);
                }
                else {
                    this.setState({ errorMessage: data.errors })
                }
            })
            .catch(error => {
                // document.getElementById("signUpCard").style.height = "70%"
                // document.getElementById("signUpStatus").innerHTML = "Username already taken."
                console.log(error);
            })
    }

    render() {

        return (

            <Container>
                <Header>
                    <Text style={styles.heading}>Sign In</Text>
                </Header>
                <Content>
                    <Text style={styles.label}>
                        {this.state.errorMessage}
                    </Text>
                    <Form>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                autoCapitalize="none" />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password} />
                        </Item>
                        {/* <Container style={styles.container}> */}
                        <Button block primary style={styles.button}
                            onPress={() => this.handleSubmit()}>
                            <Text>Login</Text>
                        </Button>
                        {/* </Container> */}
                    </Form>
                    <TouchableOpacity onPress={() => this.props.toggleNewUser()}>
                        <Text style={styles.label}>
                            Don't Have an Account? Click here
                        </Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )

    }
}

export default SigninScreen;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 40
        // alignItems: 'center',
    },
    container: {
        alignItems: 'center',
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