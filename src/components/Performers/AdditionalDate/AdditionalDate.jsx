import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './AdditionalDate.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
import { ReactComponent as IconBuilder } from '../../../images/icons/IconBuilder.svg';
import { ReactComponent as IconClose } from '../../../images/icons/iconClose.svg';
//components
import InputData from '../../General/Input/InputData';
import InputTime from '../../General/Input/InputTime';
import InputNumList from '../../General/Input/InputNumList';
//slice
import { deleteAdditionalDates, editAdditionalDates } from '../../../store/reducer/AdditionalDates/slice';


const AdditionalDate = ({ id, performers, date, time, disabledDates, setProType, setHiddenAddDates }) => {
    const [anim, setAnim] = useState(true)
    const [performersNum, setPerformersNum] = useState(performers);
    const [dateEdit, setDateEdit] = useState(date);
    const [timeEdit, setTimeEdit] = useState(time);
    const [firstLoad, setFirstLoad] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setFirstLoad(false)
        }, 150)
    }, [])


    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    useEffect(() => {
        !firstLoad && setProType(1)
    }, [dateEdit])

    const handleDelete = (e) => {
        const id = e.currentTarget.id;
        disabledDates.length > 2 && setAnim(false)
        disabledDates.length <= 2 && setHiddenAddDates(true)

        setTimeout(() => {
            dispatch(deleteAdditionalDates(id))
            setProType(1)
        }, 200)
    }

    useEffect(() => {
        !firstLoad && dispatch(editAdditionalDates({
            id,
            date: new Date(dateEdit),
            time: timeEdit,
            performers: performersNum
        }))
    }, [dateEdit, timeEdit, performersNum])

    return (
        <div className={`${s.container} ${anim && s.container_anim}`}>
            <InputData nosub={true} date={dayjs(dateEdit).locale('ru')} setDate={setDateEdit} disabledDates={disabledDates} />
            <InputTime nosub={true} time={timeEdit} setTime={setTimeEdit} />
            <InputNumList nosub={true} inputWidth={64} Icon={IconBuilder} max={100} value={performersNum} setValue={setPerformersNum} />
            <div id={id} onClick={handleDelete} className={s.delete}><IconClose /></div>
        </div>
    )
};

export default AdditionalDate;