import Header from "./Header"
import { connect } from "react-redux"

export default connect(() => ({
	isLoggedIn: true,
	userInitials: "TR"
}))(Header)