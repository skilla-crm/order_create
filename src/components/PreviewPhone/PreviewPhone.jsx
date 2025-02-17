import s from './PreviewPhone.module.scss';
import { useEffect, useRef, useState } from 'react';
import IphoneMokup from '../../images/IphoneMokup.png';
import { ReactComponent as Left } from '../../images/icons/phone/left.svg';
import { ReactComponent as Clock } from '../../images/icons/phone/clock.svg';

const PreviewPhone = ({ setPhoneModal }) => {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

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
                setPhoneModal(false)
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
                        <div className={s.time}>
                            <p>26 мая с 13:00 до 01:00</p>
                            <Clock />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default PreviewPhone;