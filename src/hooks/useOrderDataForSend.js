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
import { useState } from "react";

export const useOrderDataForSend = () => {
    const { customer, payType, name, phone, isSms, noContactPerson, isBlack, debt, debtThreshold } = useSelector(selectorCustomer);
    const { performersNum, date, time, timerDisabled } = useSelector(selectorPerformers);
    const { additionalDates } = useSelector(selectorAdditionalDates);
    const { service, tags, commentSupervisor, notes, payNotes, minDuration, duration } = useSelector(selectorDetails);
    const { address, metro, noAddress } = useSelector(selectorAddress);
    const { rate, rateWorker, orderSum } = useSelector(selectorRates);
    const { managerId, partnershipId, emailPasport, emailState, partnerRate } = useSelector(selectorManagers);

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
        /*        preorder: type, */
        beznal: payType == 1,
        to_card: payType == 2,
        company_id: payType == 1 && customer?.id ? customer?.id : null,
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
        order_duration: duration,
        load_address: address.street,
        city: address.city,
        home: address.house,
        apartment: address.apartment,
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
        send_sms: isSms
    }

    return { orderData };
}