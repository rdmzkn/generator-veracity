import React from "react"
import PropTypes from "prop-types"

export const User = ({ isAuthenticated, id, fullName, email }) => {
	if (!isAuthenticated) return (
		<div>Please <a href="/login">log in</a> and revisit this page.</div>
	)

	return (
		<table>
			<tbody>
				<tr>
					<td>ID</td>
					<td>{id}</td>
				</tr>
				<tr>
					<td>Full name</td>
					<td>{fullName}</td>
				</tr>
				<tr>
					<td>Email</td>
					<td>{email}</td>
				</tr>
			</tbody>
		</table>
	)
}
User.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	id: PropTypes.string,
	fullName: PropTypes.string,
	email: PropTypes.string
}
export default User
