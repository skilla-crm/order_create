import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import s from "./SegmentButtons.module.scss";

const SegmentButtons = ({
    segments,
    value,
    callback,
    defaultIndex = 0,
    controlRef,
    style
}) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const componentReady = useRef();

    useEffect(() => {
        componentReady.current = true;
    }, []);

    useEffect(() => {
        const result = segments.findIndex(el => el.value === value)
        setActiveIndex(result)
    }, [value])

    useEffect(() => {
        const activeSegmentRef = segments[activeIndex].ref;
        const { offsetWidth, offsetLeft } = activeSegmentRef.current;
        const { style } = controlRef.current;

        style.setProperty("--highlight-width", `${offsetWidth}px`);
        style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
    }, [activeIndex, callback, controlRef, segments]);

    const onInputChange = (value, index) => {
        setActiveIndex(index);
        callback(value, index);
    };

    return (
        <div className={s.container} ref={controlRef}>
            <div className={classNames(s.controls, style === 2 && s.controls_2, componentReady.current ? s.controls_ready : s.controls_idle)}>
                {segments?.map((item, i) => (
                    <div
                        key={item.value}
                        className={classNames(s.segment, style === 2 && s.segment_2, i === activeIndex && style === 2 ? s.segment_active_2 : i === activeIndex ? s.segment_active : s.segment_inactive)}
                        ref={item.ref}
                    >
                        <input
                            type="radio"
                            value={item.value}
                            id={item.label}

                            onChange={() => onInputChange(item.value, i)}
                            checked={i === activeIndex}
                        />
                        <label htmlFor={item.label}>{item.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SegmentButtons;
