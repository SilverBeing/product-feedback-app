import { createContext, useState } from "react";
export const userContext = createContext();
import PropTypes from "prop-types";

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({
		image: "./assets/user-images/silver.jpg",
		name: "Silver Idahosa",
		username: "ITech4ALiving",
	});
	return (
		<userContext.Provider value={{ user, setUser }}>
			{children}
		</userContext.Provider>
	);
};
UserContextProvider.propTypes = {
	children: PropTypes.any,
};

export default UserContextProvider;
