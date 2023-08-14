import { Box, Text, Flex, Heading, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addReplies } from "../allFeedback/allFeedbackSlice";
import { useUser } from "../../hooks/useUser";
import PropTypes from "prop-types";
import ReplyForm from "./ReplyForm";
export default function Reply({ replyi, index, feedbackIndex }) {
	const [toggle, setToggle] = useState();
	const { user } = useUser();
	const [replyTo, setReplyTo] = useState();
	const [reply, setReply] = useState();
	const dispatch = useDispatch();
	const handleReplies = (value) => {
		setToggle(!toggle);
		setReplyTo(value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			addReplies({
				index: feedbackIndex,
				secondIndex: index,
				data: {
					content: reply,
					replyingTo: replyTo,
					user: user,
				},
			})
		);
		setReply("");
		setToggle(false);
	};

	return (
		<Box w="93%" ml="auto" mt="20px" padding="10px 0">
			<Flex w="100%" gap="40px" alignItems="center">
				<Box alignSelf="flex-start">
					<img
						src={`${replyi?.user?.image.split(".")[1]}.jpg`}
						alt=""
						style={{
							borderRadius: "50%",
							width: "50px",
						}}
					/>
				</Box>
				<Box w="100%">
					<Flex w="100%" justify="space-between" alignItems="center" mb="12px">
						<Box>
							<Heading
								fontSize="15px"
								fontWeight="800"
								color="brandHeadingColor"
								mb="5px">
								{replyi?.user?.name}
							</Heading>
							<Text
								fontSize="12px"
								fontWeight="600"
								color="brandTextColor">{`@${replyi?.user?.username}`}</Text>
						</Box>
						<Button
							bg="none"
							colorScheme="none"
							fontSize="14px"
							color="brandBlue"
							onClick={() => handleReplies(replyi?.user?.username)}>
							Reply
						</Button>
					</Flex>

					<Text fontSize="15px" color="brandTextColor">
						<Box
							as="span"
							color="brandPurple"
							fontWeight="700">{`@${replyi?.replyingTo}`}</Box>
						&nbsp;{replyi?.content}
					</Text>
				</Box>
			</Flex>
			{toggle && (
				<Box w="85%" ml="auto" padding="25px 0">
					<ReplyForm
						handleSubmit={handleSubmit}
						setReply={setReply}
						reply={reply}
					/>
				</Box>
			)}
		</Box>
	);
}
Reply.propTypes = {
	replyi: PropTypes.any,
	feedbackIndex: PropTypes.number,
	index: PropTypes.number,
};
