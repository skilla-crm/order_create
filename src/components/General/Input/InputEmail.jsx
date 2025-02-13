import s from './Input.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconMail } from '../../../images/icons/IconMail.svg';

const InputEmail = ({ sub, disabled, value, setValue, error, errorEmpity, errorText, contacts }) => {
    const [errorState, setErrorState] = useState(false);
    const [errorStateEmpity, setErrorStateEmpity] = useState(false);
    const [openContacts, setOpenContacts] = useState(false);
    const listRef = useRef();
    useEffect(() => {
        errorEmpity && value == '' ? setErrorStateEmpity(true) : setErrorStateEmpity(false)
    }, [errorEmpity, value])
    /* 
        useEffect(() => {
            value.length > 0 && error ? setErrorState(true) : setErrorState(false)
        }, [value]) */

    const handleValue = (e) => {
        setErrorState(false)
        const value = e.currentTarget.value;
        setValue(value)
    }
    const handleBlur = () => {
        value.length > 0 && error ? setErrorState(true) : setErrorState(false)
    }

    const handleFocus = () => {
        setErrorState(false)
        setOpenContacts(true)
    }

    const handleChoseContact = (data) => {
        setValue(data.e_mail)
        setOpenContacts(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenContacts(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={s.container}>
            {sub && <span className={s.sub}>{sub}</span>}
            <input
                value={value || ''}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleValue}
                disabled={disabled}
                className={s.input}
                type='email'
            >
            </input>

            <div ref={listRef} className={s.container_contacts}>
                <div className={`${s.error} ${(errorState || errorStateEmpity) && s.error_vis}`}>
                    <p>
                        {errorText}
                    </p>
                </div>

                {contacts && <div className={`${s.contacts} ${s.contacts_top} ${contacts?.length > 0 && openContacts && s.contacts_vis}`}>
                    {contacts.map(el => {
                        return <div onClick={() => handleChoseContact(el)} className={s.contact}>
                            <div className={s.icon}><IconMail /></div>
                            <div className={s.contact_email}>
                                {el.e_mail}
                            </div>
                            <div className={s.contact_name}>
                                <p>{el.name}</p>
                            </div>
                        </div>
                    })}
                </div>
                }
            </div>

        </div>
    )
};

export default InputEmail;