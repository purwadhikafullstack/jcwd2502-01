import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate, setMonth, setYear } from "../../../redux/features/report";
import { useDispatch, useSelector } from "react-redux";
const MyMonthPicker = () => {
	const dispatch = useDispatch();
	const month = useSelector((state) => state.report.month);
	const [oneTime, setOneTime] = useState(false);
	const [startDate, setStartDate] = useState();
	// console.log(startDate.getMonth() + 1);
	// console.log(startDate.getFullYear());
	useEffect(() => {
		// if (oneTime) {
		dispatch(setDate(startDate));
		console.log(startDate);
		// setOneTime(false);
		// }
		// console.log(startDate.getMonth() + 1);
		console.log(month);
	}, [startDate, oneTime]);
	return (
		<DatePicker
			className="bg-transparent border-2 border-white border-opacity-20 pl-4 max-w-[160px] p-[6px] rounded-xl text-md"
			selected={startDate}
			placeholderText="Select Month"
			showMonthYearPicker
			dateFormat="MMM y"
			onChange={(date) => {
				setStartDate(date);
				// console.log(date);
				// setDate(startDate);
				// setOneTime(true);
			}}
		/>
	);
};

export default MyMonthPicker;
