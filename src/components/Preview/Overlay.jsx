import s from './Preview.module.scss';

const Overlay = ({active}) => {
    return (
        <div className={`${s.overlay} ${active && s.overlay_vis}`}></div>
    )
};

export default Overlay;