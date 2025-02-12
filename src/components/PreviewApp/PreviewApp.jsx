import s from './PreviewApp.module.scss';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
import avatar from '../../images/avatarApp.jpg';
import dayjs from 'dayjs';
//selectors
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
//components
import Overlay from '../Preview/Overlay';
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';

const PreviewApp = () => {
    const { types } = useContext(ParametrsContext)
    const { service, tags, commentSupervisor, notes, minDuration, duration } = useSelector(selectorDetails);
    const { performersNum, date, time } = useSelector(selectorPerformers);
    const { rate, rateWorker } = useSelector(selectorRates);
    const [activeType, setActiveType] = useState('')

    useEffect(() => {
        const result = types?.find(el => el.id == service)
        setActiveType(result?.name ? result?.name : '')
    }, [service, types]);

    return (
        <div className={s.app}>
            <div className={s.header}>
                <h2 className={s.title}>В приложении</h2>
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
                                <p>{dayjs(date).format('D MMMM')}</p>
                            </div>

                            <div className={`${s.item} ${s.item_time}`}>
                                <Overlay active={!time} />
                                {time && <p>c {dayjs(time).format('H:mm')}</p>}
                            </div>

                            <div className={`${s.item} ${s.item_time}`}>
                                <Overlay active={!time} />
                                {time && <p>до {dayjs(time).hour(duration + 1).format('H:mm')}</p>}
                            </div>
                        </div>

                        <div className={s.price}>
                            <div className={`${s.item} ${s.item_price}`}>
                                <Overlay active={rateWorker == ''} />
                                {rateWorker !== '' && <p>{addSpaceNumber(rateWorker * duration)} ₽</p>}
                            </div>
                        </div>
                    </div>

                </div>

                <div className={s.comment}>
                    <div className={`${s.item} ${s.item_comment}`}>
                        <Overlay active={notes == ''} />
                        {notes !== '' && <p>{notes.length > 105 ? `${notes.slice(0, 105)}...` : notes}</p>}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PreviewApp;