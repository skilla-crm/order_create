import s from './ProCalendar.module.scss';
import { useRef } from 'react';
import { ReactComponent as CalendarIcon } from '../../../images/icons/calendar/calendarIcon1.svg';
import { ReactComponent as CalendarIcon2 } from '../../../images/icons/calendar/calendarIcon2.svg';
import { ReactComponent as IconBuilder } from '../../../images/icons/IconBuilder.svg';
//components
import MultiDatePicker from '../../../utils/MultiDatePicker/MultiDatePicker';
import TabsNumbers from '../../General/Tabs/TabsNumbers';
import InputTime from '../../General/Input/InputTime';
import InputNumList from '../../General/Input/InputNumList';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ProCalendar = ({ setProCalendar, date, time, dates, setDates, proType, setProType, setPeriodDates, allDatesRange, setAllDatesRange, user, service, performersNum }) => {
    const [anim, setAnim] = useState(false);
    const [datesPrev, setDatesPrev] = useState([]);
    const [calendarType, setCalendarType] = useState(proType || 1);
    const [ordersCount, setOrdersCount] = useState(1);
    const [time1, setTime1] = useState(time);
    const [time2, setTime2] = useState(null);
    const [time3, setTime3] = useState(null);
    const [count1, setCount1] = useState(performersNum);
    const [count2, setCount2] = useState(performersNum);
    const [count3, setCount3] = useState(performersNum);
    const modalRef = useRef()
    const numbersOrdersDay = Array.from({ length: ordersCount }, (n, i) => i + 1);

    const param1 = (el) => {
        return [
            { date: dayjs(el).locale('ru'), time: time1, count: count1 }
        ]
    }

    const param2 = (el) => {
        return [
            { date: dayjs(el).locale('ru'), time: time1, count: count1 },
            { date: dayjs(el).locale('ru'), time: time2, count: count2 }
        ]
    }

    const param3 = (el) => {
        return [
            { date: dayjs(el).locale('ru'), time: time1, count: count1 },
            { date: dayjs(el).locale('ru'), time: time2, count: count2 },
            { date: dayjs(el).locale('ru'), time: time3, count: count3 }
        ]
    }


    useEffect(() => {
        const datesArr = [new Date(date), ...dates]
        console.log(datesArr)
        const unique = datesArr.reduce((accumulator, current) => {
            if (accumulator.findIndex(el => dayjs(el).format('YYYY-MM-DD') === dayjs(current).format('YYYY-MM-DD')) === -1) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        calendarType === 1 ? setDatesPrev(unique) : setDatesPrev(datesArr)
    }, [])


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
        /*  const result = allDatesRange.filter(el => dayjs(el).format('DD-MM-YYYY') !== date.format('DD-MM-YYYY'))
         const result2 = datesPrev.filter(el => dayjs(el).format('DD-MM-YYYY') !== date.format('DD-MM-YYYY')) */
        calendarType == 1 ?
            setDates(datesPrev.flatMap(el => ordersCount == 1 ? param1(el) : ordersCount == 2 ? param2(el) : param3(el)))
            :
            setDates(allDatesRange.flatMap(el => ordersCount == 1 ? param1(el) : ordersCount == 2 ? param2(el) : param3(el)))
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
                <div>
                    <MultiDatePicker type={calendarType} setDates={setDatesPrev} dates={datesPrev} setAllDatesRange={setAllDatesRange} />
                    <span className={s.orderspan}>Выбери кол-во заказов в день</span>
                    <div className={s.block}>
                        <TabsNumbers
                            value={ordersCount}
                            setValue={setOrdersCount}
                            sub={null}
                            max={3}
                            maxVis={3}
                            forPro={!user.pro}
                        />

                        <div className={s.container_order}>
                            {numbersOrdersDay?.map((el, i) => <div className={s.order}>
                                <InputTime
                                    nosub={true}
                                    time={i === 0 ? time1 : i === 1 ? time2 : time3}
                                    setTime={i === 0 ? setTime1 : i === 1 ? setTime2 : setTime3}
                                />

                                {service !== 8 && <InputNumList
                                    nosub={true}
                                    inputWidth={64}
                                    Icon={IconBuilder}
                                    max={100}
                                    value={i === 0 ? count1 : i === 1 ? count2 : count3}
                                    setValue={i === 0 ? setCount1 : i === 1 ? setCount2 : setCount3}
                                />}

                            </div>)}
                        </div>

                    </div>

                </div>

            </div>

            <div className={s.buttons}>
                <button onClick={handleReset} className={`${s.button} ${s.button_second}`}>Сброс</button>
                <button onClick={handleConfirm} className={`${s.button} ${s.button_main}`}>Готово</button>
            </div>
        </div>
    )
};

export default ProCalendar;