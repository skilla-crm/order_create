import s from './Input.module.scss';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { ReactComponent as IconTime } from '../../../images/icons/iconTime.svg';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
//components
import DigitalTimer from '../../../utils/DigitalTimer/DigitalTimer';

const InputTime = ({ sub, disabled, nosub, time, setTime }) => {
    const [fieldFocus, setFieldFocus] = useState(false);
    const [openTimer, setOpenTimer] = useState(false);
    const [timeVis, setTimeVis] = useState('');
    const inputRef = useRef();
    const fieldRef = useRef();

    useEffect(() => {
        disabled && setTime(null)
    }, [disabled])

    useEffect(() => {
        handleTimeFormat()
    }, [time])

    const handleOpenTimer = () => {
        if (openTimer) {
            setOpenTimer(false)
        } else {
            setOpenTimer(true)
            inputRef.current.focus()
        }
    }

    const handleFocus = () => {
        setFieldFocus(true)
    }

    const handleBlur = () => {
        setFieldFocus(false);
        const isValid = dayjs(timeVis, 'HH:mm', true).locale('ru').isValid();
        !isValid && setTimeVis('')
    }

    const handleTimeFormat = () => {
        const timeFormat = dayjs(time).format('HH:mm');
        setTimeVis(time ? timeFormat : '');
    }

    const handleDateValue = (e) => {
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        value.length < 6 && setTimeVis(value.replace(reg, ""))
        value.length == 2 && timeVis.length < 2 && setTimeVis(prevState => prevState + ':')
        const isValid = dayjs(value, 'HH:mm', true).locale('ru').isValid();
        isValid && setTime(dayjs(value, 'HH:mm').locale('ru'))
        value == '' && setTime(null)
    }


    return (
        <div className={`${s.container} ${s.container_time}`}>
            {!nosub && <span className={s.sub}>{sub}</span>}
            <div ref={fieldRef} onClick={handleOpenTimer} className={`${s.field} ${disabled && s.field_disabled} ${s.field_time} ${fieldFocus && s.field_time_focus}`}>
                {/*  <input  ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} onChange={handleDateValue} value={timeVis || ''} type='text' placeholder='чч.мм'></input> */}
                <InputMask ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} mask="99:99" onChange={handleDateValue} value={timeVis || ''} placeholder='чч:мм' />
                <IconTime />
            </div>

            {openTimer && <DigitalTimer value={time} setValue={setTime} setOpen={setOpenTimer} nosub={nosub}/>}

        </div>
    )
};

export default InputTime;