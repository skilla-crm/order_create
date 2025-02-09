import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { useRef, useState, useEffect } from 'react';
import CompanyList from '../CompanyList/CompanyList';

const InputCompany = ({ sub, list, value }) => {
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

               <CompanyList list={list} value={value} openList={openList} listScroll={listScroll}/>
            </div>

        </div>
    )
};

export default InputCompany;