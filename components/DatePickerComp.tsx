import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import getDate from "../lib/getDate";
import moment from "moment";

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Минал</span>,
    next: () => <span>Следващ</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "bg",
};

const DatePickerComp = ({ setDateInput }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    const date = moment(selectedDate).format("YYYY-MM-DD");

    setDateInput(date);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="relative h-10">
      <DatePicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};
export default DatePickerComp;
