import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel,} from 'material-ui/Stepper';


// let lesson = [
// 	{
// 		original: ["my","name","is","genji"],
// 		translated: ["maera", "naam","hay","need healing"]
// 	},
// 	{
// 		original: ["who", "dis","vat", "dis"],
// 		translated: ["kya", "ho", "raha", "hay"]
// 	},
// 	{
// 		original: ["bro", "overwatc","bro", "overwatc"],
// 		translated: ["khaem", "sta", "raha", "sta"]
// 	}
// ]

class Lessons extends Component{
	constructor(props){
		super(props);
		this.state = {
			lessons: null,
			current: null,
			completed: 0,
		}
		this.iterateLesson = this.iterateLesson.bind(this);	
	}


	iterateLesson(iter){
		const {completed, current} = this.state;
		if(iter<current){
			this.setState({
			current: iter,
			completed: completed-1
			})
		}
		else{
			this.setState({
			current: iter,
			completed: completed+1
			})
		}


		

	}

	componentDidMount(){
		fetch(`http://localhost:8000/lesson/1`)
	    .then(response => response.json())
	    .then(result => {
	    	console.log("result", result.Lesson)
	    	this.setState({
			lessons: result.Lesson,
			current: 0
			})

	    });

		// this.setState({
		// 	lessons: lesson,
		// 	current: 0
		// })
	}

	render(){
		const {lessons, current, completed} = this.state;
		console.log("lesson: ", lessons);
		console.log("current: ", current);
		
		const l = lessons ? lessons[current] : null;
		console.log("current lesson: ", l);
		let arr= []
        if(lessons){
			for(let i=1;i<=lessons.length;i++){
				arr.push(i);

			}
        }
		const style = {
			margin: "5px",
		}
		// let prevButton = <RaisedButton style={style} onClick={()=> this.iterateLesson(current-1)}>Previous</RaisedButton>
		// let nextButton = <RaisedButton style={style} onClick={()=> this.iterateLesson(current+1)}>Next</RaisedButton>
		// let Menu = () =>
		// 		<div>
		// 		{prevButton}
		// 		{nextButton}
		// 		</div>
		// let button = null;
		// if(current==0){
		// 	button = nextButton
		// }
		// else if ((current+1)==lessons.length){
		// 	button = prevButton
		// }
		// else{
		// 	button = <Menu />
		// }


		return(
			<div>
			 <div className="row">
			<div className="col-md-6 col-md-offset-3">
			<div className="questions enterRight">
			<div className="row">

				<div className="col-md-12">

				<Stepper activeStep={completed}>
				
				{arr.map((item)=>
					<Step>
						<StepLabel></StepLabel>
					</Step>
				)}
					
		     
				</Stepper>
				</div>
			</div>
				{(l
				  ? <div>
				  		<h3>Description</h3>
				  		<div className="row">
						<div className="col-md-6 col-md-offset-3 lessons">
				 		{l.original.map((item)=>
							<span className = "words">{item}</span>
				 		)}
						</div>
						</div>

						<div className="row">
						<div className="col-md-6 col-md-offset-3 lessons">
				 		{l.translated.map((item)=>
							<span className = "words" >{item}</span>
				 		)}
				 		</div>
				 		</div>
				 		<div className="row lesson-btn">
				 		<div className="col-md-3 col-md-offset-3">
						<RaisedButton labelColor="#FFFFFF" backgroundColor="#ffc952" disabled={current==0} onClick={()=> this.iterateLesson(current-1)}>Previous</RaisedButton>
						</div>
						<div className="col-md-3" >
						<RaisedButton labelColor="#FFFFFF" backgroundColor="#ffc952" disabled={(current+1)==lessons.length} onClick={()=> this.iterateLesson(current+1)}>Next</RaisedButton>
						</div>
						</div>
				 	</div>
				   : null

				)}
			</div>
				</div>
				</div>
				</div>
		)

	}
}

export default Lessons;

// ReactDOM.render(<Lessons />, 
// 	document.getElementById('container'))