import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";

const schema = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
});

// It's often beneficial (especially in React) to handle form validation via a library like Formik,
// isValid and isInvalid props can be added to form controls to manually apply validation styles.
function Login() {
	// The useHistory hook gives you access to the history instance that you may use to navigate.
	// its like a link object but dont need a visual component on screen
	let history = useHistory();
	const handleSubmit = async (values) => {
		// This function received the values from the form
		// The line below extract the two fields from the values object.
		const { email, password } = values;
		var body = {
			password: password,
			email: email,
		};
		console.log(body);
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		};
		const url = "http://localhost:3001/api/users/login";
		try {
			const response = await fetch(url, options);
			const user = await response.json();
			// if we found the user based on the password/email values, then we set the user id to be in local storage
			// and make the page go back to home page (but log in)
			// Local Storage is a Web API native to modern web browsers.
			// It allows websites/apps to store data (simple and limited) in the browser, making that data available in future browser sessions.
			if (user) {
				localStorage.setItem("_id", user._id);
				history.push("/");
			} else {
				alert("Login Failed try again");
			}
		} catch (error) {
			console.error(error);
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
							controlId="validationFormikEmail"
						>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email"
								name="email"
								value={values.email}
								onChange={handleChange}
								isValid={touched.email && !errors.email}
								isInvalid={!!errors.email}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group
							as={Col}
							md="4"
							controlId="validationFormikPassword"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter password"
								name="password"
								value={values.password}
								onChange={handleChange}
								isValid={touched.password && !errors.password}
								isInvalid={!!errors.password}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Button type="submit">Log in</Button>
				</Form>
			)}
		</Formik>
	);
}

export default Login;
