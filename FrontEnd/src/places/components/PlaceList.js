import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PlaceItem from "./PlaceItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function PlaceList(props) {

	//output no places found before we have any places in the list
	//or ouput a list of places if we have any
	// we map the list of js objects from props.items to jsx objects
	if (props.items.length === 0) {
		return (
			<Card className="text-center">
				<h2>No places found. Do you want to create one?</h2>
				<Link to="/places/new">
					<Button>Share Places</Button>
				</Link>
			</Card>
		);
	}

	return (
		<Container>
			<Row>
				<Col>
					<ListGroup>
						{props.items.map((place) => {
							return (
								<PlaceItem
									deletePlace={props.deletePlace}
									key={place._id}
									id={place._id}
									image={place.url}
									title={place.title}
									description={place.description}
									address={place.address}
									coordinates={place.location}
								/>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default PlaceList;
