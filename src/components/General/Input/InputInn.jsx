import s from './Input.module.scss';
import { useEffect, useState, useRef } from 'react';
import { ReactComponent as IconWarning } from '../../../images/icons/iconWarning.svg';
//Api
import { getCompanyInfo } from '../../../Api/ApiDadata';
//components
import CompanyListInn from '../CompanyList/CompanyListInn';
//utils 
import { handleNumbers } from '../../../utils/HandleNumbers';

const InputInn = ({ sub, disabled, value, setValue, valueKpp, handleChose, openList, setOpenList, handleReset, companies, errorEmpity }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [fieldWide, setFieldWide] = useState(false)
    const [noFind, setNoFind] = useState(false)
    const [noFindKpp, setNoFindKpp] = useState(false)
    const [addKppValue, setAddKppValue] = useState('');
    const [existCompany, setExistCompany] = useState(false);
    const [lengthError, setLengthError] = useState(false);
    const [errorStateEmpity, setErrorStateEmpity] = useState(false);
    const inputKppRef = useRef();
    const inputInnRef = useRef();
    const fieldRef = useRef();

    useEffect(() => {
        errorEmpity && value == '' ? setErrorStateEmpity(true) : setErrorStateEmpity(false)
    }, [errorEmpity, value])

    useEffect(() => {
        setAddKppValue(valueKpp)
    }, [valueKpp])

    useEffect(() => {
        if ((value.length >= 10 && fieldFocus) || (suggestions.length > 0 && openList)) {
            setFieldWide(true)
        } else {
            setFieldWide(false)
        }
    }, [value, suggestions, fieldFocus, openList])

    useEffect(() => {
        const valueValid = (value.length == 10 || value.length == 12)

        if (!fieldFocus && !valueValid && value !== '') {
            setLengthError(true)
        } else {
            setLengthError(false)
        }

    }, [fieldFocus, value])

    useEffect(() => {
        (value.length == 10 || value.length == 12)
            ?
            getCompanyInfo(value)
                .then(res => {
                    const data = res.data.suggestions;
                    setSuggestions(data)
                    data.length == 0 && setNoFind(true)
                })
                .catch(err => console.log(err))
            :
            setSuggestions([])

    }, [value, inputKppRef])


    useEffect(() => {
        suggestions.length > 1 && addKppValue.length == 9 && getCompanyInfo(value, addKppValue)
            .then(res => {
                const data = res.data.suggestions;
                setSuggestions(data)
                data.length == 0 && setNoFindKpp(true)
            })
            .catch(err => console.log(err))
    }, [addKppValue, suggestions])

    useEffect(() => {
        if (addKppValue?.length < 9 && noFindKpp) {
            getCompanyInfo(value)
                .then(res => {
                    const data = res.data.suggestions;
                    setSuggestions(data)
                })
                .catch(err => console.log(err))
            return
        }
    }, [addKppValue, noFindKpp])

    useEffect(() => {
        const result = companies.find(el => el.inn + el.kpp == value + valueKpp)
        result ? setExistCompany(true) : setExistCompany(false)
    }, [companies, value, valueKpp])

    const handleValue = (e) => {
        setAddKppValue('')
        setNoFindKpp(false)
        setExistCompany(false)
        const numValue = handleNumbers(e.currentTarget.value);
        numValue == '' && setSuggestions([])
        numValue.length <= 12 && setValue(numValue);
        (numValue.length < 10 || numValue.length == 11) && setNoFind(false)
        setOpenList(true)
        numValue.length == 0 && handleReset()
    }

    const handleValueKpp = (e) => {
        const numValue = handleNumbers(e.currentTarget.value)
        numValue.length <= 9 && setAddKppValue(numValue);
        numValue.length < 8 && setNoFindKpp(false);
    }

    const handleFocus = () => {
        setFieldFocus(true)
        setOpenList(true)
    }


    const handleBlur = () => {
        setFieldFocus(false)
        addKppValue.length < 9 && setAddKppValue('')
        addKppValue.length < 9 && addKppValue.length > 0 && setSuggestions([])
        noFind && handleReset()

    }

    const closelist = (e) => {
        e.stopPropagation()
        if (fieldRef.current && !fieldRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closelist);
        return () => document.removeEventListener('mousedown', closelist);
    }, []);

    return (
        <div className={`${s.container}`}>
            <span className={`${s.sub} ${lengthError && s.sub_err}`}>{sub}</span>
            <div ref={fieldRef} className={`${s.field} ${lengthError && s.field_error} ${fieldFocus && s.field_focus} ${s.inn} ${fieldWide && s.inn_wide}`}>
                <input ref={inputInnRef} onFocus={handleFocus} onBlur={handleBlur} onChange={handleValue} value={value || ''} disabled={disabled} type='text'></input>
                <div className={`${s.kpp} ${((suggestions.length > 1) || noFindKpp) && fieldFocus && s.kpp_vis}`}>
                    <span className={s.sub}>Уточнить КПП:</span>
                    <input ref={inputKppRef} onFocus={handleFocus} onBlur={handleBlur} onChange={handleValueKpp} value={addKppValue || ''} disabled={disabled} type='text'></input>
                </div>

                {fieldWide && <CompanyListInn
                    list={suggestions}
                    openList={openList}
                    listScroll={suggestions.length > 5}
                    noFind={(noFind || noFindKpp) && suggestions.length == 0}
                    handleChose={handleChose}
                    setOpenList={setOpenList}
                />
                }
            </div>

            <div className={`${s.nofound} ${(noFind || noFindKpp) && !openList && s.nofound_vis}`}>
                <IconWarning />
                <p>
                    {noFindKpp ? 'КПП' : 'ИНН'} не найден. Проверь правильность или заполни форму вручную
                </p>
            </div>

            <div className={`${s.nofound} ${existCompany && !openList && s.nofound_vis}`}>
                <IconWarning />
                <p>
                    Данный заказчик уже есть в базе
                </p>
            </div>

            <div className={`${s.error} ${(lengthError || errorStateEmpity) && s.error_vis}`}>
                <p>
                    {'Должен состоять из 10 или 12 цифр'}
                </p>
            </div>

        </div>
    )
};

export default InputInn;