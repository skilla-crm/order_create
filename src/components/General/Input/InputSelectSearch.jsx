import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { useRef, useState, useEffect } from 'react';
//utils
import { SearchOrderType } from '../../../utils/SearchOrderType';

const InputSelectSearch = ({ sub, value, setValue, list }) => {
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [listScroll, setListScroll] = useState(false);
    const listRef = useRef();
    console.log(valueText, openList)

    useEffect(() => {
        const result = list?.find(el => el.id == value)
        result && setValueText(result?.name)
    }, [value])

    useEffect(() => {
        const search = SearchOrderType(valueText, list);
        console.log(search)
        valueText !== '' && setSearchResult(search)
        valueText == '' && setSearchResult(list);
        valueText == '' && fieldFocus && setOpenList(true);
        search?.length == 0 && fieldFocus && setOpenList(false)
    }, [valueText, list])

    const handleChangeValue = (e) => {
        const value = e.currentTarget.value;
        setValueText(value)
    }

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
        openList && setTimeout(() => {
            setListScroll(true)
        }, 200)

        !openList && setListScroll(false)
    }

    const handleFocus = () => {
        setFieldFocus(true)
        searchResult?.length > 0 && setOpenList(true)
        setTimeout(() => {
            setListScroll(true)
        }, 200)
    }

    const handleBlur = () => {
        setFieldFocus(false)
        setListScroll(false)

    }

    const handleClose = () => {
        setOpenList(false)
    }


    const handleChose = (e) => {
        const id = Number(e.currentTarget.id);
        setValue(id)
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
                <input value={valueText || ''} onChange={handleChangeValue} onFocus={handleFocus} onBlur={handleBlur} type='text'></input>
                <div onClick={handleOpenList} className={`${s.chewron} ${openList && s.chewron_open}`}>
                    <IconChewron />
                </div>

                <ul className={`${s.list} ${openList && s.list_open}  ${listScroll && s.list_scroll}`}>
                    {searchResult?.map(el => {
                        return (
                            <li onClick={handleChose} key={el.id} id={el.id}>
                                <p>{el.name}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
};

export default InputSelectSearch; 