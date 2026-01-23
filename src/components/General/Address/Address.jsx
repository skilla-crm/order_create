import s from './Address.module.scss';
import { useEffect, useState, useRef } from 'react';
//icons
import { ReactComponent as IconClose } from '../../../images/icons/iconClose.svg';
//API
import { getCordinateInfo, getMetro } from '../../../Api/ApiDadata';
import { getAddressExact, getAddressSuggest } from '../../../Api/ApiYandex';
//components
import MapAddress from '../MapAddress/MapAddress';
import Switch from '../Switch/Switch';
import Metro from '../Metro/Metro';
import InputText from '../Input/InputText';
//utils
import { adressStringUtility, addressUtility, adressStringUtility3 } from '../../../utils/AdressUtility';

const Address = ({  sub, address, setAddress, metro, setMetro, user, defaultCordinate, first, handleNoAdress, noAddress, addressForReturn, errorText, error, openMap, setOpenMap, handleDelete }) => {
    const [query, setQuery] = useState(adressStringUtility(address) || '');
    const [openList, setOpenList] = useState(false)
    const [suggestions, setSuggestions] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const listRef = useRef();

    useEffect(() => {
        address.city && setQuery(adressStringUtility(address))
    }, [address])

    useEffect(() => {
        address?.city == '' && setOpenMap(false)
    }, [address])

    useEffect(() => {
        setQuery(addressForReturn)
    }, [addressForReturn])

    useEffect(() => {
        noAddress && setQuery('')
        if (noAddress) {
            setQuery('')
            setOpenMap(false)
        }
    }, [noAddress])

    const handleAdress = (e) => {
        const value = e.currentTarget.value;
        value == '' && setMetro(null)
        setAddress({})
        setQuery(value)
        getAddressSuggest(value, defaultCordinate)
            .then(res => {
                const results = res.data.results
                setSuggestions(results)
            })
            .catch(err => console.log(err))
    }

    const handleSelectAddress = (el) => {
        const data = el.address;
        const { city, street, house, apartment } = addressUtility(data.component);
        getAddressExact(`${city} ${street} ${house}`)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point;
                const cordinate = data ? data.pos.split(' ') : null
                setAddress({
                    city,
                    street,
                    house,
                    apartment,
                    lat: cordinate?.[1],
                    lng: cordinate?.[0]
                })
                setMetro(null)
                cordinate && getCordinateInfo(cordinate?.[1], cordinate?.[0])
                    .then(res => {
                        const data = res.data.suggestions?.[0]?.data?.metro;
                        if (data) {
                            data.forEach(el => {
                                getMetro(`${el.name} ${city}`)
                                    .then(res => {
                                        const color = res.data.suggestions?.[0]?.data?.color;
                                        setMetro({ ...el, color })

                                         setAddress({
                                            city,
                                            street,
                                            house,
                                            apartment,
                                            lat: cordinate?.[1],
                                            lng: cordinate?.[0],
                                            ...el, 
                                            color
                                        })
                                    })
                            })
                        }
                    })
            })
            .catch(err => console.log(err))



        setQuery(el.address.formatted_address);
        setSuggestions([])
    }

    const handleFocus = () => {
        setOnFocus(true)
        setOpenList(true)
    }

    const handleBlur = () => {
        setOnFocus(false)
    }



    const openModalPro = () => {
        document?.getElementById('pro-open')?.click();
    };

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={s.container}>
            {first && <span className={s.sub}>{sub}</span>}
            <div className={s.block}>
                <div ref={listRef} className={`${s.field} ${noAddress && s.field_disabled} ${first && s.field_first}  ${onFocus && s.field_focus}`}>
                    <input disabled={noAddress} onFocus={handleFocus} onBlur={handleBlur} value={query || ''} onChange={handleAdress}></input>
                    {/*    <button onClick={handleMap} className={`${s.button} ${(onFocus || ((!address.lat || address.city == '') && !openMap)) && s.button_hidden}`}>
                        <IconLocation />
                        {!openMap && <p>На карте</p>}
                        {openMap && <p>Скрыть</p>}
                    </button> */}

                    <ul className={`${s.list} ${openList && s.list_open}`}>
                        {suggestions?.map((el) => {
                            return <li onClick={() => handleSelectAddress(el)} key={el.uri}>{el.address.formatted_address}</li>
                        })}
                    </ul>
                </div>

                {first && <Switch
                    text={'Без адреса'}
                    switchState={noAddress}
                    handleSwitch={!user.pro ? openModalPro : handleNoAdress}
                    hidden={false}
                    forPro={!user.pro}
                />
                }

                {!first && <div onClick={handleDelete} className={s.delete}><IconClose /></div>
                }
            </div>
            <div className={`${s.info} ${address?.city && s.info_open}`}>
                <div className={s.manual}>
                    <InputText
                        disabledEdit={true}
                        value={adressStringUtility3(address)}
                    />

                    <div className={s.input_small}>
                        <InputText
                            disabledEdit={true}
                            value={address?.house}
                            placeholder={'Дом'}
                        />
                    </div>

                    <div className={s.input_small}>

                        <InputText
                            disabledEdit={false}
                            value={address?.apartment}
                            setValue={(value) => setAddress({ ...address, apartment: value })}
                            placeholder={'Кв/оф'}
                        />
                    </div>

                </div>
                <div className={`${s.metro} ${metro.length >= 2 && s.metro_open}`}>
                    <Metro station={metro} />
                </div>
            </div>


            <div className={`${s.error} ${error && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>
            <div className={`${s.map} ${!openMap && s.map_hidden}`}>
                <MapAddress openMap={openMap} lat={address?.lat} lng={address?.lng} defaultCordinate={defaultCordinate} width={'100%'} height={392} />
            </div>

        </div>
    )
};
export default Address;