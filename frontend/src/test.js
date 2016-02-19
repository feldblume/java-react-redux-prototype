import React from 'react';
import ReactDOM from 'react-dom';

const extractor = (state = {id: 0, name: 'undefined'}, action) => {
	switch (action.type) {
		case 'EXTRACT_DATA':
			/*$.ajax({
		      url: 'http://172.17.88.128:8888/',
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		        state = data;
		        console.log('extract:')
		        console.log(state)
		        return state;		        
		      },
		      error: function(xhr, status, err) {
		        console.error(status, err.toString());
		        return state;
		      }
		    });*/	
		    return state;	
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
const store = createStore(extractor);

const render = () => {
	ReactDOM.render(<Component 
		data={store.getState()}
		onExtractData={() =>
			$.ajax({
		      url: 'http://172.17.88.128:8888/',
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		        state = data;
		        console.log('extract:')
		        console.log(state)

		        store.dispatch({
					type: 'EXTRACT_DATA',
					data: data
				})	        
		      },
		      error: function(xhr, status, err) {
		        console.error(status, err.toString());
		        return state;
		      }
		    })				
		} />, document.getElementById('app'));
}

store.subscribe(render);
render();