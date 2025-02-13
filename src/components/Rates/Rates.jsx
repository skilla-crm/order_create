import s from './Rates.module.scss';
import { useRef, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
//constants
import { TITLE, SUB_CUSTOMER, SUB_WORKER, SUB_PRICE, ratersChangeList } from '../../constants/rates';
import { PromptRates } from '../../constants/prompts';
import { ReactComponent as IconWarning } from '../../images/icons/iconWarning.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
import { ReactComponent as IconRate } from '../../images/icons/iconBackForward.svg';
//selectors
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//slice
import { setRate, setRateWorker } from '../../store/reducer/Rates/slice';
import { setMinDurqtion } from '../../store/reducer/Details/slice';
//utils
import { addSpaceNumber2 } from '../../utils/addSpaceNumber';

//components
import Header from '../General/Header/Header';
import InputNum from '../General/Input/InputNum';

const Rate = ({ name, customerBit, workerBit, minTime, handleResetRatio }) => {
    const dispatch = useDispatch();
    const [anim, setAnim] = useState(false);

    const handleChoseRate = () => {
        dispatch(setRate(customerBit))
        dispatch(setRateWorker(workerBit))
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
    const [rateList, setRateList] = useState([]);
    const [ratioList, setRatioList] = useState(false);
    const [activeRatio, setActiveRatio] = useState(0)
    const [ratio, setRatio] = useState(1);
    const [warning, setWarning] = useState(false);
    const dispatch = useDispatch();
    const { rate, rateWorker } = useSelector(selectorRates)
    const { payType, customer } = useSelector(selectorCustomer)
    const listRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        if (payType == 1) {
            const result = rates?.filter(el => el.cash == 0);
            result?.length == 0 ? setRateList(rates) : setRateList(result);
            return
        }

        if (payType !== 1) {
            const result = rates?.filter(el => el.cash == 1);
            setRateList(result)
            return
        }
    }, [rates, payType])

    /*   useEffect(() => {
          if (rate !== '') {
              dispatch(setRate(rate * ratio))
          }
      }, [ratio, rate]) */

    useEffect(() => {
        const result = rateList.find(el => el.client_bit == parseFloat(rate) && el.worker_bit == rateWorker);
        (result || rate == '' || rateWorker == '') ? setWarning(false) : setWarning(true)
    }, [rate, rateWorker])

    const handleOpenRatioList = () => {
        ratioList ? setRatioList(false) : setRatioList(true)
    }

    const handleResetRatio = () => {
        setRatio(1)
        setActiveRatio(0)
    }

    const handleChoseRatio = (e) => {
        const id = Number(e.currentTarget.id);
        activeRatio == id ? setActiveRatio(0) : setActiveRatio(id)
        const result = ((parseFloat(rate) * 100) / (100 + id))
        const result2 = parseFloat(rate) + (parseFloat(rate) * id / 100)
        const result3 = ((rate * 100) / (100 + activeRatio)) * (1 + id / 100)
        activeRatio == id && dispatch(setRate(result.toFixed(2)))
        activeRatio == 0 && dispatch(setRate(result2?.toFixed(2)))
        activeRatio !== 0 && activeRatio !== id && dispatch(setRate(result3.toFixed(2)))
        setRatioList(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)
            && buttonRef.current && !buttonRef.current.contains(e.target)) {
            setRatioList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={s.rates}>
            <Header
                title={TITLE}
                buttonState={false}
                PromptText={PromptRates}
            />

            <div className={s.block}>
                <div className={s.inputs}>
                    <div className={s.block_point}>
                        <InputNum
                            sub={SUB_CUSTOMER}
                            disabled={false}
                            value={rate}
                            setValue={(data) => {
                                dispatch(setRate(data))
                                handleResetRatio()
                            }}
                            error={false}
                            errorEmpity={false}
                            maxValue={10}
                            errorText={'dgdf'}
                        />
                        <button disabled={(rate == '' || payType !== 1)} ref={buttonRef} onClick={handleOpenRatioList} className={s.point}>
                            <IconPoints />
                        </button>

                        <ul ref={listRef} className={`${s.list} ${ratioList && s.list_open}`}>
                            {ratersChangeList.map(el => {
                                return (
                                    <li
                                        key={el.id}
                                        id={el.id}
                                        className={`${s.item} ${el.id == activeRatio && s.item_active}`}
                                        onClick={handleChoseRatio}>
                                        {el.name}
                                    </li>
                                )
                            })}
                        </ul>

                    </div>

                    <InputNum
                        sub={SUB_WORKER}
                        disabled={false}
                        value={rateWorker}
                        setValue={(data) => dispatch(setRateWorker(data))}
                        error={false}
                        errorEmpity={false}
                        maxValue={10}
                        errorText={'dgdf'}
                    />
                </div>


                <div className={`${s.warning} ${warning && s.warning_vis}`}>
                    <IconWarning />
                    <p>
                        Указанная ставка отсутсвует в прайс-листе
                    </p>
                </div>
            </div>

            <div>
                <span className={s.sub}>
                    {SUB_PRICE}
                </span>
                {(payType !== 1 || customer?.works?.length == 0 || !customer?.works) && <ul className={`${s.block_list} ${s.block_list_2}`}>
                    {rateList?.map((el, i) => {
                        return <Rate
                            key={el.id}
                            customerBit={el.client_bit}
                            workerBit={el.worker_bit}
                            name={`Тариф ${i + 1}`}
                            handleResetRatio={handleResetRatio} />
                    })}
                </ul>
                }

                {(payType == 1 && customer?.works?.length > 0) && < ul className={`${s.block_list}`}>
                    {customer?.works?.map((el, i) => {
                        return <Rate
                            customerBit={el.price}
                            workerBit={el.bit}
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