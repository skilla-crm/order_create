import s from './ButtonAdd.module.scss';
import { useNavigate } from 'react-router-dom';
//icons
import { ReactComponent as IconAdd } from '../../../images/icons/iconAdd.svg';
import classNames from 'classnames';

const ButtonAdd = ({ vis, counterpartyId }) => {
    const navigate = useNavigate();

    const handleOpenAdd = () => {
        window.open(`https://lk.skilla.ru/new/counterparties/details/contract/create?counterparty_id=${counterpartyId}&order=1`, '_blank')
    }

    return (
        <div className={classNames(s.root, vis && s.root_vis)}>
            <button onClick={handleOpenAdd}><IconAdd />Создать договор с заказчиком</button>
        </div>
    )
};

export default ButtonAdd;