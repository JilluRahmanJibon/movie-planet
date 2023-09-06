import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
	const [endPoint, setEndPoint] = useState("day");

	const { data, loading } = useFetch(`/trending/all/${endPoint}`);
	// console.log(data);
	const onTabChange = tab => {
		setEndPoint(tab === "Day" ? "day" : "Week" ? "week" : "month");
	};

	return (
		<div className="carouselSection">
			<ContentWrapper>
				<span className="carousalTitle">Trending</span>
				<div className="desktop">
					<SwitchTabs
						data={["Day", "Week", "month"]}
						onTabChange={onTabChange}
					/>
				</div>
				<div className="mobile">
					<SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
				</div>
			</ContentWrapper>
			<Carousel data={data?.results} loading={loading} />
		</div>
	);
};

export default Trending;
