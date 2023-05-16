import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

export default function DatePicker({ title, btnLeft, btnRight, lang, style, onChange, value }) {
  const datepickeOptions = {
    title: title,
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    theme: {
		background: "",
		todayBtn: "",
		clearBtn: "bg-red-100",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "bg-green-300",
	},
    icons: {
      prev: () => <span>{btnLeft}</span>,
      next: () => <span>{btnRight}</span>,
    },
    datepickerClassNames: style,
    // weekDays: ["Lun", "Mar", "Mer", "Jeu", 'Ven', "Sam", "Dim"],
    defaultDate: new Date(),
    language: lang,
  };

  const [show, setShow] = useState(false);
  const handleDatePickerClose = (state) => {
    setShow(state);
  };

  return (
    <Datepicker
      options={datepickeOptions}
      show={show}
      setShow={handleDatePickerClose}
      onChange={onChange}
      value={value}
      
    />
  );
}
