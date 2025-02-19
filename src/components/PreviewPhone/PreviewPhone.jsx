import s from './PreviewPhone.module.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import { ParametrsContext } from '../../contexts/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import IphoneMokup from '../../images/IphoneMokup.png';
import { ReactComponent as Left } from '../../images/icons/phone/left.svg';
import { ReactComponent as Clock } from '../../images/icons/phone/clock.svg';
import { ReactComponent as PartnerAvatar } from '../../images/icons/phone/partnerAvatar.svg';
import ButtonImage from '../../images/icons/phone/Button.png';
//selectors
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorAddress } from '../../store/reducer/Address/selector';
import { selectorManagers } from '../../store/reducer/Managers/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//slice
import { setPhoneModal } from '../../store/reducer/Preview/slice';
import dayjs from 'dayjs';
//components
import Overlay from '../Preview/Overlay';
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { adressStringUtility2, adressStringUtility } from '../../utils/AdressUtility';

const PreviewPhone = ({ activeType }) => {
    const { partnerships, skilla_partnerships, requirements, city } = useContext(ParametrsContext);
    const { customer, payType } = useSelector(selectorCustomer);
    const { address, noAddress } = useSelector(selectorAddress);
    const { tags, commentSupervisor, duration } = useSelector(selectorDetails);
    const { performersNum, date, time, timerDisabled } = useSelector(selectorPerformers);
    const { rateWorker } = useSelector(selectorRates);
    const { partnershipId } = useSelector(selectorManagers);
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();
    const dispatch = useDispatch()
    console.log(city, address.city)

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 50)
    }, [])

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setAnim(false)
            setTimeout(() => {
                dispatch(setPhoneModal(false))
            }, 200)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.window} ${anim && s.window_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                <img className={s.fon} src={IphoneMokup}></img>
                <div className={s.content}>
                    <button className={s.back}><Left /></button>
                    <div className={s.container}>

                        <div className={s.date}>
                            <div className={`${s.item} ${s.item_date}`}>
                                <Overlay active={date == null} />
                                <p>{dayjs(date).format('D MMMM')}</p>
                            </div>

                            {!timerDisabled && <div className={`${s.item} ${s.item_time}`}>
                                <Overlay active={!time} />
                                {time && <p>c {dayjs(time).format('H:mm')}</p>}
                            </div>}

                            {!timerDisabled && <div className={`${s.item} ${s.item_time}`}>
                                <Overlay active={!time} />
                                {time && <p>до {dayjs(time).add(duration, 'hour').format('H:mm')}</p>}
                            </div>}
                            <Clock />
                        </div>
                        <h2 className={s.title}>{activeType}</h2>

                        <div className={s.price}>
                            <div className={s.rate}>
                                <div className={`${s.item} ${s.item_rate} ${rateWorker == '' && s.item_rate3}`}>
                                    <Overlay active={rateWorker == ''} />
                                    {rateWorker !== '' && <p>{addSpaceNumber(rateWorker * duration)}</p>}
                                </div>
                                <p>₽</p>
                            </div>

                            <div className={s.rate_2}>
                                <div className={`${s.item} ${s.item_rate2} ${rateWorker == '' && s.item_rate3}`}>
                                    <Overlay active={rateWorker == ''} />
                                    {rateWorker !== '' && <p>{addSpaceNumber(rateWorker)}</p>}
                                </div>
                                <p>₽/час</p>
                            </div>

                        </div>

                        <div className={`${s.block} ${tags.length == 0 && s.block_hidden}`}>
                            <p className={s.bold}>Требования</p>
                            <ul className={s.tags}>
                                {tags?.map((el, i) => {
                                    const name = requirements?.find(item => Number(item.id) == el).description
                                    return <li>{name}{i !== tags.length - 1 && ','}</li>
                                })}
                            </ul>
                        </div>

                        <div className={s.block}>

                            <div className={s.block_small}>
                                <p className={s.bold}>Количество мест</p>
                                {performersNum > 1 && performersNum < 5 && <p className={s.text}>Осталось менее {performersNum}х мест</p>}
                                {performersNum >= 5 && <p className={s.text}>Осталось менее {performersNum}и мест</p>}
                                {performersNum == 1 && <p className={s.text}>Осталось 1 место</p>}
                            </div>

                            <div className={`${s.block_small} ${commentSupervisor.length == 0 && s.block_hidden}`}>
                                <p className={s.bold}>Описание</p>
                                <p className={`${s.text} ${s.text_wrap}`}>{commentSupervisor.length > 80 ? `${commentSupervisor.slice(0, 80)}...` : commentSupervisor}</p>

                            </div>
                        </div>

                        <div className={`${s.block} ${noAddress && s.block_hidden}`}>
                            <div className={`${s.item} ${s.item_address}`}>
                                <Overlay active={!address.city} />
                                {city !== address.city && <p className={s.bold}>{adressStringUtility(address)}</p>}
                                {city == address.city && <p className={s.bold}>{adressStringUtility2(address)}</p>}
                            </div>

                        </div>

                        <div className={`${s.block}`}>
                            <div className={s.block_small}>
                                <p className={s.bold}>Вопросы по заказу задавай партнеру</p>
                            </div>
                            <div className={s.partner}>
                                {payType == 1 && (partnershipId == null || partnershipId == 0) && <div className={`${s.item} ${s.item_partner}`}>
                                    <Overlay active={!customer?.partnership_name} />
                                    <p className={s.text}>
                                        {customer?.partnership_name}
                                    </p>
                                </div>
                                }

                                {payType !== 1 && (partnershipId == null || partnershipId == 0) &&
                                    <p className={s.text}>
                                        {partnerships?.[0].name}
                                    </p>
                                }

                                {(partnershipId !== null && partnershipId !== 0) &&
                                    <p className={s.text}>
                                        {skilla_partnerships?.find(el => el.to_id == partnershipId)?.name}
                                    </p>
                                }

                                <PartnerAvatar />

                            </div>
                        </div>

                    </div>

                    <img className={s.button} src={ButtonImage}></img>
                </div>

            </div>
        </div>
    )
};

export default PreviewPhone;