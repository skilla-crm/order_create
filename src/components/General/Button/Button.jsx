import s from './Button.module.scss';
//components
import LoaderButton from '../LoaderButton/LoaderButton';

const Button = ({ id, text, Icon, type, handleClick, width, load, disabled }) => {
    return (
        <button disabled={disabled} id={id} style={{ width: width ? `${width}px` : '' }} onClick={handleClick} className={`${s.button} ${(type == 'second' || type == 'points') && s.button_second} ${type == 'points' && s.button_points}`}>
            {text && <p>{text}</p>}
            {Icon && !load && <div className={s.icon}>
                <Icon />
            </div>}
            {load && type !== 'second' &&
                <div className={s.icon}>
                    <LoaderButton color={type == 'second' ? '#002CFB' : '#ffff'} />
                </div>}

                {type == 'second' &&
                <div className={`${s.icon} ${!load && s.icon_hidden}`}>
                    <LoaderButton color={type == 'second' ? '#002CFB' : '#ffff'} />
                </div>}
        </button>
    )
};

export default Button;