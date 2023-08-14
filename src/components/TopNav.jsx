import { Box, Button, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import badge from "../assets/others/icon-suggestions.svg";
import { BsCheckLg } from "react-icons/bs";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function TopNav({ total, sortBy, handleSort }) {
	const categories = [
		"Most Upvotes",
		"Least Upvotes",
		"Most Comments",
		"Least Comments",
	];
	const [dropdown, setDropdown] = useState(false);
	return (
		<Flex
			bg="brandHeadingColor"
			justify="space-between"
			color="white"
			padding="10px 20px"
			borderRadius={{ base: "0", md: "10px" }}>
			<HStack gap={{ base: "20px", md: "40px" }} alignItems="center">
				<HStack gap="10px" display={{ base: "none", md: "flex" }}>
					<img src={badge} alt="" />
					<Heading fontSize="18px">{total} Suggestions</Heading>
				</HStack>
				<Box position="relative">
					<Flex alignItems="center">
						<Text fontSize={{ base: "12px", md: "14px" }} mr="10px">
							Sort by:{" "}
						</Text>
						<Flex
							fontSize={{ base: "12px", md: "14px" }}
							color="white"
							fontWeight="700"
							textTransform="capitalize"
							padding="0px"
							cursor="pointer"
							alignItems="center"
							gap="4px"
							colorScheme="none"
							onClick={() => setDropdown(!dropdown)}>
							<Text>{sortBy}</Text>
							<RiArrowDropDownLine style={{ fontSize: "25px" }} />
						</Flex>
					</Flex>
					{dropdown && (
						<Box
							position="absolute"
							top="40px"
							w={{ base: "190px", md: "200px" }}
							borderRadius="10px"
							left="50%"
							transform="translateX(-50%)"
							boxShadow="0px 0px 30px 1px rgba(0, 0, 0, 0.1)"
							bg="white"
							zIndex="9"
							padding="20px 0">
							{categories.map((category) => (
								<Button
									display="flex"
									textAlign="left"
									fontSize="14px"
									textTransform="capitalize"
									w="100%"
									h="50px"
									alignItems="center"
									justifyContent="space-between"
									colorScheme="none"
									borderRadius="0px"
									color="brandTextColor"
									borderBottom="1px solid #F2F4FF"
									key={category}
									onClick={() => handleSort(category)}>
									{category}
									{sortBy === category && (
										<BsCheckLg style={{ color: "#ad1fea" }} />
									)}
								</Button>
							))}
						</Box>
					)}
				</Box>
			</HStack>
			<Link
				className="link"
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
		</Flex>
	);
}
TopNav.propTypes = {
	total: PropTypes.number,
	sortBy: PropTypes.string,
	handleSort: PropTypes.func,
};
