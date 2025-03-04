import './MultiDatePicker.scss';
import { Calendar, DateObject } from "react-multi-date-picker"
import { getAllDatesInRange } from 'react-multi-date-picker';
import transition from "react-element-popper/animations/transition"
const weekDays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

const MultiDatePicker = ({ type, dates, setDates, setAllDatesRange }) => {

    const handleChangeDates = (value) => {
        setDates(value.slice(0, 31))
        let arr = []
        type == 2 && value.forEach(el => arr.push(...getAllDatesInRange(el)))
        type == 2 && setAllDatesRange(arr.slice(0, 31))
    }

    console.log(dates)

    return (
        <Calendar
            multiple
            range={type == 2}
            numberOfMonths={2}
            weekDays={weekDays}
            months={months}
            disableYearPicker={false}
            hideYear={false}
            disableMonthPicker={true}
            value={dates}
            weekStartDayIndex={1}
            rangeHover={true}
            onChange={handleChangeDates}
            animations={[
                transition({ duration: 100, from: 1 })
            ]}
        />
    )
};

export default MultiDatePicker;