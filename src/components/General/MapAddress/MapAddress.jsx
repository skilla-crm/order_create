import { useEffect, useRef } from 'react';
import s from './MapAddress.module.scss';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

/* const Icon = () => {
    return (
        <IconChewron />
    )
} */

const MapAddress = ({ lat, lng, defaultCordinate }) => {
    const mapRef = useRef();


    return (
        <div className={`${s.container}`}>
            <YMaps>

                <Map
                    ref={mapRef}
                    width={'100%'}
                    height={280}
                    defaultState={{ center: defaultCordinate, zoom: 10 }}
                    state={{ center: lat ? [lat, lng] : defaultCordinate, zoom: lat ? 16 : 10 }}
                >
                    <Placemark geometry={[lat, lng]} /* iconContent={<Icon />} options={{

                        iconCaption: 'хуй',
                    }} */
                    />
                </Map>

            </YMaps>
        </div >
    )
};
export default MapAddress;