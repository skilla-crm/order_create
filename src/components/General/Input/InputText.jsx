import s from './Input.module.scss';
import { useEffect, useState } from 'react';

const InputText = ({ sub, disabled, value, setValue, error, errorText, type, handleResetError, maxLength, disabledEdit, placeholder }) => {
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        error && value == '' ? setErrorState(true) : setErrorState(false)
        type == 2 && value !== '' && handleResetError()
    }, [error, value])

    const handleValue = (e) => {
        const value = e.currentTarget.value;
        setValue(value)
    }
   

    return (
        <div className={s.container}>
            {sub?.length > 0 && <span className={s.sub}>{sub}</span>}
            <input value={value || ''} placeholder={placeholder} onChange={handleValue} disabled={disabled || disabledEdit} className={`${s.input} ${disabled && s.input_disabled}`} type='text' maxLength={maxLength}></input>

            <div className={`${s.error} ${type !== 2 && s.error_2} ${errorState && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>
        </div>
    )
};

export default InputText;