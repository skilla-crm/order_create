import classNames from 'classnames';
import s from './Tooltip.module.scss';

const Tooltip = ({ open, text, maxWidth, left, top }) => {

    return (
        <div
            style={{
                maxWidth: `${maxWidth}px`,
                left: `${left}px`,
                top: top ? `${top}px` : ''
            }}
            className={classNames(s.root, !left && s.root_center, open && s.root_open)}
        >
            <p>{text}</p>
        </div>
    )
};

export default Tooltip;