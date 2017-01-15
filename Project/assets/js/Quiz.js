import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import LinearProgress from 'material-ui/LinearProgress';
import  {Circle} from 'react-progressbar.js';
import { Step, Stepper, StepLabel,} from 'material-ui/Stepper';

import './flexboxgrid.min.css'
// var ReactDOM = require('react-dom')

let question = [
	{
		title: 'what dis?',
		options: ['yes', 'no', 'brah'],
		correct: 'yes'
	},
	{
		title: 'what dis who dis?',
		options: ['high', 'noon', 'need healing'],
		correct: 'noon'
	}
]



class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: null, 
			optionSelected: null,
			correct: null,
			result: null,
			submitted: false,
			current: null,
			limit:false,
			score:0,
			timerCount:1,
			completed: 0,
			// next: false,
		}

		this.onSelectOption = this.onSelectOption.bind(this);
		this.onOptionSubmit = this.onOptionSubmit.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.questionTimer = this.questionTimer.bind(this);
	}
	
	questionTimer(){
		const {timerCount, current} = this.state;
		if(timerCount>=30){
			this.nextQuestion(current+1);
		}
		else{
			this.setState({timerCount:this.state.timerCount+1})

		}
	}

	nextQuestion(index){
		// send request for next question.
		// let questions

		const questionList = this.state.questions;
		const completed = this.state.completed+1;
		console.log("List", questionList)
		console.log("index", index)
		console.log("Entered")
		
		if (index>=questionList.length){
			this.setState({
				limit: true,
				completed: index,
			})
		}
		else{
			this.setState({
				// questions: {
				// 	qList: question,
					
				// },
				current: index,
				correct: questionList[index].correct,
				optionSelected: null,
				result: null,
				submitted: false,
				limit: false,
				completed: completed,
				timerCount:1,
			})	
		}

	
	}

	componentDidMount(){
		// let q = question[0]
		// this.setState({
		// 	questions: q,
		// 	correct: q.correct,
		// })
		// fetch(`http://localhost:8000/quiz/1`)
	 //    .then(response => response.json())
	 //   	.then(result => {
	 //   		this.setState({
		// 		questions: result.Questions,
		// 		current: 0,
		// 		correct: result.Questions[0].correct
		// 	})
	 //   	});

	 //    .then(result => console.log(result.Questions));
		let time = setInterval(this.questionTimer,1000);
		this.setState({
			questions: question,
			current: 0,
			correct: question[0].correct,
			time: time,
		})
	}





	onSelectOption(event){
		this.setState({optionSelected: event.target.value});
	}

	onOptionSubmit(event){
		event.preventDefault();
		const {optionSelected, current, score} = this.state;
		let updatedScore = score;
		if (optionSelected == this.state.correct){
			updatedScore++;
			this.setState({result: true, submitted: true, score: updatedScore})

		}
		else{
			this.setState({result: false, submitted: true})
		}
		var that = this;
		setTimeout(function() {
           that.nextQuestion(current+1);
        }, 1000);


	}

	render(){
		const { questions, result, submitted, current, limit, score, timer, completed } = this.state;
		console.log(questions)
		// const current = questions ? this.state.current : 0 ;
		console.log("limit", limit)
		const q = questions ? questions[current] : null;
		console.log(q)
		console.log("submitted", submitted)
		 var options = {
            strokeWidth: 2
        };
		let arr= []
        if(questions){
			for(let i=1;i<=questions.length;i++){
				arr.push(i);

			}
        }

        var options = {
            strokeWidth: 2
        };

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        var containerStyle = {
            width: '75px',
            height: '75px',
            "font-size": "50px",
			color: "#B03232",

        };
        
        console.log("arr",arr);

		return(
			<div>
			 <div className="row fadeInLeft">
			<div className="col-md-6 col-md-offset-3">
			<div className="questions slideInRight">
			<div className="row">

				<div className="col-md-12">

				<Stepper className="zoomInDown" activeStep={completed}>
				
				{arr.map((item)=>
					<Step>
						<StepLabel></StepLabel>
					</Step>
				)}

				<Step>
					<StepLabel>Result</StepLabel>
				</Step>
					
		     
				</Stepper>
				</div>
			</div>
				{(q
					? limit
						? <span>Quiz ended Result {score}/{questions.length}</span>
						:  
							
							<div>
							<form onSubmit={this.onOptionSubmit}>
								<h3>Q. {q.title}</h3>

								<div className="row">
								<div className="col-md-6">
								<RadioButtonGroup onChange={this.onSelectOption} name="options" defaultSelected="not_light">
								{q.options.map((option) =>
									<RadioButton
								        value={option}
								        label={option}		
								      />
									
								)}
								    </RadioButtonGroup>
								</div>
								
								<div className="col-md-3 col-md-offset-3" >
								<div className="row top-md">
									<div className="col-md-12">
									<Circle className="timer"
						                progress={this.state.timerCount/30}
						                text={this.state.timerCount}
						                options={options}
						                initialAnimate={true}
						                containerStyle={containerStyle}
						                containerClassName={'.progressbar'} />
									</div>
									<div className="col-md-12">
										{( submitted 
										? result
											? <span>Correct!</span>
											: <span>Incorrect</span>
										  
										: null
										)}
									</div>
								</div>
								
								</div>
								</div>
								<div className="row">
								<div className="col-md-4 col-md-offset-4">
								<RaisedButton backgroundColor="#83EAEC" style={{ width: "100%","margin-top": "30px",}} type="submit"> Answer </RaisedButton>
								</div>
								</div>

							</form>
							
							</div>
							
							
					: <span>Loading Quiz</span>
				)}
				</div>
				</div>
				</div>
			</div>
		)
	}

}

export default Quiz;
// const Question = ({onSubmit,onChange, onClick, list, submit}) => 
// 	<form onSubmit={onSubmit}>
// 		<span>{list.q}</span>
// 		{list.options.map((option) =>
// 			<label>
// 				<input type="radio" name="options" onChange={onChange} value={option}/>
// 				{option}
// 			</label>
// 		)}
// 		{(submit 
// 			? <button type="button" onClick={onClick}>Next</button>
// 			: <button type="submit">Answer</button>
// 		)}
// 	</form>
	

// ReactDOM.render(<Quiz />, 
// 	document.getElementById('container'))