import { useLocation } from "react-router-dom";

function usePathName(...pathName) {
	const currPathName = useLocation().pathname.split("/")[1];
	return pathName.includes(currPathName);
}

export default usePathName;
