import React from "react"
import { Route, Switch } from "react-router"
import Home from "../features/Home"
import NotFound from "../features/Home"

export const Routes = () => (
	<Switch>
		<Route path="/" exact component={Home}/>
		<Route exact component={NotFound}/>
	</Switch>
)
export default Routes