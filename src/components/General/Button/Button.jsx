import s from './Button.module.scss';
//components
import LoaderButton from '../LoaderButton/LoaderButton';

const Button = ({ id, text, Icon, type, handleClick, width, load }) => {
    return (
        <button id={id} style={{width: width ? `${width}px`: ''}} onClick={handleClick} className={`${s.button} ${(type == 'second' || type == 'points') && s.button_second} ${type == 'points' && s.button_points}`}>
            {text && <p>{text}</p>}
            {Icon && !load && <Icon />}
          {load && <LoaderButton color={'#ffff'}/>}
        </button>
    )
};

export default Button;