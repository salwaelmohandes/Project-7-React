import React from 'react';

import { Route, NavLink ,Switch, Redirect, BrowserRouter } from 'react-router-dom';
import PhotoList from './PhotoList';

const Destinations = ({match}) => ( 
  <div>
    <nav className="main-nav">
      <ul className="photo-nav">          
        <li><NavLink key="Sharm" to='/Sharm'>Sharm</NavLink></li>
        <li><NavLink key="Hurgada" to='/Hurgada'>Hurgada</NavLink></li> 
        <li><NavLink key="Taba" to='/Taba'>Taba</NavLink></li>
      </ul> 
    </nav> 
    
      {/* <BrowserRouter>
        <Switch>
          <Route exact path={match.path} render={ () => <Redirect to={`${match.path}/Sharm`} /> } />
          <Route path={`${match.path}/Sharm`} />
          <Route path={`${match.path}/Hurgada`} />
          <Route path={`${match.path}/Taba`} />
        </Switch>
      </BrowserRouter> */}
    </div>     
);

export default Destinations;
