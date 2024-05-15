import ConverterPopover from "./components/custom/converter-popover";
import MapView from "@/components/custom/map-view";
import { Toaster } from "@/components/ui/toaster";

/**
 * The main component of the application.
 *
 * @returns The rendered JSX elements.
 */
function App() {
  return (
    <>
      {/* Openlayers map */}
      <MapView />

      {/* Popover untuk converter */}
      <ConverterPopover />

      {/* Untuk menampilkan toast */}
      <Toaster />
    </>
  );
}

export default App;
