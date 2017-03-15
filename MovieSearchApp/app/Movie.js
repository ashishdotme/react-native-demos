import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TextInput,
  Alert
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40
  },
  header: {
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
  row: {
    height: 150,
    flexDirection: 'row'
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
    marginTop: 20,
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
  },
  movietitle: {
    marginLeft: 10
  },
  movieyear: {
    marginTop: 20,
    marginLeft: 10
  },
  progress: {
    position: 'absolute',
    top: 230,
    left: 120,
    width: 100,
    height: 100
  },
  imgsList: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10
  },
  img: {
    height: 95,
    width: 75,
    borderRadius: 20,
    margin: 20
  }
});

export default class MovieSearchApp extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      showProgress: false,
      dataSource: ds.cloneWithRows([]),
      loaded: false
    };
    this.searchMovies = this.searchMovies.bind(this);
  }

  searchMovies() {
    this.setState({showProgress: true});
    fetch(`https://www.omdbapi.com/?s=${this.state.searchText}`).then(response => response.json()).then((responseData) => {
      this.fetchDescription(responseData.Search)
    }).catch((error) => {
      Alert.alert("Warning", "Not able to find !");
    }).done()
  }

  fetchDescription(data) {
    var moviesArray = [];
    for (var i = 0; i < data.length; i++) {
      let url = 'https://www.omdbapi.com/?i=' + data[i].imdbID + '&plot=short&r=json';
      fetch(url).then(response => response.json()).then((responseData) => {
        this.setState({movie: responseData});
        moviesArray.push(this.state.movie);
        this.setState({dataSource: this.state.dataSource.cloneWithRows(moviesArray)});
      }).catch((error) => {
        Alert.alert("Warning", "Not able to find !");
      }).done()
    }
    this.setState({showProgress: false});
    this.setState({loaded: true})
  }

  renderRow(rowData) {
    return (
      <View style={styles.imgsList}>
        <Image
          source={{
          uri: rowData.Poster
        }}
          style={styles.img}/>
        <View
          style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Text>{rowData.Year}</Text>
          <Text style={{
            fontWeight: 'bold'
          }}>{rowData.Title}</Text>
          <Text>{rowData.Plot}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Search Movies
        </Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={text => this.setState({searchText: text})}
          placeholder="Enter search keyword"
          onSubmitEditing={this.searchMovies}/>
          { this.state.loaded &&
            < ListView
            dataSource = { this.state.dataSource }
            renderRow = { this.renderRow } />
            }
        <ActivityIndicator
          style={styles.progress}
          animating={this.state.showProgress}
          size="large"/>
      </View>
    );
  }
}

AppRegistry.registerComponent('MovieSearchApp', () => MovieSearchApp);
