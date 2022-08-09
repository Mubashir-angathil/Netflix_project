import React from "react";
import NavBar from "./components/navBar/NavBar";
import Banner from "./components/Banner/Banner";
import RowPosters from "./components/RowPost/RowPosters";
 import './App.css'
import { Actions, NetflixOrginals } from "./urlConfigFile";
function App() {
  return (
   <div>
     <NavBar/>
     <Banner/>
     <RowPosters  title='NetflixOrginals' url={NetflixOrginals}/> 
     <RowPosters title='Actions' isSmall url={Actions}/> 
   </div>
  );
}

export default App;
