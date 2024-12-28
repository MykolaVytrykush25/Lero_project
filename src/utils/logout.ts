import { logoutUser } from "@/API/userService";

const logout = async () => {
	await logoutUser();
	window.location.href = "/login";
};

export default logout;
