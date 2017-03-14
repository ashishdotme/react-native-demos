'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Alert
} from 'react-native';

export default class MovieSearchApp extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            showProgress: false,
            dataSource: ds.cloneWithRows(['Ashish', 'Patel'])
        }
        this.searchMovies = this.searchMovies.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Search Movies </Text>
                <TextInput style={styles.searchInput}
                onChangeText={(text) => this.setState({searchText: text})}
                placeholder="Enter search keyword"
                onSubmitEditing={this.searchMovies}
                />
                <ActivityIndicator animating={this.state.showProgress} size="large"/>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow}/>
            </View>
        )
    }

    searchMovies() {
        console.log("Ashish");
        this.setState({showProgress: true});
        fetch('https://www.omdbapi.com/?s='+ this.state.searchText).then((response) => response.json()).then((responseData) => {
            this.setState({showProgress: false});
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.Search)
            });
        }).catch(function(error) {
            Alert.alert("Warning", "Network connection require !");
        }).done()
    }

    renderRow(rowData,rowId) {
        return (
            <View style={styles.row}>
                <Text>
                    {rowData.Year}
                </Text>
                <Text>
                    {rowData.Title}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },
    header:{
      fontSize: 24,
      alignSelf: 'center',
      marginBottom: 10
    },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 10,
      marginBottom: 10
    },
    row:{
      height: 60,
    },
    contact: {
        fontSize: 24
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    poster: {
        height: 75,
        width: 50
    },
    title: {
        margin: 5,
        fontSize: 15
    },
    subHeading: {
        margin: 5,
        fontSize: 12
    }
});
AppRegistry.registerComponent('MovieSearchApp', () => MovieSearchApp);;
