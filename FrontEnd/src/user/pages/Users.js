import React, {useState, useEffect} from "react";
import UsersList from "../components/UsersList";
import {URL} from '../../constants';
// this is an array of users



// this is the main homepage "/"
// Even if we are not log in, we can see the list of users and the places they shared
function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const res = await fetch(`${URL}/api/users`);
			console.log(res)
			const users = await res.json();
			setUsers(users)
			console.log(users);
		}

		getUsers();

	}, []);


	return <UsersList items={users} />;
}

export default Users;
