import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addComment, allFeedback } from "../allFeedback/allFeedbackSlice";

import { useState } from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Text,
	Heading,
	Textarea,
} from "@chakra-ui/react";
import Suggestion from "../../components/Suggestion";
import Comment from "./Comment";
import { useUser } from "../../hooks/useUser";
import { updateAll } from "./feedbackSlice";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function ViewFeedback() {
	const [feedback, setFeedback] = useState("");
	const all_feedbacks = useSelector(allFeedback);
	const navigate = useNavigate();
	const { user } = useUser();
	const id = useParams();

	const dispatch = useDispatch();
	const charactersLimit = 250;

	const charactersRemaining = charactersLimit - feedback.length;

	const result = all_feedbacks?.find(
		(feedbacks) => feedbacks.id === parseInt(id.id)
	);
	const feedbackIndex = all_feedbacks.indexOf(result);

	const handleChange = (e) => {
		if (feedback.length === charactersLimit) return;
		setFeedback(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!feedback) return;
		dispatch(
			addComment({
				index: parseInt(id.id) - 1,
				data: {
					content: feedback,
					user: user,
				},
			})
		);
		setFeedback("");
	};
	const handleEdit = () => {
		const result = all_feedbacks.find(
			(feedbacks) => feedbacks.id === parseInt(id.id)
		);
		dispatch(updateAll(result));
	};
	return (
		result && (
			<Box w={{ base: "95%", lg: "55%" }} m="auto" padding="100px 0" h="100%">
				<Flex justify="space-between" alignItems="center">
					<Box>
						<Button
							color="brandPurple"
							colorScheme="none"
							fontSize="14px"
							leftIcon={<MdKeyboardArrowLeft style={{ fontSize: "18px" }} />}
							fontWeight="700"
							onClick={() => navigate(-1)}>
							Go Back
						</Button>
					</Box>
					<Link
						onClick={handleEdit}
						to={`/edit/feedback/${result.id}`}
						style={{
							backgroundColor: "#4661e6",
							padding: "15px 15px",
							color: "white",
							borderRadius: "10px",
							fontWeight: "800",
						}}>
						Edit Feedback
					</Link>
				</Flex>
				<Box>
					<Suggestion data={result} />
					<Box bg="white" padding="20px 30px">
						<Heading fontSize="18px" fontWeight="800" color="brandHeadingColor">
							{result?.comments.length} Comments
						</Heading>

						{result.comments.map((comment, i) => (
							<Comment
								key={comment.id}
								data={comment}
								feedbackINdex={feedbackIndex}
								index={i}
							/>
						))}
					</Box>
				</Box>
				<Box bg="white" padding="40px" mt="25px">
					<form onSubmit={handleSubmit}>
						<FormControl>
							<FormLabel
								mb="15px"
								fontWeight="800"
								fontSize="16px"
								color="brandHeadingColor">
								Add Comment
							</FormLabel>
							<Textarea
								value={feedback}
								mb="25px"
								placeholder="Type your comment here"
								fontSize="14px"
								resize="none"
								bg="brandTextbgColor"
								row={3}
								onChange={handleChange}
							/>
						</FormControl>
						<Flex w="100%" justify="space-between">
							<Text fontSize="14px" color="brandTextColor">
								{charactersRemaining} characters left
							</Text>
							<Button
								type="submit"
								bg="brandPurple"
								size="lg"
								fontSize="15px"
								borderRadius="10px"
								color="white"
								colorScheme="none">
								Post Comment
							</Button>
						</Flex>
					</form>
				</Box>
			</Box>
		)
	);
}
