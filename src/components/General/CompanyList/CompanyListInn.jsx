import s from './CompanyList.module.scss';

const CompanyListInn = ({list, openList, listScroll, noFind, handleChose, setOpenList}) => {
    return (
        <ul className={`${s.list} ${openList && s.list_open} ${listScroll && s.list_scroll}`}>
         {list.map(el => {
            return <li onClick={() => {handleChose(el.data)}} key={el.data.hid}>
                 <p>{el.value}</p>
                 <span>ИНН {el.data.inn} {el.data.kpp && 'КПП'} {el.data.kpp}</span>
             </li>
         })}
          {noFind && <li>Не найденно в реестре компаний</li>}
        </ul>
    )
}

export default CompanyListInn;