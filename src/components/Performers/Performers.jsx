import s from './Performers.module.scss';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
//constants
import { TITLE, BUTTON_TEXT, SUB_DATE, SUB_TIME, SWITCH_NAME, SUB_PERFORMERS, SUB_DATES } from '../../constants/performers';
import { PromptPerformers } from '../../constants/prompts';
//components
import Header from '../General/Header/Header';
import InputData from '../General/Input/InputData';
import InputTime from '../General/Input/InputTime';
import Switch from '../General/Switch/Switch';
import TabsNumbers from '../General/Tabs/TabsNumbers';
import AdditionalDate from './AdditionalDate/AdditionalDate';
import ProCalendar from './ProCalendar/ProCalendar';
//slice
import { setPerformersNum, setDate, setTime } from '../../store/reducer/Performers/slice';
import { setAdditionalDates } from '../../store/reducer/AdditionalDates/slice';
//selector
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorAdditionalDates } from '../../store/reducer/AdditionalDates/selector';


const Performers = () => {
    const [timerDisabled, setTimerDisabled] = useState(false);
    const [proCalendar, setProCalendar] = useState(false);
    const [proType, setProType] = useState(1);
    const [periodDates, setPeriodDates] = useState([]);
    const [allDatesRange, setAllDatesRange] = useState([]);
    const [hiddenAddDates, setHiddenAddDates] = useState(true)
    const user = useContext(UserContext);
    const dispatch = useDispatch();
    const data = useSelector(selectorPerformers);
    const additionalDates = useSelector(selectorAdditionalDates).additionalDates;
    const disabledDates = useSelector(selectorAdditionalDates).disabledDates;
    const performersNum = data.performersNum;
    const date = data.date;
    const time = data.time;
    console.log(proType)
    
    useEffect(() => {
        additionalDates.length > 0 && setHiddenAddDates(false)
    }, [additionalDates])

    const handleTimerDisabled = () => {
        timerDisabled ? setTimerDisabled(false) : setTimerDisabled(true)
    }

    const handleAdd = () => {
        setProCalendar(true)
    }

    return (
        <div className={s.performers}>
            <Header
                title={TITLE}
                buttonState={true}
                buttonText={BUTTON_TEXT}
                handleButton={handleAdd}
                forPro={!user.pro}
                PromptText={PromptPerformers}
            />
            <div className={s.container}>
                <InputData sub={SUB_DATE} setDate={(data) => dispatch(setDate(data))} date={date} disabledDates={disabledDates} />
                <div className={s.container_time}>
                    <InputTime
                        sub={SUB_TIME}
                        disabled={timerDisabled}
                        time={time}
                        setTime={(data) => dispatch(setTime(data))}
                    />
                </div>
                <Switch
                    text={SWITCH_NAME}
                    switchState={timerDisabled}
                    handleSwitch={handleTimerDisabled}
                    hidden={false}
                />
            </div>

            <TabsNumbers
                value={performersNum}
                setValue={(data) => dispatch(setPerformersNum(data))}
                sub={SUB_PERFORMERS}
                max={100}
                maxVis={8}
                forPro={!user.pro}
            />

            <div className={`${s.container_sub} ${hiddenAddDates && s.hidden}`}>
                <span className={s.sub}>{SUB_DATES}</span>
                <div className={s.container_dates}>

                    {additionalDates.map((el) => {
                        return <AdditionalDate key={el.id} id={el.id} date={el.date} time={el.time} performers={el.performers} disabledDates={[date, ...disabledDates]} setProType={setProType} setHiddenAddDates={setHiddenAddDates}/>
                    })}
                </div>
            </div>

            {proCalendar && <ProCalendar
                proType={proType}
                setProType={setProType}
                periodDates={periodDates}
                setPeriodDates={setPeriodDates}
                setProCalendar={setProCalendar}
                allDatesRange={allDatesRange}
                setAllDatesRange={setAllDatesRange}
                dates={proType == 1 ?
                    additionalDates.map((el) => { return el.date })
                    :
                    periodDates
                }
                setDates={(data) => dispatch(setAdditionalDates(
                    data.map((el) => {
                        return {
                            id: uuid(),
                            date: new Date(el),
                            time: time,
                            performers: performersNum
                        }
                    })

                ))}


            />}
        </div>
    )
};

export default Performers;