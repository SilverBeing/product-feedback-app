import { configureStore } from "@reduxjs/toolkit";
import allFeedbackReducer from "../features/allFeedback/allFeedbackSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";
export const store = configureStore({
	reducer: {
		allFeedback: allFeedbackReducer,
		feedback: feedbackReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
