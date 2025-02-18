import s from './Loader.module.scss';

const Loader = ({load}) => {
    return (
        <div className={`${s.window} ${load && s.window_anim}`}>

        </div>
    )
};

export default Loader;