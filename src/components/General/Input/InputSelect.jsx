import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { ReactComponent as IconChewron2 } from '../../../images/icons/iconChewron2.svg';
import avatardef from '../../../images/avatarDef.png';
import { useRef, useState, useEffect } from 'react';

const InputSelect = ({ sub, list, value, setValue, type, position,defaultRow }) => {
    const [openList, setOpenList] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('')
    const listRef = useRef();
    console.log(list)

    useEffect(() => {
        if (((value == 0 || value == null) && defaultRow)) {
            setName(defaultRow.name)
            return
        }

        if (value !== '') {
            const result = list?.find(el => el.id == value)
            setName(result?.name)
            setAvatar(result?.avatar_mini)
            return
        }
        if (value == '') {
            setName(list?.[0]?.name)
            setValue(list?.[0]?.id)
            return
        }


    }, [list, value])


    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleValue = (e) => {
        const id = e.currentTarget.id;
        setValue(id)
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

    console.log(value)

    return (
        <div className={`${s.container} ${s.container_select} ${type == 2 && s.container_select2}`}>
            {sub && <span className={s.sub}>{sub}</span>}
            <div onClick={handleOpenList} ref={listRef} className={`${s.field} ${s.field_select}`}>
                {type !== 3 && <p>{name}</p>}
                {type == 3 && <div className={s.item}>
                    {value !== null && <div className={s.avatar}>
                        <img scr={avatar == "" ? avatardef : avatar}></img>
                    </div>
                    }
                    <p>{name}</p>
                </div>}
                <div className={`${s.chewron} ${openList && s.chewron_open}`}>
                    {type !== 2 && <IconChewron />}
                    {type == 2 && <IconChewron2 />}
                </div>

                <ul className={`${s.list} ${s.list_scroll} ${position == 'top' && s.list_top} ${openList && s.list_open}`}>
                    {defaultRow && <li onClick={handleValue} id={defaultRow.id} className={`${s.item} ${(value == 0 || value == null) && s.item_active}`}>{defaultRow.name}</li>}

                    {list?.map(el => {
                        return <li onClick={handleValue} key={el.id} id={el.id} className={`${s.item} ${el.id == value && s.item_active}`}>
                            {type == 3 && <div className={s.avatar}>
                                <img scr={el.avatar_mini == "" ? avatardef : el.avatar_mini}></img>
                            </div>}
                            <p>{el.name} {el.position == 'director' && <span>Руководитель</span>}</p>
                        </li>
                    })}
                </ul>
            </div>

        </div>
    )
};

export default InputSelect; 