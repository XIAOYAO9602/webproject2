import React from "react";
import UserItem from "./UserItem.js";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// get list of users from outside source
function UsersList(props) {
	//output no users found before we have any users in the list
	//or ouput a list of users if we have any
	// we map the list of js objects from props.items to jsx objects
	if (props.items.length === 0) {
		return (
			<Card className="text-center">
				<h2>No users found.</h2>
			</Card>
		);
	}

	return (
		<Container>
			<Row>
				<Col>
					<ListGroup>
						{props.items.map((user) => {
							return (
								<UserItem
									key={user._id}
									id={user._id}
									image={user.image}
									first_name={user.first_name}
									last_name={user.last_name}
									places={user.places}
								/>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default UsersList;
