import s from './PreviewApp.module.scss';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
import avatar from '../../images/avatarApp.png';
import { ReactComponent as MiniLogo } from '../../images/icons/miniLogo.svg';
import { ReactComponent as IconTopRight } from '../../images/icons/IconTopRight.svg';
import dayjs from 'dayjs';
//selectors
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
//slice
import { setPhoneModal } from '../../store/reducer/Preview/slice';
//components
import Overlay from '../Preview/Overlay';
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';

const PreviewApp = () => {

    const { types } = useContext(ParametrsContext)
    const { service, tags, commentSupervisor, notes, minDuration, duration } = useSelector(selectorDetails);
    const { performersNum, date, time, timerDisabled } = useSelector(selectorPerformers);
    const { rateWorker, unitWorker, expectedAmountWorker, minSumWorker } = useSelector(selectorRates);
    const [activeType, setActiveType] = useState('');
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    console.log(total, expectedAmountWorker)


    useEffect(() => {
        if (unitWorker === 1) {
            setTotal(rateWorker * duration)
            return
        }

        if (unitWorker != 1 && !expectedAmountWorker && !minSumWorker) {
            setTotal(null)
            return
        }

        if (unitWorker != 1) {
            const expectedSum = rateWorker * expectedAmountWorker
            expectedAmountWorker ? setTotal(expectedSum) : setTotal(minSumWorker)
            return
        }

    }, [unitWorker, rateWorker, minDuration, duration, performersNum, expectedAmountWorker, minSumWorker])

    useEffect(() => {
        const result = types?.find(el => el.id == service)
        setActiveType(result?.name ? result?.name : '')
    }, [service, types]);

    const handleOpenPhone = () => {
        dispatch(setPhoneModal(true))
    }

    return (

        <div className={s.app}>
            <div className={s.header}>
                <h2 className={s.title}>В приложении</h2>
                <button onClick={handleOpenPhone} className={s.button}>
                    <MiniLogo />
                    <p>Подробнее</p>
                    <IconTopRight />
                </button>
            </div>

            <div className={s.container}>
                <div className={s.header_app}>
                    <div className={s.avatar}>
                        <img src={avatar}></img>
                    </div>

                    <div className={s.block}>
                        <div className={`${s.item} ${s.item_service}`}>
                            <Overlay active={activeType == ''} />
                            <h2 className={s.title}>{activeType}</h2>
                        </div>

                        <div className={s.date}>
                            <div className={`${s.item} ${s.item_date}`}>
                                {date !== null && <p>{dayjs(date).format('D MMMM')}</p>}
                            </div>

                            {!timerDisabled && <div className={`${s.item} ${s.item_time}`}>
                                <Overlay active={!time} />
                                {time && <p>c {dayjs(time).format('H:mm')}</p>}
                            </div>}

                            {!timerDisabled && <div className={`${s.item} ${s.item_time}`}>
                                <Overlay active={!time} />
                                {time && <p>до {dayjs(time).add(duration, 'hour').format('H:mm')}</p>}
                            </div>}
                        </div>

                        <div className={s.price}>
                            <div className={`${s.item} ${s.item_price}`}>
                                <Overlay active={rateWorker == ''} />
                                {rateWorker !== '' && !total && !minSumWorker && <p>не указано</p>}
                                {rateWorker !== '' && (minSumWorker <= total || !minSumWorker) && total ? <p>{addSpaceNumber(total)} ₽</p> : ''}
                                {rateWorker !== '' && minSumWorker > total ? <p>{addSpaceNumber(minSumWorker)} ₽</p> : ''}
                                {rateWorker !== '' && minSumWorker && !total ? <p>{addSpaceNumber(minSumWorker)} ₽</p> : ''}
                            </div>
                        </div>
                    </div>

                </div>

                <div className={s.comment}>
                    <div className={`${s.item} ${s.item_comment}`}>
                        <Overlay active={commentSupervisor == ''} />
                        {commentSupervisor !== '' && <p>{commentSupervisor.length > 105 ? `${commentSupervisor.slice(0, 105)}...` : commentSupervisor}</p>}
                    </div>
                </div>
            </div>


        </div>

    )
}

export default PreviewApp;