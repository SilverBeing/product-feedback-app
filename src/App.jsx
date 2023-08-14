import AddFeedbackPage from "./features/feedback/AddFeedbackPage";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { allFeedback } from "./features/allFeedback/allFeedbackSlice";
import ViewFeedback from "./features/feedback/ViewFeedback";
import EditFeeback from "./features/feedback/EditFeeback";
import Roadmap from "./components/Roadmap";

function App() {
	const all_feedbacks = useSelector(allFeedback);
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <Outlet />,
			children: [
				{
					index: true,
					element: <Home all_feedbacks={all_feedbacks} />,
				},
				{
					path: "/add/feedback",
					element: <AddFeedbackPage />,
				},
				{
					path: "/edit/feedback/:id",
					element: <EditFeeback />,
				},
				{
					path: "/view/feedback/:id",
					element: <ViewFeedback />,
				},
				{
					path: "/roadmap",
					element: <Roadmap all_feedbacks={all_feedbacks} />,
				},
			],
		},
	]);
	return <RouterProvider router={routes} />;
}

export default App;
