import s from './Input.module.scss';
import { useEffect, useState } from 'react';

const InputText = ({ sub, disabled, value, setValue, error, errorText }) => {
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        error && value == '' ? setErrorState(true) : setErrorState(false)
    }, [error, value])

    const handleValue = (e) => {
        const value = e.currentTarget.value;
        setValue(value)
    }
    const handleResetError = () => {
       /*  setErrorState(false) */
    }

    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <input onFocus={handleResetError} value={value || ''} onChange={handleValue} disabled={disabled} className={s.input} type='text'></input>

            <div className={`${s.error} ${s.error_2} ${errorState && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>
        </div>
    )
};

export default InputText;