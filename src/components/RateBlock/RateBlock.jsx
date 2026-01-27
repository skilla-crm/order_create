import s from './RateBlock.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//icons
import { ReactComponent as IconWarning } from '../../images/icons/iconWarning.svg';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
//selector
import { selectorParametrs } from '../../store/reducer/Parametrs/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
//slice
import { setRate, setRateWorker, setUnit, setUnitWorker } from '../../store/reducer/Rates/slice';
//components
import InputNum from '../General/Input/InputNum';
import InputList from '../General/InputList/InputList';
import Field from '../General/Field/Field';
import RatePercent from '../RatePercent/RatePercent';
//constants
import { SUB_CUSTOMER, SUB_WORKER, ratersChangeList } from '../../constants/rates';

const RateBlock = ({ fromPartnership, activeRatio, setActiveRatio, handleResetRatio, warning, payType }) => {
    const [ratioList, setRatioList] = useState(false);
    const { unitList } = useSelector(selectorParametrs);
    const { rate, rateWorker, unit } = useSelector(selectorRates);
    const { rateError, rateWorkerError } = useSelector(selectorValidation);

    const dispatch = useDispatch();

    const listRef = useRef();
    const buttonRef = useRef();

    const handleOpenRatioList = () => {
        ratioList ? setRatioList(false) : setRatioList(true)
    }




    const handleChoseRatio = (e) => {
        const id = Number(e.currentTarget.id);
        activeRatio == id ? setActiveRatio(0) : setActiveRatio(id)

        if (id > 0) {
            const result = (Number(rate) * 100) / (100 + id)
            const result2 = Number(rate) + (Number(rate) * id / 100)
            const result3 = ((Number(rate) * 100) / (100 + activeRatio)) * (1 + id / 100)
            const result4 = (Number(rate) * (100 - activeRatio)) / 100 + (((Number(rate) * (100 - activeRatio)) / 100) * id / 100)
            activeRatio == id && dispatch(setRate(Number(result).toFixed(2)))
            activeRatio == 0 && dispatch(setRate(Number(result2.toFixed(2))))
            activeRatio !== 0 && activeRatio !== id && activeRatio > 0 && dispatch(setRate(Number(result3).toFixed(2)))
            activeRatio !== 0 && activeRatio !== id && activeRatio < 0 && dispatch(setRate(Number(result4).toFixed(2)))
            return
        }

        if (id < 0) {
            const result = (Number(rate) * (100 - activeRatio)) / 100
            const result2 = (Number(rate) * 100) / (100 - id)
            const result3 = (result * 100) / (100 - id)
            const result4 = ((Number(rate) * 100) / (100 + activeRatio)) * 100 / (100 - id)
            activeRatio == id && dispatch(setRate(Number(result).toFixed(2)))
            activeRatio == 0 && dispatch(setRate(Number(result2).toFixed(2)))
            activeRatio !== 0 && activeRatio !== id && activeRatio < 0 && dispatch(setRate(Number(result3).toFixed(2)))
            activeRatio !== 0 && activeRatio !== id && activeRatio > 0 && dispatch(setRate(Number(result4).toFixed(2)))
            return
        }

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
        <div className={s.root}>
           {/*  <Field text={'Единица тарификации'}>
                <InputList
                    list={unitList}
                    value={unit}
                    setValue={value => {
                        dispatch(setUnit(value))
                        dispatch(setUnitWorker(value))
                    }}
                    width={300}
                />
            </Field> */}

            <div className={s.block}>
                <div className={s.inputs}>
                    <div className={`${s.block_point} ${fromPartnership !== 0 && s.disabled}`}>
                        <InputNum
                            sub={fromPartnership == 0 ? SUB_CUSTOMER : 'Партнеру'}
                            disabled={false}
                            value={rate}
                            setValue={(data) => {
                                dispatch(setRate(data))
                                handleResetRatio()
                            }}
                            error={false}
                            errorEmpity={rateError}
                            maxValue={14}
                            errorText={'Укажи ставку'}
                        />
                        <RatePercent
                            activeRatio={activeRatio}
                            setActiveRatio={setActiveRatio}
                            payType={payType}
                        />

                    </div>
                    <div className={s.field_rate}>
                        {/* partnershipId == null &&  */<InputNum
                            sub={SUB_WORKER}
                            disabled={false}
                            value={rateWorker}
                            setValue={(data) => dispatch(setRateWorker(data))}
                            error={false}
                            errorEmpity={rateWorkerError}
                            maxValue={10}
                            errorText={'Укажи ставку'}
                        />
                        }
                    </div>



                </div>


                <div className={`${s.warning} ${warning && s.warning_vis}`}>
                    <IconWarning />
                    <p>
                        Указанная ставка отсутствует в прайс-листе
                    </p>
                </div>


            </div>
        </div>
    )
};

export default RateBlock;