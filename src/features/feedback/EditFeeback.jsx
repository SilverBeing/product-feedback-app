import { useDispatch } from "react-redux";
import FeedbackForm from "./FeedbackForm";
import { editFeedback } from "../allFeedback/allFeedbackSlice";
import { resetAll } from "./feedbackSlice";

export default function EditFeeback() {
	const dispatch = useDispatch();
	const action = (data) => {
		console.log(data);
		dispatch(editFeedback(data));
		dispatch(resetAll());
	};
	return (
		<>
			<FeedbackForm edit action={action} />
		</>
	);
}
