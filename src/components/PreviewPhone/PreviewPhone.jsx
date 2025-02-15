import s from './PreviewPhone.module.scss';
import { useEffect, useRef, useState } from 'react';
import IphoneMokup from '../../images/IphoneMokup.png';

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
            </div>
        </div>
    )
};

export default PreviewPhone;