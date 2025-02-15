import { useEffect, useState, useRef } from 'react';
import s from './SuccessModal.module.scss';
import { ReactComponent as IconSuccess } from '../../images/icons/iconSuccess.svg'

const SuccessModal = () => {
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
                <div className={s.content}>
                    <IconSuccess />
                    <h3 className={s.title}>Заказ успешно создан!</h3>
                </div>
            </div>
        </div>
    )
};

export default SuccessModal