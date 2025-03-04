import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { ReactComponent as IconInfo } from '../../../images/icons/header/iconInfo.svg';
import { useRef, useState, useEffect } from 'react';
//components
import CompanyList from '../CompanyList/CompanyList';
//utils
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
import { handleSearchCompany } from '../../../utils/SearchCompany';

const InputPartner = ({ sub, value }) => {


    return (
        <div className={`${s.container}`}>
            <span className={s.sub}>{sub}</span>
            <div className={`${s.field} ${s.field_company}`}>
                <input disabled value={value || ''} type='text'></input>

            </div>


        </div>
    )
};

export default InputPartner;