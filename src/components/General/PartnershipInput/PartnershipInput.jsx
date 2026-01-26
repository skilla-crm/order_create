import s from '../../General/Input/Input.module.scss';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
//components
import LoaderButton from '../LoaderButton/LoaderButton';
import PartnershipsList from '../PartnershipsList/PartnershipsList';
//utils
import { handleSearchCompany } from '../../../utils/SearchCompany';

const PartnershipInput = ({ list, value, setValue, partnership, error, errorText, loadParametrs, sub }) => {
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [companyInfo, setCompanyInfo] = useState({});
    const [searchResult, setSearchResult] = useState(list || []);
    const [listScroll, setListScroll] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const listRef = useRef();



/*     useEffect(() => {
        const result = list?.find(el => el.id == value)
        setValueText(result?.name)
    }, [value]) */

    useEffect(() => {
        const result = list?.find(el => el.id == value)
        setValueText(result?.name ? result.name : partnership?.name)
    }, [value])


    useEffect(() => {
        const search = handleSearchCompany(valueText, list);
        valueText !== '' && setSearchResult(search)
        valueText == '' || !valueText && setSearchResult(list);
        valueText == '' && fieldFocus && setOpenList(true);
        if (search?.length == 0 && valueText?.length > 0) {
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
        setSearchResult(list)
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
                <input disabled={loadParametrs} onChange={handleChangeValue} value={valueText || ''} onFocus={handleFocus} onBlur={handleBlur} type='text'></input>
                <div onClick={handleOpenList} className={`${s.chewron} ${openList && s.chewron_open}`}>
                    <div className={classNames(s.loader, loadParametrs && s.loader_vis)}>
                        <LoaderButton color={'#002CFB'} />
                    </div>

                    <IconChewron />
                </div>

                <PartnershipsList
                    list={searchResult}
                    value={value}
                    setValue={setValue}
                    openList={openList}
                    listScroll={listScroll}
                    setOpenList={setOpenList}
                    setValueText={setValueText}
                    notFound={notFound}
                    valueText={valueText}
                />


            </div>

            <div className={`${s.error} ${error && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>



        </div>
    )
};

export default PartnershipInput;