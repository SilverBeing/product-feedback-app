import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navigation from "./Navigation";
import Main from "./Main";
import PropTypes from "prop-types";
import MobileNavbar from "./MobileNavbar";
export default function Home({ all_feedbacks }) {
	const [sortBy, setSortyBy] = useState("Most Upvotes");
	const [suggestions, setSuggestions] = useState(
		all_feedbacks.filter((feedback) => feedback.status === "suggestion")
	);
	const others = all_feedbacks.filter(
		(feedback) => feedback.status !== "suggestion"
	);
	useEffect(() => {
		setSuggestions(
			all_feedbacks.filter((feedback) => feedback.status === "suggestion")
		);
	}, [all_feedbacks]);

	const handleSuggestions = (value) => {
		setSortyBy(value);
		const sortedSuggestions = suggestions;

		switch (value) {
			case "Most Upvotes":
				sortedSuggestions.sort((a, b) => b.upvotes - a.upvotes);
				break;
			case "Least Upvotes":
				sortedSuggestions.sort((a, b) => a.upvotes - b.upvotes);
				break;
			case "Most Comments":
				sortedSuggestions.sort((a, b) => b.comments.length - a.comments.length);
				break;
			case "Least Comments":
				sortedSuggestions.sort((a, b) => a.comments.length - b.comments.length);
				break;
			default:
				break;
		}
		setSuggestions(sortedSuggestions);
	};

	return (
		<Flex
			paddingTop={{ base: "0", md: "50px", lg: "100px" }}
			h="inherit"
			w={{ md: "95%", lg: "80%" }}
			justifyContent="center"
			margin="auto"
			flexWrap="wrap"
			gap={{ base: "0", md: "50px" }}>
			<Navigation
				setSuggestion={setSuggestions}
				data={all_feedbacks}
				content={others}
			/>
			<MobileNavbar
				setSuggestion={setSuggestions}
				data={all_feedbacks}
				content={others}
			/>
			<Main data={suggestions} handleSort={handleSuggestions} sortBy={sortBy} />
		</Flex>
	);
}
Home.propTypes = {
	all_feedbacks: PropTypes.array,
};
