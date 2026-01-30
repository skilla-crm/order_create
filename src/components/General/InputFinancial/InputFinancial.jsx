import classNames from 'classnames';
import s from './InputFinancial.module.scss';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

const InputFinancial = ({ amount, setAmount, disabled, placeholder, width, Icon }) => {
    const [focus, setFocus] = useState(false);

    const handleChange = (values) => {
    const { formattedValue, value, floatValue } = values;
        setAmount(floatValue)
    }


    const handleBlur = () => {
        setFocus(false)

    }

    const handleFocus = () => {
        setFocus(true)
    }

    return (
        <div
            className={classNames(s.root, disabled && s.root_disabled, focus && s.root_focus)}
            style={{ width: width ? `${width}px` : '100%' }}
        >
            <NumericFormat
                className={s.input}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                decimalScale={4}
                decimalSeparator=","
                value={amount || ''}
                onValueChange={handleChange}
                thousandSeparator=" " />
            {Icon && <div className={s.icon}>
                <Icon />
            </div>}
        </div>


    )
};

export default InputFinancial;