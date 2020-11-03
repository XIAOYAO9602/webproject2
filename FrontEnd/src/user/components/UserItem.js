import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./UserItem.css";
// this is UserItem component that returns a single user item, display image, name and places
// use dynamic expression for Link component to change to different users page
function UserItem(props) {
	return (
		// link to dynamic user id using react dom
		// return the single user's first name, last name, number of places upload
		<Link to={`/${props.id}/places`}>
			<Card>
				<Card.Img
					className="user-image"
					variant="top"
					src={props.image}
					alt={props.name}
				/>
				<Card.Body>
					<Card.Text>
						{props.first_name} {props.last_name}{" "}
						{props.places.length}{" "}
						{props.places.length === 1 ? "Place" : "Places"}
					</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	);
}

export default UserItem;
