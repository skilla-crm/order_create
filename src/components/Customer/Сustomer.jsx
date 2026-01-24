import s from './Customer.module.scss';
import dayjs from 'dayjs';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
import { ReactComponent as IconLoader } from '../../images/icons/IconLoader.svg';
import { ReactComponent as IconInfo } from '../../images/icons/header/iconInfo.svg';
import { ReactComponent as IconInfoErr } from '../../images/icons/iconInfoErr.svg';
import { ReactComponent as IconInfoWarning } from '../../images/icons/iconWarning.svg';
//Api
import { getHistoryOrders, checkCompany, contactCompany, checkPhone } from '../../Api/Api';
//selector
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorManagers } from '../../store/reducer/Managers/selector';
//slice
import {
    setCustomer,
    setContract,
    setPayType,
    setName,
    setPhone,
    setNoContactPerson,
    setIsBlack,
    setIsBlackOur,
    setIsBlackCreatorPartnership,
    setDebt,
    setDebtThreshold,
    setContacts,
    setIsSms,
} from '../../store/reducer/Customer/slice';
import { setСompanyError, setСontractError, setPhoneError, setPhoneErrorFormat, setNameError, setIsBlackError, setIsDebtError } from '../../store/reducer/Validation/slice';
//constants
import { PromptCustomer } from '../../constants/prompts';
import {
    TITLE, BUTTON_TEXT,
    SUB_NAME, SUB_COMPANY, SUB_PHONE,
    SWITCH_NAME, SWITCH_NAME_SMS, ERROR_PHONE, segments
} from '../../constants/customer';
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';
//components
import Header from '../General/Header/Header';
import SegmentControl from '../General/SegmentControl/SegmentControl';
import InputText from '../General/Input/InputText';
import InputCompany from '../General/Input/InputCompany';
import InputPhone from '../General/Input/InputPhone';
import Switch from '../General/Switch/Switch';
import OrdersHistory from '../OrdersHistory/OrdersHistory';
import Tooltip from '../General/Tooltip/Tooltip';
import InputPartner from '../General/Input/InputPartner';
import InputListContract from '../General/Input/InputListContract/InputListContract';
import ButtonAdd from '../General/ButtonAdd/ButtonAdd';
const role = document.getElementById(`root_order-create`).getAttribute('role');


const Customer = ({ setAddCustomer, addCustomer, hiddenCustomer, setHiddenCustomer, loadParametrs, partnershipCompanies }) => {
    const location = useLocation();
    const path = location.pathname + location.search;
    const [historyLoad, setHistoryLoad] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [historyListPhone, setHistoryListPhone] = useState([]);
    const [historyListCompany, setHistoryListCompany] = useState([]);
    const [historyName, setHistoryName] = useState('');
    const [phoneWithMask, setPhoneWithMask] = useState('');
    const [beznal, setBeznal] = useState(true);
    const [loadBage, setLoadBage] = useState(false);
    const [loadWarning, setLoadWarning] = useState(false);
    const [loadWarningPhone, setLoadWarningPhone] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [tooltipSms, setTooltipSms] = useState(false)
    const [blackComment, setBlackComment] = useState('')
    const [activePartnership, setActivePartnership] = useState('');
    const [historyDisabled, setHistoryDisabled] = useState(false);
    const { companies, customer, contract, payType, name, phone, isBlack, isBlackOur, blackCreatorPartnership, debt, debtThreshold, contacts, noContactPerson, isSms } = useSelector(selectorCustomer);
    const { companyError, phoneError, nameError } = useSelector(selectorValidation);
    const { data, time, timerDisabled } = useSelector(selectorPerformers);
    const { partnershipId, fromPartnership, acceptStatus } = useSelector(selectorManagers);
    const { partnerships, skilla_partnerships, companies: companiesParam } = useContext(ParametrsContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (path.includes('orders/edit/?order_id=')) {
            setHistoryDisabled(true)
            return
        }
    }, [path])

    /* useEffect(() => {
      if(beznal) {
        setHistoryDisabled(false)
        return
      }

      if(!beznal) {
        setHistoryDisabled(false)
        return
      }
    }, [customer, phone]) */

    useEffect(() => {
        payType == 1 ? setBeznal(true) : setBeznal(false)
        payType !== 1 && dispatch(setNoContactPerson(false))
        handleResetErrorCompany()
    }, [payType])

    useEffect(() => {
        noContactPerson && dispatch(setIsSms(false))
    }, [noContactPerson])

    useEffect(() => {
        if (payType == 1 && (partnershipId == null || partnershipId == 0)) {
            setActivePartnership(customer?.partnership_name ? customer?.partnership_name : '')
            return
        }

        if (payType !== 1 && (partnershipId == null || partnershipId == 0)) {
            setActivePartnership(partnerships?.[0].name)
            return
        }

        if (partnershipId !== null && partnershipId !== 0) {
            const result = skilla_partnerships?.find(el => el.to_id == partnershipId)?.name;
            setActivePartnership(result)
            return
        }
    }, [customer, payType, partnerships, skilla_partnerships])



    useEffect(() => {
        !customer?.id && dispatch(setContacts([]))
        if (beznal) {
            dispatch(setIsBlack(0))
            dispatch(setIsBlackOur(false))
            dispatch(setDebt(0))
            dispatch(setIsBlackCreatorPartnership(''))
            setBlackComment('')
            dispatch(setDebtThreshold(0))
            dispatch(setIsBlackError(false))
            dispatch(setIsDebtError(false))
            return
        }
    }, [customer, beznal])

    useEffect(() => {
        if (!beznal) {
            dispatch(setIsBlack(0))
            dispatch(setIsBlackOur(false))
            dispatch(setIsBlackCreatorPartnership(''))
            setBlackComment('')
            dispatch(setIsBlackError(false))
            return
        }
    }, [beznal, phone])

    useEffect(() => {
        customer?.id && setLoadWarning(true)
        customer?.id && handleResetErrorCompany()
        customer?.id && beznal && checkCompany(customer.id)
            .then(res => {
                const data = res.data.data;
                dispatch(setIsBlack(data.is_black))
                dispatch(setIsBlackOur(data.our_partnership))
                dispatch(setIsBlackCreatorPartnership(data.black_creator_partnership))
                dispatch(setDebt(data.debt))
                dispatch(setDebtThreshold(data.debt_threshold))
                setBlackComment(data.black_comment)
                setTimeout(() => {
                    setLoadWarning(false)
                }, 150)
            })
            .catch(err => console.log(err))

        customer?.id && contactCompany(customer.id)
            .then(res => {
                const data = res.data.data;
                Array.isArray(data) ? dispatch(setContacts(data)) : dispatch(setContacts([]))
            })
            .catch(err => console.log(err))
    }, [customer, beznal])


    useEffect(() => {
        !beznal && phone.length == 11 && setLoadWarningPhone(true)
        !beznal && phone.length == 11 && checkPhone(phone)
            .then(res => {
                const data = res.data.data;
                dispatch(setIsBlack(data.is_black))
                dispatch(setIsBlackOur(data.our_partnership))
                dispatch(setIsBlackCreatorPartnership(data.black_creator_partnership))
                setBlackComment(data.black_comment)
                setTimeout(() => {
                    setLoadWarningPhone(false)
                }, 150)
            })
            .catch(err => console.log(err))

    }, [phone, beznal])

    useEffect(() => {
        if (!customer.id && phone.length < 11) {
            setLoadBage(false)
            return
        }

        if (phone?.length < 11 && !customer.id) {

            setLoadBage(false)


            return
        }
    }, [customer, payType, phone])

    useEffect(() => {
        if (phone?.length == 11 && !customer?.id) {
            handleHistoryPhone()
            return
        }

        if (phone?.length !== 11 && !customer?.id) {
            setHistoryList([])
            return
        }

        if (phone?.length !== 11 && customer?.id) {
            setHistoryList(historyListCompany)
            historyListCompany.length == 0 && setLoadBage(true)
            return
        }
    }, [phone, customer])

    useEffect(() => {
        if (customer?.id) {
            handleHistory()
            return
        }

        if (phone?.length !== 11 && customer?.id) {
            handleHistory()
            return
        }
    }, [customer, contract])

    const handleHistory = () => {
        const oldCompanies = companiesParam?.filter(el => `${el?.inn}${el?.kpp}` === `${customer?.inn}${customer?.kpp}`);
        const companyForHistory = oldCompanies?.find(el => el.partnership_id == contract?.partnership_id)

        setHistoryList([])
        setHistoryLoad(true)
        setLoadBage(true)
        getHistoryOrders(1, companyForHistory ? companyForHistory.id : customer?.id)
            .then(res => {
                const data = res.data.data;
                setHistoryName(customer?.name)
                setTimeout(() => {
                    data.length > 0 && setLoadBage(false)
                }, 200)

                setTimeout(() => {
                    setHistoryLoad(false)
                    setHistoryList(data)
                    setHistoryListCompany(data)
                    if (data.length == 0 && historyListPhone?.length !== 0) {
                        setHistoryList(historyListPhone)
                        setLoadBage(false)
                        setHistoryName(phoneWithMask)
                        return
                    }
                }, 400)
            })
    }

    const handleHistoryPhone = () => {
        setHistoryList([])
        setHistoryLoad(true)
        setLoadBage(true)
        getHistoryOrders(2, phone)
            .then(res => {
                const data = res.data.data;
                setHistoryName(phoneWithMask)
                setTimeout(() => {
                    data.length > 0 && setLoadBage(false)
                }, 200)

                setTimeout(() => {
                    setHistoryLoad(false)
                    setHistoryList(data)
                    setHistoryListPhone(data)
                }, 400)
            })
    }


    const handleAdd = () => {
        setAddCustomer(true)
        setTimeout(() => {
            setHiddenCustomer(true)
        }, 200)

    }

    const handleContactPersonState = () => {
        if (noContactPerson) {
            dispatch(setNoContactPerson(false))
        } else {
            dispatch(setNoContactPerson(true))
            handleResetErrorPhone()
            handleResetErrorName()
            dispatch(setName(''))
            dispatch(setPhone(''))
        }
    }
    //Функции сбрасывания ошибок
    const handleResetErrorCompany = () => {
        dispatch(setСompanyError(false))
        dispatch(setСontractError(false))
    }

    const handleResetErrorPhone = () => {
        dispatch(setPhoneError(false))
        dispatch(setPhoneErrorFormat(false))
    }

    const handleResetErrorName = () => {
        dispatch(setNameError(false))
    }

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }

    const handleOpenTooltipSms = () => {
        setTooltipSms(true)
    }

    const handleCloseTooltipSms = () => {
        setTooltipSms(false)
    }

    const handleSmsState = () => {
        isSms ? dispatch(setIsSms(false)) : dispatch(setIsSms(true))
    }

    return (
        <div className={`${s.window} ${hiddenCustomer && s.window_hidden}`}>
            <div className={s.customer}>
                <Header
                    title={TITLE}
                    buttonState={/* (addCustomer || historyDisabled || role === 'mainoperator') */ false}
                    buttonText={BUTTON_TEXT}
                    handleButton={handleAdd}
                    forPro={false}
                    PromptText={PromptCustomer}
                />

                {acceptStatus == 1 && <SegmentControl
                    segments={segments}
                    setActive={(data) => dispatch(setPayType(Number(data)))}
                    active={payType}
                />
                }

                <div className={s.container}>
                    <div className={s.block}>

                        <div className={`${s.company} ${(((payType == 1 || fromPartnership !== 0) && role !== 'mainoperator') || (role === 'mainoperator' && partnershipCompanies.length > 0 && payType == 1)) && s.company_vis}`}>
                            {fromPartnership == 0 && <InputCompany
                                sub={SUB_COMPANY}
                                list={role === 'mainoperator' ? partnershipCompanies : companies}
                                customer={customer}
                                value={customer?.id}
                                setValue={(data) => dispatch(setCustomer(data))}
                                handleAdd={handleAdd}
                                payType={payType}
                                error={companyError}
                                errorText={'Выбери заказчика'}
                                loadParametrs={loadParametrs}
                            />}

                            {role !== 'mainoperator' && <ButtonAdd
                                vis={customer?.contracts?.length === 0 && customer?.id}
                                counterpartyId={customer?.id}
                            />}

                            <InputListContract
                                list={customer?.contracts || []}
                                value={contract}
                                vis={customer?.contracts?.length > 0}
                                setValue={(data) => dispatch(setContract(data))}
                                width={500}
                            />
                            {fromPartnership !== 0 &&
                                <InputPartner
                                    sub={'Партнер'}
                                    value={`${skilla_partnerships?.find(el => el.to_id == fromPartnership)?.name}`}
                                />}


                            <div className={s.warnings}>
                                {tooltip && <Tooltip text={!isBlackOur ? blackCreatorPartnership : ''} comment={blackComment} />}
                                <div className={`${s.loader}  ${s.loader_error} ${loadWarning && s.loader_vis}`}>
                                    {loadWarning && <div className={s.loader_anim}><IconLoader /></div>}
                                </div>
                                <div
                                    onMouseEnter={handleOpenTooltip}
                                    onMouseLeave={handleCloseTooltip}
                                    className={`${s.loader} ${s.loader_error} ${s.pointer} ${isBlack == 1 && isBlackOur && !loadWarning && customer.id && s.loader_vis}`}
                                >
                                    <IconInfoErr />
                                    <p>Заказчик в черном списке</p>
                                </div>

                                <div
                                    onMouseEnter={handleOpenTooltip}
                                    onMouseLeave={handleCloseTooltip}
                                    className={`${s.loader} ${s.loader_warning} ${s.pointer} ${isBlack == 1 && !isBlackOur && !loadWarning && customer.id && s.loader_vis}`}
                                >
                                    <IconInfoWarning />
                                    <p>В черном списке {blackCreatorPartnership !== '' && `у партнера`}</p>
                                </div>

                                <div className={`${s.loader} ${s.loader_error} ${debt > 0 && debtThreshold > 0 && debt > debtThreshold && !loadWarning && customer.id && s.loader_vis}`}>
                                    <IconInfoErr />
                                    {debt > debtThreshold && <p>Превышен лимит задолженности {addSpaceNumber(debtThreshold)} руб.</p>}
                                </div>

                                <div className={`${s.loader} ${s.loader_warning} ${debt > 0 && debtThreshold > 0 && debt <= debtThreshold && debt !== 0 && !loadWarning && customer.id && s.loader_vis}`}>
                                    <IconInfoWarning />
                                    {debt <= debtThreshold && debt !== 0 && <p>Задолженность {addSpaceNumber(debt)} ₽</p>}
                                </div>
                            </div>


                        </div>
                        <div className={`${s.container} ${s.container_2}`}>
                            <div className={s.contact}>
                                <InputPhone
                                    sub={SUB_PHONE}
                                    disabled={noContactPerson}
                                    disabledEdit={fromPartnership !== 0 && acceptStatus == 0}
                                    contacts={contacts?.filter((el) => el.phone !== '')}
                                    value={phone}
                                    setPhoneWithMask={setPhoneWithMask}
                                    setValue={(data) => dispatch(setPhone(data))}
                                    setValueName={(data) => dispatch(setName(data))}
                                    error={(phone?.length < 11) && !noContactPerson}
                                    errorEmpyty={phoneError}
                                    errorTextEmpyty={'Введи номер'}
                                    handleResetError={handleResetErrorPhone}
                                    errorText={ERROR_PHONE}
                                />
                                <InputText
                                    sub={SUB_NAME}
                                    disabled={noContactPerson}
                                    disabledEdit={fromPartnership !== 0 && acceptStatus == 0}
                                    value={name}
                                    setValue={(data) => dispatch(setName(data))}
                                    error={nameError}
                                    errorText={'Введи имя'}
                                    handleResetError={handleResetErrorName}
                                    type={2}
                                    maxLength={28}
                                />
                            </div>

                            {!beznal && <div className={`${s.warnings} ${s.warnings_phone}`}>
                                {tooltip && <Tooltip text={!isBlackOur ? blackCreatorPartnership : ''} comment={blackComment} />}
                                <div className={`${s.loader}  ${s.loader_error} ${loadWarningPhone && s.loader_vis}`}>
                                    {loadWarningPhone && <div className={s.loader_anim}><IconLoader /></div>}
                                </div>
                                <div
                                    onMouseEnter={handleOpenTooltip}
                                    onMouseLeave={handleCloseTooltip}
                                    className={`${s.loader} ${s.loader_error} ${s.pointer} ${isBlack == 1 && isBlackOur && !loadWarningPhone && phone.length == 11 && s.loader_vis}`}
                                >
                                    <IconInfoErr />
                                    <p>Заказчик в черном списке</p>
                                </div>

                                <div
                                    onMouseEnter={handleOpenTooltip}
                                    onMouseLeave={handleCloseTooltip}
                                    className={`${s.loader} ${s.loader_warning} ${s.pointer} ${isBlack == 1 && !isBlackOur && !loadWarningPhone && phone.length == 11 && s.loader_vis}`}
                                >
                                    <IconInfoWarning />
                                    <p>В черном списке {blackCreatorPartnership !== '' && `у партнера`}</p>
                                </div>
                            </div>
                            }
                            {fromPartnership == 0 && acceptStatus == 1 && <div className={s.switch}>
                                <Switch
                                    text={SWITCH_NAME}
                                    handleSwitch={handleContactPersonState}
                                    switchState={noContactPerson}
                                    hidden={payType == 1 ? false : true}
                                />
                            </div>
                            }

                        </div>


                        {/*  {!historyDisabled && <div className={s.sms}>
                             <Switch
                                text={SWITCH_NAME_SMS}
                                handleSwitch={handleSmsState}
                                switchState={isSms}
                                hidden={false}
                                disabled={noContactPerson}
                            />
                            <div
                                onMouseEnter={handleOpenTooltipSms}
                                onMouseLeave={handleCloseTooltipSms}
                                className={s.sms_info}
                            >
                                {activePartnership !== '' && <IconInfo />}
                                {tooltipSms && activePartnership !== '' && <Tooltip text={!isBlackOur ? blackCreatorPartnership : ''}
                                    comment={`Заказ ${dayjs(data).format('DD.MM')} ${(timerDisabled || time == null) ? '' : `в ${dayjs(time).format('H:mm')}`} принят.`} type={2}
                                    comment2={activePartnership}
                                />

                                }
                            </div>

                        </div>
                        } */}



                        {<div className={`${s.loader} ${s.loader_history} ${loadBage && !historyDisabled && s.loader_vis}`}>
                            {historyLoad && <div className={s.loader_anim}><IconLoader /></div>}
                            {historyLoad && <p>Проверяем историю заказов</p>}
                            {!historyLoad && historyList?.length == 0 && <IconInfo />}
                            {!historyLoad && historyList?.length == 0 && <p>Заказы не найдены</p>}
                            {!historyLoad && historyList?.length == 0 && <p></p>}
                        </div>
                        }
                    </div>


                </div>

            </div>

        <OrdersHistory vis={(historyList?.length > 0 && !historyDisabled)} client={historyName} historyList={historyList} />
        </div>

    )
};

export default Customer;