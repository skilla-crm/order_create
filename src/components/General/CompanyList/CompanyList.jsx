import s from './CompanyList.module.scss';
import { ReactComponent as IconAdd } from '../../../images/icons/iconAdd.svg';

const CompanyList = ({ list, openList, setOpenList, value, setValue, listScroll, setValueText, notFound, valueText, setAddCustomer }) => {

    const handleChose = (data) => {
        setValueText(data.name)
        setValue(data)
        setOpenList(false)
    }

    const handleOpenAdd = () => {
        setAddCustomer(true)
        setOpenList(false)
    }

    return (
        <ul className={`${s.list} ${openList && s.list_open} ${listScroll && s.list_scroll}`}>
            {list?.map(el => {
                return <li onClick={() => handleChose(el)} key={el.id} id={el.id} className={`${el.id == value && s.item_active}`}>
                    <p>{el.name}</p>
                    <span>ИНН {el.inn} {el.kpp && `КПП ${el.kpp}`} {el.partnership_name}</span>
                </li>
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