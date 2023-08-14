import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: false,
	title: "",
	category: "",
	upvotes: 0,
	upvoted: false,
	status: "suggestion",
	description: "",
	comments: [],
};
const feedbackSlice = createSlice({
	name: "feedback",
	initialState,
	reducers: {
		setTitle: (state, { payload }) => {
			state.title = payload;
		},
		setCategory: (state, { payload }) => {
			state.category = payload;
		},
		setStatus: (state, { payload }) => {
			state.status = payload;
		},
		setDescription: (state, { payload }) => {
			state.description = payload;
		},
		setUpvotes: (state, { payload }) => {
			state.upvotes = payload;
		},
		setUpvoted: (state, { payload }) => {
			state.upvoted = payload;
		},
		setId: (state, { payload }) => {
			state.id = payload;
		},
		updateAll: (state, { payload }) => {
			state.category = payload.category;
			state.upvoted = payload.upvoted;
			state.upvotes = payload.upvotes;
			state.id = payload.id;
			state.description = payload.description;
			state.title = payload.title;
			state.comments = payload.comments;
			state.status = payload.status;
		},
		resetAll: (state) => {
			state.status = "suggestion";
			state.comments = [];
			state.title = "";
			state.category = "";
			state.upvoted = "false";
			state.upvotes = 0;
			state.description = "";
			state.id = false;
		},
	},
});
export const title = (state) => state.feedback.title;
export const description = (state) => state.feedback.description;
export const status = (state) => state.feedback.status;
export const category = (state) => state.feedback.category;
export const upvotes = (state) => state.feedback.upvotes;
export const upvoted = (state) => state.feedback.upvoted;
export const selectFeedback = (state) => state.feedback;
export const id = (state) => state.feedback.id;
export const {
	setCategory,
	setDescription,
	updateAll,
	resetAll,
	setId,
	setTitle,
	setStatus,
	setUpvotes,
	setUpvoted,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
