import { useSelector } from "react-redux";
import dayjs from "dayjs";
//selectors
import { selectorCustomer } from "../store/reducer/Customer/selector";
import { selectorPerformers } from "../store/reducer/Performers/selector";
import { selectorAdditionalDates } from "../store/reducer/AdditionalDates/selector";
import { selectorDetails } from "../store/reducer/Details/selector";
import { selectorAddress } from "../store/reducer/Address/selector";
import { selectorRates } from "../store/reducer/Rates/selector";
import { selectorManagers } from "../store/reducer/Managers/selector";
import { selectorPartnership } from "../store/reducer/Partnership/selector";
import { useState } from "react";

export const useOrderDataForSend = () => {
    const { customer, contract, payType, name, phone, isSms, noContactPerson, isBlack, debt, debtThreshold } = useSelector(selectorCustomer);
    const { performersNum, date, time, timerDisabled } = useSelector(selectorPerformers);
    const { additionalDates } = useSelector(selectorAdditionalDates);
    const { service, tags, commentSupervisor, notes, payNotes, minDuration, duration } = useSelector(selectorDetails);
    const { address, dopAdresses, metro, noAddress } = useSelector(selectorAddress);
    const { rate, rateWorker, orderSum, unit, unitWorker, sameTarification } = useSelector(selectorRates);
    const { managerId, partnershipId, emailPasport, emailState, partnerRate } = useSelector(selectorManagers);
    const { partnership } = useSelector(selectorPartnership);

    const formData = new FormData();

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




    const orderData = {
        /*  preorder: type, */
        parnership_id: partnership?.id || null,
        beznal: payType == 1,
        to_card: payType == 2,
        company_id: payType == 1 && customer?.id ? customer?.id : null,
        contract_id: contract?.id ? contract?.id : null,
        phone,
        name,
        date: dayjs(date).format('YYYY-MM-DD'),
        time: time == null ? null : dayjs(time).format('HH:mm'),
        worker_count: service == 8 ? 0 : service == 9 ? 1 : performersNum,
        dop_dates: dopDates,
        order_type: service,
        notes,
        pay_notes: payNotes,
        supervisor_comment: commentSupervisor,
        requirements: service == 8 ? [] : tags,
        min_time: minDuration,
        order_duration: duration === 0 ? 1 : duration,
        load_address: address.street,
        city: address.city,
        home: address.house,
        apartment: address.apartment,
        lat: address.lat,
        lng: address.lng,
        metro: address?.stations?.[0]?.name,
        metro_km: address?.stations?.[0]?.distance,
        metro_color: address?.stations?.[0]?.color,
        metro2: address?.stations?.[1]?.name,
        metro2_km: address?.stations?.[1]?.distance,
        metro2_color: address?.stations?.[1]?.color,
        metro3: address?.stations?.[2]?.name,
        metro3_km: address?.stations?.[2]?.distance,
        metro3_color: address?.stations?.[2]?.color,
        dop_addresses: dopAdresses.map(el => {
            const { street, city, house, apartment, lat, lng, stations } = el
            return {
                load_address: street,
                city,
                home: house,
                lat,
                lng,
                metro: stations?.[0]?.name,
                metro_km: stations?.[0]?.distance,
                metro_color: stations?.[0]?.color,
                metro2: stations?.[1]?.name,
                metro2_km: stations?.[1]?.distance,
                metro2_color: stations?.[1]?.color,
                metro3: stations?.[2]?.name,
                metro3_km: stations?.[2]?.distance,
                metro3_color: stations?.[2]?.color,
            }
        }),
        client_bit: service !== 8 ? Number(rate) : null,
        worker_bit: partnershipId !== null && partnershipId !== 0 ? partnerRate : service !== 8 ? Number(rateWorker) : null,
        pay_summ: service == 8 ? orderSum : null,
        supervisor_id: managerId == 0 ? null : managerId,
        to_partnership_id: partnershipId == 0 ? null : partnershipId,
        email_passport: service == 8 ? '' : emailPasport,
        partner_client_bit: partnerRate,
        bill_email: payType == 1 ? customer.email : null,
        send_bill: (payType == 1 && customer?.billState) ? customer?.billState : false,
        bill_sum: payType == 1 ? customer.billSum : 0,
        send_contract: (payType == 1 && customer?.contractState) ? customer?.contractState : false,
        send_sms: isSms,
        work_unit_id: unit,
        work_unit_id_worker: sameTarification ? unit : unitWorker
    }

    return { orderData };
}



/* 
  formData.append('parnership_id', partnership?.id || null)
    formData.append('beznal', payType == 1)
    formData.append('to_card', payType == 2)
    formData.append('company_id', payType == 1 && customer?.id ? customer?.id : null)
    formData.append('contract_id', contract?.id ? contract?.id : null)
    formData.append('phone', phone)
    formData.append('name', name)
    formData.append('date', dayjs(date).format('YYYY-MM-DD'))
    formData.append('time', time == null ? null : dayjs(time).format('HH:mm'))
    formData.append('worker_count', service == 8 ? 0 : service == 9 ? 1 : performersNum)
    formData.append('dop_dates', dopDates)
    formData.append('order_type', service)
    formData.append('notes', notes)
    formData.append('pay_notes', payNotes)
    formData.append('supervisor_comment', commentSupervisor)
    formData.append('requirements', service == 8 ? [] : tags)
    formData.append('min_time', minDuration)
    formData.append('order_duration', duration === 0 ? 1 : duration)
    formData.append('load_address', address.street)
    formData.append('city', address.city)
    formData.append('home', address.house)
    formData.append('apartment', address.apartment)
    formData.append('lat', address.lat)
    formData.append('lng', address.lng)
    formData.append('metro', metro[0]?.name)
    formData.append('metro_km', metro[0]?.distance)
    formData.append('metro_color', metro[0]?.color)
    formData.append('metro2', metro[1]?.name)
    formData.append('metro2_km', metro[1]?.distance)
    formData.append('metro2_color', metro[1]?.color)
    formData.append('metro3', metro[2]?.name)
    formData.append('metro3_km', metro[2]?.distance)
    formData.append('metro3_color', metro[2]?.color)
    formData.append('client_bit', service !== 8 ? Number(rate) : null)
    formData.append('worker_bit', partnershipId !== null && partnershipId !== 0 ? partnerRate : service !== 8 ? Number(rateWorker) : null)
    formData.append('pay_summ', service == 8 ? orderSum : null)
    formData.append('supervisor_id', managerId == 0 ? null : managerId)
    formData.append('to_partnership_id', partnershipId == 0 ? null : partnershipId)
    formData.append('email_passport', service == 8 ? '' : emailPasport)
    formData.append('partner_client_bit', partnerRate)
    formData.append('bill_email', payType == 1 ? customer.email : null)
    formData.append('send_bill', (payType == 1 && customer?.billState) ? customer?.billState : false)
    formData.append('bill_sum', payType == 1 ? customer.billSum : 0)
    formData.append('send_contract', (payType == 1 && customer?.contractState) ? customer?.contractState : false)
    formData.append('send_sms', isSms)
    formData.append('work_unit_id', unit)
    formData.append('work_unit_id_worker', sameTarification ? unit : unitWorker) */