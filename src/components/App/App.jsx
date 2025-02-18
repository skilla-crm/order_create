import s from './App.module.scss';
import { useState, useEffect } from 'react';
//hooks
import { useWriteOrderDataHook } from '../../hooks/useWriteOrderDataHook';
import { useOrderDataForSend } from '../../hooks/useOrderDataForSend';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import moment from 'moment/moment';

import { ReactComponent as IconDone } from '../../images/icons/iconDone16-16-white.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
import { UserContext, ParametrsContext } from '../../contexts/UserContext';
//Api
import { getParametrs, createOrder, getDetails, editOrder } from '../../Api/Api';
import { getAddressExact } from '../../Api/ApiYandex';
//slice
import {
    setCompaniesList,
    setPayType,
    setCustomer,
    setName,
    setPhone
} from '../../store/reducer/Customer/slice';
import { setTime, setTimerDisabled } from '../../store/reducer/Performers/slice';
import { setDefaultCordinate } from '../../store/reducer/Address/slice';
import {
    setСompanyError, setPhoneError, setPhoneErrorFormat, setNameError, setTimeError, setAdressError,
    setRateError, setRateWorkerError, setEmailError, setEmailErrorFormat, setIsBlackError, setIsDebtError
} from '../../store/reducer/Validation/slice';
//selector
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorAdditionalDates } from '../../store/reducer/AdditionalDates/selector';
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorAddress } from '../../store/reducer/Address/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorManagers } from '../../store/reducer/Managers/selector';
import { selectorPreview } from '../../store/reducer/Preview/selector';
//utils
import { emailValidate } from '../../utils/EmailValidate';

//components
import Button from '../General/Button/Button';
import Customer from '../Customer/Сustomer';
import Performers from '../Performers/Performers';
import Details from '../Details/Details';
import Preview from '../Preview/Preview';
import PreviewApp from '../PreviewApp/PreviewApp';
import AddCustomer from '../AddCustomer/AddCustomer';
import Rates from '../Rates/Rates';
import Manager from '../Manager/Manager';
import SuccessModal from '../SuccessModal/SuccessModal';
import ErrorWindow from '../ErrorWindow/ErrorWindow';
import PreviewPhone from '../PreviewPhone/PreviewPhone';
const pro = document.getElementById(`root_order-create`).getAttribute('ispro') == 1 ? true : false;
const role = document.getElementById(`root_order-create`).getAttribute('role');

const App = () => {
    const [theme, setTheme] = useState('light');
    const [anim, setAnim] = useState(false);
    const [addCustomer, setAddCustomer] = useState(false);
    const [parametrs, setParametrs] = useState({});
    const [loadCreate, setLoadCreate] = useState(false);
    const [loadSave, setLoadSave] = useState(false);
    const [successWindow, setSuccessWindow] = useState(false);
    const [successWindowType, setSuccessWindowType] = useState(1);
    const [loadParametrs, setLoadParametrs] = useState(true);
    const [loadDetail, setLoadDetail] = useState(false);
    const [orderStatus, setOrderStatus] = useState(1);
    const [existOrder, setExistOrder] = useState(false);
    const [id, setId] = useState(0);
    const [activeType, setActiveType] = useState('');
    const { customer, payType, name, phone, isSms, noContactPerson, isBlack, debt, debtThreshold } = useSelector(selectorCustomer);
    const { performersNum, date, time, timerDisabled } = useSelector(selectorPerformers);
    const { additionalDates } = useSelector(selectorAdditionalDates);
    const { service, tags, commentSupervisor, notes, minDuration, duration } = useSelector(selectorDetails);
    const { address, metro, noAddress } = useSelector(selectorAddress);
    const { rate, rateWorker } = useSelector(selectorRates);
    const { managerId, partnershipId, emailPasport, emailState, partnerRate } = useSelector(selectorManagers);
    const { phoneModal } = useSelector(selectorPreview);

    const location = useLocation();
    const path = location.pathname + location.search;
    const dispatch = useDispatch();
    const { setData } = useWriteOrderDataHook();
    const { orderData } = useOrderDataForSend()


    //установка системной темы
    useEffect(() => {
        if (theme == '') {
            const userMedia = window.matchMedia('(prefers-color-scheme: light)')
            if (userMedia.matches) return setTheme('light')
            return setTheme('dark')
        }
    }, [theme]);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])


    useEffect(() => {
        addCustomer && window.scroll({ top: 320 })
    }, [addCustomer])

    useEffect(() => {
        getParametrs()
            .then(res => {
                const data = res.data.data;
                const companies = data.companies;
                setParametrs(data)
                dispatch(setCompaniesList(companies))
                setLoadParametrs(false)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const result = parametrs?.types?.find(el => el.id == service)
        setActiveType(result?.name ? result?.name : '')
    }, [service, parametrs]);

    useEffect(() => {
        if (path.includes('orders/edit/?order_id=')) {
            setExistOrder(true)
            setLoadDetail(true)
            const idOrder = Number(path.split('order_id=').pop());
            setId(idOrder)
            !loadParametrs && getDetails(idOrder)
                .then(res => {
                    console.log(res)
                    const data = res.data.data;
                    console.log('времяяяяяяяяяя', data.time, data.date)
                    const timeA = data.time == '' ? null : moment(`${data.time}`, 'HH:mm')
                    console.log(timeA)
                    dispatch(setTime(timeA == null ? null : dayjs(timeA).locale('ru')))
                    timeA == null && dispatch(setTimerDisabled(true))
                    setOrderStatus(Number(data.order_status))
                    setData(data)
                    const company = parametrs?.companies?.find(el => el.id == data.company_id)
                    data.beznal == 1 && company && dispatch(setCustomer(company))
                    setLoadDetail(false)
                })
                .catch(err => console.log(err))
        }

    }, [path, loadParametrs]);


    useEffect(() => {
        parametrs.city && getAddressExact(parametrs.city)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0].GeoObject?.Point;
                const cordinate = data.pos.split(' ')
                dispatch(setDefaultCordinate([cordinate[1], cordinate[0]]))
            })
    }, [parametrs.city])
    console.log(debt, debtThreshold)

    const handleValidation = () => {
        const companyError = payType == 1 && !customer?.id ? true : false;
        const phoneError = !noContactPerson && phone == '' ? true : false;
        const phoneErrorFormat = phone?.length > 0 && phone?.length < 11 ? true : false;
        const nameError = !noContactPerson && name == '' ? true : false;
        const timeError = time == null && !timerDisabled ? true : false;
        const adressError = !address.city && !noAddress ? true : false;
        const rateError = rate == '' ? true : false;
        const rateWorkerError = rateWorker == '' ? true : false;
        const emailError = emailState && emailPasport == '' ? true : false;
        const emailErrorFormat = emailState && emailPasport !== '' && !emailValidate(emailPasport) ? true : false;
        const isBlackError = payType == 1 && isBlack == 1 ? true : false;
        const isDebtError = payType == 1 && debt > 0 && debt > debtThreshold ? true : false;
        console.log(emailState, emailErrorFormat, emailPasport, emailValidate(emailPasport))

        dispatch(setСompanyError(companyError))
        dispatch(setPhoneError(phoneError))
        dispatch(setPhoneErrorFormat(phoneErrorFormat))
        dispatch(setNameError(nameError))
        dispatch(setTimeError(timeError))
        dispatch(setAdressError(adressError))
        dispatch(setRateError(rateError))
        dispatch(setRateWorkerError(rateWorkerError))
        dispatch(setEmailError(emailError))
        dispatch(setEmailErrorFormat(emailErrorFormat))
        dispatch(setIsBlackError(isBlackError))
        dispatch(setIsDebtError(isDebtError))

        if (!companyError &&
            !phoneError &&
            !phoneErrorFormat &&
            !nameError &&
            !timeError &&
            !adressError &&
            !rateError &&
            !rateWorkerError &&
            !emailError &&
            !emailErrorFormat &&
            !isBlackError &&
            !isDebtError) {
            return true
        } else {
            return false
        }

    }

    const handleCreate = () => {
        const valid = handleValidation();
        if (!valid) {
            return
        }
        setLoadCreate(true)
        setSuccessWindowType(1)
        const data = { preorder: 0, ...orderData }
        valid && createOrder(data)
            .then(res => {
                setSuccessWindow(true)
                setLoadCreate(false)
                setTimeout(() => {
                    window.location.href = 'https://lk.skilla.ru/orders/'
                }, 300)
            })
            .catch(err => console.log(err))
    }

    const handleSave = () => {
        const valid = handleValidation();
        if (!valid) {
            return
        }
        setSuccessWindowType(2)
        setLoadSave(true)
        const data = { preorder: 1, ...orderData }
        valid && createOrder(data)
            .then(res => {
                setSuccessWindow(true)
                setLoadSave(false)
                setTimeout(() => {
                    window.location.href = 'https://lk.skilla.ru/orders/?type=preorder'
                }, 300)
            })
            .catch(err => console.log(err))
    }

    const handleEditOrder = () => {
        setLoadSave(true)
        const data = { preorder: orderStatus == 0 ? 1 : 0, ...orderData }
        editOrder(data, id)
            .then(res => {
                const data = res.data.data[0];
                setTimeout(() => {
                    setLoadSave(false)
                }, 200)

            })
            .catch(err => console.log(err))
    }

    const handlePublishOrder = () => {
        setLoadCreate(true)
        const data = { preorder: 0, ...orderData }
        editOrder(data, id)
            .then(res => {
                const data = res.data.data[0];
                setOrderStatus(Number(data.order_status))
                setLoadCreate(false)
                setTimeout(() => {
                    window.location.href = 'https://lk.skilla.ru/orders/'
                }, 300)
            })
            .catch(err => console.log(err))
    }


    document.documentElement.dataset.theme = theme;
    return (
        <UserContext.Provider value={{ pro, role }}>
            <ParametrsContext.Provider value={parametrs}>
                <div className={`${s.app} ${anim && s.app_anim}`}>
                    <div className={s.header}>
                        <h2 className={s.title}>Создание заказа</h2>
                        {<div className={`${s.buttons} ${!existOrder && !loadDetail && s.buttons_vis}`}>
                            {/*  <Button Icon={IconPoints} type={'points'} /> */}
                            <Button disabled={loadSave} id={'save'} handleClick={handleSave} text={'Сохранить черновик'} type={'second'} load={loadSave} />
                            <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Создать заказ'} Icon={IconDone} load={loadCreate} />
                        </div>
                        }

                        {<div className={`${s.buttons} ${s.buttons_2} ${existOrder && !loadDetail && orderStatus <= 1 && s.buttons_vis}`}>
                            <Button disabled={loadSave} id={'save'} handleClick={handleEditOrder} text={'Сохранить изменения'} type={'second'} load={loadSave} />
                            {orderStatus == 0 && <Button disabled={loadCreate} id={'create'} handleClick={handlePublishOrder} text={'Опубликовать заказ'} Icon={IconDone} load={loadCreate} />}
                        </div>
                        }
                    </div>


                    <div className={s.container}>
                        <div className={s.left}>
                            <div className={s.errors}>
                                <ErrorWindow />
                            </div>
                            <Customer setAddCustomer={setAddCustomer} addCustomer={addCustomer} />
                            {addCustomer && <AddCustomer setAddCustomer={setAddCustomer} />}
                            <Performers />
                            <Details />
                            <Rates />
                            <Manager />
                        </div>
                        <div className={s.right}>
                            <div className={s.sticky}>
                                <Preview />
                                <PreviewApp />
                            </div>
                        </div>
                    </div>
                    {successWindow && <SuccessModal type={successWindowType} />}
                    {phoneModal && <PreviewPhone activeType={activeType} />}
                </div>
            </ParametrsContext.Provider>
        </UserContext.Provider>
    )
};

export default App;