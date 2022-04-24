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

const MapComponent = ({ searchResults }) => {
  const [selectedMarker, setSelectedMarker] = useState({});
  console.log(selectedMarker);

  const markers = useMemo(
    () =>
      searchResults?.map((result, index) => (
        <Marker
          key={index}
          latitude={result.lat}
          longitude={result.long}
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
      )),
    [searchResults]
  );

  const markerPos = searchResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
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
      mapStyle={"mapbox://styles/devmahian/cl28q8nn7001614m1wg4rgl80"}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {markers}

      {!selectedMarker && (
        <Popup
          anchor="top"
          latitude={selectedMarker.lat}
          longitude={selectedMarker.long}
          onClose={() => setSelectedMarker({})}
        >
          {selectedMarker.title}
        </Popup>
      )}
    </Map>
  );
};

export default MapComponent;
