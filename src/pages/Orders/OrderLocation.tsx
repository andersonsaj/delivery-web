import { LeafletMouseEvent } from 'leaflet';
import React, { useCallback, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import {
  fetchLocalMapBoxForward,
  fetchLocalMapBoxReverse,
} from '../../services/api';
import { OrderLocationData } from './types';

const initialPosition = {
  lat: -12.9692128,
  lng: -39.2665402,
};

type Place = {
  label?: string;
  value?: string;
  position: {
    lat: number;
    lng: number;
  };
};
type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
};

const OrderLocation: React.FC<Props> = ({ onChangeLocation }) => {
  const [address, setAddress] = useState<Place>({ position: initialPosition });
  const [valueLabel, setValueLabel] = useState<Place[]>([]);

  const loadOptions = useCallback(async (inputValue: string) => {
    const response = await fetchLocalMapBoxForward(inputValue);

    const places = response.data.features.map((item: any) => {
      return {
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[1],
          lng: item.center[0],
        },
      };
    });
    setValueLabel(places);
    return places;
  }, []);

  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label!,
    });
  };

  async function handlerMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setAddress({
      position: {
        lat,
        lng,
      },
    });

    await fetchLocalMapBoxReverse(lng, lat)
      .then(response => {
        const places = response.data.features.map((item: any) => {
          return {
            label: item.place_name,
            value: item.place_name,
            position: {
              lat: item.center[1],
              lng: item.center[0],
            },
          };
        });
        setValueLabel(places);
      })
      .catch(erro => console.error(erro));
  }

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        handlerMapClick(e);
      },
    });

    return address ? (
      <Marker
        key={address.position.lat}
        position={address.position}
        interactive={false}
      />
    ) : null;
  };

  return (
    <div className="order-location-container">
      <div className="order-location-content">
        <h3 className="order-location-title">
          Selecione onde o pedido deve ser entregue:
        </h3>
        <div className="filter-container">
          <AsyncSelect
            placeholder="Digite o endereço para entregar o pedido"
            className="filter"
            loadOptions={loadOptions}
            value={valueLabel}
            onChange={value => handleChangeSelect(value as Place)}
          />
        </div>
        <MapContainer
          center={address.position}
          zoom={13}
          scrollWheelZoom
          key={address.position.lat}
        >
          <Markers />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={address.position}>
            <Popup>A pretty</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default OrderLocation;
