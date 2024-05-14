import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DD2DMS() {
  const [coordsDD, setCoordsDD] = useState({
    latitude: "",
    longitude: "",
  });
  const [coordsDMS, setCoordsDMS] = useState({
    latitude: "",
    longitude: "",
  });
  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Convert Coordinate from DD to DMS
      </p>
      <p className="text-foreground underline">DD</p>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="latitudeDD">Latitude</Label>
          <Input
            id="latitudeDD"
            className="col-span-2 h-8"
            value={coordsDD.latitude}
            onChange={(e) => {
              setCoordsDD({
                ...coordsDD,
                latitude: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="longitudeDD">Longitude</Label>
          <Input
            id="longitudeDD"
            className="col-span-2 h-8"
            value={coordsDD.longitude}
            onChange={(e) => {
              setCoordsDD({
                ...coordsDD,
                longitude: e.target.value,
              });
            }}
          />
        </div>
        <Button>Convert</Button>
        <p className="text-foreground underline">DMS</p>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="latitudeDMS">Latitude</Label>
          <Input
            id="latitudeDMS"
            className="col-span-2 h-8"
            disabled
            value={coordsDMS.latitude}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="longitudeDMS">Longitude</Label>
          <Input
            id="longitudeDMS"
            className="col-span-2 h-8"
            disabled
            value={coordsDMS.longitude}
          />
        </div>
      </div>
    </div>
  );
}
