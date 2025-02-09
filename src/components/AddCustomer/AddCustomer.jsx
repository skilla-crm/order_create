import s from './AddCustomer.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconDone } from '../../images/icons/iconDone16-16-white.svg';
import { ReactComponent as IconClose } from '../../images/icons/iconClose.svg';
//Api
import { createCompany } from '../../Api/Api';
//constants
import {
    TITLE, BUTTON_TEXT_SAVE, BUTTON_TEXT_CANCLE,
    SUB_INN, SUB_NAME, SUB_KPP, SUB_OGRN, SUB_OGRNIP,
    SUB_DIRECTOR, SUB_JOP_TITLE, SUB_LEGAL, SUB_ADDRESS,
    SUB_EMAIL, SUB_SWITCH, SUB_SUM, SUB_PARTY, ERR_KPP,
    ERR_ОГРN, ERR_EMAIL, ERR_FILLIN
} from '../../constants/addCustomer'
import { PromptCustomer } from '../../constants/prompts';
//utils
import { emailValidate } from '../../utils/EmailValidate';
//context 
import { ParametrsContext } from '../../contexts/UserContext';
//slice
import {
    setInn,
    setKpp,
    setName,
    setOgrn,
    setDirector,
    setJobTitle,
    setLegalBasis,
    setAddress,
    setEmail,
    setBillState,
    setBillSum,
    setPartyContract
} from '../../store/reducer/AddCustomer/slice';
//selector
import { selectorAddCustomer } from '../../store/reducer/AddCustomer/selector';
//components
import Header from '../General/Header/Header';
import Button from '../General/Button/Button';
import Switch from '../General/Switch/Switch';
import InputInn from '../General/Input/InputInn';
import InputText from '../General/Input/InputText';
import InputEmail from '../General/Input/InputEmail';
import InputNum from '../General/Input/InputNum';
import InputSelect from '../General/Input/InputSelect';

const AddCustomer = ({ setAddCustomer }) => {
    const dispatch = useDispatch();
    const companyData = useSelector(selectorAddCustomer);
    const partnerships = useContext(ParametrsContext).partnerships;
    const companies = useContext(ParametrsContext).companies;
    const [anim, setAnim] = useState(false);
    const [openListInn, setOpenListInn] = useState(false);
    const [load, setLoad] = useState(false);
    const [formValidate, setFormValidate] = useState(true);
    const [kppValidate, setKppValidate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    useEffect(() => {
        if (companyData.inn.length == 12 || (companyData.inn.length == 10 && companyData.kpp.length == 9)) {
            setKppValidate(true)

        } else {
            setKppValidate(false)
        }
    }, [companyData])

    const handleSave = () => {
        setLoad(true)
        const data = {
            partnership_id: companyData.partyContract,
            name: companyData.name,
            inn: companyData.inn,
            kpp: companyData.kpp,
            ogrn: companyData.ogrn,
            gendir: companyData.director,
            gendir_position: companyData.jobTitle,
            gendir_rod: companyData.legalBasis,
            ur_adress: companyData.address,
            bill_email: companyData.email,
        }

        const validate = (companyData.inn.length == 10 || companyData.inn.length == 12) &&
            companyData.name.length > 0 && kppValidate &&
            (companyData.ogrn.length == 13 || companyData.ogrn.length == 15) &&
            companyData.director.length > 0 && companyData.jobTitle.length > 0 &&
            companyData.legalBasis.length > 0 && companyData.address.length > 0 &&
            (!companyData.billState || (companyData.billState && companyData.billSum.length > 0)) &&
            emailValidate(companyData.email)

            setFormValidate(validate)
            console.log('Валидация', validate, companyData.billSum.length == 0)

        validate && createCompany(data)
            .then(res => {
                setLoad(false)
                handleCancel()
                console.log(res)
            })
            .catch(err => console.log(err))

    }


    const handleReset = () => {
        dispatch(setKpp(''))
        dispatch(setName(''))
        dispatch(setOgrn(''))
        dispatch(setDirector(''))
        dispatch(setJobTitle(''))
        dispatch(setLegalBasis(''))
        dispatch(setAddress(''))
        setFormValidate(true)
    }

    const handleCancel = () => {
        setAnim(false)

        setTimeout(() => {
            setAddCustomer(false)
            dispatch(setInn(''))
            dispatch(setEmail(''))
            dispatch(setBillState(false))
            dispatch(setBillSum(''))
            dispatch(setPartyContract(''))
            handleReset()
        }, 300)
    }

    const handleChose = (data) => {
        console.log(data)
        dispatch(setKpp(data?.kpp ? data.kpp : ''))
        dispatch(setName(data?.name?.short_with_opf))
        dispatch(setOgrn(data?.ogrn))
        dispatch(setDirector(data?.management?.name ? data?.management?.name : ''))
        dispatch(setJobTitle(data?.management?.post ? data?.management?.post : ''))
        dispatch(setLegalBasis(''))
        dispatch(setAddress(`${data?.address?.data?.postal_code}, ${data?.address?.value}`))
        setOpenListInn(false)
    }

    const handleChangeBillState = () => {
        if (companyData.billState) {
            dispatch(setBillState(false))
            dispatch(setBillSum(''))
        } else {
            dispatch(setBillState(true))
        }
    }

    console.log(companyData)

    return (
        <div className={`${s.add} ${anim && s.add_open}`}>
            <div className={s.container}>
                <Header
                    title={TITLE}
                    buttonState={false}
                    forPro={false}
                    PromptText={PromptCustomer}
                />
                <div className={s.form}>
                    <InputInn
                        sub={SUB_INN}
                        disabled={false}
                        value={companyData.inn}
                        valueKpp={companyData.kpp}
                        setValue={(data) => dispatch(setInn(data))}
                        handleChose={handleChose}
                        openList={openListInn}
                        setOpenList={setOpenListInn}
                        handleReset={handleReset}
                        companies={companies}
                        errorEmpity={!formValidate}
                    />
                    <div className={s.block}>
                        <InputText
                            sub={SUB_NAME}
                            disabled={false}
                            value={companyData.name}
                            setValue={(data) => dispatch(setName(data))}
                            error={!formValidate}
                            errorText={ERR_FILLIN}
                        />
                    </div>

                    <div className={s.block}>
                        <InputNum
                            sub={SUB_KPP}
                            disabled={companyData.inn.length == 12}
                            value={companyData.kpp}
                            error={companyData.kpp.length !== 9 ? true : false}
                            errorEmpity={!formValidate && companyData.inn.length < 12}
                            errorText={ERR_KPP}
                            maxValue={9}
                            setValue={(data) => dispatch(setKpp(data))}
                        />
                        <InputNum
                            sub={companyData.inn.length == 12 ? SUB_OGRNIP : SUB_OGRN}
                            disabled={false}
                            value={companyData.ogrn}
                            error={companyData.ogrn.length !== 13 && companyData.ogrn.length !== 15 ? true : false}
                            errorEmpity={!formValidate}
                            errorText={ERR_ОГРN}
                            maxValue={15}
                            setValue={(data) => dispatch(setOgrn(data))}
                        />
                    </div>

                    <div className={s.block}>
                        <InputText
                            sub={SUB_DIRECTOR}
                            disabled={false}
                            value={companyData.director}
                            error={!formValidate}
                            errorText={ERR_FILLIN}
                            setValue={(data) => dispatch(setDirector(data))}
                        />
                    </div>

                    <div className={s.block}>
                        <InputText
                            sub={SUB_JOP_TITLE}
                            disabled={false}
                            value={companyData.jobTitle}
                            error={!formValidate}
                            errorText={ERR_FILLIN}
                            setValue={(data) => dispatch(setJobTitle(data))}
                        />
                    </div>

                    <div className={s.block}>
                        <InputText
                            sub={SUB_LEGAL}
                            disabled={false}
                            value={companyData.legalBasis}
                            error={!formValidate}
                            errorText={ERR_FILLIN}
                            setValue={(data) => dispatch(setLegalBasis(data))}
                        />
                    </div>

                    <div className={s.block}>
                        <InputText
                            sub={SUB_ADDRESS}
                            disabled={false}
                            value={companyData.address}
                            error={!formValidate}
                            errorText={ERR_FILLIN}
                            setValue={(data) => dispatch(setAddress(data))}
                        />
                    </div>

                    <div className={s.block}>
                        <InputEmail
                            sub={SUB_EMAIL}
                            disabled={false}
                            value={companyData.email}
                            error={!emailValidate(companyData.email)}
                            errorEmpity={!formValidate}
                            errorText={ERR_EMAIL}
                            setValue={(data) => dispatch(setEmail(data))}
                        />
                    </div>

                    <div>
                        <Switch
                            text={SUB_SWITCH}
                            switchState={companyData.billState}
                            handleSwitch={handleChangeBillState}
                            hidden={false}
                            forPro={false}
                        />
                        <div className={`${s.sum} ${companyData.billState && s.sum_open}`}>
                            <div style={{ paddingTop: '12px', width: '244px' }}>
                                <InputNum
                                    sub={SUB_SUM}
                                    disabled={false}
                                    value={companyData.billSum}
                                    maxValue={10}
                                    error={companyData.billSum.length == 0 ? true : false}
                                    errorEmpity={!formValidate}
                                    errorText={'Укажите сумму'}
                                    setValue={(data) => dispatch(setBillSum(data))}
                                />
                            </div>
                        </div>
                    </div>

                    <InputSelect
                        sub={SUB_PARTY}
                        list={partnerships}
                        value={companyData.partyContract}
                        setValue={(data) => dispatch(setPartyContract(data))}
                    />

                </div>



                <div className={s.buttons}>
                    <Button
                        handleClick={handleSave}
                        text={BUTTON_TEXT_SAVE}
                        Icon={IconDone}
                    />
                    <Button
                        handleClick={handleCancel}
                        text={BUTTON_TEXT_CANCLE}
                        type={'second'}
                        Icon={IconClose}
                    />
                </div>
            </div>

        </div>
    )
};

export default AddCustomer;