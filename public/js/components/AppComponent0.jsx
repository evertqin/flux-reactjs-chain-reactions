var React = require('react');

class AppComponent0 extends React.Component{
	constructor(props){
		super(props);
		// Operations usually carried out in componentWillMount go here
	}

	static propTypes = {
		url: React.PropTypes.string.isRequired,
	}
}

module.exports = AppComponent0;