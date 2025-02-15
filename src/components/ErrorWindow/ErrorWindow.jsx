import s from './ErrorWindow.module.scss';
import { ReactComponent as IconAlert } from '../../images/icons/iconAlert.svg';
import { useSelector } from 'react-redux';
//selector
import { selectorValidation } from '../../store/reducer/Validation/selector';


const ErrorWindow = () => {
    const { companyError,
            phoneError,
            phoneErrorFormat,
            nameError,
            timeError,
            adressError,
            rateError,
            rateWorkerError,
            partnerError,
            emailError,
            emailErrorFormat,
            isBlackError,
            isDebtError } = useSelector(selectorValidation)

            console.log(isDebtError, isBlackError)

            const empity = companyError || 
            phoneError ||  
            phoneErrorFormat ||  
            nameError ||  
            timeError ||  
            adressError ||
            rateError ||
            rateWorkerError ||
            emailError ||
            emailErrorFormat
    return (
        <div className={`${s.window} ${(empity || isDebtError || isBlackError) && s.window_vis}`}>
            <div className={s.container}>
                <div className={s.header}>
                    <IconAlert />
                    <p>Есть ошибки</p>
                </div>

                <ul className={s.list}>
                    <li className={`${s.item} ${empity && s.item_vis}`}><div></div>Заполните все поля</li>
                    <li className={`${s.item} ${isDebtError && s.item_vis}`}><div></div>Превышен лимит по задолженности</li>
                    <li className={`${s.item} ${isBlackError && s.item_vis}`}><div></div>Заказчик в черном списке</li>
                </ul>

            </div>
        </div>
    )
};

export default ErrorWindow;