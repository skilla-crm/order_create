import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './Tabs.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { ReactComponent as BagePro } from '../../../images/icons/badgePro.svg';

const Tab = ({ id, tab, value, handleTab, min }) => {


    return (
        <li id={id} onClick={handleTab} className={`${s.tab} ${s.tab_2} ${value == tab && s.tab_active}`}>
            {tab}
        </li>
    )
}

const Tabs = ({ sub, value, setValue, tabList }) => {

    const handleTab = (e) => {
        const id = e.currentTarget.id;
            setValue(id)
    }
  
    return (
        <div className={s.container}>
            {sub && <span className={s.sub}>{sub}</span>}
            <ul className={s.list}>
                {tabList && tabList?.map(el => {
                    return <Tab key={el} id={el} tab={el} value={value} handleTab={handleTab} />
                })}

            </ul>

        </div>
    )
};

export default Tabs;