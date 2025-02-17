import s from './Manager.module.scss';
import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';
import { ReactComponent as IconWarning } from '../../images/icons/iconWarning.svg';
//constants
import { TITLE, SUB_SWITCH, SUB_EMAIL, segments, defaultRow } from '../../constants/managers';
import { ERR_EMAIL } from '../../constants/addCustomer';
import { PromptManager } from '../../constants/prompts';
//utils
import { emailValidate } from '../../utils/EmailValidate';
import { sortManager } from '../../utils/sortManager';
//selector
import { selectorManagers } from '../../store/reducer/Managers/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
//slice
import { setManagerId, setPartnershipId, setEmailPasport, setPartnerRates, setPartnerRate, setEmailState } from '../../store/reducer/Managers/slice';
import { setEmailError, setEmailErrorFormat } from '../../store/reducer/Validation/slice';
//components 
import Header from '../General/Header/Header';
import SegmentControl from '../General/SegmentControl/SegmentControl';
import InputSelect from '../General/Input/InputSelect';
import InputSelectPartner from '../General/Input/InputSelectPartner';
import Switch from '../General/Switch/Switch';
import InputEmail from '../General/Input/InputEmail';


const Manager = () => {
    const { supervisors, skilla_partnerships } = useContext(ParametrsContext)
    const [activeSegment, setActiveSegment] = useState(1);
    const [activeRate, setActiveRate] = useState(1);
    const { managerId, partnershipId, emailPasport, partnerRates, partnerRate, emailState } = useSelector(selectorManagers);
    const { contacts, payType } = useSelector(selectorCustomer);
    const { emailError } = useSelector(selectorValidation)
    const dispatch = useDispatch();
    console.log(managerId)



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

    const handleSwitch = () => {
        if (emailState) {
            dispatch(setEmailState(false))
            handleResetErrorEmail()
            dispatch(setEmailPasport(''))
        } else {
            dispatch(setEmailState(true))
        }
    }

    useEffect(() => {
        emailPasport !== '' && dispatch(setEmailState(true))
    }, [emailPasport])

    const handleResetErrorEmail = () => {
        dispatch(setEmailError(false))
        dispatch(setEmailErrorFormat(false))
    }


    return (
        <div className={s.manager}>
            <Header
                title={TITLE}
                buttonState={false}
                PromptText={PromptManager}
            />
            {skilla_partnerships?.length > 0 && <SegmentControl
                segments={segments}
                setActive={(data) => handleActive(data)}
                active={activeSegment}
            />
            }
            {activeSegment == 1 && <div>
                <InputSelect
                    list={sortManager(supervisors)}
                    value={managerId}
                    setValue={(data) => dispatch(setManagerId(Number(data)))}
                    defaultRow={defaultRow}
                    type={3}
                    position={supervisors?.length > 2 ? 'top' : ''}
                />
                
                <div className={`${s.warning} ${managerId == 0 && s.warning_vis}`}>
                    <IconWarning />
                    <p>
                        Никто из менеджеров не увидит заказ
                    </p>
                </div>
            </div>
            }

            {activeSegment == 2 && skilla_partnerships?.length > 0 &&
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




            <Switch
                text={SUB_SWITCH}
                switchState={emailState}
                handleSwitch={handleSwitch}
            />

            <div className={`${s.email} ${emailState && s.email_vis}`}>
                <InputEmail
                    sub={SUB_EMAIL}
                    value={emailPasport}
                    setValue={(data) => dispatch(setEmailPasport(data))}
                    error={!emailValidate(emailPasport) && emailPasport.length > 0}
                    errorEmpity={emailError}
                    errorText={ERR_EMAIL}
                    errorTextEmpity={'заполните поле'}
                    contacts={contacts.filter((el) => el.email !== '')}
                    type={2}
                    handleResetErrorEmail={handleResetErrorEmail}
                />

            </div>

        </div>
    )
};

export default Manager;
