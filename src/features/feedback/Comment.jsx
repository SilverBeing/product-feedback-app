import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReplies } from "../allFeedback/allFeedbackSlice";
import { useUser } from "../../hooks/useUser";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
export default function Comment({ data, feedbackINdex, index }) {
	const { user } = useUser();
	const image = data?.user?.image.split(".");
	const dispatch = useDispatch();
	const [reply, setReply] = useState("");
	const [toggle, setToggle] = useState(false);
	const [replyTo, setReplyTo] = useState();

	const handleReply = (value) => {
		setToggle(!toggle);
		setReplyTo(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!reply) return;
		dispatch(
			addReplies({
				index: feedbackINdex,
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
		<Box
			padding="30px 0"
			borderBottom={data?.replies?.length > 0 ? "1px solid #3a437433" : "none"}>
			<Box w="100%">
				<Flex w="100%" gap="40px" alignItems="center">
					<Box alignSelf="flex-start">
						<img
							src={`${image[1]}.jpg`}
							alt="hello"
							style={{
								borderRadius: "50%",
								width: "60px",
							}}
						/>
					</Box>
					<Box w="100%">
						<Flex
							justify="space-between"
							alignItems="center"
							w="100%"
							mb="12px">
							<Box>
								<Heading
									fontSize="16px"
									mb="5px"
									fontWeight="800"
									color="brandHeadingColor">
									{data?.user?.name}
								</Heading>
								<Text fontSize="14px" color="brandTextColor">
									@{data?.user?.username}
								</Text>
							</Box>
							<Button
								bg="none"
								colorScheme="none"
								color="brandBlue"
								fontSize="14px"
								onClick={() => handleReply(data?.user?.username)}>
								Reply
							</Button>
						</Flex>
						<Text fontSize="15px" color="brandTextColor">
							{data?.content}
						</Text>
					</Box>
				</Flex>
				{toggle && (
					<Box w="85%" ml="auto" padding="25px 0">
						<ReplyForm
							handleSubmit={handleSubmit}
							reply={reply}
							setReply={setReply}
						/>
					</Box>
				)}
			</Box>
			<Box>
				{data?.replies?.map((replyi, i) => (
					<Reply
						key={i}
						replyi={replyi}
						feedbackIndex={feedbackINdex}
						index={index}
					/>
				))}
			</Box>
		</Box>
	);
}
Comment.propTypes = {
	data: PropTypes.object,
	feedbackINdex: PropTypes.number,
	index: PropTypes.number,
};
