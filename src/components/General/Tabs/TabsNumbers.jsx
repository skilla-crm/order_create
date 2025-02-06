import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './Tabs.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { ReactComponent as BagePro } from '../../../images/icons/badgePro.svg';

const Tab = ({ id, tab, value, handleTab }) => {


    return (
        <li id={id} onClick={handleTab} className={`${s.tab} ${value == tab && s.tab_active}`}>
            {tab}
        </li>
    )
}

const TabsNumbers = ({ sub, value, setValue, max, maxVis, forPro }) => {
    const [activeOptional, setActiveOptional] = useState(false);
    const [optionalList, setOptionalList] = useState(false);
    const [inputNumberValue, setInputNumberValue] = useState('')
    const inputRef = useRef();
    const activeRef = useRef();

    const numbers = Array.from({ length: maxVis }, (n, i) => i + 1);
    const optionalNumbers = Array.from({ length: max - maxVis }, (n, i) => i + maxVis + 1);

    const handleTab = (e) => {
        const id = e.currentTarget.id;
        if (id == 'optional') {
            inputRef.current.focus()
        } else {
           setValue(id)
            id > maxVis ? setInputNumberValue(id) : setInputNumberValue('');
        }
    }

    const handleScroll = (value) => {
        if (value <= max && value > maxVis) {
            activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
            return
        }
    }

    const handleInputValue = (e) => {
        const value = e.currentTarget.value;
        value <= max && setInputNumberValue(value);
        setTimeout(() => {
            handleScroll(value)
        }, 50)
     
    }


    const handleInputFocus = () => {
        setOptionalList(true)
        setActiveOptional(true)
        handleScroll(inputNumberValue)
    }

    const handleInputBlur = () => {
        setActiveOptional(false)
        console.log(value, maxVis)
        inputNumberValue == '' && value > maxVis && setValue(0);
        inputNumberValue !== '' && setValue(inputNumberValue);


        setTimeout(() => {
            setOptionalList(false)
        }, 100)
    }

    const handleReset = () => {
        setValue(0)
    }

    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <ul className={s.list}>
                {numbers.map(el => {
                    return <Tab key={el} id={el} tab={el} value={value} handleTab={handleTab} />
                })}

                <li className={`${s.tab} ${s.tab_optional} ${forPro && s.tab_forpro} ${((value > maxVis) || activeOptional) && s.tab_active}`}>

                    {forPro && <div className={s.pro}>
                        <span>...</span>
                        <BagePro />
                    </div>}

                    {!forPro && <div
                        id={'optional'}
                        onClick={handleTab}
                        className={`${s.points} ${activeOptional && s.points_hidden}`}
                    >
                        {value <= maxVis && <span>...</span>}
                        {value > maxVis && <p>{value}</p>}
                    </div>
                    }

                    {!forPro && <div className={`${s.manual} ${activeOptional && s.manual_active}`}>
                        <input
                            ref={inputRef}
                            onChange={handleInputValue}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={inputNumberValue || ''}
                            className={`${s.input} ${activeOptional && s.input_active}`}
                            type='number'
                            min={1}
                            max={max}
                        >
                        </input>

                        <ul className={`${s.list} ${s.list_optional} ${optionalList && s.list_open}`}>
                            {optionalNumbers.map(el => {
                                return <li key={el} ref={el == inputNumberValue ? activeRef : null} onMouseDown={handleTab} id={el} className={el == inputNumberValue && s.number_active}>{el}</li>
                            })}
                        </ul>
                    </div>
                    }

                    <span
                        className={`${s.chewron} ${((value > maxVis) || activeOptional) && s.chewron_vis} ${activeOptional && s.chewron_open}`}
                    >
                        <IconChewron />
                    </span>

                </li>

           {/*      <button onClick={handleReset} className={`${s.reset} ${value == 0 && s.reset_hidden}`}>Сбросить</button> */}
            </ul>

        </div>
    )
};

export default TabsNumbers;