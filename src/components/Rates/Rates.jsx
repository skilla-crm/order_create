import s from './Rates.module.scss';
import { useRef, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
//constants
import { TITLE, SUB_PRICE } from '../../constants/rates';
import { PromptRates } from '../../constants/prompts';
import { ReactComponent as IconRate } from '../../images/icons/iconBackForward.svg';
//selectors
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorManagers } from '../../store/reducer/Managers/selector';
//slice
import { setRate, setRateWorker } from '../../store/reducer/Rates/slice';
import { setMinDurqtion } from '../../store/reducer/Details/slice';
import { setRateError, setRateWorkerError } from '../../store/reducer/Validation/slice';
//utils
import { addSpaceNumber2 } from '../../utils/addSpaceNumber';

//components
import Header from '../General/Header/Header';
import Field from '../General/Field/Field';
import SegmentButtons from '../General/SegmentButtons/SegmentButtons';
import RateBlock from '../RateBlock/RateBlock';

const Rate = ({ name, customerBit, workerBit, minTime, handleResetRatio, fromPartnership }) => {
    const dispatch = useDispatch();
    const [anim, setAnim] = useState(false);

    const handleChoseRate = () => {
        (fromPartnership == 0 || !fromPartnership) && dispatch(setRate(parseFloat(customerBit)))
        dispatch(setRateWorker(parseFloat(workerBit)))
        minTime && Number(minTime) > 0 && dispatch(setMinDurqtion(Number(minTime)))
        handleResetRatio()
    }

    return (
        <div onClick={handleChoseRate}
            onMouseEnter={() => setAnim(true)}
            onMouseLeave={() => setAnim(false)}
            className={s.rate}
        >
            <div className={`${s.arrow} ${anim && s.arrow_anim}`}>
                <IconRate />
            </div>

            <div className={s.name}>
                <p>{name}</p>
            </div>

            <div className={s.bit}>
                <p>{addSpaceNumber2(customerBit)}</p>
            </div>

            <div className={s.bit}>
                <p>{addSpaceNumber2(workerBit)}</p>
            </div>

        </div>
    )
}

const Rates = () => {
    const { rates } = useContext(ParametrsContext)
    const [activeRatio, setActiveRatio] = useState(0)
    const [ratio, setRatio] = useState(1);
    const [warning, setWarning] = useState(false);
    const [sameTarification, setSameTarification] = useState(true);
    const dispatch = useDispatch();
    const { rate, rateWorker, unit } = useSelector(selectorRates)
    const { payType, customer } = useSelector(selectorCustomer)

    const { fromPartnership } = useSelector(selectorManagers);


    useEffect(() => {
        dispatch(setRateError(false))
    }, [rate])

    useEffect(() => {
        dispatch(setRateWorkerError(false))
    }, [rateWorker])

    useEffect(() => {
        if (rate == '' || rateWorker == '' || rate == 0 || rateWorker == 0) {
            setWarning(false)
            return
        }

        if (customer?.works == '' || !customer?.works) {
            const result = rates?.find(el => parseFloat(el?.client_bit) == parseFloat(rate) && parseFloat(el?.worker_bit) == parseFloat(rateWorker))
            result ? setWarning(false) : setWarning(true)
            return
        }

        if (customer?.works !== '') {
            const result = customer?.works?.find(el => parseFloat(el?.price?.replace(',', '.')) == parseFloat(rate) && parseFloat(el?.bit?.replace(',', '.')) == parseFloat(rateWorker))
            result ? setWarning(false) : setWarning(true)
            return
        }



    }, [rate, rateWorker, customer])


    const handleResetRatio = () => {
        setRatio(1)
        setActiveRatio(0)
    }



    return (
        <div className={s.rates}>
            <Header
                title={TITLE}
                buttonState={false}
                PromptText={PromptRates}
            />

            <Field text={'Единицы тарификации заказчику и исполнителю'}>
                <SegmentButtons
                    style={2}
                    callback={(val) => setSameTarification(val)}
                    controlRef={useRef()}
                    segments={[
                        {
                            label: "Совпадают",
                            value: true,
                            ref: useRef(),
                        },
                        {
                            label: "Отличаются",
                            value: false,
                            ref: useRef(),
                        },
                    ]}
                />
            </Field>

            <RateBlock
                fromPartnership={fromPartnership}
                ratio={ratio}
                setRatio={setRatio}
                activeRatio={activeRatio}
                setActiveRatio={setActiveRatio}
                handleResetRatio={handleResetRatio}
                warning={warning}
                payType={payType}
            />

            <div>
                <span className={s.sub}>
                    {SUB_PRICE}
                </span>
                {(payType !== 1 || customer?.works?.length == 0 || !customer?.works) && <ul className={`${s.block_list} ${s.block_list_2}`}>
                    {rates?.map((el, i) => {
                        return <Rate
                            key={el.id}
                            customerBit={el.client_bit}
                            workerBit={el.worker_bit}
                            name={`Тариф ${i + 1}`}
                            handleResetRatio={handleResetRatio}
                            fromPartnership={fromPartnership}
                        />
                    })}
                </ul>
                }

                {(payType == 1 && customer?.works?.length > 0) && < ul className={`${s.block_list}`}>
                    {customer?.works?.map((el, i) => {
                        return <Rate
                            fromPartnership={fromPartnership}
                            customerBit={el.price.replace(',', '.')}
                            workerBit={el.bit.replace(',', '.')}
                            name={el.work}
                            minTime={el?.min_time}
                            handleResetRatio={handleResetRatio} />
                    })}
                </ul>
                }
            </div>


        </div>
    )
};

export default Rates;