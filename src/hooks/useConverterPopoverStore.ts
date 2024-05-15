import { FeatureLike } from 'ol/Feature'
import { create } from 'zustand'

interface ConverterPopoverState {
    popoverOpen: boolean
    DDValue: [number, number]
    DMSValue: [string, string]
    setPopoverOpen: (open: boolean) => void
    setDDValue: (value: [number, number]) => void
    setDMSValue: (value: [string, string]) => void

    // selected marker used to move the marker on the map
    selectedMarker: FeatureLike | null
    setSelectedMarker: (marker: FeatureLike | null) => void
}

/**
 * Custom hook for managing converter popover state.
 *
 * @returns An object containing the state and setter functions.
 */
const useConverterPopoverStore = create<ConverterPopoverState>()(
    (set) => ({
        popoverOpen: false,
        setPopoverOpen: (open) => set({ popoverOpen: open }),
        DDValue: [0, 0],
        setDDValue: (value) => set({ DDValue: value }),
        DMSValue: ["", ""],
        setDMSValue: (value) => set({ DMSValue: value }),
        selectedMarker: null,
        setSelectedMarker: (marker) => set({ selectedMarker: marker })
    })
)

export default useConverterPopoverStore