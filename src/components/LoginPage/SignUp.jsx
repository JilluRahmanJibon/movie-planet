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
		reset,
	} = useForm();

	const onSubmit = data => {
		console.log(data);
		setLoading(true);

		const formData = new FormData();
		formData.append("image", selectedImage);
		const url = `https://api.imgbb.com/1/upload?key=27690bc33f1226affb494c6a408249ba`;

		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())

			.then(imgData => {
				const image = imgData.data.url;
				fetch("http://localhost:3000/user/signup", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						name: data?.name,
						email: data?.email,
						password: data?.password,
						image,
						status: "active",
					}),
				})
					.then(res => {
						console.log("111", res);
						reset();
						setLoading(false);
					})
					.catch(err => console.log(err));
			});
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
						type="text"
						name="name"
						{...register("name", { required: true })}
						placeholder="Enter your fullName ..."
					/>
					{errors.name && <span>This field is required</span>}

					<input
						required
						className="inputBox"
						type="name"
						name="email"
						{...register("email", { required: true })}
						placeholder="Enter your Email ..."
					/>
					{errors.email && <span>This field is required</span>}
					<input
						required
						className="inputBox"
						type="name"
						name="password"
						{...register("password", { required: true })}
						placeholder="Enter your Password ..."
					/>

					<div className="mt-3">
						{selectedImage ? (
							<div className="">
								<p className="selectImage">
									<label className="selectedImageTwo" htmlFor="uploadImage">
										Upload new Image
									</label>
								</p>

								<div className=" ">
									<PhotoProvider>
										<PhotoView src={URL.createObjectURL(selectedImage)}>
											<img
												className="LivePhoto"
												src={URL.createObjectURL(selectedImage)}
												alt=""
											/>
										</PhotoView>
									</PhotoProvider>
								</div>
							</div>
						) : (
							<label htmlFor="uploadImage" className="">
								<div className="imageColor">
									<p className="">Select a photo</p>
									<img
										src="https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png"
										alt=""
									/>
								</div>
							</label>
						)}
						<input
							required
							id="uploadImage"
							onChange={imageChange}
							accept="image/*"
							hidden
							type="file"
							className="opacity-0"
						/>
					</div>

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
