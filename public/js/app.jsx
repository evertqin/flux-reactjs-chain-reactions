var React = require('react');
var ReactDOM = require('react-dom');

var AppComponent0 = require('./components/AppComponent0.jsx');

class App extends React.Component{
	render() {
		return (<div>
			<AppComponent0 />
			</div>);
	}
}


ReactDOM.render(<App name="Tom" />, document.getElementById('input'));