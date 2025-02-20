import s from './Input.module.scss';
import { useState } from 'react';
//utils 
import { handleNumbers } from '../../../utils/HandleNumbers';
import { useEffect } from 'react';

const InputNum = ({ sub, disabled, value, setValue, error, errorEmpity, maxValue, errorText }) => {
    const [errorState, setErrorState] = useState(false);
    const [errorStateEmpity, setErrorStateEmpity] = useState(false);
    const [textValue, setTextValue] = useState(value || '')
    useEffect(() => {
        disabled && setValue('')
    }, [disabled])

    useEffect(() => {
        errorEmpity && value == '' ? setErrorStateEmpity(true) : setErrorStateEmpity(false)
        const lastSymbol = value.toString().slice(-1);
        (lastSymbol && lastSymbol == '.' || value == 0) ? setTextValue(value.toString()) : setTextValue(Number(parseFloat(value).toFixed(4)))
    }, [errorEmpity, value])

    const handleValue = (e) => {
        setErrorState(false)
        const value = handleNumbers(e.currentTarget.value)
        value.length <= maxValue && setValue(value)
        value.length <= maxValue && setTextValue(value)

    }

    const handleError = () => {
        value.length > 0 && error ? setErrorState(true) : setErrorState(false)
    }

    const handleResetError = () => {
        setErrorState(false)
    }

    return (
        <div className={s.container}>
            <span className={`${s.sub} ${errorState && s.sub_err}`}>{sub}</span>
            <input
                onBlur={handleError}
                onFocus={handleResetError}
                onChange={handleValue}
                value={textValue || ''}
                disabled={disabled}
                className={`${s.input} ${errorState && s.input_err}`}
                type='text'
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

export default InputNum;