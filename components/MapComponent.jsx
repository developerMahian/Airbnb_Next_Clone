import { useState, useMemo } from "react";
import Image from "next/image";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import getCenter from "geolib/es/getCenter";

const MapComponent = ({ placesData }) => {
  const [selectedMarker, setSelectedMarker] = useState({});

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("en-GB", {
      notation: "compact",
      compactDisplay: "short",
    }).format(price);
  };

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
              className="block bg-gray-100 font-bold text-sm py-1 px-2.5 rounded-full shadow-md cursor-pointer hover:bg-gray-300 hover:scale-110 hover:shadow-xl transition"
              aria-label="push-pin"
              title={result?.title.slice(0, 25) + "..."}
            >
              {formattedPrice(result?.price)}
            </p>
          </Marker>

          {result.id === selectedMarker.id && (
            <Popup
              className="z-50 shadow-xl"
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
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={"mapbox://styles/mapbox/satellite-v9"}
      minZoom={7}
    >
      <GeolocateControl className="mt-10" position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {markers}
    </Map>
  );
};

export default MapComponent;
