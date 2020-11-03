import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import { URL } from "../../constants";

// this is the main homepage "/"
// Even if we are not log in, we can see the list of users and the places they shared
function Users() {
	// set the initial users to be an emtpy array
	const [users, setUsers] = useState([]);

	// useEffect to wait for the backend(3001) and fetch the list of users
	useEffect(() => {
		const getUsers = async () => {
			const res = await fetch(`${URL}/api/users`);
			console.log(res);
			// converting users data to json objects
			const users = await res.json();
			// set our emtpy array to be the list of users
			setUsers(users);
			console.log(users);
		};

		getUsers();

		// [] means not depending on anything that changes to call the function again
	}, []);

	return <UsersList items={users} />;
}

export default Users;
