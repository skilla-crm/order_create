import s from './Input.module.scss';
import { ReactComponent as IconChewron } from '../../../images/icons/iconChewron.svg';
import { ReactComponent as IconChewron2 } from '../../../images/icons/iconChewron2.svg';
import avatardef from '../../../images/avatarDef.png';
import { useRef, useState, useEffect } from 'react';

const InputSelectPartner = ({ sub, list, value, setValue, type, position, defaultRow, setPartnerRates, payType }) => {
    const [openList, setOpenList] = useState(false);
    const [name, setName] = useState('');
    const listRef = useRef();

    useEffect(() => {
        if (value !== null && value !== 0) {
            const result = list?.find(el => el.to_id == value)
            setName(result?.name)
            console.log(result)
            const rateNal = [{ id: 1, text: result?.nal_price }, { id: 2, text: result?.nal_price2 }, { id: 3, text: result?.nal_price3 }].filter(el => el.text !== 0)
            const rateBezal = [{ id: 1, text: result?.beznal_price }, { id: 2, text: result?.beznal_price2 }, { id: 3, text: result?.beznal_price3 }].filter(el => el.text !== 0)
            payType == 1 ? setPartnerRates(rateBezal) : setPartnerRates(rateNal)
            return
        }
        if (value == null) {
            setPartnerRates([])
            return
        }


    }, [list, value])


    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleValue = (e) => {
        const id = e.currentTarget.id;
        setValue(id)
    }

    const handleClose = () => {
        setOpenList(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);


    return (
        <div className={`${s.container} ${s.container_select} ${type == 2 && s.container_select2}`}>
            {sub && <span className={s.sub}>{sub}</span>}
            <div onClick={handleOpenList} ref={listRef} className={`${s.field} ${s.field_select}`}>
                <p>{name}</p>

                <div className={`${s.chewron} ${openList && s.chewron_open}`}>
                    <IconChewron />
                </div>

                <ul className={`${s.list} ${s.list_scroll} ${position == 'top' && s.list_top} ${openList && s.list_open}`}>
                    {defaultRow && <li onClick={handleValue} id={defaultRow.id} className={`${s.item} ${(value == 0 || value == null) && s.item_active}`}>{defaultRow.name}</li>}

                    {list?.map(el => {
                        return <li onClick={handleValue} key={el.id} id={el.to_id} className={`${s.item} ${el.id == value && s.item_active}`}>
                            <p>{el.name} {/* {el.position == 'director' && <span>Руководитель</span>} */}</p>
                        </li>
                    })}
                </ul>
            </div>

        </div>
    )
};

export default InputSelectPartner; 