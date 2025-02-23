import s from './Tooltip.module.scss';

const Tooltip = ({text, comment}) => {
    return (
       <div className={s.container}>
        {text && <p>{text}</p>}
        <span>Причина: {comment}</span>
       </div>
    )
};

export default Tooltip;