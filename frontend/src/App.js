import React from 'react';
import { BrowserRouter,Switch,Route,Redirect } from "react-router-dom";
import login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
<BrowserRouter>
<Switch>
<Route path="/login" component={login}/>

</Switch>
</BrowserRouter>
    </div>
  );
}

export default App;