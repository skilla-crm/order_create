import s from './App.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconDone } from '../../images/icons/iconDone16-16-white.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
import { UserContext } from '../../contexts/UserContext';
//components
import Button from './Button/Button';
import Customer from '../Customer/Сustomer';
import Performers from '../Performers/Performers';
import Details from '../Details/Details';
import Preview from '../Preview/Preview';
const pro = document.getElementById(`root_order-create`).getAttribute('pro') == 1 ? true : false;
const role = document.getElementById(`root_order-create`).getAttribute('role');

const App = () => {
    const [theme, setTheme] = useState('light');
    //установка системной темы
    useEffect(() => {
        if (theme == '') {
            const userMedia = window.matchMedia('(prefers-color-scheme: light)')
            if (userMedia.matches) return setTheme('light')
            return setTheme('dark')
        }
    }, [theme]);

    const handleSave = () => {
        console.log('сохранить')
    }

    const handleCreate = () => {
        console.log('создать')
    }


    document.documentElement.dataset.theme = theme;
    return (
        <UserContext.Provider value={{ pro, role }}>
            <div className={s.app}>
                <div className={s.header}>
                    <h2 className={s.title}>Создание заказа</h2>
                    <div className={s.buttons}>
                        <Button handleClick={handleCreate} Icon={IconPoints} type={'points'} />
                        <Button handleClick={handleSave} text={'Сохранить черновик'} type={'second'} />
                        <Button handleClick={handleCreate} text={'Создать заказ'} Icon={IconDone} />

                    </div>
                </div>


                <div className={s.container}>
                    <div className={s.left}>
                        <Customer />
                        <Performers />
                        <Details />
                    </div>
                    <div className={s.right}>
                        <Preview />
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    )
};

export default App;