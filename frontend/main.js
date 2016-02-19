import React from 'react';
import ReactDOM from 'react-dom';
//import App from './src/test.js';


const reducer = (state = {id: 0, name: 'undefined'}, action) => {
	switch (action.type) {
		case 'EXTRACT_DATA':			
		    console.log('dispatch:');
			console.log(action.data)	
		    return action.data;	
		default:
			return state;

	}
}

class Component extends React.Component {	
	render() {
		console.log('render:');
		console.log(this.props.data)
		return (
			<div>
				<h1>Id: {this.props.data.id}</h1>
				<h3>Name: {this.props.data.name}</h3>
				<button onClick={this.props.onExtractData}>extract data from server</button>
			</div>
		);
	}
}

const { createStore } = Redux;
const store = createStore(reducer);

const render = () => {
	ReactDOM.render(<Component 
		data={store.getState()}
		onExtractData={() =>
			$.ajax({
		      url: 'http://172.17.88.128:8888/',
		      dataType: 'json',
		      cache: false,
		      success: function(testData) {

		        console.log('extract:')
		        console.log(testData)

		        store.dispatch({
					data: testData,
					type: 'EXTRACT_DATA'
				})	        
		      },
		      error: function(xhr, status, err) {
		        console.error(status, err.toString());
		      }
		    })				
		} />, document.getElementById('app'));
}

store.subscribe(render);
render();