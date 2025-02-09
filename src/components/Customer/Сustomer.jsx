import s from './Customer.module.scss';
import { useEffect, useState, useContext } from 'react';
import { ParametrsContext } from '../../contexts/UserContext';
//constants
import { PromptCustomer } from '../../constants/prompts';
import { TITLE, BUTTON_TEXT, SUB_NAME, SUB_COMPANY, SUB_PHONE, SWITCH_NAME, segments } from '../../constants/customer';
//components
import Header from '../General/Header/Header';
import SegmentControl from '../General/SegmentControl/SegmentControl';
import InputText from '../General/Input/InputText';
import InputCompany from '../General/Input/InputCompany';
import InputPhone from '../General/Input/InputPhone';
import Switch from '../General/Switch/Switch';

const Customer = ({setAddCustomer}) => {
    const companies = useContext(ParametrsContext).companies;
    const [type, setType] = useState(1);
    const [noContactPerson, setNoContactPerson] = useState(false);


    const handleAdd = () => {
        setAddCustomer(true)
    }

    const handleContactPersonState = () => {
        noContactPerson ? setNoContactPerson(false) : setNoContactPerson(true)
    }

    return (
        <div className={s.customer}>
            <Header
                title={TITLE}
                buttonState={true}
                buttonText={BUTTON_TEXT}
                handleButton={handleAdd}
                forPro={false}
                PromptText={PromptCustomer}
            />

            <SegmentControl
                segments={segments}
                setActive={setType}
                active={type}
            />

            <div className={s.container}>
                <div className={s.block}>
                    <div className={`${s.company} ${type == 1 && s.company_vis}`}>
                        <InputCompany sub={SUB_COMPANY} list={companies} value={{}}/>
                    </div>
                    <div className={s.container}>
                        <div className={s.contact}>
                            <InputPhone sub={SUB_PHONE} disabled={noContactPerson}/>
                            <InputText sub={SUB_NAME} disabled={noContactPerson}/>
                        </div>
                        <div className={s.switch}>
                            <Switch
                                text={SWITCH_NAME}
                                handleSwitch={handleContactPersonState}
                                switchState={noContactPerson}
                                hidden={type == 1 ? false : true}
                            />
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
};

export default Customer;