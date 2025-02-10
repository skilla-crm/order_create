import s from './OrdersHistory.module.scss';
import { useState } from 'react';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { ReactComponent as IconRepeat } from '../../images/icons/iconRepeat.svg';
import { ReactComponent as IconBuilder } from '../../images/icons/IconBuilder.svg';
import { ReactComponent as IconDone } from '../../images/icons/bage/iconDone.svg';
import { ReactComponent as IconDoneYellow } from '../../images/icons/bage/iconDoneYellow.svg';
import { ReactComponent as IconClose } from '../../images/icons/bage/iconClose.svg';
//components
import Header from '../General/Header/Header';
import InputSelect from '../General/Input/InputSelect';
//constants
import { PromptCustomer } from '../../constants/prompts';
const list = [{ id: 1, name: 'Последние 5 заказов' }, { id: 2, name: 'Последние 10 заказов' }, { id: 3, name: 'Последние 20 заказов' }, { id: 4, name: 'Все' }]



const Bage = ({ status }) => {
    return (
        <>
            {status == 2 &&
                <div className={s.bage}>
                    <IconDone />
                    <p>Завершен</p>
                </div>
            }

            {status == 3 &&
                <div className={`${s.bage} ${s.bage_yellow}`}>
                    <IconDoneYellow />
                    <p>Не завершен</p>
                </div>
            }

            {status == 1 &&
                <div className={`${s.bage} ${s.bage_red}`}>
                    <IconClose />
                    <p>Отменен</p>
                </div>
            }
        </>

    )
}
const Item = ({ el }) => {
    return (
        <div className={s.item}>
            <button className={s.repeat}>
                <IconRepeat />
            </button>

            <div className={`${s.block} ${s.block_date}`}>
                <p>{el?.date}</p>
                <span>
                    <IconBuilder />
                    {el?.worker_count}
                </span>
            </div>

            <div className={`${s.block} ${s.block_address}`}>
                <p>{el?.load_address} {el?.k} {el?.house}</p>
                <span>
                    {el?.notes}
                </span>
            </div>

            <div className={`${s.block} ${s.block_contact}`}>
                <p>{el?.name}</p>
                <span>
                    <InputMask
                        value={el?.phone}
                        disabled={true}
                        mask="+7 (999) 999-99-99"
                    />
                </span>
            </div>

            <div className={`${s.block} ${s.block_bit}`}>
                <p>{el?.client_bit} / {el.worker_bit}</p>
                <span>
                    на р/с
                </span>
            </div>

            <div className={`${s.block} ${s.block_bage}`}>
                <Bage status={el?.order_status} />
            </div>
        </div>
    )
}


const OrdersHistory = ({ vis, client, historyList }) => {
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
                    type={2}
                />

                <div className={s.history}>
                    {historyList.map(el => {
                        return <Item key={el.id} el={el} />
                    })}
                </div>
            </div>
        </div>

    )
};

export default OrdersHistory;