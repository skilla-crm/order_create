import s from './App.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconDone } from '../../images/icons/iconDone16-16-white.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
import { UserContext, ParametrsContext } from '../../contexts/UserContext';
//Api
import { getParametrs } from '../../Api/Api';
//slice
import { setCompaniesList } from '../../store/reducer/Customer/slice';
//components
import Button from '../General/Button/Button';
import Customer from '../Customer/Сustomer';
import Performers from '../Performers/Performers';
import Details from '../Details/Details';
import Preview from '../Preview/Preview';
import AddCustomer from '../AddCustomer/AddCustomer';
const pro = document.getElementById(`root_order-create`).getAttribute('pro') == 1 ? true : false;
const role = document.getElementById(`root_order-create`).getAttribute('role');

const App = () => {
    const [theme, setTheme] = useState('light');
    const [addCustomer, setAddCustomer] = useState(false);
    const [parametrs, setParametrs] = useState({});
    const dispatch = useDispatch();
    //установка системной темы
    useEffect(() => {
        if (theme == '') {
            const userMedia = window.matchMedia('(prefers-color-scheme: light)')
            if (userMedia.matches) return setTheme('light')
            return setTheme('dark')
        }
    }, [theme]);

    useEffect(() => {
        getParametrs()
            .then(res => {
                const data = res.data.data;
                console.log(data)
                const companies = data.companies;
                setParametrs(data)
                dispatch(setCompaniesList(companies))
            })
            .catch(err => console.log(err))
    }, [])

    const handleSave = () => {
        console.log('сохранить')
    }

    const handleCreate = () => {
        console.log('создать')
    }


    document.documentElement.dataset.theme = theme;
    return (
        <UserContext.Provider value={{ pro, role }}>
            <ParametrsContext.Provider value={parametrs}>
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
                            <Customer setAddCustomer={setAddCustomer} />
                            {addCustomer && <AddCustomer setAddCustomer={setAddCustomer} />}
                            <Performers />
                            <Details />
                        </div>
                        <div className={s.right}>
                            <Preview />
                        </div>
                    </div>
                </div>
            </ParametrsContext.Provider>
        </UserContext.Provider>
    )
};

export default App;