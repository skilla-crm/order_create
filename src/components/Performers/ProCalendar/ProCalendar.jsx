import s from './ProCalendar.module.scss';
import { useRef } from 'react';
import { ReactComponent as CalendarIcon } from '../../../images/icons/calendar/calendarIcon1.svg';
import { ReactComponent as CalendarIcon2 } from '../../../images/icons/calendar/calendarIcon2.svg';
//components
import MultiDatePicker from '../../../utils/MultiDatePicker/MultiDatePicker';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ProCalendar = ({ setProCalendar, date, dates, setDates, proType, setProType, setPeriodDates, allDatesRange, setAllDatesRange }) => {
    const [anim, setAnim] = useState(false);
    const [datesPrev, setDatesPrev] = useState(dates || []);
    const [calendarType, setCalendarType] = useState(proType || 1);
    const modalRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])


    const handleSwitch = (e) => {
        const id = Number(e.currentTarget.id);
        setCalendarType(id)
        dates.length == 0 && setDatesPrev([])
        proType !== id ? setDatesPrev([]) : setDatesPrev(dates)
    }

    const handleConfirm = () => {
        setProType(calendarType)
        setPeriodDates(datesPrev)
        const result = allDatesRange.filter(el => dayjs(el).format('DD-MM-YYYY') !== date.format('DD-MM-YYYY'))
        const result2 = datesPrev.filter(el => dayjs(el).format('DD-MM-YYYY') !== date.format('DD-MM-YYYY'))
     
        calendarType == 1 ? setDates(result2) : setDates(result)
        handleClose()
    }

    const handleReset = () => {
        setDatesPrev([])
        setAllDatesRange([])
    }

    const handleClose = () => {
        setAnim(false);

        setTimeout(() => {
            setProCalendar(false)
        }, 200)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);

    return (
        <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
            <div className={s.container}>
                <div className={s.switch}>
                    <div id={1} onClick={handleSwitch} className={`${s.item} ${calendarType == 1 && s.item_active}`}>
                        <CalendarIcon />
                        <p>Точные даты</p>
                    </div>
                    <div id={2} onClick={handleSwitch} className={`${s.item} ${calendarType == 2 && s.item_active}`}>
                        <CalendarIcon2 />
                        <p>Периоды</p>
                    </div>
                </div>

                <MultiDatePicker type={calendarType} setDates={setDatesPrev} dates={datesPrev} setAllDatesRange={setAllDatesRange} />
            </div>
            <div className={s.buttons}>
                <button onClick={handleReset} className={`${s.button} ${s.button_second}`}>Сброс</button>
                <button onClick={handleConfirm} className={`${s.button} ${s.button_main}`}>Готово</button>
            </div>
        </div>
    )
};

export default ProCalendar;