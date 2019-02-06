import React from 'react';
import { ScrollView, StyleSheet, View, Text ,TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Container, Header , Icon , Button} from 'native-base';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { SearchBar } from 'react-native-elements';


const KEYS_TO_FILTERS = ['username', 'name'];

export default class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'People',
  };
  constructor(props) {
    super(props);
    this.state = {
      user:props.screenProps.user,
      userS: false,
      searchTerm: '',
      users:[],
      selectedUser:false,
      viewUser:'',
      follow:false,
      followingList:[]
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term})
  }

componentDidMount(){
  fetch(`https://peaceful-anchorage-79063.herokuapp.com/users/`)
    .then( response => response.json())
    .then( data => {
      console.log('deployed users!!!',data);
      this.setState({
        users: data
      })
      console.log('users****', this.state.users)
    })
    .catch( error => {
      console.log(error)
    })

    {this.getFollowees()}
  }

  getFollowees(){
    fetch(`https://peaceful-anchorage-79063.herokuapp.com/users/${this.state.user.id}/followees`)
      .then( response => response.json())
      .then( data => {
        console.log('followees!!!',data);
        this.setState({
          followingList: data
        })
        console.log('followees****', this.state.followingList)
      })
      .catch( error => {
        console.log(error)
      })
    }

  // this.props.user.


  onSelection(user){
    console.log('clicked!!!!!',user)
    this.setState({
      selectedUser: true,
      viewUser: user })
   const following = this.state.followingList.filter(el => {
     console.log('follower id',el.followee_id , 'is !!',user.id )
     return el.followee_id == user.id
    })
    console.log('========',following.length)
    if(following.length>0)
    this.setState({follow:true})
    else
    this.setState({follow:false})
  }

  followCondition(){

    if(this.state.follow){
    fetch(`https://peaceful-anchorage-79063.herokuapp.com/users/${this.state.viewUser.id}/followers?auth_token=${this.state.user.auth_token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }, 
    })
    .then( response => response.json())
    .catch( error => {
      console.log(error)
    })
  }

  else{
    fetch(`https://peaceful-anchorage-79063.herokuapp.com/users/${this.state.viewUser.id}/followers?auth_token=${this.state.user.auth_token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
    })
    .then( response => response.json())
    // .then( data => {
    //   })
    .catch( error => {
      console.log(error)
    })
  }
    this.setState({follow: !this.state.follow})

  }
  render() {
    const filteredUsers = this.state.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (

      <View style={styles.container}>

      {this.state.selectedUser ?
      <Container>
        <Text onPress={()=>this.setState({selectedUser:false })}> Back</Text> 
       <Text>{this.state.viewUser.name}</Text> 
       <Button  primary style={styles.button}  onPress={()=> this.followCondition()}>
            {this.state.follow ?   <Text>Unfollow </Text> :  <Text>Follow</Text>}
       </Button>
       </Container>
      :
       <Container><SearchInput 
        onChangeText={(term) => { this.searchUpdated(term) }} 
        style={styles.searchInput}
        placeholder="Search for a user"
        />
      <ScrollView>
        {filteredUsers.map(user => {
          return (
            <TouchableOpacity onPress={()=>
              {this.onSelection(user)}}
            
            key={user.id} style={styles.userItem}
            >
              <View>
                <Text>{user.username}</Text>
                <Text style={styles.userSubject}>{user.name}</Text>
              </View>
            </TouchableOpacity>
          ) 
        })}
      </ScrollView>
      </Container> 
        }
      

    </View>
   
     ) }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  userSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});