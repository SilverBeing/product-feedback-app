import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/theme.js";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import UserContextProvider from "./context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<UserContextProvider>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</UserContextProvider>
		</Provider>
	</React.StrictMode>
);
