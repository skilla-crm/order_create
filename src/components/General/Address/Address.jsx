import s from './Address.module.scss';
import { useEffect, useState } from 'react';
import { ReactComponent as IconLocation } from '../../../images/icons/iconLocation.svg';
//API
import { getCordinateInfo, getMetro } from '../../../Api/ApiDadata';
import { getAddressExact, getAddressSuggest } from '../../../Api/ApiYandex';
//components
import MapAddress from '../MapAddress/MapAddress';
import Switch from '../Switch/Switch';
import Metro from '../Metro/Metro';
//utils
import { adressStringUtility, addressUtility } from '../../../utils/AdressUtility';

const Address = ({ sub, address, setAddress, metro, setMetro, user, defaultCordinate, first, handleNoAdress, noAddress, addressForReturn, errorText, error }) => {
    const [query, setQuery] = useState(adressStringUtility(address) || '');
    const [suggestions, setSuggestions] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const [openMap, setOpenMap] = useState(false);

    useEffect(() => {
        address.city == '' && setOpenMap(false)
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
        console.log(city, street, house)
        getAddressExact(`${city} ${street} ${house}`)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0].GeoObject?.Point;
                console.log(res.data.response)
                const cordinate = data.pos.split(' ')
                console.log(cordinate)
                setAddress({
                    city,
                    street,
                    house,
                    apartment,
                    lat: cordinate?.[1],
                    lng: cordinate?.[0]
                })
                setMetro(null)
                getCordinateInfo(cordinate?.[1], cordinate?.[0])
                    .then(res => {
                        const data = res.data.suggestions?.[0]?.data?.metro;
                        if (data) {
                            data.forEach(el => {
                                getMetro(`${el.name} ${city}`)
                                    .then(res => {
                                        const color = res.data.suggestions?.[0]?.data?.color;
                                        setMetro({ ...el, color })
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
    }

    const handleBlur = () => {
        setOnFocus(false)
    }

    const handleMap = () => {
        openMap ? setOpenMap(false) : setOpenMap(true)
    }

    const handleProModal = () => {
        console.log('модалка про')
    }

    return (
        <div className={s.container}>
            <span className={s.sub}>{sub}</span>
            <div className={s.block}>
                <div className={`${s.field} ${noAddress && s.field_disabled} ${onFocus && s.field_focus}`}>
                    <input disabled={noAddress} onFocus={handleFocus} onBlur={handleBlur} value={query || ''} onChange={handleAdress}></input>
                    <button onClick={handleMap} className={`${s.button} ${(onFocus || ((!address.lat || address.city == '') && !openMap)) && s.button_hidden}`}>
                        <IconLocation />
                        {!openMap && <p>На карте</p>}
                        {openMap && <p>Скрыть</p>}
                    </button>

                    <ul className={s.list}>
                        {suggestions?.map((el) => {
                            return <li onClick={() => handleSelectAddress(el)} key={el.uri}>{el.address.formatted_address}</li>
                        })}
                    </ul>
                </div>

                {first && <Switch
                    text={'Без адреса'}
                    switchState={noAddress}
                    handleSwitch={!user.pro ? handleProModal : handleNoAdress}
                    hidden={false}
                    forPro={!user.pro}
                />
                }
            </div>
            <div className={`${s.metro} ${metro.length >= 2 && s.metro_open}`}>
                <Metro station={metro} />
            </div>

            <div className={`${s.error} ${error && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>
            <div className={`${s.map} ${!openMap && s.map_hidden}`}>
                <MapAddress openMap={openMap} lat={address?.lat} lng={address?.lng} defaultCordinate={defaultCordinate} width={690} height={292} />
            </div>

        </div>
    )
};
export default Address;