import { useState } from 'react';
import s from './Tags.module.scss';

const Tab = ({ id, tab, value, handleTab }) => {
    return (
        <li id={id} onClick={handleTab} className={`${s.tab} ${value == tab && s.tab_active}`}>
            {tab}
        </li>
    )
}

const Tags = ({ tagList, sub, value, maxVis, setValue }) => {
    const [openAll, setOpenAll] = useState(false);

    const handleTab = (e) => {
        const id = e.currentTarget.id;
        setValue(id)
    }

    const handleOpenAll = () => {
        setOpenAll(true)
    }
    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <ul className={s.list}>
                {tagList.slice(0, openAll ? tagList.length : maxVis).map(el => {
                    return <Tab key={el} id={el} tab={el} value={value} handleTab={handleTab} />
                })}

                <li onClick={handleOpenAll} className={`${s.tab} ${s.tab_optional} ${(openAll || (maxVis >= tagList.length)) && s.tab_hidden}`}>
                    <span>...</span>
                </li>
            </ul>
        </div>
    )
};

export default Tags;