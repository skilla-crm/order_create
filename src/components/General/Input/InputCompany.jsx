import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { useRef, useState, useEffect } from 'react';

const InputCompany = ({ sub }) => {
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [listScroll, setListScroll] = useState(false);
    const listRef = useRef();


    const handleOpenList = () => {

        if (openList) {
            setOpenList(false)
        } else {
            setOpenList(true)
            setTimeout(() => {
                setListScroll(true)
            }, 100)
        }
    }

    const handleFocus = () => {
        setFieldFocus(true)
    }


    const handleBlur = () => {
        setFieldFocus(false)
    }


    const handleClose = () => {
        setOpenList(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <div ref={listRef} className={`${s.field} ${fieldFocus && s.field_focus}`}>
                <input onFocus={handleFocus} onBlur={handleBlur} type='text'></input>
                <div onClick={handleOpenList} className={`${s.chewron} ${openList && s.chewron_open}`}>
                    <IconChewron />
                </div>

                <ul className={`${s.list} ${openList && s.list_open} ${listScroll && s.list_scroll}`}>
                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>

                    <li>
                        <p>ПАО “Газпром”</p>
                        <span>ИНН 5464646464 КПП 780601001 ООО Длинное Скилла Инновации</span>
                    </li>
                </ul>
            </div>

        </div>
    )
};

export default InputCompany;