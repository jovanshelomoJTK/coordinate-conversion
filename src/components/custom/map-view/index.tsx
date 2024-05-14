import { useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

export default function MapView() {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        // Center of Indonesia
        center: [13185720.993673442, -264464.2858834424],
        zoom: 5.5,
      }),
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return <div id="map" className="w-full h-full" />;
}
