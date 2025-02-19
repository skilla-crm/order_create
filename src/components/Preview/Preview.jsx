import s from './Preview.module.scss';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { ParametrsContext } from '../../contexts/UserContext';
//selector
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorAddress } from '../../store/reducer/Address/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
//components
import Overlay from './Overlay';
import MapAddress from '../General/MapAddress/MapAddress';
import ErrorWindow from '../ErrorWindow/ErrorWindow';
//utils
import { handleTextNumEnding } from '../../utils/HandleTextNumEndind';
import { addSpaceNumber2, addSpaceNumber } from '../../utils/addSpaceNumber';
import { adressStringUtility } from '../../utils/AdressUtility';
const tags2 = [{ id: 1, description: 'Паспорт' }]

const Preview = () => {
    const { requirements } = useContext(ParametrsContext)
    const { performersNum, date, time } = useSelector(selectorPerformers);
    const { customer, payType, name, phone, noContactPerson } = useSelector(selectorCustomer);
    const { tags, notes, minDuration, duration } = useSelector(selectorDetails);
    const { address, defaultCordinate, noAddress } = useSelector(selectorAddress);
    const { rate, rateWorker } = useSelector(selectorRates);
    const [total, setTotal] = useState(0);
    const [totalMin, setTotalMin] = useState(0);

    useEffect(() => {
        setTotal(rate * duration * performersNum)
        setTotalMin(rate * minDuration * performersNum)
    }, [rate, minDuration, duration, performersNum])


    return (
        <div className={s.preview}>
            <div className={s.header}>
                <h2 className={s.title}>
                    Заказ <div className={`${s.item} ${s.item_date}`}>
                        <Overlay active={date == null} />
                        {date !== null && <p>{dayjs(date).format('D MMMM')}</p>}
                    </div> <span className={`${s.time} ${time && s.time_vis}`}>
                        {time && date !== null && dayjs(time).format('H:mm')}
                    </span>
                </h2>
                <ErrorWindow />
            </div>




            <div className={s.container}>
                <div className={s.block}>
                    <span>Заказчик</span>
                    <div style={{marginBottom: noContactPerson ? '20px' : ''}} className={`${s.block} ${payType !== 1 && s.block_hidden2}`}>
                        {<div className={`${s.item} ${s.item_company}`}>
                            <Overlay active={!customer?.id} />
                            <p>{customer?.name}</p>
                        </div>
                        }
                    </div>
                    <div className={`${s.block} ${payType == 1 && noContactPerson && s.block_hidden}`}>
                        <div className={s.item}>
                            <Overlay active={phone?.length !== 11} />
                            <InputMask
                                value={phone}
                                disabled={true}
                                mask="+7 (999) 999-99-99"
                                placeholder='+7 (___) ___-__-__'
                            />
                        </div>
                        <div className={`${s.item} ${s.item_name}`}>
                            <Overlay active={name?.length == 0} />
                            <p>{name}</p>
                        </div>
                    </div>
                </div>

                <div className={`${s.block} ${notes?.length == 0 && s.block_hidden}`}>
                    <span>Комментарий менеджеру</span>
                    <p className={s.comment}>{notes.length > 145 ? `${notes.slice(0, 145)}...` : notes}</p>
                </div>

                <div className={`${s.block} ${s.block_bages} ${tags?.length == 0 && s.block_hidden}`}>
                    {tags?.map(el => {
                        const result = requirements?.find(item => item.id == el)
                        return <div className={s.bage}>
                            <p>{result?.description}</p>
                        </div>
                    })}
                </div>

                <div className={`${s.block} ${noAddress && s.block_hidden}`}>
                    <span>Адрес</span>
                    <div className={`${s.item} ${s.item_address}`}>
                        <Overlay active={!address.city} />
                        <p>{adressStringUtility(address)}</p>
                    </div>
                    <div className={s.map}>
                        <MapAddress lat={address.lat} lng={address.lng} defaultCordinate={defaultCordinate} width={'100%'} height={160} />
                    </div>

                </div>

                <div className={s.block}>
                    <span>Ставка заказчику и исполнителю</span>
                    <div className={`${s.item} ${s.item_name}`}>
                        <Overlay active={(rate == '' || rateWorker == '')} />
                        {rateWorker !== '' && rate !== '' && <p>{addSpaceNumber(rate)} / {addSpaceNumber(rateWorker)}</p>}
                    </div>
                </div>

                <div className={s.block}>
                    <span>Исполнители</span>
                    <div className={`${s.item} ${s.item_name}`}>
                        <Overlay active={performersNum == 0} />
                        {minDuration < duration && <p>{performersNum} чел на {minDuration}-{duration} {handleTextNumEnding(duration)}</p>}
                        {minDuration == duration && <p>{performersNum} чел на {duration} {handleTextNumEnding(duration)}</p>}
                        {minDuration > duration && <p>{performersNum} чел на {duration} {handleTextNumEnding(duration)}</p>}
                 
                    </div>
                </div>
            </div>

            <div className={s.total}>
                <p>Итого</p>
                <div className={`${s.item} ${s.item_total}`}>
                    {totalMin < total && <h2 className={s.title}>{addSpaceNumber(totalMin)} – {addSpaceNumber(total)} руб.</h2>}
                    {totalMin >= total && <h2 className={s.title}>{addSpaceNumber(totalMin)} руб.</h2>}
                    <Overlay active={total == 0} />
                </div>

            </div>

        </div>
    )
};

export default Preview;