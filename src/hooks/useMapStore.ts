import type { Map } from 'ol'
import BaseLayer from 'ol/layer/Base'
import { create } from 'zustand'

interface MapState {
  Map: Map | undefined
  setMap: (map: Map | undefined) => void
  addLayer: (layer: BaseLayer) => void
}

/**
 * Custom hook for managing map state.
 *
 * @returns An object containing map, layers, setter functions for map and addLayer.
 */
const useMapStore = create<MapState>()(
  (set) => ({
    Map: undefined,
    setMap: (map) => set({ Map: map }),
    addLayer: (layer) => {
      const map = useMapStore.getState().Map
      console.log(map)
      map?.addLayer(layer)
    }
  })
)

export default useMapStore