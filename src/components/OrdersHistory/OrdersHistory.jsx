import s from './OrdersHistory.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { ReactComponent as IconRepeat } from '../../images/icons/iconRepeat.svg';
import { ReactComponent as IconBuilder } from '../../images/icons/IconBuilder.svg';
import { ReactComponent as IconDone } from '../../images/icons/bage/iconDone.svg';
import { ReactComponent as IconDoneYellow } from '../../images/icons/bage/iconDoneYellow.svg';
import { ReactComponent as IconClose } from '../../images/icons/bage/iconClose.svg';
import dayjs from 'dayjs';
//Api
import { orderRetry } from '../../Api/Api';
//selector
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//slice
import { setPayType, setName, setPhone, setNoContactPerson } from '../../store/reducer/Customer/slice';
import { setPerformersNum, setTime } from '../../store/reducer/Performers/slice';
import { setService, setRequirements, setMinDurqtion, setDuration, setCommentSupervisor, setNotes } from '../../store/reducer/Details/slice';
import { setAddress, setMetro, deleteMetro, setNoAddress, setAddressForReturn } from '../../store/reducer/Address/slice';
import { setRate, setRateWorker } from '../../store/reducer/Rates/slice';
import { setManagerId, setPartnershipId, setEmailPasport, setPartnerRate } from '../../store/reducer/Managers/slice';
//components
import Header from '../General/Header/Header';
import InputSelect from '../General/Input/InputSelect';
//utils
import { addSpaceNumber2 } from '../../utils/addSpaceNumber';
import { adressStringUtility } from '../../utils/AdressUtility';
//constants
import { PromptCustomer } from '../../constants/prompts';
const list = [{ id: 5, name: 'Последние 5 заказов' }, { id: 10, name: 'Последние 10 заказов' }, { id: 20, name: 'Последние 20 заказов' }, { id: 0, name: 'Все' }]



const Bage = ({ status }) => {
    return (
        <>
            {(status == 4 || status == 20) &&
                <div className={s.bage}>
                    <IconDone />
                    <p>Завершен</p>
                </div>
            }

            {status < 4 &&
                <div className={`${s.bage} ${s.bage_yellow}`}>
                    <IconDoneYellow />
                    <p>Не завершен</p>
                </div>
            }

            {(status == 5 || status == 21) &&
                <div className={`${s.bage} ${s.bage_red}`}>
                    <IconClose />
                    <p>Отменен</p>
                </div>
            }
        </>

    )
}
const Item = ({ el }) => {
    const dispatch = useDispatch();

    const handleRetry = () => {
        orderRetry(el.id)
            .then(res => {
                const data = res.data.data;
                const address = {
                    city: data.city,
                    street: data.load_address,
                    house: data.home,
                    apartment: data.apartment,
                    lat: data.lat,
                    lng: data.lng
                }

                console.log(data)
                data.beznal == 1 && dispatch(setPayType(1))
                data.beznal == 0 && data.to_card == 1 && dispatch(setPayType(2))
                data.beznal == 0 && data.to_card == 0 && dispatch(setPayType(3))
                dispatch(setName(data.name))
                dispatch(setPhone(data.phone))
                data.name == '' && data.phone == ''
                    ?
                    dispatch(setNoContactPerson(true))
                    :
                    dispatch(setNoContactPerson(false))
                dispatch(setPerformersNum(data.worker_count))
                dispatch(setDuration(data.order_duration))
                dispatch(setService(data.order_type))
                dispatch(setMinDurqtion(data.min_time))
                dispatch(setNotes(data.notes))
                dispatch(setCommentSupervisor(data.supervisor_comment))
                data.passport_required == 1 && data.requirements?.length == 0 ? dispatch(setRequirements([1])) : dispatch(setRequirements([]))
                data.requirements?.length > 0 && dispatch(setRequirements(data.requirements.map(el => { return el.id })))
                dispatch(setAddress(address))
                dispatch(setAddressForReturn(adressStringUtility(address)))
                dispatch(setRate(data.client_bit))
                dispatch(setRateWorker(data.worker_bit))
                dispatch(deleteMetro())
                data?.metro !== '' && dispatch(setMetro({
                    name: data?.metro,
                    distance: Number(data?.metro_km),
                    color: data?.metro_color
                }))

                data?.metro2 !== '' && dispatch(setMetro({
                    name: data?.metro2,
                    distance: Number(data?.metro2_km),
                    color: data?.metro2_color
                }))

                data?.metro3 !== '' && dispatch(setMetro({
                    name: data?.metro3,
                    distance: Number(data?.metro3_km),
                    color: data?.metro3_color
                }))

                data.city == '' ? dispatch(setNoAddress(true)) : dispatch(setNoAddress(false))
                dispatch(setManagerId(data.supervisor_id))
                dispatch(setPartnershipId(data.to_partnership_id == 0 ? null : data.to_partnership_id))
                dispatch(setEmailPasport(data.email_passport))
                data.partner_client_bit && dispatch(setPartnerRate(data.partner_client_bit))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={s.item}>
            <button onClick={handleRetry} className={s.repeat}>
                <IconRepeat />
            </button>

            <div className={`${s.block} ${s.block_date}`}>
                <p>{dayjs(el?.date).locale('ru').format('D MMMM')}</p>
                <span>
                    <IconBuilder />
                    {el?.worker_count}
                </span>
            </div>

            <div className={`${s.block} ${s.block_address}`}>
                <p>{el?.load_address}{el.home !== '' && ','} {el?.home} {el?.k} </p>
                <span>
                    {el?.notes.length > 105 ? `${el?.notes.slice(0, 105)}...` : el?.notes}
                </span>
            </div>

            <div className={`${s.block} ${s.block_contact}`}>
                <p>{el?.name}</p>
                <span>
                    <InputMask
                        value={el?.phone}
                        disabled={true}
                        mask="+7 (999) 999-99-99"
                    />
                </span>
            </div>

            <div className={`${s.block} ${s.block_bit}`}>
                <p>{addSpaceNumber2(el?.client_bit)} / {addSpaceNumber2(el.worker_bit)}</p>
                <span>
                    {el.beznal == 1 && 'на р/с'}
                    {el.beznal == 0 && el.to_card == 1 && 'на карту'}
                    {el.beznal == 0 && el.to_card == 0 && 'наличные'}
                </span>
            </div>

            <div className={`${s.block} ${s.block_bage}`}>
                <Bage status={el?.order_status} />
            </div>
        </div>
    )
}


const OrdersHistory = ({ vis, client, historyList }) => {
    const [historyLength, setHistoryLength] = useState(5);

    return (
        <div className={`${s.window} ${vis && s.window_vis}`}>
            <div className={s.container}>
                <Header
                    title={`История заказов ${client}`}
                    buttonState={false}
                    PromptText={PromptCustomer}
                />
                {historyList.length > 5 && <InputSelect
                    sub={false}
                    list={list.filter(el => el.id < historyList.length)}
                    value={historyLength}
                    setValue={setHistoryLength}
                    type={2}
                />
                }

                <div className={s.history}>
                    {historyList.slice(0, historyLength == 0 ? 1000 : historyLength).map(el => {
                        return <Item key={el.id} el={el} />
                    })}
                </div>
            </div>
        </div>

    )
};

export default OrdersHistory;