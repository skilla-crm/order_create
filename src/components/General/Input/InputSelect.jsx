import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { useRef, useState, useEffect } from 'react';

const InputSelect = ({ sub, value, setValue }) => {
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const listRef = useRef();


    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
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
        <div className={`${s.container} ${s.container_select}`}>
            <span className={s.sub}>{sub}</span>
            <div ref={listRef} className={`${s.field} ${fieldFocus && s.field_focus}`}>
                <input onFocus={handleFocus} onBlur={handleBlur} type='text'></input>
                <div onClick={handleOpenList} className={`${s.chewron} ${openList && s.chewron_open}`}>
                    <IconChewron />
                </div>

                <ul className={`${s.list} ${openList && s.list_open}`}>
                    <li>
                        <p>Услуги исполнителей</p>

                    </li>

                    <li>
                        <p>Услуги исполнителей</p>

                    </li>
                </ul>
            </div>

        </div>
    )
};

export default InputSelect; 