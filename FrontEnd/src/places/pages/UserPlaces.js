import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { URL } from '../../constants';

function UserPlaces() {
	//  In React Router, we use the word "params" to describe dynamic segments of the URL.
	// useParams().userId hook to fiiter out places that only have a matching createrId to UserId on the page
	const userId = useParams().userId;

	const [user, setUser] = useState({places: []});

	const deletePlace = (id) => {
		const places = user.places;
		const placeIndex = places.findIndex(place => place._id === id);
		console.log('found', placeIndex)
		places.splice(placeIndex, 1);
		
		console.log('user after deletion', user)
		setUser(prevState => ({...user, places}));
	}

	useEffect(() => {
		const getUserById = async () => {
			const res = await fetch(`${URL}/api/users/user/${userId}`);
			console.log(res)
			const user = await res.json();
			setUser(user)
		
		}

		getUserById();

	}, [userId]);

	return <PlaceList deletePlace={deletePlace} items={user.places} />;
}

export default UserPlaces;
