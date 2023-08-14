import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Modal from "./modal";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

export default function MobileNavbar({ data, setSuggestion, content }) {
	const [sidebar, setSidebar] = useState(false);
	return (
		<Flex
			display={{ base: "flex", md: "none" }}
			padding="20px"
			color="white"
			alignItems="center"
			backgroundImage="radial-gradient(128.88% 128.88% at
				103.9% -10.39%,#e84d70 0%,#a337f6 53.09%,#28a7ed 100%)"
			w="100%"
			justify="space-between">
			<Box>
				<Text>Frontend Mentor</Text>
				<Text>Feedback board</Text>
			</Box>
			<Box>
				<Button
					color="white"
					colorScheme="none"
					fontSize="30px"
					onClick={() => setSidebar(true)}>
					<MdMenu />
				</Button>
			</Box>
			<Modal
				isShowing={sidebar}
				hide={() => setSidebar(false)}
				render={() => (
					<Box>
						<Navigation
							data={data}
							setSuggestion={setSuggestion}
							content={content}
							mobile={true}
							sidebar={sidebar}
						/>
					</Box>
				)}
			/>
		</Flex>
	);
}
MobileNavbar.propTypes = {
	setSuggestion: PropTypes.func.isRequired,
	data: PropTypes.any,
	content: PropTypes.any,
};
