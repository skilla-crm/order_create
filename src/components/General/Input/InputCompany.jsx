import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { ReactComponent as IconInfo } from '../../../images/icons/header/iconInfo.svg';
import { useRef, useState, useEffect } from 'react';
//components
import CompanyList from '../CompanyList/CompanyList';
//utils
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
import { handleSearchCompany } from '../../../utils/SearchCompany';

const InputCompany = ({ sub, list, value, setValue, handleAdd, payType, error, errorText }) => {
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [companyInfo, setCompanyInfo] = useState({});
    const [searchResult, setSearchResult] = useState(list || []);
    const [listScroll, setListScroll] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const listRef = useRef();

    useEffect(() => {
        const result = list.find(el => el.id == value)
        setCompanyInfo(result)
        result && setValueText(result?.name)
    }, [value])

    useEffect(() => {
        payType !== 1 && setValueText('')
        payType !== 1 && setValue('')
    }, [payType])

    useEffect(() => {
        const search = handleSearchCompany(valueText, list);
        valueText !== '' && setSearchResult(search)
        valueText == '' && setSearchResult(list);
        valueText == '' && fieldFocus && setOpenList(true);
        if (search?.length == 0) {
            setNotFound(true)
        } else {
            setNotFound(false)
        }
    }, [valueText, list])

    const handleChangeValue = (e) => {
        const value = e.currentTarget.value;
        setValueText(value);
        setValue('')
    }


    const handleOpenList = () => {
        if (openList) {
            setOpenList(false)
        } else {
            setOpenList(true)
            setTimeout(() => {
                setListScroll(true)
            }, 100)
        }
    }

    const handleFocus = () => {
        setOpenList(true)
        setTimeout(() => {
            setListScroll(true)
        }, 100)
        setFieldFocus(true)
    }


    const handleBlur = () => {
        setFieldFocus(false)

    }

    const handleClose = () => {
        setOpenList(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.container}`}>
            <span className={s.sub}>{sub}</span>
            <div ref={listRef} className={`${s.field} ${s.field_company} ${fieldFocus && s.field_focus}`}>
                <input onChange={handleChangeValue} value={valueText || ''} onFocus={handleFocus} onBlur={handleBlur} type='text'></input>
                <div onClick={handleOpenList} className={`${s.chewron} ${openList && s.chewron_open}`}>
                    <IconChewron />
                </div>

                <CompanyList
                    list={searchResult}
                    value={value}
                    setValue={setValue}
                    openList={openList}
                    listScroll={listScroll}
                    setOpenList={setOpenList}
                    setValueText={setValueText}
                    notFound={notFound}
                    valueText={valueText}
                    handleAdd={handleAdd}
                />
            </div>

            <div className={`${s.error} ${error && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>

            <div className={`${s.bill} ${(companyInfo?.billState || companyInfo?.contractState) && s.bill_vis}`}>
                <IconInfo />
                <p>
                    {companyInfo?.billState && `Будет отправлен договор и счет на сумму ${addSpaceNumber(companyInfo?.billSum)} руб. Почта: ${companyInfo?.email}`}
                    {companyInfo?.contractState && `Будет отправлен договор на почту ${companyInfo?.email}`}
                </p>
            </div>

        </div>
    )
};

export default InputCompany;