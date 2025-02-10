import s from './Input.module.scss';
import { useState, useEffect } from 'react';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';

const InputPhone = ({ sub, disabled, value, setValue, errorText, error, setPhoneWithMask }) => {
    const [errorState, setErrorState] = useState(false);
    
    const handleChangeValue = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        setPhoneWithMask(value)
        setValue(cleanValue)
    }

    useEffect(() => {
        !error && setErrorState(false)
    }, [error])

    const handleError = () => {
        error && (value.length > 1) ? setErrorState(true) : setErrorState(false)
    }

    const handleResetError = () => {
         setErrorState(false)
    }

    return (
        <div className={s.container}>
            <span className={`${s.sub} ${errorState && s.sub_err}`}>{sub}</span>
            <div className={`${s.phone} ${errorState && s.phone_error} ${disabled && s.disabled}`}>
                <InputMask 
                onBlur={handleError} 
                onFocus={handleResetError} 
                value={value || ''} 
                disabled={disabled} 
                mask="+7 (999) 999-99-99" 
                onChange={handleChangeValue} 
                placeholder='+7 (___) ___-__-__'
                 />
            </div>
            <div className={`${s.error} ${errorState && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>
        </div>
    )
};

export default InputPhone;