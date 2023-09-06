import { useForm } from "react-hook-form";
import "./style.scss";
import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import LoginSpinner from "../LoginSpinner/LoginSpinner";

const SignUp = () => {
	const [selectedImage, setSelectedImage] = useState();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		console.log(data);
		setLoading(true);

		fetch(url, {
			method: "POST",
			body: formData,
		}).then(res => {
			const image = res?.data?.display_url;
			fetch("http://localhost:3000/user/signup", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: data?.name,
					username: data?.user,
					password: data?.password,
					image: image,
					status: "active",
				}),
			})
				.then(update => {
					console.log("111", update);
					console.log("object");
					setLoading(false);
				})
				.catch(err => console.log(err));
		});
	};

	const postData = (name, username, password, image) => {
		console.log(name, username, password, image);
		const data = {};
	};

	const imageChange = e => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
		}
		console.log(e);
	};

	return (
		<div className="signInMain">
			<div className="opacity-layer"></div>
			<div className="from">
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						required
						className="inputBox"
						type="name"
						name="email"
						{...register("user", { required: true })}
						placeholder="Enter your Email ..."
					/>
					{errors.email && <span>This field is required</span>}
					<input
						required
						className="inputBox"
						type="name"
						name="email"
						{...register("user", { required: true })}
						placeholder="Enter your Password ..."
					/>

					<br />
					{loading ? (
						<LoginSpinner />
					) : (
						<input className="formSubmit" type="submit" />
					)}
				</form>
			</div>
		</div>
	);
};

export default SignUp;
