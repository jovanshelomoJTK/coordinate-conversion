import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { parseDms } from "dms-conversion";
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
import { convertDMSToDD, createPoint } from "@/lib/map-utils";
import { useToast } from "@/components/ui/use-toast";
import useConverterPopoverStore from "@/hooks/useConverterPopoverStore";
import { fromLonLat } from "ol/proj";

/**
 * Represents the schema for the conversion form.
 */
const formSchema = z.object({
  latitude: z
    .string({
      errorMap: () => {
        return { message: "Latitude must be valid" };
      },
    })
    .refine((value) => !isNaN(parseDms(value)), {
      message: "Latitude must be valid",
    }),
  longitude: z
    .string({
      errorMap: () => {
        return { message: "Longitude must be valid" };
      },
    })
    .refine((value) => !isNaN(parseDms(value)), {
      message: "Longitude must be valid",
    }),
});

/**
 * Component to Converts coordinates from Degrees Minutes Seconds (DMS) to Decimal Degrees (DD).
 * @returns The DMS to DD converter component.
 */
export default function DMS2DD() {
  const addLayer = useMapStore((state) => state.addLayer);
  const DMSValue = useConverterPopoverStore((state) => state.DMSValue);
  const setDMSValue = useConverterPopoverStore((state) => state.setDMSValue);
  const selectedMarker = useConverterPopoverStore(
    (state) => state.selectedMarker
  );
  const setSelectedMarker = useConverterPopoverStore(
    (state) => state.setSelectedMarker
  );
  const { toast } = useToast();

  const [coordsDD, setCoordsDD] = useState({
    latitude: 0,
    longitude: 0,
  });

  /**
   * Converts the input coordinates from DMS to DD format and sets the state.
   * @param {z.infer<typeof formSchema>} values - The input coordinates in DMS format.
   */
  function startConvert(values: z.infer<typeof formSchema>) {
    setCoordsDD(convertDMSToDD(values.latitude, values.longitude));
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: DMSValue[0],
      longitude: DMSValue[1],
    },
  });

  /**
   * Adds a marker to the map using the provided coordinates in decimal degrees (DD) format.
   */
  function addToMap() {
    console.log(selectedMarker);
    addLayer(createPoint(coordsDD.latitude, coordsDD.longitude));
    toast({
      title: "Marker added to the map",
      description: `Latitude: ${coordsDD.latitude}, Longitude: ${coordsDD.longitude}`,
    });
  }

  function updateMarkerPosition() {
  
    // @ts-expect-error - selectedMarker is not null
    selectedMarker.getGeometry().setCoordinates(fromLonLat([coordsDD.longitude, coordsDD.latitude]));
    setSelectedMarker(null);
    toast({
      title: "Marker updated on the map",
      description: `Latitude: ${coordsDD.latitude}, Longitude: ${coordsDD.longitude}`,
    });
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Convert Coordinate from <abbr title="Degrees Minutes Seconds">DMS</abbr>{" "}
        to <abbr title="Decimal Degrees">DD</abbr>
      </p>
      <p className="text-foreground">
        <abbr title="Degrees Minutes Seconds">DMS</abbr>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(startConvert)} className="grid gap-2">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 items-center gap-x-4">
                <Label htmlFor="latitudeDMS">Latitude</Label>
                <FormControl>
                  <Input
                    id="latitudeDMS"
                    className="col-span-2"
                    placeholder={"xx° xx' xx.x\" N/S"}
                    {...field}
                    onChange={(e) => {
                      setDMSValue([e.target.value, DMSValue[1]]);
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
                <Label htmlFor="longitudeDMS">Longitude</Label>
                <FormControl>
                  <Input
                    id="longitudeDMS"
                    className="col-span-2"
                    placeholder={"xxx° xx' xx.x\" E/W"}
                    {...field}
                    onChange={(e) => {
                      setDMSValue([DMSValue[0], e.target.value]);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage className="col-start-2 col-span-2" />
              </FormItem>
            )}
          />
          <Button type="submit">
            Convert to DD <ArrowDownIcon className="w-6" />
          </Button>
        </form>
      </Form>
      <p className="text-foreground">
        <abbr title="Decimal Degrees">DD</abbr>
      </p>
      <div className="grid gap-2 space-y-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="latitudeDMS">Latitude</Label>
          <Input
            id="latitudeDMS"
            className="col-span-2 disabled:opacity-100"
            classNameInput="disabled:opacity-100"
            disabled
            value={coordsDD.latitude}
            rightElement={
              <span className="text-muted-foreground text-sm pr-2">deg</span>
            }
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="longitudeDMS">Longitude</Label>
          <Input
            id="longitudeDMS"
            className="col-span-2 disabled:opacity-100"
            classNameInput="disabled:opacity-100"
            disabled
            value={coordsDD.longitude}
            rightElement={
              <span className="text-muted-foreground text-sm pr-2">deg</span>
            }
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
