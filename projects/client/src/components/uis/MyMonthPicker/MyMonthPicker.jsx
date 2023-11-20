import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MyMonthPicker = () => {
	const [startDate, setStartDate] = useState(new Date());
	return (
		<DatePicker
			className="bg-transparent border-2 border-white border-opacity-20 pl-4 max-w-[160px] p-[6px] rounded-xl"
			selected={startDate}
			placeholderText="Select Month & Year"
			showMonthYearPicker
			dateFormat="MMM y"
			onChange={(date) => setStartDate(date)}
		/>
	);
};

export default MyMonthPicker;
