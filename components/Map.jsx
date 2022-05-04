import { useState, useMemo } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";

const MapComponent = ({ placesData }) => {
  const [selectedMarker, setSelectedMarker] = useState({});

  const markers = useMemo(
    () =>
      placesData?.map((result, index) => (
        <div key={index}>
          <Marker
            latitude={result.geography.lat}
            longitude={result.geography.lng}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedMarker(result);
            }}
          >
            <p
              role="img"
              className="cursor-pointer animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {result.id === selectedMarker.id && (
            <Popup
              anchor="top"
              latitude={result?.geography.lat}
              longitude={result?.geography.lng}
              onClose={() => setSelectedMarker({})}
            >
              <div className="flex flex-col p-1">
                <p className="font-semibold mb-2 leading-4">{result?.title}</p>

                <div className="relative h-28 w-full bg-slate-200 rounded-md overflow-hidden">
                  <Image
                    src={selectedMarker?.coverPhoto.url}
                    alt={selectedMarker?.title + "image"}
                    layout="fill"
                  />
                </div>
              </div>
            </Popup>
          )}
        </div>
      )),
    [placesData, selectedMarker]
  );

  const markerPos = placesData?.map((result) => ({
    longitude: result.geography.lng,
    latitude: result.geography.lat,
  }));

  const mapCenterPos = getCenter(markerPos);

  const [mapView, setMapView] = useState({
    longitude: mapCenterPos.longitude,
    latitude: mapCenterPos.latitude,
    zoom: 12,
    width: "100%",
    height: "100%",
  });

  return (
    <Map
      {...mapView}
      onMove={(e) => setMapView(e.viewState)}
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle={"mapbox://styles/mapbox/satellite-v9"}
    >
      <GeolocateControl className="mt-10 opacity-0" position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {markers}
    </Map>
  );
};

export default MapComponent;
