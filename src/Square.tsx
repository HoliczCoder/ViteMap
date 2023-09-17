import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useEffect, useRef } from "react";

function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size);
}

export default function Square(props) {
  const context = useLeafletContext();
  const squareRef = useRef();
  const propsRef = useRef(props);

  useEffect(() => {
    squareRef.current = L.Rectangle(getBounds(props));
    const container = context.layerContainer || context.map;
    container.addLayer(squareRef.current);

    return () => {
      container.removeLayer(squareRef.current);
    };
  }, []);

  useEffect(() => {
    if (
      props.center !== propsRef.current.center ||
      props.size !== propsRef.current.size
    ) {
      squareRef.current.setBounds(getBounds(props));
    }
    propsRef.current = props;
  }, [props.center, props.size]);

  return null;
}
