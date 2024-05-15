import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DmsCoordinates from "dms-conversion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import useMapStore from "@/hooks/useMapStore";
import { createPoint } from "@/lib/map-utils";
import { useToast } from "@/components/ui/use-toast";
import useConverterPopoverStore from "@/hooks/useConverterPopoverStore";
import { fromLonLat } from "ol/proj";

/**
 * Represents the schema for the conversion form.
 */
const formSchema = z.object({
  latitude: z.coerce
    .number({
      errorMap: () => {
        return { message: "Latitude must be valid" };
      },
    })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce
    .number({
      errorMap: () => {
        return { message: "Longitude must be valid" };
      },
    })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

/**
 * Component to Converts coordinates from Decimal Degrees (DD) to Degrees Minutes Seconds (DMS).
 * @returns The DD to DMS converter component.
 */
export default function DD2DMS() {
  const addLayer = useMapStore((state) => state.addLayer);
  const DDValue = useConverterPopoverStore((state) => state.DDValue);
  const setDDValue = useConverterPopoverStore((state) => state.setDDValue);
  const selectedMarker = useConverterPopoverStore(
    (state) => state.selectedMarker
  );
  const setSelectedMarker = useConverterPopoverStore(
    (state) => state.setSelectedMarker
  );
  const { toast } = useToast();

  const [coordsDMS, setCoordsDMS] = useState({
    latitude: "",
    longitude: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: DDValue[0],
      longitude: DDValue[1],
    },
  });

  /**
   * Converts the input coordinates from DD to DMS format and sets the state.
   * @param {z.infer<typeof formSchema>} values - The input coordinates in DD format.
   */
  function convertDD2DMS(values: z.infer<typeof formSchema>) {
    const DMSValue = new DmsCoordinates(values.latitude, values.longitude);

    setCoordsDMS({
      latitude: DMSValue.latitude.toString(2),
      longitude: DMSValue.longitude.toString(2),
    });
  }

  /**
   * Adds a marker to the map using the provided coordinates in decimal degrees (DD) format.
   */
  function addToMap() {
    const formValues = form.getValues();
    addLayer(createPoint(formValues.latitude, formValues.longitude));
    toast({
      title: "Marker added to the map",
      description: `Latitude: ${formValues.latitude}, Longitude: ${formValues.longitude}`,
    });
  }

  function updateMarkerPosition() {
    const formValues = form.getValues();
    // @ts-expect-error - selectedMarker is not null
    selectedMarker.getGeometry().setCoordinates(fromLonLat([formValues.longitude, formValues.latitude]));
    setSelectedMarker(null);
    toast({
      title: "Marker updated on the map",
      description: `Latitude: ${formValues.latitude}, Longitude: ${formValues.longitude}`,
    });
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Convert Coordinate from <abbr title="Decimal Degrees">DD</abbr> to{" "}
        <abbr title="Degrees Minutes Seconds">DMS</abbr>
      </p>
      <p className="text-foreground">
        <abbr title="Decimal Degrees">DD</abbr>
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(convertDD2DMS)}
          className="grid gap-2"
        >
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 items-center gap-x-4">
                <Label htmlFor="latitudeDD">Latitude</Label>
                <FormControl>
                  <Input
                    id="latitudeDD"
                    className="col-span-2"
                    classNameInput="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    min={-90}
                    max={90}
                    step="any"
                    rightElement={
                      <span className="text-muted-foreground text-sm pr-2">
                        deg
                      </span>
                    }
                    placeholder="xx.xxxxxx"
                    {...field}
                    onChange={(e) => {
                      setDDValue([parseFloat(e.target.value), DDValue[1]]);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage className="col-start-2 col-span-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 items-center gap-x-4">
                <Label htmlFor="longitudeDD">Longitude</Label>
                <FormControl>
                  <Input
                    id="longitudeDD"
                    className="col-span-2"
                    classNameInput="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    min={-180}
                    max={180}
                    step="any"
                    rightElement={
                      <span className="text-muted-foreground text-sm pr-2">
                        deg
                      </span>
                    }
                    placeholder="xxx.xxxxxx"
                    {...field}
                    onChange={(e) => {
                      setDDValue([DDValue[0], parseFloat(e.target.value)]);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage className="col-start-2 col-span-2" />
              </FormItem>
            )}
          />
          <Button type="submit">
            Convert to DMS
            <ArrowDownIcon className="w-6" />
          </Button>
        </form>
      </Form>
      <p className="text-foreground">
        <abbr title="Degrees Minutes Seconds">DMS</abbr>
      </p>
      <div className="grid gap-2 space-y-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="latitudeDMS">Latitude</Label>
          <Input
            id="latitudeDMS"
            className="col-span-2 disabled:opacity-100"
            classNameInput="disabled:opacity-100"
            disabled
            value={coordsDMS.latitude}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="longitudeDMS">Longitude</Label>
          <Input
            id="longitudeDMS"
            className="col-span-2 disabled:opacity-100"
            classNameInput="disabled:opacity-100"
            disabled
            value={coordsDMS.longitude}
          />
        </div>
        <Separator className="my-4" />
        <Button onClick={selectedMarker ? updateMarkerPosition : addToMap}>
          {selectedMarker ? "Update Marker on Map" : "Add to Map"}
        </Button>
      </div>
    </div>
  );
}
