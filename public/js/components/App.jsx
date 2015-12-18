var React = require('react');

class App extends React.Component{
	render() {
		return <div> Hello {this.props.name} </div>
	}
}


React.render(<App name="Tom" />, document.getElementById('input'));