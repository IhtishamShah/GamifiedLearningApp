import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'// require('./Quiz.js');
import Quiz from './Quiz.js';
import Lessons from './lessons.js';
import {Row, Col} from 'elemental'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import './index.css';



class App extends Component{
  render(){
	return(
	  	<div>
		<Row>
		 
			<Col sm="1/12"><Link to="/">Quizes</Link></Col>
			<Col sm="1/12"><Link to="/lessons">Lessons</Link></Col>
		</Row>
		<div className="content">
			{this.props.children}
		</div>
		</div>
	  

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