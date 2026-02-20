import s from './Rates.module.scss';
import classNames from 'classnames';
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
import { selectorParametrs } from '../../store/reducer/Parametrs/selector';
//slice
import { setRate, setRateWorker, setSameTarification, setTariffId, setContractTariffId, setMinSumWorker, setExpectedAmountWorker, setUnit, setUnitWorker } from '../../store/reducer/Rates/slice';
import { setMinDurqtion } from '../../store/reducer/Details/slice';
import { setRateError, setRateWorkerError } from '../../store/reducer/Validation/slice';
//utils
import { addSpaceNumber2 } from '../../utils/addSpaceNumber';
//components
import Header from '../General/Header/Header';
import Field from '../General/Field/Field';
import SegmentButtons from '../General/SegmentButtons/SegmentButtons';
import RateBlock from '../RateBlock/RateBlock';
import RateBlockTwice from '../RateBlockTwice/RateBlockTwice';
const role = document.getElementById(`root_order-create`).getAttribute('role');

const Rate = ({ id, name, customerBit, workerBit, min, handleResetRatio, fromPartnership, contractWork, unit, okei }) => {
    const { tariffId, contractTariffId } = useSelector(selectorRates);
    const { unitList } = useSelector(selectorParametrs);
    const dispatch = useDispatch();
    const [anim, setAnim] = useState(false);


    const handleChoseRate = () => {

        if ((tariffId == id || contractTariffId == id) && id) {
            dispatch(setTariffId(null))
            dispatch(setContractTariffId(null))
        } else {
            if (contractWork) {
                dispatch(setContractTariffId(id))
                dispatch(setTariffId(null))
            } else {
                dispatch(setContractTariffId(null))
                dispatch(setTariffId(id))
            }

            (fromPartnership == 0 || !fromPartnership) && dispatch(setRate(parseFloat(customerBit)))
            dispatch(setRateWorker(parseFloat(workerBit)))
            min && Number(min) > 0 && (unit?.toLowerCase() === 'час' || unit?.toLowerCase() === 'ч' || unit?.toLowerCase() === 'ед') && dispatch(setMinDurqtion(Number(min)))
            handleResetRatio()

           /*  const stateUnit = unitList?.find(el => el.name?.toLowerCase() === unit?.toLowerCase())

            if (stateUnit) {
                dispatch(setUnit(stateUnit.id))
                dispatch(setUnitWorker(stateUnit.id))
            }
 */


        }

    }

    return (
        <div onClick={handleChoseRate}
            onMouseEnter={() => setAnim(true)}
            onMouseLeave={() => setAnim(false)}
            className={classNames(s.rate, (tariffId == id || contractTariffId == id) && id && s.rate_active)}
        >


            <div style={{ width: "100%" }} className={s.name}>
                <div className={`${s.arrow} ${anim && s.arrow_anim}`}>
                    <IconRate />
                </div>
                <p>{name}</p>
            </div>

            <div style={{ width: "100px" }} className={s.unit}>
                <p>{unit}</p>
            </div>

            <div style={{ width: "120px" }} className={s.min}>
                <p>{min}</p>
            </div>

            <div style={{ width: "120px" }} className={s.unit}>
                <p>{addSpaceNumber2(customerBit)}</p>
            </div>

            <div style={{ width: "120px" }} className={s.bit}>
                <p>{addSpaceNumber2(workerBit)}</p>
            </div>

        </div>
    )
}

const Rates = () => {
    const { rates } = useContext(ParametrsContext)
    const [activeRatio, setActiveRatio] = useState(0)
    const [warning, setWarning] = useState(false);
    const dispatch = useDispatch();
    const { rate, rateWorker, sameTarification, ratesPartnership, unit, unitWorker, tariffId, contractTariffId, expectedAmount } = useSelector(selectorRates)
    const { payType, customer, contract } = useSelector(selectorCustomer)
    const { fromPartnership } = useSelector(selectorManagers);
    const [minValueState, setMinValueState] = useState(false);
    const [minValueStateWorker, setMinValueStateWorker] = useState(false);
    const [blockHeight, setBlockHeight] = useState('');
    const customerWorks = contract?.works ? contract?.works : customer?.works;

    useEffect(() => {
        let baseHeight = 277


        if (!sameTarification && (minValueStateWorker || minValueState)) {
            baseHeight += 42

        }

        if (!sameTarification && (unit != 1 && unit != 7) || (unitWorker != 1 && unitWorker != 7)) {
            baseHeight += 63

        }

        if (warning) {
            baseHeight += 18
        }

        setBlockHeight(sameTarification ? '' : baseHeight)



        /*  (sameTarification ? 225 : 277) + (((minValueState && !sameTarification) || minValueState) ? 42 : 0) + ((((unit == 1 || unit == 7) && sameTarification) || ((unitWorker == 1 || unitWorker == 7) && (unit == 1 || unit == 7) && !sameTarification)) ? 0 : 63) + (warning ? 18 : 0) */
    }, [sameTarification, minValueState, minValueStateWorker, unit, unitWorker, warning]);

    useEffect(() => {
        if (customerWorks?.find(el => el.id != tariffId & el.id != contractTariffId) || !customerWorks) {
            dispatch(setTariffId(null))
            dispatch(setContractTariffId(null))
        }
    }, [customerWorks, customer])


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
                    callback={(val) => {
                        dispatch(setSameTarification(val))

                        if (val) {
                            dispatch(setExpectedAmountWorker(expectedAmount))
                        }
                    }}
                    value={sameTarification}
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

            <div style={{ height: blockHeight ? blockHeight + 'px' : 'fit-content' }} className={s.container}>
                <div className={classNames(s.tarif, sameTarification && s.tarif_vis)}>
                    <RateBlock
                        fromPartnership={fromPartnership}
                        activeRatio={activeRatio}
                        setActiveRatio={setActiveRatio}
                        handleResetRatio={handleResetRatio}
                        warning={warning}
                        payType={payType}
                        minValueState={minValueState}
                        setMinValueState={setMinValueState}
                        minValueStateWorker={minValueStateWorker}
                        setMinValueStateWorker={setMinValueStateWorker}
                        sameTarification={sameTarification}
                    />
                </div>

                <div className={classNames(s.tarif, s.tarif_twice, !sameTarification && s.tarif_vis)}>
                    <RateBlockTwice
                        fromPartnership={fromPartnership}
                        activeRatio={activeRatio}
                        setActiveRatio={setActiveRatio}
                        handleResetRatio={handleResetRatio}
                        warning={warning}
                        payType={payType}
                        minValueState={minValueState}
                        setMinValueState={setMinValueState}
                        minValueStateWorker={minValueStateWorker}
                        setMinValueStateWorker={setMinValueStateWorker}
                        sameTarification={sameTarification}
                    />
                </div>
            </div>



            <div>

                <p style={{ fontWeight: '500px' }}>{SUB_PRICE}</p>


                {(payType !== 1 || customerWorks?.length == 0 || !customerWorks) && <>
                    <div className={s.subs}>
                        <span style={{ width: "100%" }}>Наименование</span>
                        {/*   <span style={{ width: "300px" }}></span> */}

                        <span style={{ width: "120px" }}>Клиенту</span>
                        <span style={{ width: "120px" }}>Исполнителям</span>
                    </div>
                    <ul className={`${s.block_list} ${s.block_list_2}`}>
                        {(role === 'mainoperator' ? ratesPartnership : rates)?.map((el, i) => {
                            return <Rate
                                key={el.id}
                                customerBit={el.client_bit}
                                workerBit={el.worker_bit}
                                name={`${el.label ? el.label : `Тариф ${i + 1}`}`}
                                handleResetRatio={handleResetRatio}
                                fromPartnership={fromPartnership}
                            />
                        })}
                    </ul>
                </>
                }

                {(payType == 1 && customerWorks?.length > 0) && <>
                    <div className={s.subs}>
                        <span style={{ width: "100%" }}>Наименование</span>
                        {/*   <span style={{ width: "300px" }}></span> */}
                        <span style={{ width: "100px" }}>Ед. изм.</span>
                        <span style={{ width: "120px" }}>Мин. единиц</span>
                        <span style={{ width: "120px" }}>Клиенту</span>
                        <span style={{ width: "120px" }}>Исполнителям</span>
                    </div>

                    < ul className={`${s.block_list}`}>
                        {customerWorks?.map((el, i) => {
                            return <Rate
                                contractWork={contract?.works}
                                key={el.id}
                                id={el.id}
                                fromPartnership={fromPartnership}
                                customerBit={el.price?.replace(',', '.')}
                                workerBit={el.bit?.replace(',', '.')}
                                unit={el.unit}
                                okei={el.okei}
                                name={el.work}
                                min={el?.min_time}
                                handleResetRatio={handleResetRatio} />
                        })}
                    </ul>
                </>
                }
            </div>


        </div>
    )
};

export default Rates;