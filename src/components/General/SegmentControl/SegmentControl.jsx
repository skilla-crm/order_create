import s from './SegmentControl.module.scss';

const SegmentControl = ({ segments, active, setActive, disabled }) => {

    const handleSelect = (e) => {
        const id = Number(e.currentTarget.id);
        setActive(id)
    }
    return (
        <div className={`${s.segments} ${disabled && s.segments_disabled}`}>
            {segments.map(el => {
                return (
                    <button className={`${s.segment} ${active == el.id && s.segment_active}`} key={el.id} id={el.id} onClick={handleSelect}>{el.text}</button>
                )
            })}
        </div>
    )
};

export default SegmentControl;