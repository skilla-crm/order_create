import s from './InputText.module.scss';

const InputText = ({ text, setText, disabled, placeholder, width }) => {

    const handleText = (e) => {
        const value = e.currentTarget.value;
        setText(value)
    }

    return (
        <input
            style={{width: width ? `${width}px` : '100%'}}
            disabled={disabled}
            className={s.input}
            onChange={handleText}
            value={text || ''}
            placeholder={placeholder}
        ></input>

    )
};

export default InputText;