import React from "react"
import { newStore } from "./store/newStore"
import { ducks } from "./ducks"
import { Provider } from "react-redux"
import Routes from "./routes/routes"
import { BrowserRouter as Router } from "react-router-dom"

export class App extends React.PureComponent {
	constructor(props) {
		super(props)

		this.store = newStore()
		window.app = this // This exposes our app instance on window so that we can run debug commands from the console.
	}

	/**
	 * This exposes all our ducks on the app instance to allow us easier access for debugging.
	 */
	get ducks() {
		return ducks
	}
	/**
	 * Another helper that exposes the entire redux state on the app instance for debugging.
	 */
	getState() {
		return this.store.getState()
	}

	render() {
		return (
			<Provider store={this.store}>
				<Router>
					<Routes/>
				</Router>
			</Provider>
		)
	}
}
export default App