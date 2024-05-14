import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseDms } from "dms-conversion";
import { useState } from "react";

export default function DMS2DD() {
  const [coordsDMS, setCoordsDMS] = useState({
    latitude: "",
    longitude: "",
  });
  const [coordsDD, setCoordsDD] = useState({
    latitude: "",
    longitude: "",
  });

  function convertDMS2DD() {
    setCoordsDD({
      latitude: parseDms(coordsDMS.latitude).toString(),
      longitude: parseDms(coordsDMS.longitude).toString(),
    });
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Convert Coordinate from DMS to DD
      </p>
      <p className="text-foreground underline">DMS</p>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="latitudeDMS">Latitude</Label>
          <Input
            id="latitudeDMS"
            className="col-span-2 h-8"
            value={coordsDMS.latitude}
            onChange={(e) => {
              setCoordsDMS({
                ...coordsDMS,
                latitude: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="longitudeDMS">Longitude</Label>
          <Input
            id="longitudeDMS"
            className="col-span-2 h-8"
            value={coordsDMS.longitude}
            onChange={(e) => {
              setCoordsDMS({
                ...coordsDMS,
                longitude: e.target.value,
              });
            }}
          />
        </div>
        <Button onClick={convertDMS2DD}>Convert</Button>
        <p className="text-foreground underline">DD</p>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="latitudeDD">Latitude</Label>
          <Input
            id="latitudeDD"
            className="col-span-2 h-8"
            disabled
            value={coordsDD.latitude}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="longitudeDD">Longitude</Label>
          <Input
            id="longitudeDD"
            className="col-span-2 h-8"
            disabled
            value={coordsDD.longitude}
          />
        </div>
      </div>
    </div>
  );
}
