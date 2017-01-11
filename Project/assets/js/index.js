import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'// require('./Quiz.js');
import Quiz from './Quiz.js';
import Lessons from './lessons.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
// // import './index.css';


// injectTapEventPlugin();
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
  			background: "#32C9E0",
  		}
  	}
	return(
		  <MuiThemeProvider>

	  	<div>
	  	<AppBar showMenuIconButton={false}
	  	title="E-Quiz"
	  	/>
	  	<div style={style.container}>
	  	<Link style={style.option} to="/">Quiz</Link>
		
		<Link style={style.option} to="/lessons">Lesson</Link>
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