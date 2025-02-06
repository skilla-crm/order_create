import s from './Button.module.scss';

const Button = ({ text, Icon, type, handleClick }) => {
    return (
        <button onClick={handleClick} className={`${s.button} ${(type == 'second' || type == 'points') && s.button_second} ${type == 'points' && s.button_points}`}>
            {text && <p>{text}</p>}
            {Icon && <Icon />}
        </button>
    )
};

export default Button;