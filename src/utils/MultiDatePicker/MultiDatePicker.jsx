import './MultiDatePicker.scss';
import { Calendar } from "react-multi-date-picker"
import { getAllDatesInRange } from 'react-multi-date-picker';
import transition from "react-element-popper/animations/transition"
const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

const MultiDatePicker = ({ type, dates, setDates, setAllDatesRange }) => {

    const handleChangeDates = (value) => {
        setDates(value.slice(0, 20))
        let arr = []
        type == 2 && value.forEach(el => arr.push(...getAllDatesInRange(el)))
        type == 2 && setAllDatesRange(arr.slice(0, 20))
    }

    return (
        <Calendar
            multiple
            range={type == 2}
            numberOfMonths={2}
            weekDays={weekDays}
            months={months}
            disableYearPicker={true}
            hideYear={true}
            disableMonthPicker={true}

            value={dates}
            onChange={handleChangeDates}
            animations={[
                transition({ duration: 100, from: 1 })
            ]}
        />
    )
};

export default MultiDatePicker;