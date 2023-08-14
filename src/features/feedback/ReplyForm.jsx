import { Textarea, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
export default function ReplyForm({ handleSubmit, reply, setReply }) {
	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				gap: "32px",
			}}>
			<Textarea
				resize="none"
				cols={16}
				rows={3}
				bg="brandTextbgColor"
				placeholder="Type your reply here"
				fontSize="14px"
				value={reply}
				onChange={(e) => setReply(e.target.value)}
			/>
			<Button
				type="submit"
				bg="brandPurple"
				size="lg"
				fontSize="15px"
				borderRadius="10px"
				color="white"
				colorScheme="none">
				Post Reply
			</Button>
		</form>
	);
}
ReplyForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	reply: PropTypes.any,
	setReply: PropTypes.func.isRequired,
};
