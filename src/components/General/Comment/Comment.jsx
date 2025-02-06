import { useState } from 'react';
import s from './Comment.module.scss';

const Comment = ({ sub, rows, maxLength, value, setValue }) => {
    const [commentLength, setCommentLength] = useState(value.length || 0)
    const handleValue = (e) => {
        const value = e.currentTarget.value;
        setCommentLength(value.length)
        setValue(value)
    }
    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <textarea value={value || ''} onChange={handleValue} rows={rows} className={s.area} maxlength={maxLength}></textarea>
            <span className={s.count}>{commentLength} / {maxLength}</span>
        </div>
    )
};

export default Comment;