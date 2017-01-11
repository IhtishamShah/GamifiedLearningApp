import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let lesson = [
	{
		original: ["my","name","is","genji"],
		translated: ["maera", "naam","hay","need healing"]
	},
	{
		original: ["who", "dis","vat", "dis"],
		translated: ["kya", "ho", "raha", "hay"]
	},
	{
		original: ["bro", "overwatc","bro", "overwatc"],
		translated: ["khaem", "sta", "raha", "sta"]
	}
]

class Lessons extends Component{
	constructor(props){
		super(props);
		this.state = {
			lessons: null,
			current: null
		}
		this.iterateLesson = this.iterateLesson.bind(this);
		
	}


	iterateLesson(index){
		this.setState({
			current: index
		})
	}

	componentDidMount(){
		fetch(`1`)
	    .then(response => response.json())
	    .then(result => console.log(result));

		this.setState({
			lessons: lesson,
			current: 0
		})
	}

	render(){
		const {lessons, current} = this.state;
		console.log("lesson: ", lesson);
		console.log("current: ", current);
		
		const l = lesson ? lesson[current] : null;
		console.log("current lesson: ", l);

		let prevButton = <button type="button" onClick={()=> this.iterateLesson(current-1)}>Previous</button>
		let nextButton = <button type="button" onClick={()=> this.iterateLesson(current+1)}>Next</button>
		let Menu = () =>
				<div>
				{prevButton}
				{nextButton}
				</div>
		let button = null;
		if(current==0){
			button = nextButton
		}
		else if ((current+1)==lesson.length){
			button = prevButton
		}
		else{
			button = <Menu />
		}


		return(
			<div>
				{(l
				  ? <div>
				  		<div>
				 		{l.original.map((item)=>
							<span style={{padding: '5px'}}>{item}</span>
				 		)}
						</div>
						<div>
				 		{l.translated.map((item)=>
							<span style={{padding: '5px'}}>{item}</span>
				 		)}
				 		</div>
				 		
						{button}
				 	</div>
				   : null

				)}
			</div>
		)

	}
}

ReactDOM.render(<Lessons />, 
	document.getElementById('container'))