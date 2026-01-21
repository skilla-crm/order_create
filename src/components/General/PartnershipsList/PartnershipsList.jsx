import s from './PartnershipsList.module.scss';
//slice
import { setContract } from '../../../store/reducer/Customer/slice';
import { setCustomer } from '../../../store/reducer/Customer/slice';
import { useDispatch } from 'react-redux';

const PartnershipsList = ({ list, openList, setOpenList, value, setValue, listScroll, setValueText, notFound, valueText }) => {
    const dispatch = useDispatch()

    const handleChose = (data) => {
        setValueText(data.name)
        setValue(data)
        setOpenList(false)
        dispatch(setContract(data?.contracts?.[0]))
        dispatch(setCustomer({}))
    }



    return (
        <ul className={`${s.list} ${openList && s.list_open} ${listScroll && s.list_scroll}`}>
            {list?.map(el => {
                return <Item el={el} value={value} handleChose={handleChose} />
            })}
            {notFound && <li className={s.nofound}>
                <p>Не найдено по запросу "{valueText}"</p>
            </li>
            }
        </ul>
    )
}

export default PartnershipsList;

const Item = ({ el, value, handleChose}) => {

    return (
        <li ref={null} onClick={() => handleChose(el)} key={el.id} id={el.id} className={`${el.id == value && s.item_active}`}>
            <div className={s.company}>
                <p>{el?.name} <span>{el.city && `${el.city}`}</span></p> 
            </div>

            <span>ИНН {el.inn} {el.kpp && `КПП ${el.kpp}`} </span>
        </li>
    )
}