import s from './Input.module.scss';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { ReactComponent as IconCalendar } from '../../../images/icons/iconCalendar.svg';

//components
import DataPickerCalendar from '../../../utils/DataPickerCalendar/DataPickerCalendar';

const InputData = ({ sub, nosub, setDate, date, disabledDates }) => {
    const [fieldFocus, setFieldFocus] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dateVis, setDateVis] = useState('');
    const [backspaceState, setBackspaceState] = useState(false);
    const inputRef = useRef();
    const fieldRef = useRef();

    useEffect(() => {
        handleDateText()
    }, [date])

    const handleDateText = () => {
        const currentYear = dayjs(date).format('YYYY') == dayjs().format('YYYY')
        const today = dayjs(date).format('D MM YYYY') == dayjs().format('D MM YYYY')
        const tomorrow = dayjs(date).format('MM YYYY') == dayjs().format('MM YYYY') && dayjs(date).format('D') - dayjs().format('D') == 1;
        const dayAfterTomorrow = dayjs(date).format('MM YYYY') == dayjs().format('MM YYYY') && dayjs(date).format('D') - dayjs().format('D') == 2;
        console.log(dayjs(date).format('D MM YYYY'), dayjs().format('D MM YYYY'))

        if (date && currentYear && today) {
            const dateFormat = dayjs(date).format(', D MMMM');
            setDateVis('Сегодня' + dateFormat)
            setBackspaceState(false)
            return
        }

        if (date && currentYear && tomorrow) {
            const dateFormat = dayjs(date).format(', D MMMM');
            setDateVis('Завтра' + dateFormat)
            setBackspaceState(false)
            return
        }

        if (date && currentYear && dayAfterTomorrow) {
            const dateFormat = dayjs(date).format(', D MMMM');
            setDateVis('Послезавтра' + dateFormat)
            setBackspaceState(false)
            return
        }

        if (date && currentYear) {
            const dateFormat = dayjs(date).format('dddd, D MMMM');
            setDateVis(dateFormat)
            setBackspaceState(false)
            return
        }

        if (date && !currentYear) {
            const dateFormat2 = dayjs(date).format('D MMMM YYYY');
            setDateVis(dateFormat2)
            setBackspaceState(false)
            return
        }
    }

    const handleDateStandart = () => {
        const dateFormat = dayjs(date).format('DD.MM.YYYY');
        setDateVis(dateFormat);
    }

    const handleDateValue = (e) => {
        setOpenCalendar(true)
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        value.length < 11 && setDateVis(value.replace(reg, ""))

        value.length == 2 && dateVis.length < 2 && setDateVis(prevState => prevState + '.')
        value.length == 5 && dateVis.length < 5 && setDateVis(prevState => prevState + '.')
        const isValid = dayjs(value, 'DD.MM.YYYY', true).isValid()
        isValid ? setDate(dayjs(value, 'DD.MM.YYYY').locale('ru')) : setDate(null)
        value == '' && setDate(null)

    }

    const handleBackSpace = (e) => {
        e.stopPropagation()
        const key = e.key;
        if (key == 'Backspace' && !backspaceState) {

            handleDateStandart();
            setBackspaceState(true)
            return
        }

    }

    const handleFocus = () => {
        setFieldFocus(true)

        if (date !== null) {
            handleDateStandart()
            return
        }

        if (date == null) {
            setDateVis('');
            return
        }
    }

    const handleBlur = () => {
        setFieldFocus(false);
        !date && setDateVis('')
    }

    const handleOpenCalendar = () => {
        if (openCalendar) {
            !fieldFocus && setOpenCalendar(false)
        } else {
            setOpenCalendar(true)
            inputRef.current.focus()
        }
    }

    const handleBage = (e) => {
        const id = e.currentTarget.id;
        setDate(dayjs().add(id, 'day').locale('ru'))
    }

    const handleDate = (e) => {
        if (fieldRef.current && !fieldRef.current.contains(e.target)) {
            handleDateText()
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleDate);

        return () => document.removeEventListener('click', handleDate);
    }, [date]);

    return (
        <div className={`${s.container} ${s.container_data}`}>
            {!nosub && <span className={s.sub}>{sub}</span>}
            <div ref={fieldRef} onClick={handleOpenCalendar} className={`${s.field} ${s.field_data} ${fieldFocus && s.field_focus}`}>
                <input ref={inputRef} onFocus={handleFocus} onKeyDown={handleBackSpace} onBlur={handleBlur} type='text' onChange={handleDateValue} value={dateVis || ''} placeholder='дд.мм.гггг'></input>
                <IconCalendar />
            </div>

            {!nosub && <div className={s.bages}>
                <p onClick={handleBage} id='1'>Завтра</p>
                <p onClick={handleBage} id='2'>Послезавтра</p>
            </div>
            }
            {openCalendar && <DataPickerCalendar value={date} setValue={setDate} setOpenCalendar={setOpenCalendar} nosub={nosub} disabledDates={disabledDates} />}
        </div>
    )
};

export default InputData;