import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'// require('./Quiz.js');
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Quiz from './Quiz.js';
import Lessons from './lessons.js';
// import TimerProgress from './timer.js'


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import AppBar from 'material-ui/AppBar';
import './animate.css'
import './index.css';


const muiTheme = getMuiTheme({
  fontFamily: 'Bitter, serif',
  // inkBar:{
  //   background: "#ffc952",
  //   wdith: "50px",
  // },
})



class App extends Component{
  render(){
  	const style ={
  		option: {
  			fontSize: "25px",
  			margin: "5px",
  			textDecoration: "none",
  			color: "white",

  		},
  		container: {
  			background: "#393460",
  		}
  	}
	return(
		  <MuiThemeProvider muiTheme={muiTheme}>
     
	  	<div>
	  	<AppBar style={{background: "#34314c",}} showMenuIconButton={false}
	  	title="E-Quiz"
	  	/>
      

	  	<div  >
     
      <Tabs  inkBarStyle={{backgroundColor:"#ffc952"}} onChange={this.changeTab} >
	  	<Tab style={style.container}  label="Quiz" containerElement={<Link to="/"/>}/>
      <Tab style={style.container} label="Lessons" containerElement={<Link to="/lessons"/>}/>
    </Tabs>

    </div>
   
		<div className="content">
			{this.props.children}
		</div>
		</div>
		</MuiThemeProvider>

	  

	)
  }
}





 ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={Quiz}/>
  		<Route path="lessons" component={Lessons}></Route>
  	</Route>
  </Router>, 
  document.getElementById('container')
)
// ReactDOM.render(<App/>,)