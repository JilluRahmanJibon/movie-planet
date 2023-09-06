import React from "react";
import "./style.scss";
import HeroBanner from "./HeroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Upcoming from "./Upcoming/Upcomming";

const Home = () => {
	return (
		<div className="homePage">
			<HeroBanner />
			<Trending />
			<Popular />
			<TopRated />
			<Upcoming />
		</div>
	);
};

export default Home;
