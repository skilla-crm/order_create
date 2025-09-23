import classNames from 'classnames';
import s from './InputList.module.scss';
import { useState, useEffect, useRef } from 'react';
//icons
import { ReactComponent as IconChewron } from './assets/iconChewron.svg';


const InputList = ({ list, value, setValue, width }) => {
    const [openList, setOpenList] = useState(false);
    const listRef = useRef();
    const fieldRef = useRef();

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleValue = (e) => {
        const id = Number(e.currentTarget.id);
        setValue(id)
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
            className={s.root}
            style={{ width: width ? `${width}px` : '100%' }}

        >
            <div ref={fieldRef} onClick={handleOpenList} className={s.field}>
                <p>{list?.find(el => el.id == value)?.name}</p>
                <IconChewron className={classNames(s.chewron, openList && s.chewron_up)} />
            </div>

            <ul ref={listRef} className={classNames(s.list, openList && s.list_open)}>
                {list.map(el => <li
                    onClick={handleValue}
                    className={classNames(s.item, el.id === value && s.item_active)}
                    key={el.id}
                    id={el.id}
                >
                    {el.name}
                </li>)}
            </ul>
        </div>
    )
};

export default InputList;