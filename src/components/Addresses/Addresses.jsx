import s from './Addresses.module.scss';
import { useContext, useEffect, useState, memo } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorAddress } from '../../store/reducer/Address/selector';

import { selectorValidation } from '../../store/reducer/Validation/selector';

//slice
import { setAddress, addDopAdresses, deleteDopAddress, addDopAdressesMetro, setMetro, setDopMetro, setNoAddress, deleteMetro } from '../../store/reducer/Address/slice';

import { setAdressError, } from '../../store/reducer/Validation/slice';
//constants
import { TITLE, SUB_ADDRESS } from '../../constants/details';
import { PromptDetails } from '../../constants/prompts';
//components
import HeaderAddreses from '../General/HeaderAddreses/HeaderAddreses';
import Address from '../General/Address/Address';
import MapAddress from '../General/MapAddress/MapAddress';

const Addresses = () => {
    const user = useContext(UserContext);
    const { address, dopAdresses, metro, defaultCordinate, noAddress, addressForReturn } = useSelector(selectorAddress);
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
        const maxValue = dopAdresses.length > 0 ? Math.max(...dopAdresses.map(obj => obj.id)) : 0;
        dispatch(addDopAdresses({ id: maxValue + 1 }))
    }

    const handleDelete = (id) => {
        dispatch(deleteDopAddress(id))
    }

    const handleMap = () => {
        openMap ? setOpenMap(false) : setOpenMap(true)
    }

    return (
        <div className={s.details}>
            <HeaderAddreses
                title={'Адрес заказа'}
                buttonState={true}
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
                first={true}
                handleNoAdress={handleNoAdress}
                noAddress={noAddress}
                addressForReturn={addressForReturn}
                error={adressError}
                errorText={'Укажи адрес'}
            />


            {dopAdresses?.length > 0 && <div className={s.container}>
                <span className={s.sub}>Дополнительные адреса</span>
                <div className={s.dop}>
                    {dopAdresses?.map((item, i) => <Address
                        key={i + 1}
                        address={dopAdresses?.find(el => el.id === item.id)}
                        metro={metro}
                        sub={SUB_ADDRESS}
                        user={user}
                        defaultCordinate={defaultCordinate}
                        setAddress={(data) => dispatch(addDopAdresses({ id: item.id, ...data }))}
                        handleDelete={() => handleDelete(item.id)}
                        first={false}
                        handleNoAdress={handleNoAdress}
                        noAddress={noAddress}
                        addressForReturn={addressForReturn}
                        error={false}
                        errorText={'Укажи адрес'}
                    />)}
                </div>
            </div>}

            <div className={`${s.map} ${!openMap && s.map_hidden}`}>
                <MapAddress
                    openMap={openMap}
                    addresses={[address, ...dopAdresses]}
                    lat={[address, ...dopAdresses]?.pop()?.lat}
                    lng={[address, ...dopAdresses]?.pop()?.lng}
                    defaultCordinate={defaultCordinate}
                    width={'100%'}
                    height={460}
                />
            </div>
        </div>
    )
};

export default memo(Addresses);