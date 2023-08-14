/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
	setUpvoted,
	setUpvotes,
} from "../features/allFeedback/allFeedbackSlice";
export default function Suggestion({ data }) {
	const dispatch = useDispatch();
	const handleVote = () => {
		dispatch(setUpvoted({ index: data.id, data: !data.upvoted }));
		data.upvoted === false
			? dispatch(setUpvotes({ index: data.id, data: data.upvotes + 1 }))
			: dispatch(
					dispatch(setUpvotes({ index: data.id, data: data.upvotes - 1 }))
			  );
	};
	return (
		<Flex
			bg="white"
			padding="30px 30px"
			flexWrap={{ base: "wrap", md: "nowrap" }}
			gap="25px"
			m="22px 0"
			w="100%"
			borderRadius="10px">
			<Box display={{ base: "none", md: "flex" }}>
				<Button
					onClick={handleVote}
					display="block"
					textAlign="center"
					h="65px"
					colorScheme="none"
					fontWeight="600"
					color={data.upvoted === true ? "white" : "brandHeadingColor"}
					borderRadius="10px"
					bg={data.upvoted === true ? "brandBlue" : "brandBgColor"}>
					{" "}
					<MdKeyboardArrowUp
						style={{ color: data.upvoted === true ? "white" : "#4661e6" }}
					/>
					{data?.upvotes}
				</Button>
			</Box>
			<Box>
				<Link
					to={`/view/feedback/${data.id.toString()}`}
					style={{
						marginBottom: "13px",
						fontSize: "18px",
						fontWeight: "800",
						color: "#3a4374",
					}}>
					{data?.title}
				</Link>
				<Text fontSize="15px" color="brandTextColor">
					{data?.description}
				</Text>
				<Text
					mt="10px"
					bg="brandBgColor"
					w="max-content "
					padding="3px 10px"
					fontSize="14px"
					fontWeight="600"
					color="brandBlue"
					borderRadius="4px">
					{data?.category}
				</Text>
			</Box>
			<HStack ml="auto" display={{ base: "none", md: "flex" }}>
				<FaComment style={{ color: "#CDD2EE" }} />
				<Text color="brandHeadingColor" fontWeight="800">
					{data?.comments.length}
				</Text>
			</HStack>
			<Flex
				justify="space-between"
				display={{ base: "flex", md: "none" }}
				w="100%">
				<Button
					textAlign="left"
					padding="5px 10px"
					h="30px"
					onClick={handleVote}
					leftIcon={
						<MdKeyboardArrowUp
							style={{
								color: data.upvoted === true ? "white" : "#4661e6",
							}}
						/>
					}
					colorScheme="none"
					borderRadius="5px"
					fontSize="14px"
					fontWeight="600"
					color={data.upvoted === true ? "white" : "brandHeadingColor"}
					bg={data.upvoted === true ? "brandBlue" : "brandBgColor"}>
					{data?.upvotes}
				</Button>
				<HStack ml="auto">
					<FaComment style={{ color: "#CDD2EE" }} />
					<Text color="brandHeadingColor" fontWeight="800">
						{data?.comments.length}
					</Text>
				</HStack>
			</Flex>
		</Flex>
	);
}
Suggestion.propTypes = {
	data: PropTypes.object.isRequired,
	index: PropTypes.number,
};
