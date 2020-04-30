import React, { Component } from 'react';
import './css/index.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import apiKey from './apiKey';

// App components
import SearchForm from './components/SearchForm';
import PhotoList from './components/PhotoList';
import PageNotFound from './components/PageNotFound';
import Destinations from './components/Destinations'
import axios from 'axios';

export default class App extends Component  {
  
  constructor() {
    super();
    this.state = {
      photos:[],
      loading: true,
      title:'',
      sharmElSheikh: [],
      hurgada: [],
      taba: []      
    };
  }

  componentDidMount() {
    this.performSearch("SharmElSheikh");
    this.performSearch("Hurgada");
    this.performSearch("Taba");
  }

  // fetching data from Flicker API using Axios.

  performSearch = (query = "SharmElSheikh") => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      if (query === "SharmElSheikh") {
        this.setState({
          title: query,
          sharmElSheikh: response.data.photos.photo,
          loading: false
        });
      } else if (query === "Hurgada") {
        this.setState({
          title: query,
          hurgada: response.data.photos.photo,
          loading: false
        });
      } else if (query === "Taba") {
        this.setState({
          title: query,
          taba: response.data.photos.photo,
          loading: false
        });
      } else {
        this.setState({
          title: query,
          photos: response.data.photos.photo,
          loading: false
        });
      }
    })
    .catch(error =>  {
      console.log('Error fetching and parsing data', error);
    });
  }

  // Set up the Routes and Switch between three default topics, 
  // the search Route and the error 404 Route.

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="main-header">
            <div className="inner">
              <h1 className="main-title">Egypt Attractions</h1>
              <SearchForm onSearch={this.performSearch} /> 
            </div>   
          </div> 
          <div className="main-content">
            <Destinations />
            {(this.state.loading)
              ? <p>Loading...</p>
              : <Switch>
                <Route exact path='/' 
                      render={ () => <Redirect to={'/SharmElSheikh'} /> } />
                <Route path="/SharmElSheikh" 
                      render={(props) => <PhotoList {...props} 
                                            data={this.state.sharmElSheikh} 
                                            title="SharmElSheikh" /> } />
                <Route path="/Hurgada"
                      render={(props) => <PhotoList {...props} 
                                            data={this.state.hurgada} 
                                            title="Hurgada" />} />          
                <Route path="/Taba"
                      render={(props) => <PhotoList {...props} 
                                            data={this.state.taba} 
                                            title="Taba" />} />
                <Route path="/search/:query" 
                      render={(props) => <PhotoList {...props} 
                                            data={this.state.photos} 
                                            title={this.state.title} 
                                            loading={this.state.loading} />} /> 
                <Route component={PageNotFound} />             
              </Switch>
            }
          </div>
        </div> 
      </BrowserRouter>
    );
  }
}

