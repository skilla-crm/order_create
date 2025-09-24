import s from './RatePercent.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconPoints } from '../../images/icons/iconPoints16-16-blue.svg';
//selector
import { selectorRates } from '../../store/reducer/Rates/selector';
//slice
import { setRate } from '../../store/reducer/Rates/slice';
//constants
import { ratersChangeList } from "../../constants/rates";

const RatePercent = ({ activeRatio, setActiveRatio, payType }) => {
    const { rate } = useSelector(selectorRates);
    const [ratioList, setRatioList] = useState(false);
    const buttonRef = useRef();
    const listRef = useRef();
    const dispatch = useDispatch();

    const handleOpenRatioList = () => {
        ratioList ? setRatioList(false) : setRatioList(true)
    }


    const handleChoseRatio = (e) => {
        const id = Number(e.currentTarget.id);
        activeRatio == id ? setActiveRatio(0) : setActiveRatio(id)

        if (id > 0) {
            const result = (Number(rate) * 100) / (100 + id)
            const result2 = Number(rate) + (Number(rate) * id / 100)
            const result3 = ((Number(rate) * 100) / (100 + activeRatio)) * (1 + id / 100)
            const result4 = (Number(rate) * (100 - activeRatio)) / 100 + (((Number(rate) * (100 - activeRatio)) / 100) * id / 100)
            activeRatio == id && dispatch(setRate(Number(result).toFixed(2)))
            activeRatio == 0 && dispatch(setRate(Number(result2.toFixed(2))))
            activeRatio !== 0 && activeRatio !== id && activeRatio > 0 && dispatch(setRate(Number(result3).toFixed(2)))
            activeRatio !== 0 && activeRatio !== id && activeRatio < 0 && dispatch(setRate(Number(result4).toFixed(2)))
            setRatioList(false)
            return
        }

        if (id < 0) {
            const result = (Number(rate) * (100 - activeRatio)) / 100
            const result2 = (Number(rate) * 100) / (100 - id)
            const result3 = (result * 100) / (100 - id)
            const result4 = ((Number(rate) * 100) / (100 + activeRatio)) * 100 / (100 - id)
            activeRatio == id && dispatch(setRate(Number(result).toFixed(2)))
            activeRatio == 0 && dispatch(setRate(Number(result2).toFixed(2)))
            activeRatio !== 0 && activeRatio !== id && activeRatio < 0 && dispatch(setRate(Number(result3).toFixed(2)))
            activeRatio !== 0 && activeRatio !== id && activeRatio > 0 && dispatch(setRate(Number(result4).toFixed(2)))
            setRatioList(false)
            return
        }


    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)
            && buttonRef.current && !buttonRef.current.contains(e.target)) {
            setRatioList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);


    return (

        <div className={s.root}>
            <button disabled={(rate == '' || payType !== 1)} ref={buttonRef} onClick={handleOpenRatioList} className={s.point}>
                <IconPoints />
            </button>

            <ul ref={listRef} className={`${s.list} ${ratioList && s.list_open}`}>
                {ratersChangeList.map(el => {
                    return (
                        <li
                            key={el.id}
                            id={el.id}
                            className={`${s.item} ${el.id == activeRatio && s.item_active}`}
                            onClick={handleChoseRatio}>
                            {el.name}
                        </li>
                    )
                })}
            </ul>
        </div>

    )
};

export default RatePercent;