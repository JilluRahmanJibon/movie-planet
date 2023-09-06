import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Upcoming = () => {
	const [endPoint, setEndPoint] = useState("movie");

	const { data, loading } = useFetch(`/${endPoint}/upcoming`);

	return (
		<div className="carouselSection">
			<ContentWrapper>
				<span className="carousalTitle">What's Popular</span>
			</ContentWrapper>
			<Carousel data={data?.results} loading={loading} endpoint={endPoint} />
		</div>
	);
};

export default Upcoming;
