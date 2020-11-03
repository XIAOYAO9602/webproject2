import React from "react";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const schema = yup.object({
	title: yup.string().required(),
	description: yup.string().required(),
});

function UpdatePlace(props) {
	// find the place Id from the URL by using useParams
	const identifiedPlace = useLocation().state;

	if (!identifiedPlace) {
		return (
			<Card>
				<h2>No places found!</h2>
			</Card>
		);
	}


	const handleSubmit = async (values) => {
		// This function received the values from the form
		// The line below extract the two fields from the values object.
		const { title, description } = values;
		const body = {
			...identifiedPlace,
			title: title,
			description: description,
		}
		console.log(body);
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		};
		const url = `http://localhost:3001/api/places/${identifiedPlace.id}`;
		try {
			await fetch(url, options);
			
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={handleSubmit}
			initialValues={{
				title: identifiedPlace.title,
				description: identifiedPlace.description,
			}}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				isValid,
				errors,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					{/*handleSubmit has to send the input to the backend server in the future*/}
					<Form.Row>
						<Form.Group
							as={Col}
							md="4"
							controlId="validationFormikTitle"
						>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								name="title"
								value={values.title}
								onChange={handleChange}
								isValid={touched.title && !errors.title}
								isInvalid={!!errors.title}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.title}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group
							as={Col}
							md="4"
							controlId="validationFormikDescription"
						>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								name="description"
								value={values.description}
								onChange={handleChange}
								isValid={
									touched.description && !errors.description
								}
								isInvalid={!!errors.description}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.description}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					<Button type="submit">Update place</Button>
				</Form>
			)}
		</Formik>
	);
}

export default UpdatePlace;
