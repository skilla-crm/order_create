import { useEffect, useRef } from 'react';
import s from './MapAddress.module.scss';
import { YMaps, Map, Placemark, YMapMarker } from '@pbe/react-yandex-maps';
const API_KEY_MAP = process.env.REACT_APP_API_KEY_MAP;

/* const Icon = () => {
    return (
        <IconChewron />
    )
} */

const MapAddress = ({ lat, lng, defaultCordinate, width, height }) => {
    const mapRef = useRef();


    return (
        <YMaps
            query={{
                apikey: API_KEY_MAP
            }}>

            <Map
                ref={mapRef}
                width={width}
                height={height}
                defaultState={{
                    center: defaultCordinate, zoom: 10,
                    controls: [],
                }}
                state={{
                    center: lat ? [lat, lng] : defaultCordinate,
                    zoom: lat ? 16 : 10,
                    controls: []
                }}

                options={{
                    suppressMapOpenBlock: true
                }}


            >
                {lat && <Placemark geometry={[lat, lng]}

                /* iconContent={<Icon />} options={{

                        iconCaption: 'хуй',
                    }} */
                />
                }
            </Map>

        </YMaps>
    )
};
export default MapAddress;