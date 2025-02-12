import s from './Details.module.scss';
import { useContext, useState } from 'react';
import { UserContext, ParametrsContext } from '../../contexts/UserContext';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorAddress } from '../../store/reducer/Address/selector';
import { selectorDetails } from '../../store/reducer/Details/selector';
//slice
import { setAddress, setMetro } from '../../store/reducer/Address/slice';
import {
    setService,
    addRequirements,
    deleteRequirements,
    setCommentSupervisor,
    setNotes,
    setMinDurqtion,
    setDuration
} from '../../store/reducer/Details/slice';
//constants
import {
    TITLE, BUTTON_TEXT,
    SUB_TYPE, SUB_COMMENT,
    SUB_DESCRIPTION, SUB_MINDURATION,
    SUB_DURATION, SUB_REQUIREMENTS,
    SUB_ADDRESS
} from '../../constants/details';
import { PromptDetails } from '../../constants/prompts';
//components
import Header from '../General/Header/Header';
import InputSelectSearch from '../General/Input/InputSelectSearch';
import Comment from '../General/Comment/Comment';
import TabsNumbers from '../General/Tabs/TabsNumbers';
import Tags from '../General/Tags/Tags';
import Address from '../General/Address/Address';

const tagList = ['Паспорт', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Паспорт', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Паспорт', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Пропуск', 'Мед. книжка', 'Пед. книжка',]

const Details = () => {
    const user = useContext(UserContext);
    const { types, requirements } = useContext(ParametrsContext)
    const { address, metro } = useSelector(selectorAddress);
    const { service, tags, commentSupervisor, notes, minDuration, duration } = useSelector(selectorDetails);
    const dispatch = useDispatch();
    console.log(service)
    const handleAdd = () => {
    }


    return (
        <div className={s.details}>
            <Header
                title={TITLE}
                buttonState={true}
                buttonText={BUTTON_TEXT}
                handleButton={handleAdd}
                forPro={!user.pro}
                PromptText={PromptDetails}
            />

            <InputSelectSearch
                sub={SUB_TYPE}
                value={service}
                setValue={(data) => dispatch(setService(data))}
                list={types}
            />
            <Comment
                sub={SUB_COMMENT}
                maxLength={1000}
                rows={4}
                value={notes}
                setValue={(data) => dispatch(setNotes(data))}
            />
            <Comment
                sub={SUB_DESCRIPTION}
                maxLength={200}
                rows={2}
                value={commentSupervisor}
                setValue={(data) => dispatch(setCommentSupervisor(data))}
            />

            <Tags
                sub={SUB_REQUIREMENTS}
                value={tags}
                maxVis={3}
                tagList={requirements}
                setValue={(data) => dispatch(addRequirements(data))}
                deleteValue={(data) => dispatch(deleteRequirements(data))}
            />

            <TabsNumbers
                value={minDuration}
                setValue={(data) => dispatch(setMinDurqtion(Number(data)))}
                sub={SUB_MINDURATION}
                max={23}
                maxVis={6}
                forPro={false}
            />

            <TabsNumbers
                value={duration}
                setValue={(data) => dispatch(setDuration(Number(data)))}
                sub={SUB_DURATION}
                max={24}
                maxVis={8}
                forPro={false}
            />


            <Address
                address={address}
                metro={metro}
                sub={SUB_ADDRESS}
                user={user}
                defaultCity={'Санкт-петербург'}
                setAddress={(data) => dispatch(setAddress(data))}
                setMetro={(data) => dispatch(setMetro(data))}
            />

        </div>
    )
};

export default Details;