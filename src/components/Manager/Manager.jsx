import s from './Manager.module.scss';
import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ParametrsContext } from '../../contexts/UserContext';

//constants
import { TITLE, SUB_SWITCH, SUB_EMAIL, segments, defaultRow } from '../../constants/managers';
import { ERR_EMAIL } from '../../constants/addCustomer';
import { PromptManager } from '../../constants/prompts';
//utils
import { emailValidate } from '../../utils/EmailValidate';
//selector
import { selectorManagers } from '../../store/reducer/Managers/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//slice
import { setManagerId, setPartnershipId, setEmailPasport } from '../../store/reducer/Managers/slice';
//components 
import Header from '../General/Header/Header';
import SegmentControl from '../General/SegmentControl/SegmentControl';
import InputSelect from '../General/Input/InputSelect';
import Switch from '../General/Switch/Switch';
import InputEmail from '../General/Input/InputEmail';


const Manager = () => {
    const { supervisors, skilla_partnerships } = useContext(ParametrsContext)
    const [activeSegment, setActiveSegment] = useState(1);
    const [emailState, setEmailState] = useState(false)
    const { managerId, partnershipId, emailPasport } = useSelector(selectorManagers);
    const { contacts } = useSelector(selectorCustomer);
    const dispatch = useDispatch();
    console.log(managerId)

    useEffect(() => {
        activeSegment == 1 ? dispatch(setPartnershipId(null)) : dispatch(setManagerId(null))
    }, [activeSegment])

    const handleSwitch = () => {
        if (emailState) {
            setEmailState(false)
            dispatch(setEmailPasport(''))
        } else {
            setEmailState(true)
        }
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
                setActive={setActiveSegment}
                active={activeSegment}
            />
            }
            {activeSegment == 1 && <InputSelect
                list={supervisors}
                value={managerId}
                setValue={(data) => dispatch(setManagerId(data == 0 ? null : Number(data)))}
                defaultRow={defaultRow}
                type={3}
                position={supervisors?.length > 2 ? 'top' : ''}
            />}

            {activeSegment == 2 && skilla_partnerships.length > 0 && <InputSelect
                list={skilla_partnerships}
                value={partnershipId}
                setValue={(data) => dispatch(setPartnershipId(Number(data)))}
                position={skilla_partnerships?.length > 3 ? 'top' : ''}
            />}

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
                    error={!emailValidate(emailPasport)}
                    /*       errorEmpity={!formValidate} */
                    errorText={ERR_EMAIL}
                    contacts={contacts.filter((el) => el.phone !== '')}
                />

            </div>

        </div>
    )
};

export default Manager;
