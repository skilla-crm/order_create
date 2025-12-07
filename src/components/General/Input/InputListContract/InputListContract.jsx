import classNames from 'classnames';
import s from './InputListContract.module.scss';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
//icons
import { ReactComponent as IconChewron } from './assets/iconChewron.svg';


const InputListContract = ({ vis, list, value, setValue, width }) => {
    const [openList, setOpenList] = useState(false);
    const listRef = useRef();
    const fieldRef = useRef();
    console.log(value)

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleValue = (el) => {
        setValue(el)
        handleClose()
    }

    const handleClose = () => {
        setOpenList(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target) && !fieldRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div
            className={classNames(s.root, vis && s.root_vis)}
            style={{ width: width ? `${width}px` : '100%' }}

        >
            <span className={s.sub}>Договор</span>

            <div ref={fieldRef} onClick={handleOpenList} className={s.field}>
                <div className={s.contract}>
                    <p>{`${value?.template_name} №${value?.prefix ? ' ' + value?.prefix : ''} ${value?.number}`} {value?.date ? ` от ${dayjs(value?.date).format('DD.MM.YYYY')}` : ''}</p>
                    <span>{`${value?.partnership_name} ${value?.partnership_details?.bank ? value?.partnership_details?.bank : ''} ${value?.partnership_details?.rs ? `*${value?.partnership_details?.rs.slice(-4)}` : ''}`}</span>
                </div>
                <IconChewron className={classNames(s.chewron, openList && s.chewron_up)} />
            </div>

            <ul ref={listRef} className={classNames(s.list, openList && s.list_open)}>
                {list.map(el => <li
                    onClick={() => handleValue(el)}
                    className={classNames(s.item, el.id === value.id && s.item_active)}
                    key={el.id}
                    id={el.id}
                >
                    <p>{`${el?.template_name} №${el?.prefix ? ' ' + el?.prefix : ''} ${el?.number}`} {el?.date ? ` от ${dayjs(el?.date).format('DD.MM.YYYY')}` : ''}</p>
                    <span>{`${el?.partnership_name} ${el?.partnership_details?.bank ? el?.partnership_details?.bank : ''} ${el?.partnership_details?.rs ? `*${el?.partnership_details?.rs.slice(-4)}` : ''}`}</span>
                </li>)}
            </ul>
        </div>
    )
};

export default InputListContract;