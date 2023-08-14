import { useContext } from "react";
import { userContext } from "../context/userContext";
export const useUser = () => {
	return useContext(userContext);
};
