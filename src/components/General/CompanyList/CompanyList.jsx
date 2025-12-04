import s from './CompanyList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconAdd } from '../../../images/icons/iconAdd.svg';
//slice
import { setContract } from '../../../store/reducer/Customer/slice';
import { useDispatch } from 'react-redux';

const CompanyList = ({ list, openList, setOpenList, value, setValue, listScroll, setValueText, notFound, valueText, handleAdd }) => {
    const activeRef = useRef();
    const dispatch = useDispatch()


    /* useEffect(() => {
        value !== '' && handleScroll()
    }, [openList]) */

    const handleChose = (data) => {
        setValueText(data.name)
        setValue(data)
        setOpenList(false)
        dispatch(setContract(data?.contracts?.[0]))
    }

    const handleOpenAdd = () => {
        handleAdd()
        setOpenList(false)
    }

    /* const handleScroll = () => {
        activeRef.current?.scrollIntoView({ block: 'center', inline: 'nearest'});
    } */

    return (
        <ul className={`${s.list} ${openList && s.list_open} ${listScroll && s.list_scroll}`}>
            {list?.map(el => {
                return <Item el={el} value={value} handleChose={handleChose} />
            })}
            {notFound && <li className={s.nofound}>
                <p>Не найдено по запросу "{valueText}"</p>
                <button onClick={handleOpenAdd}><IconAdd /> Добавить нового заказчика</button>
            </li>
            }
        </ul>
    )
}

export default CompanyList;

const Item = ({ el, value, handleChose}) => {
    const [partnerships, setPartnerships] = useState([]);

    useEffect(() => {
        console.log(el.contracts)
        const unique = el.contracts.reduce((acc, cur) => {
            if (acc.findIndex(el => el?.partnership_id === cur?.partnership_id) === -1) {
                acc.push(cur);
            }
            return acc;
        }, []);
        setPartnerships(unique)
    }, [el])

    return (
        <li ref={null} onClick={() => handleChose(el)} key={el.id} id={el.id} className={`${el.id == value && s.item_active}`}>
            <div className={s.company}>
                <p>{el?.name}</p>
                {el?.label?.replaceAll(' ', '') !== '' && <span className={s.label}><p>{el.label}</p></span>}
            </div>

            <span>ИНН {el.inn} {el.kpp && `КПП ${el.kpp}`} {partnerships.length === 0 ? el.partnership_name : `${partnerships[0]?.partnership_name} ${partnerships.length > 1 ? `+${partnerships.length - 1}` : ''}`}{/* {el.} */}</span>
        </li>
    )
}