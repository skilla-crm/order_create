import s from './Manager.module.scss';
import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
import { ReactComponent as IconWarning } from '../../images/icons/iconWarning.svg';
//constants
import { TITLE, segments, defaultRow } from '../../constants/managers';

import { PromptManager } from '../../constants/prompts';
//utils

import { sortManager } from '../../utils/sortManager';
//selector
import { selectorManagers } from '../../store/reducer/Managers/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorPartnership } from '../../store/reducer/Partnership/selector';
//slice
import { setManagerId, setPartnershipId, setPartnerRates, setPartnerRate, setEmailState } from '../../store/reducer/Managers/slice';
//components 
import Header from '../General/Header/Header';
import SegmentControl from '../General/SegmentControl/SegmentControl';
import InputSelect from '../General/Input/InputSelect';
import InputSelectPartner from '../General/Input/InputSelectPartner';
const role = document.getElementById(`root_order-create`).getAttribute('role');


const Manager = () => {
    const { supervisors, skilla_partnerships } = useContext(ParametrsContext)
    const [activeSegment, setActiveSegment] = useState(1);
    const [activeRate, setActiveRate] = useState(1);
    const [defaultManagerId, setDefaultManagerId] = useState(null)
    const { managerId, partnershipId, emailPasport, partnerRates, partnerRate, emailState, fromPartnership, acceptStatus } = useSelector(selectorManagers);
    const { partnership } = useSelector(selectorPartnership);
    const { service } = useSelector(selectorDetails);
    const { payType } = useSelector(selectorCustomer);
    const dispatch = useDispatch();
    console.log(partnership)

    useEffect(() => {
        service == 8 && dispatch(setEmailState(false))
    }, [service])

    useEffect(() => {
        if (role === 'mainoperator') {
            const result = partnership?.superviosrs?.find(el => el.default == 1)
            result ? dispatch(setManagerId(result.id)) : dispatch(setManagerId(0)) 
        } else {
            const result = supervisors?.find(el => el.default == 1)
            result && dispatch(setManagerId(result.id))
        }


    }, [supervisors, partnership])

    useEffect(() => {
        if (partnershipId !== 0 && partnershipId !== null) {
            setActiveSegment(2)
            dispatch(setManagerId(0))
        } else {
            setActiveSegment(1)
            dispatch(setPartnershipId(null))
        }

    }, [partnershipId])

    useEffect(() => {
        if (partnerRates.length > 0) {
            const result = partnerRates.find(el => el.id == activeRate);
            result && dispatch(setPartnerRate(result?.text))
            !result && dispatch(setPartnerRate(partnerRates?.[0]?.text))
        }
    }, [partnerRates, activeRate])

    useEffect(() => {
        if (partnerRates.length > 0 && partnerRate !== 0) {
            const result = partnerRates.find(el => el.text == partnerRate);
            setActiveRate(result?.id)
        }

    }, [partnerRates, partnerRate])

    const handleActive = (data) => {
        if (data == 1) {
            setActiveSegment(1)
            dispatch(setPartnerRates([]))
            dispatch(setPartnershipId(0))
            return
        }

        if (data == 2) {
            setActiveSegment(2)
            dispatch(setManagerId(0))
            return
        }
    }



    return (
        <div className={s.manager}>
            <Header
                title={TITLE}
                buttonState={false}
                PromptText={PromptManager}
            />
            {skilla_partnerships?.length > 0 && service !== 8 && fromPartnership == 0 && <SegmentControl
                segments={segments}
                setActive={(data) => handleActive(data)}
                active={activeSegment}
            />
            }
            {activeSegment == 1 && <div>
                <InputSelect
                    list={role === 'mainoperator' ? partnership?.superviosrs : sortManager(supervisors)}
                    value={managerId}
                    setValue={(data) => dispatch(setManagerId(Number(data)))}
                    defaultRow={defaultRow}
                    type={3}
                    position={supervisors?.length > 1 ? 'top' : ''}
                />

                <div className={`${s.warning} ${managerId == 0 && s.warning_vis}`}>
                    <IconWarning />
                    <p>
                        Никто из менеджеров не увидит заказ
                    </p>
                </div>
            </div>
            }

            {activeSegment == 2 && skilla_partnerships?.length > 0 && service !== 8 &&
                <div>
                    <InputSelectPartner
                        list={skilla_partnerships}
                        value={partnershipId}
                        setValue={(data) => dispatch(setPartnershipId(Number(data)))}
                        setPartnerRates={(data) => dispatch(setPartnerRates(data))}
                        payType={payType}
                        position={skilla_partnerships?.length > 3 ? 'top' : ''}
                    />
                    <div className={`${s.partnerRates} ${partnerRates.length > 0 && s.partnerRates_vis}`}>
                        <span>Ставка партнера</span>
                        {<SegmentControl
                            segments={partnerRates}
                            setActive={setActiveRate}
                            active={activeRate}
                        />
                        }
                    </div>
                </div>
            }






        </div>
    )
};

export default Manager;
