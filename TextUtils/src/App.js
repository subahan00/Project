// import logo from './logo.svg';
import './App.css';
// import Greet from './components/f'
import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Greet from './components/Greet';
import State from './components/State';

import Counter from './components/Counter'
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import myStyle from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const[text,setText]=useState('Enable Dark Mode')
    const [mode,setMode]=useState('light');
  const toggleMode=()=>{
if(mode==='light'){
  setMode('dark')
  document.body.style.backgroundColor='black'
}
else{
  setMode('light')
  document.body.style.backgroundColor='white'

}

  }
    return (
    <>
    <Router>
    <Navbar title="TextUtils" mode={mode} text={text} toggleMode={toggleMode}/>
      <div className="container my-3 " >
        {/* <About></About> */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          
          <Route path="/">
          <TextForm mode={mode} heading="Enter your text here "></TextForm>
          </Route>
        </Switch>
      
      </div>
      </Router>
    </>
  
  );

}


export default App;
