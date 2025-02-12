import s from './Customer.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconLoader } from '../../images/icons/IconLoader.svg';
import { ReactComponent as IconInfo } from '../../images/icons/header/iconInfo.svg';
//Api
import { getHistoryOrders } from '../../Api/Api';
//selector
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//slice
import {
    setCustomer,
    setPayType,
    setName,
    setPhone
} from '../../store/reducer/Customer/slice';
//constants
import { PromptCustomer } from '../../constants/prompts';
import {
    TITLE, BUTTON_TEXT,
    SUB_NAME, SUB_COMPANY, SUB_PHONE,
    SWITCH_NAME, ERROR_PHONE, segments
} from '../../constants/customer';
//components
import Header from '../General/Header/Header';
import SegmentControl from '../General/SegmentControl/SegmentControl';
import InputText from '../General/Input/InputText';
import InputCompany from '../General/Input/InputCompany';
import InputPhone from '../General/Input/InputPhone';
import Switch from '../General/Switch/Switch';
import OrdersHistory from '../OrdersHistory/OrdersHistory';


const Customer = ({ setAddCustomer }) => {
    const [noContactPerson, setNoContactPerson] = useState(false);
    const [historyLoad, setHistoryLoad] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [historyName, setHistoryName] = useState('');
    const [phoneWithMask, setPhoneWithMask] = useState('');
    const [beznal, setBeznal] = useState(true);
    const [loadBage, setLoadBage] = useState(false);
    const { companies, customer, payType, name, phone } = useSelector(selectorCustomer);
    const dispatch = useDispatch();
    console.log(payType, customer)

    useEffect(() => {
        payType == 1 ? setBeznal(true) : setBeznal(false)
    }, [payType])

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
        if ((phone?.length !== 11) || !customer.id) {
            setHistoryList([])
            setHistoryLoad(false)

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
                        setHistoryLoad(false)
                    }, 100)
                    setHistoryList(data);
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
                    setHistoryList(data);
                    setTimeout(() => {
                        setHistoryLoad(false)
                    }, 100)
                })
            return
        }

    }, [phone, beznal])

    const handleAdd = () => {
        setAddCustomer(true)
    }

    const handleContactPersonState = () => {
        if (noContactPerson) {
            setNoContactPerson(false)
        } else {
            setNoContactPerson(true)
            dispatch(setName(''))
            dispatch(setPhone(''))
        }
    }

    return (
        <>
            <div className={s.customer}>
                <Header
                    title={TITLE}
                    buttonState={true}
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
                            />
                        </div>
                        <div className={s.container}>
                            <div className={s.contact}>
                                <InputPhone
                                    sub={SUB_PHONE}
                                    disabled={noContactPerson}
                                    value={phone}
                                    setPhoneWithMask={setPhoneWithMask}
                                    setValue={(data) => dispatch(setPhone(data))}
                                    error={(phone?.length < 11) && !noContactPerson}
                                    errorText={ERROR_PHONE}
                                />
                                <InputText sub={SUB_NAME} disabled={noContactPerson} value={name} setValue={(data) => dispatch(setName(data))} />
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

                    </div>
                </div>
                <div className={`${s.loader} ${loadBage && historyList?.length == 0 && s.loader_vis}`}>
                    {historyLoad && <div className={s.loader_anim}><IconLoader /></div>}
                    {historyLoad && <p>Проверяем историю заказов</p>}
                    {!historyLoad && <IconInfo />}
                    {!historyLoad && <p>Заказы не найдены</p>}
                </div>
            </div>

            <OrdersHistory vis={historyList?.length > 0} client={historyName} historyList={historyList} />
        </>

    )
};

export default Customer;