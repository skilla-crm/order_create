import s from './Addresses.module.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorAddress } from '../../store/reducer/Address/selector';

import { selectorValidation } from '../../store/reducer/Validation/selector';

//slice
import { setAddress, setMetro, setNoAddress, deleteMetro } from '../../store/reducer/Address/slice';

import { setAdressError, } from '../../store/reducer/Validation/slice';
//constants
import { TITLE, SUB_ADDRESS } from '../../constants/details';
import { PromptDetails } from '../../constants/prompts';
//components
import HeaderAddreses from '../General/HeaderAddreses/HeaderAddreses';

import Address from '../General/Address/Address';


const Addresses = () => {
    const user = useContext(UserContext);
    const { address, metro, defaultCordinate, noAddress, addressForReturn } = useSelector(selectorAddress);
    const { adressError } = useSelector(selectorValidation)
    const [openMap, setOpenMap] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        address.city && handleResetErrorAddress()
    }, [address])


    const handleNoAdress = () => {
        if (noAddress) {
            dispatch(setNoAddress(false))
        } else {
            dispatch(setNoAddress(true))
            dispatch(setAddress({}))
            dispatch(deleteMetro())
            handleResetErrorAddress()
        }
    }

    const handleResetErrorAddress = () => {
        dispatch(setAdressError(false))
    }

    const handleAdd = () => {
    
    }

    const handleMap = () => {
        openMap ? setOpenMap(false) : setOpenMap(true)
    }

    return (
        <div className={s.details}>
            <HeaderAddreses
                title={'Адрес заказа'}
                buttonState={false}
                forPro={!user.pro}
                PromptText={PromptDetails}
                hiddenPrompt={true}
                buttonText={'Добавить адрес'}
                handleButton={handleAdd}
                handleMap={handleMap}
                openMap={openMap}
            />

            <Address
                address={address}
                metro={metro}
                sub={SUB_ADDRESS}
                user={user}
                defaultCordinate={defaultCordinate}
                setAddress={(data) => dispatch(setAddress(data))}
                setMetro={(data) => dispatch(setMetro(data))}
                first={true}
                handleNoAdress={handleNoAdress}
                noAddress={noAddress}
                addressForReturn={addressForReturn}
                error={adressError}
                errorText={'Укажи адрес'}
                openMap={openMap} 
                setOpenMap={setOpenMap}
            />

        </div>
    )
};

export default Addresses;