import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {URL} from "../../constants";

function PlaceItem(props) {
	console.log(props)
	// useState here to show the map/deletion warning only when we click on the modal
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	function openMapHandler() {
		setShowMap(true);
	}

	function closeMapHandler() {
		setShowMap(false);
	}

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		console.log("DELETING...");
		const id = props.id;
		const options = {
			method: "DELETE",
		};
		await fetch(`${URL}/api/places/${id}`, options);
		props.deletePlace(id);
	};
	return (
		<React.Fragment>
			<Modal show={showMap} onHide={closeMapHandler}>
				<Modal.Header closeButton>
					<Modal.Title>{props.address}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h2>Map</h2>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={closeMapHandler}>CLOSE</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showConfirmModal} onHide={cancelDeleteHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						Do you want to proceed and delete this place? Please
						note that it can't be undone thereafter.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={cancelDeleteHandler}>Cancel</Button>
					<Button
						variant="outline-danger"
						onClick={confirmDeleteHandler}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
			<li>
				<Card>
					<div>
						<img src={props.image} alt={props.title} />
					</div>
					<div>
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div>
						<Button variant="outline-info" onClick={openMapHandler}>
							VIEW ON MAP
						</Button>
						{/* forward this button to /places/id*/}
						<Link 
							to={{
								pathname: `/places/${props.id}`,
								state: {
									id: props.id,
									image: props.image,
									title: props.title,
									description: props.description,
									coordinates: props.coordinates,
									address: props.address

								}
							}}>
							<Button variant="outline-info">EDIT</Button>
						</Link>
						<Button
							variant="outline-danger"
							onClick={showDeleteWarningHandler}
						>
							DELETE
						</Button>
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
}

export default PlaceItem;
