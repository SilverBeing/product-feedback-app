import { useDispatch } from "react-redux";
import FeedbackForm from "./FeedbackForm";
import { addFeedback } from "../allFeedback/allFeedbackSlice";
import { resetAll } from "./feedbackSlice";

export default function AddFeedbackPage() {
	const dispatch = useDispatch();
	const action = (data) => {
		dispatch(addFeedback(data));
		dispatch(resetAll());
	};
	return (
		<>
			<FeedbackForm action={action} />
		</>
	);
}
