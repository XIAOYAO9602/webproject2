import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import Col from "react-bootstrap/Col";

const schema = yup.object({
	title: yup.string().required(),
	description: yup.string().required(),
	address: yup.string().required(),
	location: yup.string().required(),
	url: yup.string().required(),
});

// It's often beneficial (especially in React) to handle form validation via a library like Formik,
// isValid and isInvalid props can be added to form controls to manually apply validation styles.
function NewPlace() {
	const handleSubmit = async (values) => {
		const userId = localStorage.getItem("_id");
		console.log(userId);
		// This function received the values from the form
		// The line below extract the two fields from the values object.
		const { title, description, address, location, url } = values;
		const body = {
			title,
			description,
			address,
			location,
			url,
			_id: userId,
		};
		console.log(body);
		// post to the backend DB
		// The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		};
		const serverUrl = `http://localhost:3001/api/places/`;
		try {
			await fetch(serverUrl, options);
		} catch (error) {
			console.log("error here?", error);
		}
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={handleSubmit}
			initialValues={{}}
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
								placeholder="Enter title"
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
								placeholder="Enter description"
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
					<Form.Row>
						<Form.Group
							as={Col}
							md="4"
							controlId="validationFormikAddress"
						>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter address"
								name="address"
								value={values.address}
								onChange={handleChange}
								isValid={touched.address && !errors.address}
								isInvalid={!!errors.address}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.address}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group
							as={Col}
							md="4"
							controlId="validationFormikLocation"
						>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter location"
								name="location"
								value={values.location}
								onChange={handleChange}
								isValid={touched.location && !errors.location}
								isInvalid={!!errors.location}
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
							controlId="validationFormikUrl"
						>
							<Form.Label>Url</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter url"
								name="url"
								value={values.url}
								onChange={handleChange}
								isValid={touched.url && !errors.url}
								isInvalid={!!errors.url}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.title}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Button type="submit">Add place</Button>
				</Form>
			)}
		</Formik>
	);
}

export default NewPlace;
