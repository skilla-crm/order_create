import s from './Field.module.scss';
import { useState } from 'react';
import { ReactComponent as IconInfo } from './assets/iconinfo.svg';
//components
import Tooltip from './Tooltip/Tooltip';


const Field = ({ text, info, children }) => {
    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(true)
    }

    const handleBlur = () => {
        setHover(false)
    }

    return (
        <div className={s.root}>
            <div className={s.block}>
                <p className={s.text}>{text}</p>
                {info && <div onMouseEnter={handleHover} onMouseLeave={handleBlur} className={s.info}>
                    <IconInfo />
                    <Tooltip open={hover} text={info} top={16} maxWidth={280}/>
                </div>}
            </div>

            {children}
        </div>
    )
};

export default Field;