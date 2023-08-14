import { Box, Button, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Road from "./Road";

export default function MobileRoadMap({
	data,
	setData,
	allData,
	activeCategory,
	setActiveCategory,
	liveData,
	inProgress,
	planned,
}) {
	const categories = ["planned", "live", "in-progress"];
	const handleFilter = (category) => {
		const result = allData.filter((road) => road.status === category);
		setData(result);
		setActiveCategory(category);
	};
	return (
		<>
			<Flex w="100%" justify="space-between" mb="32px">
				{categories.map((category) => (
					<Button
						textTransform="capitalize"
						colorScheme="none"
						opacity={activeCategory === category ? "1" : "0.5"}
						fontSize="16px"
						color="brandHeadingColor"
						borderRadius="0"
						fontWeight="600"
						borderBottom={
							activeCategory === "planned" && category === "planned"
								? " 3px solid #ad1fea"
								: activeCategory === "live" && category === "live"
								? "3px solid #F49F85"
								: activeCategory === "in-progress" && category === "in-progress"
								? "3px solid #62bcfa"
								: ""
						}
						onClick={() => handleFilter(category)}
						key={category}>
						{category}{" "}
						{`(${
							category === "planned"
								? planned
								: category === "live"
								? liveData
								: inProgress
						})`}
					</Button>
				))}
			</Flex>
			<Box w="100%">
				{data.map((road) => (
					<Road
						data={road}
						borderColor={
							road.status === "planned"
								? "#ad1fea"
								: road.status === "live"
								? "#F49F85"
								: "#62bcfa"
						}
						key={road.id}
					/>
				))}
			</Box>
		</>
	);
}
MobileRoadMap.propTypes = {
	data: PropTypes.array,
	setData: PropTypes.func.isRequired,
	allData: PropTypes.array,
	activeCategory: PropTypes.string,
	setActiveCategory: PropTypes.func.isRequired,
	liveData: PropTypes.number,
	planned: PropTypes.number,
	inProgress: PropTypes.number,
};
