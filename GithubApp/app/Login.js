'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ActivityIndicator
} from 'react-native';

export default class GithubApp extends Component{
    constructor(props){
        super(props);
        this.state = {
          showProgress: false
        }
    }

    render(){
        return(
                <View style={styles.container}>
                   <Image style={styles.logo} source={require('./../images/Octocat.png')}/>
                   <Text style={styles.heading}> GitHub Browser </Text>
                   <TextInput
                        onChangeText={(text)=>this.setState({username:text})}
                        style={styles.input}
                        autoFocus={true}
                        keyboardType="email-address"
                        placeholder="Github Username"/>
                   <TextInput
                        onChangeText={(text)=> this.setState({password:text})}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Github Password"/>
                  <View style={styles.buttonView}>
                   <Button
                   value="NORMAL FLAT"
                   onPress={this.onLoginPressed.bind(this)}
                   title="Login"
                   />
                   </View>
                  <ActivityIndicator
                  animating={this.state.showProgress}
                  size="large" />

                </View>
        );
    }

    onLoginPressed(){
      console.log('Login Pressed' + this.state.username);
      this.setState({showProgress: true});
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCCCCC',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1,
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        padding:30,
    },
    logo:{
        width: 66,
        height: 55,
    },
    heading:{
        fontSize:30,
    },
    input:{
        height:40,
        marginTop:20,
        borderColor: '#000000',
        borderStyle: 'solid',
        //backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        paddingLeft:10,

    },
    button:{
      marginTop: 100,
      backgroundColor: 'blue',
      height:70,
      width: 200
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    progress:{
        marginTop:20
    }

});

AppRegistry.registerComponent('GithubApp', () => GithubApp);
