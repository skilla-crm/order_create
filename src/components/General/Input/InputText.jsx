import s from './Input.module.scss';

const InputText = ({sub, disabled}) => {
    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <input disabled={disabled} className={s.input} type='text'></input>

        </div>
    )
};

export default InputText;