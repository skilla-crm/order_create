import { useEffect, useState } from 'react';
import s from './Tags.module.scss';
import { ReactComponent as IconClose } from '../../../images/icons/iconClose.svg';

const Tab = ({ id, tab, value, setValue, deleteValue }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const result = value.find((el) => el == id)
        setActive(result ? true : false)
    }, [value])

    const handleTab = (e) => {
        const id = Number(e.currentTarget.id);
        if (active) {
            deleteValue(id)
        } else {
            setValue(id)
        }
    }

    return (
        <li id={id} onClick={handleTab} className={`${s.tab} ${active && s.tab_active}`}>
            {tab}
            <div className={`${s.delete} ${active && s.delete_vis}`}>
                <IconClose />
            </div>

        </li>
    )
}

const Tags = ({ tagList, sub, value, maxVis, setValue, deleteValue }) => {
    const [openAll, setOpenAll] = useState(false);



    const handleOpenAll = () => {
        setOpenAll(true)
    }
    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <ul className={s.list}>
                {tagList?.slice(0, openAll ? tagList?.length : maxVis).map(el => {
                    return <Tab key={el} id={el.id} tab={el.description} value={value} setValue={setValue} deleteValue={deleteValue} />
                })}

                <li onClick={handleOpenAll} className={`${s.tab} ${s.tab_optional} ${(openAll || (maxVis >= tagList?.length)) && s.tab_hidden}`}>
                    <span>...</span>
                </li>
            </ul>
        </div>
    )
};

export default Tags;