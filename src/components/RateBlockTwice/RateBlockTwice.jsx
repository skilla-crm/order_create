import s from './RateBlockTwice.module.scss';

import { useSelector, useDispatch } from 'react-redux';
//icons
import { ReactComponent as IconWarning } from '../../images/icons/iconWarning.svg';
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
import { SUB_CUSTOMER, SUB_WORKER } from '../../constants/rates';

const RateBlockTwice = ({ fromPartnership, activeRatio, setActiveRatio, handleResetRatio, warning, payType }) => {

    const { unitList } = useSelector(selectorParametrs);
    const { rate, rateWorker, unit, unitWorker } = useSelector(selectorRates);
    const { rateError, rateWorkerError } = useSelector(selectorValidation);

    const dispatch = useDispatch();






    return (
        <div className={s.root}>
            <div className={s.container}>
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
            </div>

            <div className={s.container}>
                <h3>Исполнителю</h3>
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
            </div>
        </div>
    )
};

export default RateBlockTwice;