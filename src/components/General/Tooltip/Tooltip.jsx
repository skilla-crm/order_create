import s from './Tooltip.module.scss';

const Tooltip = ({ text, comment, comment2, type }) => {
    return (
        <div className={`${s.container} ${type == 2 && s.container_2}`}>
            {text && type !== 2 && <p>{text}</p>}
            {type !== 2 && <span>Причина: {comment}</span>}
            {type == 2 && <span style={{textWrap: 'nowrap'}}>{comment}<br/>{comment2}</span>}
        </div>
    )
};

export default Tooltip;