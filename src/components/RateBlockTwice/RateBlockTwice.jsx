import s from './RateBlockTwice.module.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
//icons
import { ReactComponent as IconWarning } from '../../images/icons/iconWarning.svg';
import { ReactComponent as IconRuble } from '../../images/icons/IconRuble.svg';
//selector
import { selectorParametrs } from '../../store/reducer/Parametrs/selector';
import { selectorRates } from '../../store/reducer/Rates/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
import { selectorPerformers } from '../../store/reducer/Performers/selector';
//slice
import {
    setRate,
    setRateWorker,
    setUnit,
    setUnitWorker,
    setExpectedAmount,
    setExpectedAmountAll,
    setExpectedAmountWorkerAll,
    setExpectedAmountWorker,
    setMinAmount,
    setMinAmountWorker,
    setMinSum,
    setMinSumWorker
} from '../../store/reducer/Rates/slice';
//components
import InputNum from '../General/Input/InputNum';
import InputList from '../General/InputList/InputList';
import Field from '../General/Field/Field';
import RatePercent from '../RatePercent/RatePercent';
import InputFinancial from '../General/InputFinancial/InputFinancial';
import Switch from '../General/Switch/Switch';
import Tabs from '../General/Tabs/Tabs';
//constants
import { SUB_CUSTOMER, SUB_WORKER } from '../../constants/rates';

const RateBlockTwice = ({ fromPartnership, activeRatio, setActiveRatio, handleResetRatio, warning, payType, minValueState, setMinValueState, minValueStateWorker, setMinValueStateWorker }) => {

    const { unitList } = useSelector(selectorParametrs);
    const {
        rate,
        rateWorker,
        unit,
        unitWorker,
        expectedAmountAll,
        expectedAmountWorkerAll,
        minAmount,
        minAmountWorker,
        minSum,
        minSumWorker
    } = useSelector(selectorRates);
    const { performersNum } = useSelector(selectorPerformers);
    const { rateError, rateWorkerError } = useSelector(selectorValidation);
    const [minValueInput, setMinValueInput] = useState(false);
    const [minValueType, setMinValueType] = useState('Руб');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setExpectedAmount((expectedAmountAll / performersNum).toFixed(2)))
    }, [performersNum, expectedAmountAll])

    useEffect(() => {
        dispatch(setExpectedAmountWorker((expectedAmountWorkerAll / performersNum).toFixed(2)))
    }, [performersNum, expectedAmountWorkerAll])

    useEffect(() => {
        if (minSum > 0) {
            setMinValueState(true)
        }
    }, [minSum])

    useEffect(() => {
        if (minSumWorker > 0) {
            setMinValueStateWorker(true)
        }
    }, [minSumWorker])

    useEffect(() => {
        if (unit == 1 || unit == 7) {
            dispatch(setExpectedAmount(''))
        }

        if (unitWorker == 1 || unitWorker == 7) {
            dispatch(setExpectedAmountWorker(''))
        }
    }, [unit, unitWorker])

    return (
        <div className={s.root}>
            <div style={{ paddingBottom: warning ? '10px' : '' }} className={s.container}>
                <h3>Заказчику</h3>
                <Field text={'Единица тарификации'}>
                    <InputList
                        list={unitList}
                        value={unit}
                        setValue={value => {
                            dispatch(setUnit(value))
                        }}
                        width={300}
                    />
                </Field>

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
                    </div>


                    <div className={`${s.warning} ${warning && s.warning_vis}`}>
                        <IconWarning />
                        <p>
                            Указанная ставка отсутствует в прайс-листе
                        </p>
                    </div>


                </div>
                <div className={classNames(s.expected, unit !== 1 && s.expected_vis)}>
                    <InputNum
                        sub={'Предполагаемое количество'}
                        width={180}
                        disabled={false}
                        value={expectedAmountAll}
                        setValue={(data) => dispatch(setExpectedAmountAll(data))}
                        error={false}
                        errorEmpity={rateWorkerError}
                        maxValue={10}
                        errorText={'Укажи ставку'}
                    />
                </div>

                <div className={s.row}>
                    <Switch
                        text={'Минимальная сумма за исполнителя'}
                        switchState={minValueState}
                        handleSwitch={() => {
                            setMinValueState(!minValueState)
                            dispatch(setMinSum(''))
                        }}
                    />

                    <Field info={'Укажи минимальную стоимость исполнителя для заказчика'}>

                    </Field>


                </div>

                <div className={classNames(s.min, minValueState && s.min_vis)}>
                    {minValueType !== 'Руб' && <InputNum
                        sub={'Минимальное значение'}
                        width={180}
                        disabled={false}
                        value={minAmount}
                        setValue={(data) => dispatch(setMinAmount(data))}
                        error={false}
                        errorEmpity={rateWorkerError}
                        maxValue={10}
                        errorText={'Укажи ставку'}
                    />}
                    {minValueType === 'Руб' &&
                        <InputFinancial
                            width={180}
                            amount={minSum}
                            setAmount={(data) => {
                                dispatch(setMinSum(data))
                            }}
                            Icon={IconRuble}
                        />
                    }

                    {/*   <Tabs
                        value={minValueType}
                        setValue={setMinValueType}
                        tabList={['Шт', 'Руб']}
                    /> */}


                </div>
            </div>

            <div className={s.container}>
                <h3>Исполнителям</h3>
                <Field text={'Единица тарификации'}>
                    <InputList
                        list={unitList}
                        value={unitWorker}
                        setValue={value => {
                            dispatch(setUnitWorker(value))
                        }}
                        width={300}
                    />
                </Field>

                <div className={s.block}>
                    <div className={s.inputs}>
                        <div className={s.field_rate}>
                            <InputNum
                                sub={SUB_WORKER}
                                disabled={false}
                                value={rateWorker}
                                setValue={(data) => dispatch(setRateWorker(data))}
                                error={false}
                                errorEmpity={rateWorkerError}
                                maxValue={10}
                                errorText={'Укажи ставку'}
                            />

                        </div>

                    </div>

                </div>
                <div className={classNames(s.expected, unitWorker !== 1 && s.expected_vis)}>
                    <InputNum
                        sub={'Предполагаемое количество'}
                        width={180}
                        disabled={false}
                        value={expectedAmountWorkerAll}
                        setValue={(data) => dispatch(setExpectedAmountWorkerAll(data))}
                        error={false}
                        errorEmpity={rateWorkerError}
                        maxValue={10}
                        errorText={'Укажи ставку'}
                    />
                </div>

                <div className={s.row}>
                    <Switch
                        text={'Минимальная сумма исполнителю'}
                        switchState={minValueStateWorker}
                        handleSwitch={() => {
                            setMinValueStateWorker(!minValueStateWorker)
                            dispatch(setMinSumWorker(''))
                        }}
                    />

                    <Field info={'Укажи минимальную стоимость которую получит каждый исполнитель на заказе'}>

                    </Field>
                </div>

                <div className={classNames(s.min, minValueStateWorker && s.min_vis)}>
                    {minValueType !== 'Руб' && <InputNum
                        sub={'Минимальное значение'}
                        width={180}
                        disabled={false}
                        value={minAmountWorker}
                        setValue={(data) => dispatch(setMinAmountWorker(data))}
                        error={false}
                        errorEmpity={rateWorkerError}
                        maxValue={10}
                        errorText={'Укажи ставку'}
                    />}
                    {minValueType === 'Руб' &&
                        <InputFinancial
                            width={180}
                            amount={minSumWorker}
                            setAmount={(data) => {
                                dispatch(setMinSumWorker(data))

                            }}
                            Icon={IconRuble}
                        />
                    }

                    {/*  <Tabs
                        value={minValueType}
                        setValue={setMinValueType}
                        tabList={['Шт', 'Руб']}
                    /> */}
                </div>
            </div>
        </div>
    )
};

export default RateBlockTwice;