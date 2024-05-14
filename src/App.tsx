import ConverterPopover from "./components/custom/converter-popover";
import MapView from "./components/custom/map-view";

function App() {
  return (
    <>
      {/* Openlayers map */}
      <MapView />

      {/* Popover untuk converter */}
      <ConverterPopover />
    </>
  );
}

export default App;
