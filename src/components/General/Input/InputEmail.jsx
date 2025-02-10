import s from './Input.module.scss';
import { useState, useEffect } from 'react';

const InputEmail = ({ sub, disabled, value, setValue, error, errorEmpity, errorText }) => {
    const [errorState, setErrorState] = useState(false);
    const [errorStateEmpity, setErrorStateEmpity] = useState(false);

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

    const handleError = () => {
        value.length > 0 && error ? setErrorState(true) : setErrorState(false)
    }

    const handleResetError = () => {
        setErrorState(false)
    }

    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <input
                value={value || ''}
                onBlur={handleError}
                onFocus={handleResetError}
                onChange={handleValue}
                disabled={disabled}
                className={s.input}
                type='email'
            >
            </input>

            <div className={`${s.error} ${(errorState || errorStateEmpity) && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>
        </div>
    )
};

export default InputEmail;