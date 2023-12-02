import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate, setMonth, setYear } from "../../../redux/features/report";
import { useDispatch, useSelector } from "react-redux";
const MyMonthPicker = () => {
	const dispatch = useDispatch();
	const isChildComponent = useSelector(
		(state) => state.report.isChildComponent
	);
	// const year = useSelector((state) => state.report.month);
	const date = useSelector((state) => state.report.date);
	const [oneTime, setOneTime] = useState(false);
	const [startDate, setStartDate] = useState(null);
	useEffect(() => {
		if (date) {
			dispatch(setMonth(date.getMonth() + 1));
			dispatch(setYear(date.getFullYear()));
		} else {
			setStartDate(date);
		}
		console.log(date);
	}, [date, startDate]);
	return (
		<DatePicker
			className="bg-transparent border-2 border-white border-opacity-20 pl-4 max-w-[160px] p-[6px] rounded-xl text-md"
			selected={date}
			// value={date}
			placeholderText="Select Month"
			showMonthYearPicker
			dateFormat="MMM y"
			onChange={(date) => {
				console.log(date);
				dispatch(setDate(date));
			}}
		/>
	);
};

export default MyMonthPicker;
