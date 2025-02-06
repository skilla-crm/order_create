import s from './Address.module.scss';
import { useEffect, useState } from 'react';
import { ReactComponent as IconLocation } from '../../../images/icons/iconLocation.svg';
//API
import { getAddress } from '../../../Api/ApiDadata';
//components
import MapAddress from '../MapAddress/MapAddress';
import Switch from '../Switch/Switch';
//utils
import { adressStringUtility, cityStringUtility } from '../../../utils/AdressUtility';
//slice

const Address = ({ sub, address, setAddress, user }) => {
    const [query, setQuery] = useState(adressStringUtility(address) || '');
    const [suggestions, setSuggestions] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [noAdress, setNoAdress] = useState(false);

/*     var metro = new ymaps.Metro.Closest(new ymaps.GeoPoint([37.95, 55.65]), { results : 3 } );  */


    const handleNoAdress = () => {
        noAdress ? setNoAdress(false) : setNoAdress(true)
    }

    const handleAdress = (e) => {
        const value = e.currentTarget.value;
        setAddress({})
        setQuery(value)
        getAddress(value)
            .then(res => {
                const data = res.data.suggestions;
                setSuggestions(data)
            })
            .catch(err => console.log(err))
    }

    const handleSelectAddress = (el) => {
        const data = el.data;
        const city = cityStringUtility(data);
        setAddress({
            city: city,
            street: data.street_with_type,
            house: data.house ? `${data.house_type} ${data.house}` : null,
            k: data.block ? `${data.block_type} ${data.block}` : null,
            appartament: data.flat ? `${data.flat_type} ${data.flat}` : null,
            lat: data.geo_lat,
            lng: data.geo_lon
        })
        console.log(data)
        setQuery(el.value);
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
                <div className={`${s.field} ${onFocus && s.field_focus}`}>
                    <input onFocus={handleFocus} onBlur={handleBlur} value={query || ''} onChange={handleAdress}></input>
                    <button onClick={handleMap} className={`${s.button} ${(onFocus || !address.lat) && s.button_hidden}`}>
                        <IconLocation />
                        {!openMap && <p>На карте</p>}
                        {openMap && <p>Скрыть</p>}
                    </button>

                    <ul className={s.list}>
                        {suggestions.map((el) => {
                            return <li onClick={() => handleSelectAddress(el)} id={el.data.fias_id}>{el.value}</li>
                        })}
                    </ul>
                </div>

                <Switch
                    text={'Без адреса'}
                    switchState={noAdress}
                    handleSwitch={!user.pro ? handleProModal : handleNoAdress}
                    hidden={false}
                    forPro={!user.pro}
                />
            </div>

            <MapAddress openMap={openMap} lat={address?.lat} lng={address?.lng} />
        </div>
    )
};
export default Address;