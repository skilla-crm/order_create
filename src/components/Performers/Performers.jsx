import s from './Performers.module.scss';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
//constants
import { TITLE, BUTTON_TEXT, SUB_DATE, SUB_TIME, SWITCH_NAME, SUB_PERFORMERS, SUB_DATES } from '../../constants/performers';
import { SUB_EMAIL, SUB_SWITCH } from '../../constants/managers';
import { ERR_EMAIL } from '../../constants/addCustomer';
import { PromptPerformers } from '../../constants/prompts';
//components
import Header from '../General/Header/Header';
import InputData from '../General/Input/InputData';
import InputTime from '../General/Input/InputTime';
import Switch from '../General/Switch/Switch';
import TabsNumbers from '../General/Tabs/TabsNumbers';
import AdditionalDate from './AdditionalDate/AdditionalDate';
import ProCalendar from './ProCalendar/ProCalendar';
import InputEmail from '../General/Input/InputEmail';
//slice
import { setPerformersNum, setDate, setTime, setTimerDisabled } from '../../store/reducer/Performers/slice';
import { setAdditionalDates } from '../../store/reducer/AdditionalDates/slice';
import { setTimeError, setEmailError, setEmailErrorFormat } from '../../store/reducer/Validation/slice';
import { setEmailState, setEmailPasport } from '../../store/reducer/Managers/slice';
//selector
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorAdditionalDates } from '../../store/reducer/AdditionalDates/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorManagers } from '../../store/reducer/Managers/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//utils
import { emailValidate } from '../../utils/EmailValidate';

const Performers = () => {
    const [proCalendar, setProCalendar] = useState(false);
    const [proType, setProType] = useState(1);
    const [periodDates, setPeriodDates] = useState([]);
    const [allDatesRange, setAllDatesRange] = useState([]);
    const [hiddenAddDates, setHiddenAddDates] = useState(true);
    const [scrollState, setScrollState] = useState(false);
    const user = useContext(UserContext);
    const dispatch = useDispatch();
    const { performersNum, date, time, timerDisabled } = useSelector(selectorPerformers);
    const { service } = useSelector(selectorDetails);
    const { additionalDates, disabledDates } = useSelector(selectorAdditionalDates);
    const { timeError, emailError } = useSelector(selectorValidation);
    const { fromPartnership, acceptStatus, emailState, emailPasport } = useSelector(selectorManagers);
    const { contacts } = useSelector(selectorCustomer);


    useEffect(() => {
        service !== 8 && performersNum == 0 && dispatch(setPerformersNum(1))
    }, [service, performersNum])

    useEffect(() => {
        additionalDates.length > 0 ? setHiddenAddDates(false) : setHiddenAddDates(true)
        additionalDates.length > 15 ? setScrollState(true) : setScrollState(false)
    }, [additionalDates])

    useEffect(() => {
        handleResetErrorTime()
    }, [time])


    useEffect(() => {
        emailPasport !== '' && dispatch(setEmailState(true))
    }, [emailPasport])



    const handleTimerDisabled = () => {
        timerDisabled ? dispatch(setTimerDisabled(false)) : dispatch(setTimerDisabled(true))
        !timerDisabled && handleResetErrorTime()
    }

    const handleAdd = () => {
        setProCalendar(true)
    }

    const handleResetErrorTime = () => {
        dispatch(setTimeError(false))
    }

    const handleSwitch = () => {
        if (emailState) {
            dispatch(setEmailState(false))
            handleResetErrorEmail()
            dispatch(setEmailPasport(''))
        } else {
            dispatch(setEmailState(true))
        }
    }

    const handleResetErrorEmail = () => {
        dispatch(setEmailError(false))
        dispatch(setEmailErrorFormat(false))
    }


    return (
        <div className={s.performers}>
            <Header
                title={TITLE}
                buttonState={fromPartnership !== 0 && acceptStatus == 0 ? false : true}
                buttonText={BUTTON_TEXT}
                handleButton={handleAdd}
                forPro={!user.pro}
                PromptText={PromptPerformers}
            />
            <div className={`${s.container} ${fromPartnership !== 0 && acceptStatus == 0 && s.container_disabled}`}>
                <InputData sub={SUB_DATE} setDate={(data) => dispatch(setDate(data))} date={date} disabledDates={disabledDates} />
                <div className={s.container_time}>
                    <InputTime
                        sub={SUB_TIME}
                        disabled={timerDisabled}
                        time={time}
                        setTime={(data) => dispatch(setTime(data))}
                        error={timeError}
                        errorText={'Выбери время'}
                    />
                </div>
                <Switch
                    text={SWITCH_NAME}
                    switchState={timerDisabled}
                    handleSwitch={handleTimerDisabled}
                    hidden={false}
                />
            </div>
            <div className={`${fromPartnership !== 0 && acceptStatus == 0 && s.container_disabled}`}>
                {service !== 8 && service !== 9 && <TabsNumbers
                    value={performersNum}
                    setValue={(data) => dispatch(setPerformersNum(data))}
                    sub={SUB_PERFORMERS}
                    max={100}
                    maxVis={8}
                    forPro={!user.pro}
                />}
            </div>


            <div className={s.block_bottom}>
                <div className={`${s.container_sub} ${hiddenAddDates && s.hidden}`}>
                    <span className={s.sub}>{SUB_DATES}</span>
                    <div className={`${s.container_dates} ${scrollState && s.container_scroll}`}>

                        {additionalDates.map((el) => {
                            return <AdditionalDate
                                key={el.id}
                                id={el.id}
                                date={el.date}
                                time={el.time}
                                performers={el.performers}
                                disabledDates={[date, ...disabledDates]}
                                setProType={setProType}
                                setHiddenAddDates={setHiddenAddDates}
                                service={service}
                            />
                        })}
                    </div>
                </div>

                {service !== 8 && <Switch
                    text={SUB_SWITCH}
                    switchState={emailState}
                    handleSwitch={handleSwitch}
                />}

                <div className={`${s.email} ${emailState && s.email_vis}`}>
                    <InputEmail
                        sub={SUB_EMAIL}
                        value={emailPasport}
                        setValue={(data) => dispatch(setEmailPasport(data))}
                        error={!emailValidate(emailPasport) && emailPasport.length > 0}
                        errorEmpity={emailError}
                        errorText={ERR_EMAIL}
                        errorTextEmpity={'заполни поле'}
                        contacts={contacts.filter((el) => el.email !== '')}
                        type={2}
                        handleResetErrorEmail={handleResetErrorEmail}
                    />

                </div>
            </div>

            {proCalendar && <ProCalendar
                proType={proType}
                date={date}
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