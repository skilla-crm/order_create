import s from './HeaderAddreses.module.scss';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as IconPoints } from '../../../images/icons/iconPoints16-16-blue.svg';
import { ReactComponent as BagePro } from '../../../images/icons/badgePro.svg';
import { ReactComponent as IconInfo } from '../../../images/icons/header/iconInfo.svg';
import { ReactComponent as IconLocation } from '../../../images/icons/iconLocation.svg';
//components
import Prompt from '../Prompt/Prompt';

const HeaderAddreses = ({ title, buttonState, buttonText, handleButton, forPro, PromptText, hiddenPrompt, handleMap, openMap }) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [openPrompt, setOpenPrompt] = useState(false);
    const modalRef = useRef();

    const handleOpenPopup = () => {
        openPopup ? setOpenPopup(false) : setOpenPopup(true)
    }

    const handleOpenPrompt = () => {
        setOpenPrompt(true)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenPopup(false);
            return
        }
    }

    const openModalPro = () => {
        document?.getElementById('pro-open')?.click();
    };


    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={s.container}>
            <Prompt openPrompt={openPrompt} setOpenPrompt={setOpenPrompt} PromptText={PromptText} />
            <div className={s.title}>
                <h3>{title}</h3>
                {!hiddenPrompt && <div onClick={handleOpenPrompt} className={s.info}>
                    <IconInfo />
                </div>
                }
            </div>

            <div ref={modalRef} onClick={handleOpenPopup} className={`${s.button} ${s.button_point} ${!buttonState && s.button_hidden}`}><IconPoints />
                {!forPro && <button style={{ paddingRight: '44px' }} onClick={handleButton} className={`${s.button} ${s.button_popup} ${!openPopup && s.button_hidden}`}>{buttonText}</button>}
                {forPro && <button onClick={openModalPro} className={`${s.button} ${s.button_popup} ${!openPopup && s.button_hidden}`}>{buttonText}<BagePro /></button>}
            </div>

            <button onClick={handleMap} className={s.location}>
                <IconLocation />
                {!openMap && <p>Показать на карте</p>}
                {openMap && <p>Скрыть карту</p>}
            </button>
        </div>
    )
};

export default HeaderAddreses;