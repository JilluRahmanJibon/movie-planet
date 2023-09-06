import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "./style.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HeroBannerRight() {
	const { url } = useSelector(state => state.home);
	const [endPoint, setEndPoint] = useState("day");
	const { data, loading } = useFetch(`/trending/all/${endPoint}`);
	const navigate = useNavigate();

	return (
		<>
			<div className="heroCarouselTitle">
				<h1 className="">Upcoming Movies</h1>
			</div>
			<Swiper
				slidesPerView={3}
				spaceBetween={10}
				navigation={true}
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Pagination]}
				className="mySwiper">
				{data?.results?.map(item => {
					const posterUrl = item.poster_path
						? url.poster + item.poster_path
						: PosterFallback;
					return (
						<div key={item.id}>
							<SwiperSlide>
								<div>
									<img
										onClick={() =>
											navigate(`/${item.media_type || endpoint}/${item.id}`)
										}
										style={{
											width: "150px",
											height: "200px",
											cursor: "pointer",
										}}
										src={posterUrl}
									/>
								</div>
							</SwiperSlide>
						</div>
					);
				})}
			</Swiper>
		</>
	);
}
