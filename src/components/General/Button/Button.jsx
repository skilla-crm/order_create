import s from './Button.module.scss';

const Button = ({ text, Icon, type, handleClick, width }) => {
    return (
        <button style={{width: width ? `${width}px`: ''}} onClick={handleClick} className={`${s.button} ${(type == 'second' || type == 'points') && s.button_second} ${type == 'points' && s.button_points}`}>
            {text && <p>{text}</p>}
            {Icon && <Icon />}
        </button>
    )
};

export default Button;