import s from './Input.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconPhone } from '../../../images/icons/iconPhone.svg';

import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';

const InputPhone = ({ sub, disabled, value, setValue, setValueName, contacts, errorText, error, errorEmpyty, errorTextEmpyty, setPhoneWithMask, handleResetError, disabledEdit }) => {
    const [errorState, setErrorState] = useState(false);
    const [openContacts, setOpenContacts] = useState(false);
    const listRef = useRef();


    const handleChangeValue = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        setPhoneWithMask(value)
        console.log(value)
        const cleanValue = value?.match(regex)?.join('');
        setValue(!cleanValue ? '' : cleanValue)
        cleanValue?.length > 1 && handleResetError()
    }

    useEffect(() => {
        console.log(value.length)
        value.length == 11 && setPhoneWithMask(`+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`)
        value.length !== 11 && setPhoneWithMask('')
    }, [value])


    useEffect(() => {
        !error && setErrorState(false)
    }, [error])

    const handleBlur = () => {
        error && (value.length > 1) ? setErrorState(true) : setErrorState(false)
    }

    const handleFocus = () => {
        setErrorState(false)
        setOpenContacts(true)

    }


    const handleChoseContact = (data) => {
        setValue(data.phone)
        data.phone.length == 11 && setPhoneWithMask(`+${data.phone.slice(0, 1)} (${data.phone.slice(1, 4)}) ${data.phone.slice(4, 7)}-${data.phone.slice(7, 9)}-${data.phone.slice(9, 11)}`)
        setValueName(data.name)
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
            <span className={`${s.sub} ${errorState && s.sub_err}`}>{sub}</span>
            <div ref={listRef} className={s.container_contacts}>
                <div className={`${s.phone} ${errorState && s.phone_error} ${disabled && s.disabled}`}>
                    <InputMask
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        value={value || ''}
                        disabled={disabled || disabledEdit}
                        mask="+7 (999) 999-99-99"
                        onChange={handleChangeValue}
                        placeholder='+7 (___) ___-__-__'
                    />
                </div>
                <div className={`${s.error} ${(errorState || errorEmpyty) && s.error_vis}`}>
                    <p>
                        {errorEmpyty ? errorTextEmpyty : errorText}
                    </p>
                </div>

                <div className={`${s.contacts} ${contacts.length > 0 && openContacts && s.contacts_vis}`}>
                    {contacts.map(el => {
                        return <div key={el.id} onClick={() => handleChoseContact(el)} className={s.contact}>
                            <div className={s.icon}><IconPhone /></div>
                            <div className={s.contact_phone}>
                                <InputMask
                                    onClick={() => handleChoseContact(el)}
                                    value={el.phone}
                                    disabled={false}
                                    mask="+7 (999) 999-99-99"
                                />
                            </div>
                            <div className={s.contact_name}>
                                <p>{el.name}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
};

export default InputPhone;