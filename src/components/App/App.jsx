import s from './App.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ReactComponent as IconDone } from '../../images/icons/iconDone16-16-white.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
import { UserContext, ParametrsContext } from '../../contexts/UserContext';
//Api
import { getParametrs, createOrder } from '../../Api/Api';
import { getAddressExact } from '../../Api/ApiYandex';
//slice
import { setCompaniesList } from '../../store/reducer/Customer/slice';
import { setDefaultCordinate } from '../../store/reducer/Address/slice';
//selector
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorAdditionalDates } from '../../store/reducer/AdditionalDates/selector';
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorAddress } from '../../store/reducer/Address/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorManagers } from '../../store/reducer/Managers/selector';
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
const pro = document.getElementById(`root_order-create`).getAttribute('ispro') == 1 ? true : false;
const role = document.getElementById(`root_order-create`).getAttribute('role');

const App = () => {
    const [theme, setTheme] = useState('light');
    const [anim, setAnim] = useState(false);
    const [addCustomer, setAddCustomer] = useState(false);
    const [parametrs, setParametrs] = useState({});
    const [loadCreate, setLoadCreate] = useState(false);
    const [loadSave, setLoadSave] = useState(false);
    const { customer, payType, name, phone } = useSelector(selectorCustomer);
    const { performersNum, date, time } = useSelector(selectorPerformers);
    const { additionalDates } = useSelector(selectorAdditionalDates);
    const { service, tags, commentSupervisor, notes, minDuration, duration } = useSelector(selectorDetails);
    const { address, metro } = useSelector(selectorAddress);
    const { rate, rateWorker } = useSelector(selectorRates);
    const { managerId, partnershipId, emailPasport } = useSelector(selectorManagers);

    const dispatch = useDispatch();
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
                console.log(data)
                const companies = data.companies;
                setParametrs(data)
                dispatch(setCompaniesList(companies))
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        parametrs.city && getAddressExact(parametrs.city)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0].GeoObject?.Point;
                const cordinate = data.pos.split(' ')
                dispatch(setDefaultCordinate([cordinate[1], cordinate[0]]))
            })
    }, [parametrs.city])

    const handleCreate = (e) => {

        const id = e.currentTarget.id;
        id == 'create' ? setLoadCreate(true) : setLoadSave(true)
        const dopDates = additionalDates.length > 0 ?
            additionalDates.map(el => {
                return {
                    date: dayjs(el.date).format('YYYY-MM-DD'),
                    time: dayjs(el.time).format('HH:mm'),
                    worker_count: el.performers
                }
            })
            :
            []

        const data = {
            preorder: id == 'save' ? 1 : 0,
            beznal: payType == 1,
            to_card: payType == 2,
            company_id: payType == 1 && customer?.id ? customer?.id : null,
            phone,
            name,
            date: dayjs(date).format('YYYY-MM-DD'),
            time: time == null ? null : dayjs(time).format('HH:mm'),
            worker_count: performersNum,
            dop_dates: dopDates,
            order_type: service,
            notes,
            supervisor_comment: commentSupervisor,
            requirements: tags,
            min_time: minDuration,
            order_duration: duration,
            load_address: address.street,
            city: address.city,
            home: address.house,
            lat: address.lat,
            lng: address.lng,
            metro: metro[0]?.name,
            metro_km: metro[0]?.distance,
            metro_color: metro[0]?.color,
            metro2: metro[1]?.name,
            metro2_km: metro[1]?.distance,
            metro2_color: metro[1]?.color,
            metro3: metro[2]?.name,
            metro3_km: metro[2]?.distance,
            metro3_color: metro[2]?.color,
            client_bit: rate,
            worker_bit: rateWorker,
            supervisor_id: managerId,
            to_partnership_id: partnershipId,
            email_passport: emailPasport,
            partner_client_bit: null,
            partner_worker_bit: null,
            bill_email: payType == 1 ? customer.email : null,
            send_bill: (payType == 1 && customer?.billState) ? customer?.billState : false,
            bill_sum: payType == 1 ? customer.billSum : 0,
            send_contract: (payType == 1 && customer?.contractState) ? customer?.contractState : false
        }

        createOrder(data)
            .then(res => {
                setLoadCreate(false)
                setLoadSave(false)
                console.log(res)
            })
            .catch(err => console.log(err))

        console.log(data)
    }


    document.documentElement.dataset.theme = theme;
    return (
        <UserContext.Provider value={{ pro, role }}>
            <ParametrsContext.Provider value={parametrs}>
                <div className={`${s.app} ${anim && s.app_anim}`}>
                    <div className={s.header}>
                        <h2 className={s.title}>Создание заказа</h2>
                        <div className={s.buttons}>
                            {/*  <Button Icon={IconPoints} type={'points'} /> */}
                            <Button disabled={loadSave} id={'save'} handleClick={handleCreate} text={'Сохранить черновик'} type={'second'} />
                            <Button disabled={loadCreate} id={'create'} handleClick={handleCreate} text={'Создать заказ'} Icon={IconDone} load={loadCreate} />
                        </div>
                    </div>


                    <div className={s.container}>
                        <div className={s.left}>
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
                </div>
            </ParametrsContext.Provider>
        </UserContext.Provider>
    )
};

export default App;