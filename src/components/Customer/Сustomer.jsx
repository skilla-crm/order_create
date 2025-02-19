import s from './Customer.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconLoader } from '../../images/icons/IconLoader.svg';
import { ReactComponent as IconInfo } from '../../images/icons/header/iconInfo.svg';
import { ReactComponent as IconInfoErr } from '../../images/icons/iconInfoErr.svg';
import { ReactComponent as IconInfoWarning } from '../../images/icons/iconWarning.svg';

//Api
import { getHistoryOrders, checkCompany, contactCompany } from '../../Api/Api';
//selector
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
//slice
import {
    setCustomer,
    setPayType,
    setName,
    setPhone,
    setNoContactPerson,
    setIsBlack,
    setDebt,
    setDebtThreshold,
    setContacts,
    setIsSms
} from '../../store/reducer/Customer/slice';
import { setСompanyError, setPhoneError, setPhoneErrorFormat, setNameError, setIsBlackError, setIsDebtError } from '../../store/reducer/Validation/slice';
//constants
import { PromptCustomer } from '../../constants/prompts';
import {
    TITLE, BUTTON_TEXT,
    SUB_NAME, SUB_COMPANY, SUB_PHONE,
    SWITCH_NAME, ERROR_PHONE, segments
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


const Customer = ({ setAddCustomer, addCustomer }) => {
    const [historyLoad, setHistoryLoad] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [historyName, setHistoryName] = useState('');
    const [phoneWithMask, setPhoneWithMask] = useState('');
    const [beznal, setBeznal] = useState(true);
    const [loadBage, setLoadBage] = useState(false);
    const [loadWarning, setLoadWarning] = useState(false);
    const [hiddenCustomer, setHiddenCustomer] = useState(false);
    const { companies, customer, payType, name, phone, isBlack, debt, debtThreshold, contacts, noContactPerson } = useSelector(selectorCustomer);
    const { companyError, phoneError, nameError } = useSelector(selectorValidation)
    const dispatch = useDispatch();

    console.log(useSelector(selectorValidation))

    useEffect(() => {
        payType == 1 ? setBeznal(true) : setBeznal(false)
        payType !== 1 && dispatch(setNoContactPerson(false))
        handleResetErrorCompany()
    }, [payType])

    useEffect(() => {
        phone?.length == 11 && historyList?.length == 0 ? dispatch(setIsSms(true)) : dispatch(setIsSms(false))
    }, [historyList, phone])

    useEffect(() => {
        !customer?.id && dispatch(setContacts([]))
        dispatch(setIsBlack(0))
        dispatch(setDebt(0))
        dispatch(setDebtThreshold(0))
        dispatch(setIsBlackError(false))
        dispatch(setIsDebtError(false))
    }, [customer])

    useEffect(() => {
        customer?.id && setLoadWarning(true)
        customer?.id && handleResetErrorCompany()
        customer?.id && checkCompany(customer.id)
            .then(res => {
                const data = res.data.data;
                dispatch(setIsBlack(data.is_black))
                dispatch(setDebt(data.debt))
                dispatch(setDebtThreshold(data.debt_threshold))
                setTimeout(() => {
                    setLoadWarning(false)
                }, 150)
            })
            .catch(err => console.log(err))

        customer?.id && contactCompany(customer.id)
            .then(res => {
                const data = res.data.data;
                dispatch(setContacts(data))
            })
            .catch(err => console.log(err))
    }, [customer])

    useEffect(() => {
        if (!customer.id && payType == 1) {
            setLoadBage(false)
            return
        }

        if (phone?.length !== 11 && payType !== 1) {
            setLoadBage(false)
            return
        }
    }, [customer, payType, phone])


    useEffect(() => {
        if ((phone?.length !== 11) && !beznal) {
            setHistoryList([])
            setHistoryName('')
            return
        }

        if (beznal && !customer.id) {
            setHistoryList([])
            setHistoryName('')
            return
        }
    }, [phone, customer, beznal])

    useEffect(() => {
        if (beznal && customer.id) {
            setHistoryName(customer.name)
            setHistoryList([])
            setHistoryLoad(true)
            setLoadBage(true)
            getHistoryOrders(payType, customer.id)
                .then(res => {
                    const data = res.data.data;


                    setTimeout(() => {
                        data.length > 0 && setLoadBage(false)
                    }, 200)

                    setTimeout(() => {
                        setHistoryList(data);
                        setHistoryLoad(false)
                    }, 350)

                })
            return
        }
    }, [customer, beznal])

    useEffect(() => {
        if (!beznal && phone?.length == 11) {
            setHistoryName(phoneWithMask)
            setHistoryList([])
            setHistoryLoad(true)
            setLoadBage(true)
            getHistoryOrders(payType, phone)
                .then(res => {
                    const data = res.data.data;

                    setTimeout(() => {
                        data.length > 0 && setLoadBage(false)
                    }, 200)

                    setTimeout(() => {
                        setHistoryLoad(false)
                        setHistoryList(data);
                    }, 350)
                })
            return
        }

    }, [phone, beznal])

    useEffect(() => {
        !addCustomer && setHiddenCustomer(false)
    }, [addCustomer])

    const handleAdd = () => {
        setHiddenCustomer(true)

        setTimeout(() => {
            setAddCustomer(true)
        }, 500)
       
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
    }

    const handleResetErrorPhone = () => {
        dispatch(setPhoneError(false))
        dispatch(setPhoneErrorFormat(false))
    }

    const handleResetErrorName = () => {
        dispatch(setNameError(false))
    }

    return (
        <div className={`${s.window} ${hiddenCustomer && s.window_hidden}`}>
            <div className={s.customer}>
                <Header
                    title={TITLE}
                    buttonState={addCustomer ? false : true}
                    buttonText={BUTTON_TEXT}
                    handleButton={handleAdd}
                    forPro={false}
                    PromptText={PromptCustomer}
                />

                <SegmentControl
                    segments={segments}
                    setActive={(data) => dispatch(setPayType(Number(data)))}
                    active={payType}
                />

                <div className={s.container}>
                    <div className={s.block}>
                        <div className={`${s.company} ${payType == 1 && s.company_vis}`}>
                            <InputCompany
                                sub={SUB_COMPANY}
                                list={companies}
                                value={customer?.id}
                                setValue={(data) => dispatch(setCustomer(data))}
                                setAddCustomer={setAddCustomer}
                                payType={payType}
                                error={companyError}
                                errorText={'Выбери заказчика'}
                            />

                            <div className={s.warnings}>
                                <div className={`${s.loader}  ${s.loader_error} ${loadWarning && s.loader_vis}`}>
                                    {loadWarning && <div className={s.loader_anim}><IconLoader /></div>}
                                </div>
                                <div className={`${s.loader} ${s.loader_error} ${isBlack == 1 && !loadWarning && customer.id && s.loader_vis}`}>
                                    <IconInfoErr />
                                    <p>Заказчик в черном списке</p>
                                </div>

                                <div className={`${s.loader} ${s.loader_error} ${debt > debtThreshold && !loadWarning && customer.id && s.loader_vis}`}>
                                    <IconInfoErr />
                                    {debt > debtThreshold && <p>Превышен лимит задолженности {addSpaceNumber(debtThreshold)} руб.</p>}
                                </div>

                                <div className={`${s.loader} ${s.loader_warning} ${debt <= debtThreshold && debt !== 0 && !loadWarning && customer.id && s.loader_vis}`}>
                                    <IconInfoWarning />
                                    {debt <= debtThreshold && debt !== 0 && <p>Задолженность {addSpaceNumber(debt)} ₽</p>}
                                </div>
                            </div>


                        </div>
                        <div className={s.container}>
                            <div className={s.contact}>
                                <InputPhone
                                    sub={SUB_PHONE}
                                    disabled={noContactPerson}
                                    contacts={contacts.filter((el) => el.phone !== '')}
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
                                    value={name}
                                    setValue={(data) => dispatch(setName(data))}
                                    error={nameError}
                                    errorText={'Введи имя'}
                                    handleResetError={handleResetErrorName}
                                    type={2}
                                    maxLength={28}
                                />
                            </div>
                            <div className={s.switch}>
                                <Switch
                                    text={SWITCH_NAME}
                                    handleSwitch={handleContactPersonState}
                                    switchState={noContactPerson}
                                    hidden={payType == 1 ? false : true}
                                />
                            </div>

                        </div>


                        <div className={`${s.loader} ${s.loader_history} ${loadBage && s.loader_vis}`}>
                            {historyLoad && <div className={s.loader_anim}><IconLoader /></div>}
                            {historyLoad && <p>Проверяем историю заказов</p>}
                            {!historyLoad && historyList?.length == 0 && <IconInfo />}
                            {!historyLoad && historyList?.length == 0 && <p>Заказы не найдены</p>}
                        </div>
                    </div>


                </div>

            </div>

            <OrdersHistory vis={historyList?.length > 0} client={historyName} historyList={historyList} />
        </div>

    )
};

export default Customer;