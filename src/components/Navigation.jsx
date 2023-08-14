import { Button, Flex, Box, Heading, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navigation({
	setSuggestion,
	content,
	data,
	sidebar,
	mobile = false,
}) {
	const [activeCategory, setActiveCategory] = useState();
	const planned = content.filter((cont) => cont.status === "planned");
	const inProgress = content.filter((cont) => cont.status === "in-progress");
	const live = content.filter((cont) => cont.status === "live");
	const categories = ["UI", "UX", "enhancement", "feature", "bug"];

	const suggestion = data.filter((suggest) => suggest.status === "suggestion");
	const handleFilter = (category) => {
		const result = suggestion.filter((cate) => cate.category === category);
		setSuggestion(result);
		setActiveCategory(category);
	};
	const handleAll = () => {
		setSuggestion(suggestion);
		setActiveCategory(false);
	};
	return (
		<Flex
			flexDirection={{ base: "column", md: "row", lg: "column" }}
			gap="30px"
			display={{ base: mobile && sidebar ? "flex" : "none", md: "flex" }}
			minHeight={{ base: "auto", md: "200px", lg: "" }}
			alignItems={{ md: "center", lg: "normal" }}
			justify={{ md: "space-between", lg: "normal" }}
			flexGrow="0"
			flexBasis={{ base: "100%", md: "100%", lg: "248px" }}>
			{!mobile && (
				<Box
					mb={{ md: "0", lg: "22px" }}
					boxShadow="0px 0px 60px 0px rgba(0,0,0,0.1)"
					borderRadius="10px"
					minHeight={{ md: "inherit", lg: "auto" }}
					backgroundImage="radial-gradient(128.88% 128.88% at
				103.9% -10.39%,#e84d70 0%,#a337f6 53.09%,#28a7ed 100%)"
					w={{ md: "30%", lg: "100%" }}
					textAlign="left"
					color="white"
					padding={{ md: "40px 20px 20px ", lg: "80px 20px 30px" }}>
					<Heading mt={{ md: "auto", lg: "0" }} fontSize="18px">
						Frontend Mentor
					</Heading>
					<Text
						fontSize="14px"
						color="brandBgColor"
						mt={{ md: "auto", lg: "0" }}>
						feedback board
					</Text>
				</Box>
			)}

			<Flex
				bg="white"
				flexGrow="0"
				padding="30px 18px"
				boxShadow="0px 0px 60px 0px rgba(0,0,0,0.1)"
				borderRadius="10px"
				w={{ md: "30%", lg: "100%" }}
				gap="16px"
				flexWrap="wrap">
				<Button
					fontSize="14px"
					bg={!activeCategory ? "brandPurple" : "brandBgColor"}
					color={!activeCategory ? "white" : "brandBlue"}
					colorScheme="none"
					onClick={handleAll}>
					All
				</Button>
				{categories.map((cat) => (
					<Button
						fontSize="14px"
						onClick={() => handleFilter(cat)}
						textTransform="capitalize"
						colorScheme="none"
						key={cat}
						bg={activeCategory === cat ? "brandPurple" : "brandBgColor"}
						color={activeCategory === cat ? "white" : "brandBlue"}>
						{cat}
					</Button>
				))}
			</Flex>
			<Box
				padding="30px 20px"
				flexGrow="0"
				bg="white"
				borderRadius="10px"
				w={{ md: "30%", lg: "100%" }}
				mt={{ md: "0px", lg: "24px" }}
				boxShadow="0px 1px 60px 0px rgba(0,0,0,0.1)">
				<Flex justify="space-between" alignItems="center" mb="24px">
					<Heading fontSize="18px" color="brandHeadingColor">
						Roadmap
					</Heading>
					<Link
						to="/roadmap"
						style={{
							fontSize: "12px",
							textDecoration: "underline",
							color: "#4661e6",
							fontWeight: "800",
						}}>
						View
					</Link>
				</Flex>
				<HStack mb="10px">
					<Box w="10px" h="10px" borderRadius="50%" bg="#F49F85"></Box>{" "}
					<Text fontSize="14px" color="brandTextColor" fontWeight="500">
						Planned
					</Text>{" "}
					<Text ml="auto" color="brandTextColor" fontWeight="500">
						{planned.length}
					</Text>
				</HStack>
				<HStack mb="10px">
					<Box w="10px" h="10px" borderRadius="50%" bg="brandPurple"></Box>{" "}
					<Text color="brandTextColor" fontWeight="500">
						In-Progress
					</Text>{" "}
					<Text ml="auto" color="brandTextColor" fontWeight="500">
						{inProgress.length}
					</Text>
				</HStack>
				<HStack mb="10px">
					<Box w="10px" h="10px" borderRadius="50%" bg="brandLightBlue"></Box>{" "}
					<Text color="brandTextColor" fontWeight="500">
						Live
					</Text>{" "}
					<Text ml="auto" color="brandTextColor" fontWeight="500">
						{live.length}
					</Text>
				</HStack>
			</Box>
		</Flex>
	);
}
Navigation.propTypes = {
	setSuggestion: PropTypes.func,
	content: PropTypes.array,
	data: PropTypes.array,
	categories: PropTypes.array,
	mobile: PropTypes.bool,
	sidebar: PropTypes.bool,
};
