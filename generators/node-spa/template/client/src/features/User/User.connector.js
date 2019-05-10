import { connect } from "react-redux"
import User from "./User"

import * as user from "../../ducks/user.duck"

export default connect((state) => ({
	isAuthenticated: user.isAuthenticated(state),
	id: user.getId(state),
	fullName: user.getFullName(state),
	email: user.getEmail(state)
}))(User)