
import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux"
import { setPayType, setName, setCustomer, setPhone, setNoContactPerson } from '../store/reducer/Customer/slice';
import { setPerformersNum, setTime } from '../store/reducer/Performers/slice';
import { setService, setRequirements, setMinDurqtion, setDuration, setCommentSupervisor, setNotes, setPayNotes } from '../store/reducer/Details/slice';
import { setAddress, setMetro, deleteMetro, setNoAddress, setAddressForReturn } from '../store/reducer/Address/slice';
import { setRate, setRateWorker, setOrderSum, setUnit, setUnitWorker } from '../store/reducer/Rates/slice';
import { setManagerId, setPartnershipId, setFromPartnership, setAcceptStatus, setEmailPasport, setPartnerRate, setFromLk } from '../store/reducer/Managers/slice';
//utils
import { adressStringUtility } from '../utils/AdressUtility';



export const useWriteOrderDataHook = () => {

    const pro = document.getElementById(`root_order-create`).getAttribute('ispro') == 1 ? true : false;
    const [data, setData] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.id) {

            const address = {
                city: data.city,
                street: data.load_address,
                house: data.home,
                apartment: data.apartment,
                lat: data.lat,
                lng: data.lng
            }

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
            pro ? dispatch(setPerformersNum(data.worker_count)) : dispatch(setPerformersNum(data.worker_count > 8 ? 8 : data.worker_count))
            dispatch(setDuration(data.order_duration))
            dispatch(setService(data.order_type))
            dispatch(setMinDurqtion(data.min_time))
            dispatch(setNotes(data.notes))
            dispatch(setPayNotes(data.pay_notes))
            dispatch(setCommentSupervisor(data.supervisor_comment))
            data.passport_required == 1 && data.requirements?.length == 0 ? dispatch(setRequirements([1])) : dispatch(setRequirements([]))
            data.requirements?.length > 0 && dispatch(setRequirements(data.requirements.map(el => { return el.id })))
            dispatch(setAddress(address))
            dispatch(setAddressForReturn(adressStringUtility(address)))
            dispatch(setRate(data.client_bit))
            dispatch(setRateWorker(data.worker_bit))
            data.order_type == 8 && dispatch(setOrderSum(data.pay_summ))
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

            address.city == '' && address.street == '' && pro ? dispatch(setNoAddress(true)) : dispatch(setNoAddress(false))
            dispatch(setManagerId(data.supervisor_id))
            dispatch(setPartnershipId(data.to_partnership_id))
            dispatch(setEmailPasport(data.email_passport))
            data.partner_client_bit && dispatch(setPartnerRate(data.partner_client_bit))

            //единицы измерения
            dispatch(setUnit(data.unit_id))
            dispatch(setUnitWorker(data.unit_id))
            return
        }
    }, [data])



    return { setData }
}