import s from './App.module.scss';
import { useState, useEffect, useRef } from 'react';
//hooks
import { useWriteOrderDataHook } from '../../hooks/useWriteOrderDataHook';
import { useOrderDataForSend } from '../../hooks/useOrderDataForSend';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import moment from 'moment/moment';

import { ReactComponent as IconDone } from '../../images/icons/iconDone16-16-white.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
import { ReactComponent as IconReject } from '../../images/icons/iconCloseRed.svg';
import { UserContext, ParametrsContext } from '../../contexts/UserContext';
//Api
import { getParametrs, createOrder, getDetails, editOrder, rejectOrder } from '../../Api/Api';
import { getAddressExact } from '../../Api/ApiYandex';
//slice
import {
    setCompaniesList,
    setPayType,
    setCustomer,
    setContract,
    setName,
    setPhone
} from '../../store/reducer/Customer/slice';
import { setDate, setTime, setTimerDisabled } from '../../store/reducer/Performers/slice';
import { setDefaultCordinate } from '../../store/reducer/Address/slice';
import {
    setСompanyError, setСontractError, setPhoneError, setPhoneErrorFormat, setNameError, setTimeError, setAdressError,
    setRateError, setRateWorkerError, setEmailError, setEmailErrorFormat, setIsBlackError, setIsDebtError,
    setPaySummError, setIsServiceError
} from '../../store/reducer/Validation/slice';
import { setUnitList } from '../../store/reducer/Parametrs/slice';
import { setFromPartnership, setAcceptStatus, setFromLk } from '../../store/reducer/Managers/slice';
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
import Addresses from '../Addresses/Addresses';
import Details from '../Details/Details';
import Preview from '../Preview/Preview';
import PreviewApp from '../PreviewApp/PreviewApp';
import AddCustomer from '../AddCustomer/AddCustomer';
import Rates from '../Rates/Rates';
import Manager from '../Manager/Manager';
import SuccessModal from '../SuccessModal/SuccessModal';
import ErrorWindow from '../ErrorWindow/ErrorWindow';
import PreviewPhone from '../PreviewPhone/PreviewPhone';
import OrderSum from '../OrderSum/OrderSum';
const pro = document.getElementById(`root_order-create`).getAttribute('ispro') == 1 ? true : false;
const role = document.getElementById(`root_order-create`).getAttribute('role');
const TEST = process.env.REACT_APP_TEST;

const App = () => {
    const [theme, setTheme] = useState('light');
    const [anim, setAnim] = useState(false);
    const [addCustomer, setAddCustomer] = useState(false);
    const [parametrs, setParametrs] = useState({});
    const [loadCreate, setLoadCreate] = useState(false);
    const [loadSave, setLoadSave] = useState(false);
    const [loadReject, setLoadReject] = useState(false);
    const [successWindow, setSuccessWindow] = useState(false);
    const [successWindowType, setSuccessWindowType] = useState(1);
    const [loadParametrs, setLoadParametrs] = useState(true);
    const [loadDetail, setLoadDetail] = useState(false);
    const [orderStatus, setOrderStatus] = useState(1);
    const [existOrder, setExistOrder] = useState(false);
    const [id, setId] = useState(0);
    const [activeType, setActiveType] = useState('');
    const [hiddenCustomer, setHiddenCustomer] = useState(false);
    const [positionButtonBotom, setPositionButtonBotom] = useState(false);
    const [title, setTitle] = useState('Создание заказа')
    const { customer, contract, payType, name, phone, noContactPerson, isBlack, isBlackOur, debt, debtThreshold } = useSelector(selectorCustomer);
    const { time, timerDisabled } = useSelector(selectorPerformers);
    const { service } = useSelector(selectorDetails);
    const { address, noAddress } = useSelector(selectorAddress);
    const { rate, rateWorker, orderSum } = useSelector(selectorRates);
    const { emailPasport, emailState, fromPartnership, acceptStatus, fromLk } = useSelector(selectorManagers);
    const { phoneModal } = useSelector(selectorPreview);
    const appRef = useRef();
    const location = useLocation();
    const path = location.pathname + location.search;
    const dispatch = useDispatch();
    const { setData } = useWriteOrderDataHook();
    const { orderData } = useOrderDataForSend()
    const navigate = useNavigate()

    console.log(address)

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

    const handleScroll = () => {
        if (appRef?.current?.scrollTop >= 250) {
            setPositionButtonBotom(true)
        } else {
            setPositionButtonBotom(false)
        }
    }

    useEffect(() => {
        appRef?.current?.addEventListener('scroll', handleScroll)

        return () => {
            appRef?.current?.removeAddEventListener('scroll', handleScroll)
        }

    }, [appRef])


    useEffect(() => {
        addCustomer && window.scroll({ top: 320 })
    }, [addCustomer])

    useEffect(() => {
        getParametrs()
            .then(res => {
                const data = res.data.data;
                const companies = data.companies_2;
                setParametrs(data)
                dispatch(setCompaniesList(companies))
                dispatch(setUnitList(data.order_units))
                setLoadParametrs(false)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const result = parametrs?.types?.find(el => el.id == service)
        setActiveType(result?.name ? result?.name : '')
    }, [service, parametrs]);

    useEffect(() => {
        if (path.includes('orders/edit/') || path.includes('orders/repeat')) {
            fromPartnership === 0 && orderStatus !== 5 && path.includes('orders/edit/') && setTitle('Редактировать заказ')
            fromPartnership !== 0 && path.includes('orders/edit/') && setTitle('Заказ от партнера')

            setExistOrder(true)
            setLoadDetail(true)
            const idOrder = path.includes('orders/edit/') ? Number(path.split('edit/').pop()) : Number(path.split('repeat/').pop());

            setId(idOrder)
            !loadParametrs && getDetails(idOrder)
                .then(res => {

                    const data = res.data.data;
                    const timeA = data.time == '' ? null : moment(`${data.time}`, 'HH:mm')
                    const date = dayjs(data.date, 'YYYY-MM-DD').locale('ru');

                    dispatch(setFromPartnership(data?.from_partnership_id))
                    dispatch(setAcceptStatus(data?.accept_status))
                    dispatch(setFromLk(data?.from_lk > 0 ? true : false))


                    dispatch(setTime(timeA == null ? null : dayjs(timeA).locale('ru')))
                    dispatch(setDate(date))
                    timeA == null && dispatch(setTimerDisabled(true))
                    setOrderStatus(Number(data.order_status))
                    setData(data)

                    const company = parametrs?.companies_2?.find(el => el.id == data.company_id)
                    const contract = company?.contracts?.find(el => el.id === data.contract_id)
                    data.beznal == 1 && company && dispatch(setCustomer(company))
                    data.beznal == 1 && contract && dispatch(setContract(contract))
                    data.beznal == 1 && !contract && company?.contracts?.length > 0 && dispatch(setContract(company?.contracts?.[0]))

                    setTimeout(() => {
                        setLoadDetail(false)
                    }, 100)

                })
                .catch(err => { setLoadDetail(false) })
        }

    }, [path, loadParametrs, fromPartnership, orderStatus]);


    useEffect(() => {
        parametrs.city && getAddressExact(parametrs.city)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0].GeoObject?.Point;
                const cordinate = data.pos.split(' ')
                dispatch(setDefaultCordinate([cordinate[1], cordinate[0]]))
            })
    }, [parametrs.city])


    const handleValidation = () => {
        const companyError = payType == 1 && !customer?.id && acceptStatus == 1 ? true : false;
        const contractError = payType == 1 && !contract?.id ? true : false;
        const phoneError = !noContactPerson && phone == '' ? true : false;
        const phoneErrorFormat = phone?.length > 0 && phone?.length < 11 ? true : false;
        const nameError = !noContactPerson && name == '' ? true : false;
        const timeError = time == null && !timerDisabled ? true : false;
        const adressError = !address.city && !address.street && !noAddress ? true : false;
        const rateError = service !== 8 && rate == '' ? true : false;
        const rateWorkerError = service !== 8 && rateWorker == '' ? true : false;
        const paySummError = service == 8 && orderSum == '' ? true : false;
        const emailError = emailState && emailPasport == '' ? true : false;
        const emailErrorFormat = emailState && emailPasport !== '' && !emailValidate(emailPasport) ? true : false;
        const isBlackError = payType == 1 && isBlack == 1 && isBlackOur ? true : false;
        const isDebtError = payType == 1 && debt > 0 && debtThreshold > 0 && debt > debtThreshold ? true : false;
        const isServiceError = service == 0 ? true : false;

        dispatch(setСompanyError(companyError))
        dispatch(setСontractError(contractError))
        dispatch(setPhoneError(phoneError))
        dispatch(setPhoneErrorFormat(phoneErrorFormat))
        dispatch(setNameError(nameError))
        dispatch(setTimeError(timeError))
        dispatch(setAdressError(adressError))
        dispatch(setRateError(rateError))
        dispatch(setRateWorkerError(rateWorkerError))
        dispatch(setPaySummError(paySummError))
        dispatch(setEmailError(emailError))
        dispatch(setEmailErrorFormat(emailErrorFormat))
        dispatch(setIsBlackError(isBlackError))
        dispatch(setIsDebtError(isDebtError))
        dispatch(setIsServiceError(isServiceError))

        if (!companyError &&
            !contractError &&
            !phoneError &&
            !phoneErrorFormat &&
            !nameError &&
            !timeError &&
            !adressError &&
            !rateError &&
            !rateWorkerError &&
            !paySummError &&
            !emailError &&
            !emailErrorFormat &&
            !isBlackError &&
            !isDebtError &&
            !isServiceError) {
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
                const dataOrder = res.data.data;
                setTimeout(() => {
                    /*    window.location.href = 'https://lk.skilla.ru/orders/' */
                    navigate(`/new/${TEST}orders?date=${dataOrder.date}`)
                })
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
                const dataOrder = res.data.data;
                setTimeout(() => {
                    /* window.location.href = 'https://lk.skilla.ru/orders/?type=preorder' */
                    navigate(`/new/${TEST}orders?type=preorder&date=${dataOrder.date}`)
                })
            })
            .catch(err => console.log(err))
    }

    const handleEditOrder = () => {
        const valid = handleValidation();
        if (!valid) {
            return
        }
        setLoadSave(true)
        const data = { preorder: orderStatus == 0 ? 1 : 0, ...orderData }
        editOrder(data, id)
            .then(res => {
                const dataOrder = res.data.data[0];
                console.log(data.id)
                setTimeout(() => {
                    setLoadSave(false)
                }, 200)

                setTimeout(() => {
                    if (orderStatus == 0) {
                        /* window.location.href = 'https://lk.skilla.ru/orders/?type=preorder' */
                        navigate(`/new/${TEST}orders?type=preorder&date=${dataOrder.date}`)
                    } else {
                        /*  window.location.href = role === 'director' ? `https://lk.skilla.ru/orders/order_detail/${data.id}` : 'https://lk.skilla.ru/orders/' */

                        /*  role === 'director' ? navigate(`/new/orders/order_detail/${dataOrder.id}`) : *//*  navigate(`https://lk.skilla.ru/orders/`) */
                        window.location.href = `https://lk.skilla.ru/new/${TEST}orders`
                    }
                })

            })
            .catch(err => console.log(err))
    }

    const handlePublishOrder = () => {
        const valid = handleValidation();
        if (!valid) {
            return
        }
        setLoadCreate(true)
        const data = { preorder: 0, ...orderData }
        editOrder(data, id)
            .then(res => {
                const dataOrder = res.data.data[0];
                setOrderStatus(Number(dataOrder.order_status))
                setLoadCreate(false)
                setTimeout(() => {
                    /* window.location.href = 'https://lk.skilla.ru/orders/' */
                    navigate(`/new/${TEST}orders?date=${dataOrder.date}`)
                })
            })
            .catch(err => console.log(err))
    }


    const handleRejectOrder = () => {
        setLoadReject(true)
        rejectOrder(id)
            .then(res => {
                console.log(res)
                const dataOrder = res.data.data;
                setLoadReject(false)
                setTimeout(() => {
                    /*  window.location.href = 'https://lk.skilla.ru/orders/' */
                    navigate(`/new/orders?date=${dataOrder.date}`)
                })
            })
            .catch(err => { setLoadReject(false) })
    }


    document.documentElement.dataset.theme = theme;
    return (
        <UserContext.Provider value={{ pro, role }}>
            <ParametrsContext.Provider value={parametrs}>
                <div ref={appRef} className={`${s.app} ${anim && !loadDetail && s.app_anim} ${loadParametrs && !loadDetail && s.app_disabled}`}>
                    {acceptStatus == 1 && !fromLk && <div className={s.header}>
                        <h2 className={s.title}>{title}</h2>
                        {<div className={`${s.buttons} ${!existOrder && !loadDetail && s.buttons_vis}`}>
                            {/*  <Button Icon={IconPoints} type={'points'} /> */}
                            <Button disabled={loadSave} id={'save'} handleClick={handleSave} text={'Сохранить черновик'} type={'second'} load={loadSave} />
                            <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Создать заказ'} Icon={IconDone} load={loadCreate} />
                        </div>
                        }

                        {<div className={`${s.buttons} ${s.buttons_2} ${existOrder && !loadDetail && (orderStatus < 4 || (/* role == 'director' && */ orderStatus < 9)) && s.buttons_vis}`}>
                            {path.includes('orders/edit/') && <Button disabled={loadSave} id={'save'} handleClick={handleEditOrder} text={'Сохранить изменения'} type={orderStatus == 0 ? 'second' : 'tr'} load={loadSave} />}
                            {path.includes('orders/repeat/') && <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Повторить заказ'} Icon={IconDone} load={loadCreate} />}
                            {orderStatus == 0 && <Button disabled={loadCreate} id={'create'} handleClick={handlePublishOrder} text={'Опубликовать заказ'} Icon={IconDone} load={loadCreate} />}
                        </div>
                        }
                        {/*                {orderStatus === 5 && <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Повторить заказ'} Icon={IconDone} load={loadCreate} />} */}
                    </div>}

                    {((fromPartnership !== 0 && acceptStatus == 0) || fromLk) && <div className={s.header}>
                        <h2 className={s.title}>{title}</h2>
                        <div className={`${s.buttons} ${s.buttons_vis}`}>
                            <Button disabled={loadReject} id={'reject'} type={'reject'} handleClick={handleRejectOrder} text={'Отклонить заказ'} Icon={IconReject} load={loadReject} />
                            <Button disabled={loadSave} id={'save'} handleClick={handleEditOrder} text={fromLk ? 'Подтвердить заказ' : 'Принять заказ'} Icon={IconDone} load={loadSave} />
                        </div>
                    </div>}


                    <div className={s.container}>
                        <div className={s.left}>
                            <div className={s.errors}>
                                <ErrorWindow />
                            </div>
                            {addCustomer && <AddCustomer setAddCustomer={setAddCustomer} setHiddenCustomer={setHiddenCustomer} />}
                            {<Customer setAddCustomer={setAddCustomer} addCustomer={addCustomer} hiddenCustomer={hiddenCustomer} setHiddenCustomer={setHiddenCustomer} />}

                            <Performers />
                            <Addresses />
                            <Details />
                            {service == 8 && <OrderSum />}
                            {service !== 8 && <Rates />}
                            {<Manager />}

                            {(orderStatus < 4 || (/* role == 'director' && */ orderStatus < 9)) && acceptStatus == 1 && !fromLk && <div className={`${s.buttons_bottom} ${positionButtonBotom && s.buttons_vis}`}>
                                {!existOrder && !loadDetail && <div className={`${s.buttons} ${!existOrder && !loadDetail && s.buttons_vis}`}>
                                    <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Создать заказ'} Icon={IconDone} load={loadCreate} />
                                    <Button disabled={loadSave} id={'save'} handleClick={handleSave} text={'Черновик'} type={'second'} load={loadSave} />
                                </div>
                                }

                                {existOrder && !loadDetail && (orderStatus < 4 || (/* role == 'director' && */ orderStatus < 9)) && <div className={`${s.buttons} ${existOrder && !loadDetail && (orderStatus < 4 || (/* role == 'director' && */ orderStatus < 9)) && s.buttons_vis}`}>
                                    {orderStatus == 0 && <Button disabled={loadCreate} id={'create'} handleClick={handlePublishOrder} text={'Опубликовать заказ'} Icon={IconDone} load={loadCreate} />}
                                    {path.includes('orders/edit/') && <Button disabled={loadSave} id={'save'} handleClick={handleEditOrder} text={'Сохранить изменения'} type={orderStatus == 0 ? 'second' : 'tr'} load={loadSave} />}
                                    {path.includes('orders/repeat/') && <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Повторить заказ'} Icon={IconDone} load={loadCreate} />}
                                </div>
                                }
                            </div>
                            }

                            {((fromPartnership !== 0 && acceptStatus == 0) || fromLk) && <div className={`${s.buttons_bottom} ${positionButtonBotom && s.buttons_vis}`}>
                                <Button disabled={loadSave} id={'save'} handleClick={handleEditOrder} text={fromLk ? 'Подтвердить заказ' : 'Принять заказ'} Icon={IconDone} load={loadSave} />
                                <Button disabled={loadReject} id={'reject'} type={'reject'} handleClick={handleRejectOrder} text={'Отклонить заказ'} Icon={IconReject} load={loadReject} />
                            </div>}



                        </div>
                        <div className={s.right}>
                            <div className={s.sticky}>
                                <Preview />
                                <PreviewApp />
                            </div>
                        </div>
                    </div>

                    {/*  {successWindow && <SuccessModal type={successWindowType} />} */}
                    {phoneModal && <PreviewPhone activeType={activeType} />}
                    {/*    {<Loader load={loadDetail}/>} */}
                </div>
            </ParametrsContext.Provider>
        </UserContext.Provider>
    )
};

export default App;