import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	setDateHistory,
	setMonthHistory,
	setYearHistory,
} from "../../../redux/features/stocksHistory";
import { useDispatch, useSelector } from "react-redux";
const MyMonthPickerHistory = () => {
	const dispatch = useDispatch();
	const date = useSelector((state) => state.history.dateHistory);
	const [oneTime, setOneTime] = useState(false);
	const [startDate, setStartDate] = useState(null);
	useEffect(() => {
		if (date) {
			dispatch(setMonthHistory(date.getMonth() + 1));
			dispatch(setYearHistory(date.getFullYear()));
		}
	}, [date]);
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
				dispatch(setDateHistory(date));
			}}
		/>
	);
};

export default MyMonthPickerHistory;
