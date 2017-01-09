import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// var ReactDOM = require('react-dom')


let questions = [
	{
		question: 'what dis?',
		options: ['yes', 'no', 'brah'],
		correct: 'yes'
	},
	{
		question: 'overwatch',
		options: ['pro', 'noob', 'pronoob'],
		correct: 'noob'
	}
]

const Question = ({question}) =>
	<div>
		{question.map((item)=>
			<div>
			<span>
				{item.question}
			</span>
			<ul>
				{item.options.map((opt)=>
					<li>{opt}</li>
				)}
			</ul>
			</div>
		)}
	</div>



var Hello = React.createClass ({
    render: function() {
        return (
        	<div>
            <h1>
            Hello, React! Bro!
            </h1>
            <Question question={questions}/>
            </div>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('container'))