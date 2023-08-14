import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Road from "./Road";
import MobileRoadMap from "./MobileRoadMap";
export default function Roadmap({ all_feedbacks }) {
	const plannedFeedback = all_feedbacks.filter(
		(feedback) => feedback.status === "planned"
	);
	const inProgressFeedback = all_feedbacks.filter(
		(feedback) => feedback.status === "in-progress"
	);

	const liveFeedback = all_feedbacks.filter(
		(feedback) => feedback.status === "live"
	);
	const navigate = useNavigate();
	const allData = [...plannedFeedback, ...liveFeedback, ...inProgressFeedback];
	const [activeRoad, setActiveRoad] = useState(plannedFeedback);
	const [activeCategory, setActiveCategory] = useState("planned");

	return (
		<Box
			w={{ base: "100%", md: "80%" }}
			margin="auto"
			padding={{ base: "0", md: "100px 0" }}>
			<Flex
				justify="space-between"
				alignItems="center"
				width="100%"
				mb="30px"
				borderRadius={{ base: "0", md: "10px" }}
				bg="brandHeadingColor"
				color="white"
				padding="20px">
				<Box>
					<Button
						colorScheme="none"
						display="block"
						textAlign="left"
						p="0"
						color="white"
						fontWeight="700"
						fontSize={{ base: "12px", md: "14px" }}
						onClick={() => navigate(-1)}
						leftIcon={<MdKeyboardArrowLeft />}>
						Go Back
					</Button>
					<Heading fontSize={{ base: "17px", md: "20px" }}>RoadMap</Heading>
				</Box>
				<Box>
					<Link
						to="/add/feedback"
						style={{
							backgroundColor: "#ad1fea",
							padding: "15px 15px",
							color: "white",
							borderRadius: "10px",
							fontWeight: "800",
						}}>
						+ Add Feedback
					</Link>
				</Box>
			</Flex>
			<Box
				display={{ base: "block", md: "none" }}
				w={{ base: "95%", md: "auto" }}
				margin="auto">
				<MobileRoadMap
					data={activeRoad}
					liveData={liveFeedback.length}
					inProgress={inProgressFeedback.length}
					planned={plannedFeedback.length}
					setData={setActiveRoad}
					allData={allData}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
			</Box>
			<Grid
				w="100%"
				h="100%"
				gap="32px"
				display={{ base: "none", md: "grid" }}
				gridTemplateColumns={{ base: "1, 1fr", md: "repeat(3, 1fr)" }}
				justifyContent="start">
				<VStack alignItems="start" gap="18px">
					<Box>
						<Heading fontSize="20px" color="brandHeadingColor" mb="5px">
							Planned {`(${plannedFeedback.length})`}
						</Heading>
						<Text fontSize="14px" color="brandTextColor">
							Ideas prioritized for research
						</Text>
					</Box>
					{plannedFeedback.map((plan) => (
						<Road data={plan} key={plan.id} borderColor="#F49F85" />
					))}
				</VStack>
				<VStack alignItems="start" gap="18px">
					<Box>
						<Heading fontSize="20px" color="brandHeadingColor" mb="5px">
							In-Progress {`(${inProgressFeedback.length})`}
						</Heading>
						<Text fontSize="14px" color="brandTextColor">
							Currently being developed
						</Text>
					</Box>
					{inProgressFeedback.map((plan) => (
						<Road data={plan} key={plan.id} borderColor="#ad1fea" />
					))}
				</VStack>
				<VStack alignItems="start" gap="18px">
					<Box>
						<Heading fontSize="20px" color="brandHeadingColor" mb="5px">
							Live {`(${liveFeedback.length})`}
						</Heading>
						<Text fontSize="14px" color="brandTextColor">
							Released Features
						</Text>
					</Box>
					{liveFeedback.map((plan) => (
						<Road data={plan} key={plan.id} borderColor="#62bcfa" />
					))}
				</VStack>
			</Grid>
		</Box>
	);
}
Roadmap.propTypes = {
	all_feedbacks: PropTypes.array,
};
