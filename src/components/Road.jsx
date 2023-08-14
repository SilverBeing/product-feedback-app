/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Button, Flex, Text, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import {
	setUpvoted,
	setUpvotes,
} from "../features/allFeedback/allFeedbackSlice";

export default function Road({ data, borderColor }) {
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
		<Box
			padding="25px"
			w="100%"
			boxShadow="0px 1px 20px 0px rgba(0,0,0,0.1)"
			bg="white"
			borderRadius="13px"
			borderTop={`7px solid ${borderColor}`}>
			<Flex alignItems="center" gap="15px">
				<Box w="10px" height="10px" borderRadius="50%" bg={borderColor}></Box>
				<Text color="brandTextColor" textTransform="capitalize">
					{data.status}
				</Text>
			</Flex>
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
			<Text
				fontSize="14px"
				color="brandTextColor"
				fontWeight="500"
				minHeight="50px">
				{data.description}
			</Text>
			<Text
				mb="15px"
				bg="brandBgColor"
				w="max-content "
				padding="3px 10px"
				fontSize="14px"
				fontWeight="600"
				color="brandBlue"
				borderRadius="4px">
				{data?.category}
			</Text>
			<Flex justify="space-between">
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
		</Box>
	);
}
Road.propTypes = {
	data: PropTypes.object.isRequired,
	borderColor: PropTypes.string,
};
