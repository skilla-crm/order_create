import s from './OrderSum.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
//components
import Header from '../General/Header/Header';
import InputNum from '../General/Input/InputNum';
//constants
import { PromptSum } from '../../constants/prompts';
//slice
import { setOrderSum } from '../../store/reducer/Rates/slice';
import { setPaySummError } from '../../store/reducer/Validation/slice';
//selector
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';

const OrderSum = () => {
    const { orderSum } = useSelector(selectorRates);
    const { paySummError } = useSelector(selectorValidation);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPaySummError(false))
    }, [orderSum])
    return (
        <div className={s.container}>
            <Header
                title={'Сдельная оплата'}
                buttonState={false}
                PromptText={PromptSum}
            />
            <div className={s.block}>
              {/*   <CurrencyFormat thousandSeparator={' '} decimalSeparator={','}/> */}
                <InputNum
                    sub={'Сумма заказа'}
                    disabled={false}
                    value={orderSum}
                    setValue={(data) => {
                        dispatch(setOrderSum(data))
                    }}
                    error={false}
                    errorEmpity={paySummError}
                    maxValue={14}
                    errorText={'Укажи сумму'}
                />
            </div>

        </div>
    )
};

export default OrderSum;