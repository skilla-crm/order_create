import s from './Metro.module.scss';

const Metro = ({ station }) => {
    return (
        <div className={s.container}>
            
            {station.map(el => {
                return <div className={s.station}>
                    <div style={{backgroundColor: `#${el.color}`}} className={s.point}></div>
                    <p>
                    {el.name}
                    <span> {el.distance} км</span>
                    </p>
                  
                </div>
            })}
        </div>
    )
};

export default Metro;