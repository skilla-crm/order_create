import s from './Input.module.scss';
import { useState, useRef } from 'react';

const InputNumList = ({ sub, disabled, nosub, inputWidth, Icon, max, value, setValue }) => {
    const [optionalList, setOptionalList] = useState(false);
    const listRef = useRef();
    const activeRef = useRef();
    const numbers = Array.from({ length: max }, (n, i) => i + 1);


    const handleInputFocus = () => {
        setOptionalList(true)
        handleScroll(value)
    }

    const handleInputBlur = () => {
        setOptionalList(false)
    }

    const handleScroll = () => {
        if (value <= max && value > 0) {
            activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
            return
        }
    }

    const handleInputValue = (e) => {
        const valueInput = e.currentTarget.value;
        valueInput <= max && setValue(valueInput);

        setTimeout(() => {
            handleScroll()
        }, 50)
 
    }

    const handleTab = (e) => {
        const id = e.currentTarget.id;
        setValue(id)
    }

    return (
        <div className={`${s.container} ${s.container_num}`}>
            {!nosub && <span className={s.sub}>{sub}</span>}
            <div className={s.field}>
                <input onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputValue} value={value || ''} style={{ width: `${inputWidth}px` }} disabled={disabled} type='number'></input>
                <Icon />

                <ul ref={listRef} className={`${s.list_optional} ${optionalList && s.list_optional_open}`}>
                    {numbers.map(el => {
                        return <li ref={el == value ? activeRef : null} onMouseDown={handleTab} name={el} id={el} className={el == value && `${s.number_active} active`}>{el}</li>
                    })}
                </ul>
            </div>
        </div>
    )
};

export default InputNumList;