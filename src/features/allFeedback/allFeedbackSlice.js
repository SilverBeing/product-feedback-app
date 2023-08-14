/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./data";
const allFeedbackSlice = createSlice({
	name: "allFeedback",
	initialState,
	reducers: {
		addFeedback: (state, { payload }) => {
			state.feedback.push(payload);
		},
		addComment: (state, { payload }) => {
			state.feedback[payload.index].comments.push(payload.data);
		},
		addReplies: (state, { payload }) => {
			state.feedback[payload.index].comments[payload.secondIndex]
				.replies instanceof Array
				? state.feedback[payload.index].comments[
						payload.secondIndex
				  ].replies.push(payload.data)
				: (state.feedback[payload.index].comments[payload.secondIndex].replies =
						[payload.data]);
		},
		setUpvoted: (state, { payload }) => {
			const newState = state.feedback.map((feedback) => {
				if (feedback.id === payload.index) {
					return {
						...feedback,
						upvoted: payload.data,
					};
				}
				return feedback;
			});
			state.feedback = newState;
		},
		setUpvotes: (state, { payload }) => {
			const newState = state.feedback.map((feedback) => {
				if (feedback.id === payload.index) {
					return {
						...feedback,
						upvotes: payload.data,
					};
				}
				return feedback;
			});
			state.feedback = newState;
		},

		editFeedback: (state, { payload }) => {
			const newState = state.feedback.map((feedback) => {
				if (feedback.id === payload.id) {
					console.log("Feedback");
					return {
						...feedback,
						id: payload.id,
						title: payload.title,
						category: payload.category,
						upvoted: payload.upvoted,
						upvotes: payload.upvotes,
						status: payload.status,
						description: payload.description,
						comment: payload.comment,
					};
				}
				return feedback;
			});
			state.feedback = newState;
		},
		deleteFeedback: (state, { payload }) => {
			console.log("deleteFeedback");
			console.log(payload);
			state.feedback = state.feedback.filter(
				(feedbackz) => feedbackz.id !== payload
			);
		},
	},
});
export const allFeedback = (state) => state.allFeedback.feedback;
export const {
	addComment,
	setUpvoted,
	setUpvotes,
	addFeedback,
	addReplies,
	editFeedback,
	deleteFeedback,
} = allFeedbackSlice.actions;
export default allFeedbackSlice.reducer;
