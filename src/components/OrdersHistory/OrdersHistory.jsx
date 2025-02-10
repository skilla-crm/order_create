import s from './OrdersHistory.module.scss';
import { useState } from 'react';
//components
import Header from '../General/Header/Header';
import InputSelect from '../General/Input/InputSelect';
//constants
import { PromptCustomer } from '../../constants/prompts';
const list = [{ id: 1, name: 'Последние 5 заказов' }, { id: 2, name: 'Последние 10 заказов' }, { id: 3, name: 'Последние 20 заказов' }, { id: 4, name: 'Все' }]




const OrdersHistory = ({ vis, client }) => {
    const [historyLength, setHistoryLength] = useState(1);
    return (
        <div className={`${s.window} ${vis && s.window_vis}`}>
            <div className={s.container}>
                <Header
                    title={`История заказов ${client}`}
                    buttonState={false}
                    PromptText={PromptCustomer}
                />
                <InputSelect
                    sub={false}
                    list={list}
                    value={historyLength}
                    setValue={setHistoryLength}
                />
            </div>
        </div>

    )
};

export default OrdersHistory;