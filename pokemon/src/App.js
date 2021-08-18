import Home from './views/Home.js';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

export default class App extends Component {

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" render={() => <Home />} />
				</Switch>
			</div>
		)
	}
}
