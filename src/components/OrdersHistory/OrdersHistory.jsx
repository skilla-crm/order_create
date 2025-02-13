import s from './OrdersHistory.module.scss';
import { useState } from 'react';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { ReactComponent as IconRepeat } from '../../images/icons/iconRepeat.svg';
import { ReactComponent as IconBuilder } from '../../images/icons/IconBuilder.svg';
import { ReactComponent as IconDone } from '../../images/icons/bage/iconDone.svg';
import { ReactComponent as IconDoneYellow } from '../../images/icons/bage/iconDoneYellow.svg';
import { ReactComponent as IconClose } from '../../images/icons/bage/iconClose.svg';
import dayjs from 'dayjs';
//components
import Header from '../General/Header/Header';
import InputSelect from '../General/Input/InputSelect';
//utils
import { addSpaceNumber2 } from '../../utils/addSpaceNumber';
//constants
import { PromptCustomer } from '../../constants/prompts';
const list = [{ id: 5, name: 'Последние 5 заказов' }, { id: 10, name: 'Последние 10 заказов' }, { id: 20, name: 'Последние 20 заказов' }, { id: 0, name: 'Все' }]



const Bage = ({ status }) => {
    return (
        <>
            {(status == 4 || status == 20) &&
                <div className={s.bage}>
                    <IconDone />
                    <p>Завершен</p>
                </div>
            }

            {status < 4 &&
                <div className={`${s.bage} ${s.bage_yellow}`}>
                    <IconDoneYellow />
                    <p>Не завершен</p>
                </div>
            }

            {(status == 5 || status == 21) &&
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
                <p>{dayjs(el?.date).locale('ru').format('D MMMM')}</p>
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
                <p>{addSpaceNumber2(el?.client_bit)} / {addSpaceNumber2(el.worker_bit)}</p>
                <span>
                    {el.beznal == 1 && 'на р/с'}
                    {el.beznal == 0 && el.to_card == 1 && 'на карту'}
                    {el.beznal == 0 && el.to_card == 0 && 'наличные'}
                </span>
            </div>

            <div className={`${s.block} ${s.block_bage}`}>
                <Bage status={el?.order_status} />
            </div>
        </div>
    )
}


const OrdersHistory = ({ vis, client, historyList }) => {
    const [historyLength, setHistoryLength] = useState(5);
    console.log(historyList.slice(0, historyLength))
    return (
        <div className={`${s.window} ${vis && s.window_vis}`}>
            <div className={s.container}>
                <Header
                    title={`История заказов ${client}`}
                    buttonState={false}
                    PromptText={PromptCustomer}
                />
                {historyList.length > 5 && <InputSelect
                    sub={false}
                    list={list.filter(el => el.id < historyList.length)}
                    value={historyLength}
                    setValue={setHistoryLength}
                    type={2}
                />
                }

                <div className={s.history}>
                    {historyList.slice(0, historyLength == 0 ? 1000 : historyLength).map(el => {
                        return <Item key={el.id} el={el} />
                    })}
                </div>
            </div>
        </div>

    )
};

export default OrdersHistory;