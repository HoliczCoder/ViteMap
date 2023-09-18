import L, { DrawEvents, LatLngExpression, LeafletEvent, Map } from "leaflet";
// import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import EditControl from "./EditControl";
import { useLeafletContext } from "@react-leaflet/core";
import Square from "./Square";
// import "./leaflet.almostover";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
// });

//
import "leaflet-draw";
import leaflet, { Draw, Control } from "leaflet";

const locations: LatLngExpression[] = [
  [21.9361, 106.0545],
  [12.6049, 109.359],
  [10.4581, 106.217],
  [10.3969, 107.143],
  [11.1284, 108.232],
];
export default function Maps() {
  const center: LatLngExpression = [20.9361, 106.0545]; // Center the map on Vietnam
  const zoom: number = 7;

  // State to store the markers
  const [markers, setMarkers] = React.useState<LatLngExpression[]>(locations);
  // trigger to draw a polyline
  const [isDrawPolyline, setIsDrawPolyline] = React.useState<boolean>(false);

  const [draggable, setDraggable] = useState<boolean>(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend(e: LeafletEvent) {
        if (e != null) {
          console.log(e.target._latlng);
          // console.log(marker);
          // setPosition(marker.getLatLng());
        }
      },
      dragstart(e: LeafletEvent) {
        console.log(e);
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const EventTrigger = () => {
    setIsDrawPolyline(true);
  };

  return (
    <>
      <div>
        <button onClick={() => EventTrigger()}>Click here</button>
      </div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ minHeight: "500px", minWidth: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            // onEdited={handleMarkerEdited}
            // onCreated={handleMarkerCreated}
            // onDeleted={handleMarkerDeleted}
            draw={{
              rectangle: true,
              polyline: true,
              polygon: true,
              circle: true,
              marker: true,
              circlemarker: true,
            }}
            buttonTriggerOutSide={isDrawPolyline}
          />
        </FeatureGroup>
        {/* <Square center={center} size={100000} /> */}

        {markers.map((marker, index) => (
          <div key={index}>
            <Marker
              draggable={draggable}
              eventHandlers={eventHandlers}
              position={marker}
              ref={markerRef}
              autoPan={true}
            >
              <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                  {draggable
                    ? "Marker is draggable"
                    : "Click here to make marker draggable"}
                </span>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </>
  );
}
