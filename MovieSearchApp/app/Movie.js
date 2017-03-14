import React, { Component } from 'react';
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  row: {
    height: 80,
    flexDirection: 'row'
  },
  contact: {
    fontSize: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  poster: {
    height: 75,
    width: 50,
  },
  title: {
    margin: 5,
    fontSize: 15,
  },
  subHeading: {
    margin: 5,
    fontSize: 12,
  },
  movietitle: {
    marginLeft: 10,
  },
  movieyear: {
    marginTop: 20,
    marginLeft: 10,
  },
  progress: {
    position: 'absolute',
    top: 230,
    left: 120,
    width: 100,
    height: 100,
  }
});

export default class MovieSearchApp extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      showProgress: false,
      dataSource: ds.cloneWithRows(['Ashish', 'Patel']),
    };
    this.searchMovies = this.searchMovies.bind(this);
  }

  searchMovies() {
    console.log('Ashish');
    this.setState({ showProgress: true });
    fetch(`https://www.omdbapi.com/?s=${this.state.searchText}`).then(response => response.json()).then((responseData) => {
      this.setState({ showProgress: false });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.Search),
      });
    }).catch((error) => {
      Alert.alert("Warning", "Not able to find !");
    }).done()
  }

  async fetchDescription(imdbID) {
    let url = 'https://www.omdbapi.com/?i=' + imdbID + '&plot=short&r=json';
    try {
      let response = await fetch(url, {
        method: 'GET'
      });
      let res = await response.json();
      this.setState({ movie: res.Plot })
      console.log(this.state.movie);
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  }

  renderRow(rowData) {
    this.fetchDescription(rowData.imdbID);
    return (
      <View style={styles.row}>
        <Image
        style={styles.poster}
        source={{uri:rowData.Poster}}
        />
        <View style={{flexDirection:'column'}}>
        <Text style={styles.movieyear}>
          {rowData.Year}
        </Text>
        <Text style={styles.movietitle}>
          {rowData.Title}
        </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Search Movies
        </Text>
        <TextInput style={styles.searchInput} onChangeText={text => this.setState({ searchText: text })} placeholder="Enter search keyword" onSubmitEditing={this.searchMovies} />
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />
        <ActivityIndicator style={styles.progress} animating={this.state.showProgress} size="large" />
      </View>
    );
  }

}

AppRegistry.registerComponent('MovieSearchApp', () => MovieSearchApp);;
