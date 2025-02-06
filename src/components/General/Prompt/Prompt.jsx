import s from './Prompt.module.scss';
import { useRef, useEffect } from 'react';
import { ReactComponent as IconClose } from '../../../images/icons/iconClose.svg';

const Prompt = ({ openPrompt, setOpenPrompt, PromptText }) => {
    const modalRef = useRef();

    const handleClose = () => {
        setOpenPrompt(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);
    return (
        <div className={`${s.window} ${openPrompt && s.window_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${openPrompt && s.modal_anim}`}>
                <div onClick={handleClose} className={s.close}><IconClose /></div>
                <div className={s.content}>
                    <PromptText />
                </div>
            </div>
        </div>
    )
};

export default Prompt;