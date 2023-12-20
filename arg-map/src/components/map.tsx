import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';
import { useEffect, useRef, useState } from 'react';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { VehicleData } from './types';
import UserInput from './userInput';

const MainMap: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
  esriConfig.apiKey =
    'AAPKce0d28219bca4df0a95559aaffc8e13cbnWxYLAb0UoQ6P8pOfb3lKxMXdKt2eHV4msqBUdcTlty_8X71iYd54_5KF8d7_-6';

  const getData = async () => {
    const res = await fetch('http://localhost:4000/data');
    const data = await res.json();
    setVehicleData(data);
    return data;
  };

  const setDataViews = (data: VehicleData[]) => {
    if (!map) return;
    console.log('setting data views', data);
    map.removeAll();

    const graphics = data.map((vehicle) => {
      return new Graphic({
        attributes: {
          ObjectId: vehicle.id,
          address: vehicle.trip_headsign,
        },
        geometry: {
          type: 'point',
          longitude: vehicle.longitude,
          latitude: vehicle.latitude,
        },
        symbol: {
          // autocasts as new SimpleMarkerSymbol()
          type: 'simple-marker',
          color: [226, 119, 40],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 0, 0],
            width: 2,
          },
        },
      });
    });

    console.log('setting feature layers');
    const featureLayer = new FeatureLayer({
      source: graphics,
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          color: '#102A44',
          outline: { color: '#598DD8', width: 2 },
        },
      },
      popupTemplate: {
        title: ({ graphic }: any) =>
          `Heading to "${graphic.attributes.address}"`,
        content: [
          {
            type: 'fields',
            fieldInfos: [
              { fieldName: 'address', label: 'address', visible: true },
            ],
          },
        ],
      },
      objectIdField: 'id', // This must be defined when creating a layer from `Graphic` objects
      fields: [
        { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
        { name: 'address', alias: 'address', type: 'string' },
      ],
    });

    map.layers.add(featureLayer);
  };

  const onSetViewsClick = async () => {
    if (vehicleData.length > 0) setDataViews(vehicleData);
    else {
      const data = await getData();
      setDataViews(data);
    }
  };

  const handleOnFormFill = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    let data: VehicleData[] = [];
    if (vehicleData.length === 0) {
      data = await getData();
      setVehicleData(data);
    } else {
      data = vehicleData;
    }

    const nearest10 = data
      .map((vehicle) => {
        const distance = Math.sqrt(
          Math.pow(vehicle.latitude - latitude, 2) +
            Math.pow(vehicle.longitude - longitude, 2)
        );
        return { ...vehicle, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
    if (nearest10.length === 0) {
      console.log('no nearest 10');
      return;
    }
    setDataViews(nearest10);
  };

  useEffect(() => {
    if (!divRef.current || !!map) return;
    const esriMap = new Map({ basemap: 'arcgis/topographic' });
    new MapView({
      zoom: 12,
      map: esriMap,
      container: 'viewDiv',
      center: [-58.489, -34.615],
    });

    setMap(esriMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={divRef}
        style={{ height: '80vh', width: '100vw' }}
        id='viewDiv'
      ></div>
      <button onClick={onSetViewsClick}>Show All Vehicles</button>

      <UserInput onOk={handleOnFormFill} />
    </>
  );
};

export default MainMap;
