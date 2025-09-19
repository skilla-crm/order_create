import s from './Details.module.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext, ParametrsContext } from '../../contexts/UserContext';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorDetails } from '../../store/reducer/Details/selector';
import { selectorValidation } from '../../store/reducer/Validation/selector';
import { selectorCustomer } from '../../store/reducer/Customer/selector';
//slice
import {
    setService,
    addRequirements,
    deleteRequirements,
    setCommentSupervisor,
    setNotes,
    setPayNotes,
    setMinDurqtion,
    setDuration
} from '../../store/reducer/Details/slice';
import { setAdressError, setIsServiceError } from '../../store/reducer/Validation/slice';
//constants
import {
    TITLE,
    SUB_TYPE, SUB_COMMENT,
    SUB_DESCRIPTION, SUB_MINDURATION,
    SUB_DURATION, SUB_REQUIREMENTS,
    SUB_ADDRESS, SUB_PAYNOTES
} from '../../constants/details';
import { PromptDetails } from '../../constants/prompts';
//components
import Header from '../General/Header/Header';
import InputSelect from '../General/Input/InputSelect';
import Comment from '../General/Comment/Comment';
import TabsNumbers from '../General/Tabs/TabsNumbers';
import Tags from '../General/Tags/Tags';


const Details = () => {
    const user = useContext(UserContext);
    const { types, requirements, partnerships } = useContext(ParametrsContext)
    const { customer, payType } = useSelector(selectorCustomer);
    const { service, tags, commentSupervisor, notes, payNotes, minDuration, duration } = useSelector(selectorDetails);
    const { isServiceError } = useSelector(selectorValidation)
    const [minDurationThreshold, setminDurationThreshold] = useState(24)
    const [payCommentState, setPayCommentState] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(setIsServiceError(false))
    }, [service])

    useEffect(() => {
        payNotes.length > 0 && setPayCommentState(true)
    }, [payNotes])

    useEffect(() => {
        if (partnerships && partnerships.length > 0) {
            const result = partnerships?.find(el => el.id == customer?.partnership_id)
            const result2 = partnerships?.find(el => el.connect_to == 0)
            if (result && payType == 1) {
                dispatch(setMinDurqtion(result.min_time))
                setminDurationThreshold(result.min_time)
                return
            }
            if (result2 && !customer?.partnership_id) {
                dispatch(setMinDurqtion(Number(result2.min_time)))
                setminDurationThreshold(result2.min_time)
                return
            }
        }
    }, [customer, partnerships, payType])

    useEffect(() => {
        minDuration > duration && dispatch(setDuration(Number(minDuration)))
    }, [minDuration, duration])


    const handleResetErrorAddress = () => {
        dispatch(setAdressError(false))
    }

    const handleAdd = () => {
        if (payCommentState) {
            setPayCommentState(false)
            dispatch(setPayNotes(''))
        } else {
            setPayCommentState(true)
        }
    }

    return (
        <div className={s.details}>
            <Header
                title={TITLE}
                buttonState={true}
                buttonText={payCommentState ? 'Скрыть комментарий к оплате' : 'Добавить комментарий к оплате'}
                handleButton={handleAdd}
                forPro={!user.pro}
                PromptText={PromptDetails}
            />

            <InputSelect
                sub={SUB_TYPE}
                value={service}
                setValue={(data) => dispatch(setService(Number(data)))}
                list={types}
                error={isServiceError}
                errorText={'Выбери тип услуги'}
            />


            {/*  <InputSelectSearch
                sub={SUB_TYPE}
                value={service}
                setValue={(data) => dispatch(setService(data))}
                list={types}
            /> */}
            <Comment
                sub={SUB_COMMENT}
                maxLength={1000}
                rows={4}
                value={notes}
                setValue={(data) => dispatch(setNotes(data))}
            />


            {payCommentState && <Comment
                sub={SUB_PAYNOTES}
                maxLength={200}
                rows={2}
                value={payNotes}
                setValue={(data) => dispatch(setPayNotes(data))}
            />
            }

            {service !== 8 && <Comment
                sub={SUB_DESCRIPTION}
                maxLength={300}
                rows={3}
                value={commentSupervisor}
                setValue={(data) => dispatch(setCommentSupervisor(data))}
            />
            }

            {service !== 8 && <Tags
                sub={SUB_REQUIREMENTS}
                value={tags}
                maxVis={4}
                tagList={requirements}
                setValue={(data) => dispatch(addRequirements(data))}
                deleteValue={(data) => dispatch(deleteRequirements(data))}
            />
            }

            {service !== 8 && <TabsNumbers
                value={minDuration}
                setValue={(data) => dispatch(setMinDurqtion(Number(data)))}
                sub={SUB_MINDURATION}
                max={23}
                min={minDurationThreshold}
                maxVis={6}
                forPro={false}
            />
            }

            {service !== 8 && <TabsNumbers
                value={duration}
                setValue={(data) => dispatch(setDuration(Number(data)))}
                sub={SUB_DURATION}
                max={24}
                min={minDuration}
                maxVis={8}
                forPro={false}
            />
            }
        </div>
    )
};

export default Details;