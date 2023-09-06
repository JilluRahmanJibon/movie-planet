import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Popular = () => {
	const [endPoint, setEndPoint] = useState("movie");

	const { data, loading } = useFetch(`/${endPoint}/popular`);
	// console.log(data);
	const onTabChange = tab => {
		setEndPoint(tab === "Movies" ? "movie" : "tv");
	};

	return (
		<div className="carouselSection">
			<ContentWrapper>
				<SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
				<span className="carousalTitle">What's Popular</span>
			</ContentWrapper>
			<Carousel data={data?.results} loading={loading} endpoint={endPoint} />
		</div>
	);
};

export default Popular;
