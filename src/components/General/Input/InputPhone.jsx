import s from './Input.module.scss';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';

const InputPhone = ({ sub, disabled }) => {
    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <div className={`${s.phone} ${disabled && s.disabled}`}>
                <InputMask disabled={disabled} mask="+7 (999) 999-99-99" onChange={(e) => console.log(e.currentTarget.value)} placeholder='+7 (___) ___-__-__'/>
            </div>
        </div>
    )
};

export default InputPhone;