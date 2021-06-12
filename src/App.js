import React from 'react'
import './App.css';
import {Header} from './components/Header'
import Genres from './components/Genres'

function App() {
  return (
    <div className="App">
      
      <Header />
      
      <Genres />

    </div>
  );
}

export default App;

//from the API : list of genres
//select genre and get movies suggestions 
//from there get details of movie