import s from './CompanyList.module.scss';

const CompanyList= ({list, openList, value, listScroll}) => {
   
    return (
        <ul className={`${s.list} ${openList && s.list_open} ${listScroll && s.list_scroll}`}>
         {list?.map(el => {
            return <li key={el.id} id={el.id} className={`${el.id == value && s.item_active}`}>
                 <p>{el.name}</p>
                 <span>ИНН {el.inn} {el.kpp && `КПП ${el.kpp}`} {el.partnership_name}</span>
             </li>

            
        
         })}
        </ul>
    )
}

export default CompanyList;