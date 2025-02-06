import s from './Switch.module.scss';
import { ReactComponent as BagePro } from '../../../images/icons/badgePro.svg';
import { ReactComponent as IconClose2 } from '../../../images/icons/iconClose2.svg';

const Switch = ({ text, switchState, handleSwitch, hidden, forPro }) => {
    return (
        <div onClick={handleSwitch} className={`${s.container} ${hidden && s.container_hidden}`}>
            <div className={`${s.switch} ${switchState && s.switch_on}`}>
                <div></div>
                {forPro && <IconClose2/>}
            </div>
            {text.length > 0 && <p>{text}</p>}
            {forPro && <BagePro />}
        </div>
    )
};

export default Switch; 