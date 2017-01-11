import React, { Component } from 'react';
import ReactDOM from 'react-dom';



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
			score:null,
			// next: false,
		}

		this.onSelectOption = this.onSelectOption.bind(this);
		this.onOptionSubmit = this.onOptionSubmit.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
	}
	
	nextQuestion(index){
		// send request for next question.
		// let questions

		const questionList = this.state.questions;
		console.log("List", questionList)
		console.log("index", index)
		console.log("Entered")
		
		if (index>=questionList.length){
			this.setState({
				limit: true,
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
			})	
		}

	
	}

	componentDidMount(){
		// let q = question[0]
		// this.setState({
		// 	questions: q,
		// 	correct: q.correct,
		// })
		fetch(`http://localhost:8000/quiz/1`)
	    .then(response => response.json())
	   	.then(result => {
	   		this.setState({
				questions: result.Questions,
				current: 0,
				correct: result.Questions[0].correct
			})
	   	});

	 //    .then(result => console.log(result.Questions));

		// this.setState({
		// 	questions: question,
		// 	current: 0,
		// 	correct: question[0].correct
		// })
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
        }, 3000);


	}

	render(){
		const { questions, result, submitted, current, limit, score } = this.state;
		console.log(questions)
		// const current = questions ? this.state.current : 0 ;
		console.log("limit", limit)
		const q = questions ? questions[current] : null;
		console.log(q)
		console.log("submitted", submitted)
		return(
			<div>
				{(q
					? limit
						? <span>Quiz ended Result {score}/{questions.length}</span>
						:   <div className="row container">
							<div className="col s12 m6">
							<div class="card">
            				<div class="card-content white-text">
							<form onSubmit={this.onOptionSubmit}>
								<span className="card-title">{q.title}</span>
								{q.options.map((option) =>
									<label className="options">
										<input type="radio" name="options" checked={this.state.optionSelected==option} onChange={this.onSelectOption} value={option}/>
										{option}
									</label>
								)}
							<div className="card-action">
								<button type="submit" >Answer</button>
								{( submitted 
								? result
									? <span>Correct!</span>
									: <span>Incorrect</span>
								  
								: null
								)}
							</div>

							</form>
							
							</div>
							</div>
							</div>
							</div>
					: <span>Loading Quiz</span>
				)}
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