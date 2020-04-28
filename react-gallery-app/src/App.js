import React, { Component } from 'react';
import './css/index.css';
import { Route, BrowserRouter, Switch, NavLink, Redirect } from 'react-router-dom';
import apiKey from './apiKey';

// App components
import SearchForm from './components/SearchForm';
import PhotoList from './components/PhotoList';
import NoPhotos from './components/NoPhotos';
import Destinations from './components/Destinations'
import axios from 'axios';

export default class App extends Component  {
  
  constructor() {
    super();
    this.state = {
      photos:[],
      loading: true,
      input:'',
      sharm: [],
      taba: [],
      hurgada: []
    };
  }

  componentDidMount() {
    let taba = this.performSearch("Taba");
    let hurgada = this.performSearch("Hurgada");
    let sharm = this.performSearch("Sharm");
    // load three main search results
    this.setState({
      sharm: sharm,
      hurgada: hurgada,
      taba: taba
    });
    console.log(this.state);
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        title: query,
        photos: response.data.photos.photo,
        loading: false
      }); 
      return this.state.photos;
    })
    .catch(error =>  {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
  // const  { photos } = this.state.photos;  
    return (
      <BrowserRouter>
        <div>
          <div className="main-header">
            <div className="inner">
              <h1 className="main-title">Egypt Attractions</h1>
              <SearchForm onSearch={this.performSearch} /> 
              {/* <Destinations onClick={this.performSearch} />      */}
            </div>   
          </div> 
          <div className="main-content">
            <Destinations />
            <Switch>
            {(this.state.loading) 
              ? <p>Loading...</p>
              : <PhotoList data={this.state.photos} title={this.state.title} />
              } 
              <Route exact path='/' 
                     render={ () => <Redirect to={'/Sharm'} /> } />
              <Route path="/Sharm" 
                     render={(props) => (<PhotoList {...props} data={this.state.photos} title="Sharm"/>)} />
              <Route path="/Hurgada"
                     render={(props) => (<PhotoList {...props} data={this.state.photos} title="Hurgada"/>)} />          
              <Route path="/Taba"
                     render={(props) => (<PhotoList {...props} data={this.state.photos} title="Taba"/>)} />
              <Route component={NoPhotos} />             
            </Switch>
          </div>
        </div> 
      </BrowserRouter>
    );
  }
}

