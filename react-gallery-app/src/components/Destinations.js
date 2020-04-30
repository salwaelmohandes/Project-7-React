import React from 'react';

import { NavLink } from 'react-router-dom';

const Destinations = () => ( 
  <div>
    <nav className="main-nav">
      <ul className="photo-nav">          
        <li><NavLink key="SharmElSheikh" to={"/SharmElSheikh"}>Sharm</NavLink></li>
        <li><NavLink key="Hurgada" to="/Hurgada">Hurgada</NavLink></li> 
        <li><NavLink key="Taba" to="/Taba">Taba</NavLink></li>
      </ul> 
    </nav> 
    </div>     
);

export default Destinations;
