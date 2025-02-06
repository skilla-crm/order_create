import s from './Details.module.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorAddress } from '../../store/reducer/Address/selector';
//slice
import { setAddress } from '../../store/reducer/Address/slice';
//constants
import { TITLE, BUTTON_TEXT, SUB_TYPE, SUB_COMMENT, SUB_DESCRIPTION, SUB_MINDURATION, SUB_DURATION, SUB_REQUIREMENTS, SUB_ADDRESS } from '../../constants/details';
import { PromptDetails } from '../../constants/prompts';
//components
import Header from '../General/Header/Header';
import InputSelect from '../General/Input/InputSelect';
import Comment from '../General/Comment/Comment';
import TabsNumbers from '../General/Tabs/TabsNumbers';
import Tags from '../General/Tags/Tags';
import Address from '../General/Address/Address';
import Switch from '../General/Switch/Switch';


const tagList = ['Паспорт', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Паспорт', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Паспорт', 'Пропуск', 'Мед. книжка', 'Пед. книжка', 'Пропуск', 'Мед. книжка', 'Пед. книжка',]

const Details = () => {
    const user = useContext(UserContext);
    const { address } = useSelector(selectorAddress);
    const dispatch = useDispatch();
    const [service, setService] = useState({});
    const [commentSupervisor, setCommentSupervisor] = useState('');
    const [descriptionOrder, setDescriptionOrder] = useState('');
  

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

            <InputSelect
                sub={SUB_TYPE}
                value={service}
                setValue={setService}
            />
            <Comment
                sub={SUB_COMMENT}
                maxLength={1000}
                rows={4}
                value={commentSupervisor}
                setValue={setCommentSupervisor}
            />
            <Comment
                sub={SUB_DESCRIPTION}
                maxLength={200}
                rows={2}
                value={descriptionOrder}
                setValue={setDescriptionOrder}
            />

            <Tags
                sub={SUB_REQUIREMENTS}
                value={1}
                maxVis={3}
                tagList={tagList}
            /* setValue={(data) => dispatch(setPerformersNum(data))} */
            />

            <TabsNumbers
                value={1}
                /* setValue={(data) => dispatch(setPerformersNum(data))} */
                sub={SUB_MINDURATION}
                max={23}
                maxVis={6}
                forPro={false}
            />

            <TabsNumbers
                value={1}
                /*   setValue={(data) => dispatch(setPerformersNum(data))} */
                sub={SUB_DURATION}
                max={24}
                maxVis={8}
                forPro={false}
            />

            
                <Address
                    setAddress={(data) => dispatch(setAddress(data))}
                    address={address}
                    sub={SUB_ADDRESS}
                    user={user}
                />
               
        </div>
    )
};

export default Details;