import { Box, Heading, Text } from "@chakra-ui/react";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import Suggestion from "./Suggestion";
import empty from "../assets/others/illustration-empty.svg";
import { Link } from "react-router-dom";

export default function Main({ data, handleSort, sortBy }) {
	return (
		<Box
			flexBasis={{ base: "100%", lg: "65%" }}
			overflowY="scroll"
			h="100vh"
			className="main">
			<Box h="100%">
				<TopNav total={data.length} handleSort={handleSort} sortBy={sortBy} />
				<Box height="100%" w={{ base: "95%", md: "auto" }} m="auto">
					{data.length === 0 ? (
						<Box textAlign="center">
							<Box w="100%" margin="auto" mt={{ base: "0", md: "100px" }}>
								<img src={empty} alt="" style={{ margin: "auto" }} />
							</Box>
							<Box mb="20px">
								<Heading
									mb="10px"
									mt="10px"
									fontSize="24px"
									fontWeight="800"
									color="brandHeadingColor">
									There is no feedback yet
								</Heading>
								<Text mb="40px" w="60%" marginX="auto" color="brandTextColor">
									Got a suggestion? Found a bug that needs to be squashed? We
									love hearing about new ideas to improve our app.
								</Text>
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
						</Box>
					) : (
						data.map((suggestion, index) => (
							<Suggestion key={suggestion.id} data={suggestion} index={index} />
						))
					)}
				</Box>
			</Box>
		</Box>
	);
}
Main.propTypes = {
	data: PropTypes.any,
	handleSort: PropTypes.func,
	sortBy: PropTypes.string,
};
