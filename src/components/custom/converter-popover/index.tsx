import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GearIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloatingButton from "../floating-button";
import DMS2DD from "./dms2dd";
import DD2DMS from "./dd2dms";
import useConverterPopoverStore from "@/hooks/useConverterPopoverStore";

/**
 * Renders a Converter Popover component.
 * This component displays a popover with tabs for converting coordinates between DMS and DD formats.
 * @returns The Converter Popover component.
 */
export default function ConverterPopover() {
  const popoverOpen = useConverterPopoverStore((state) => state.popoverOpen);
  const setPopoverOpen = useConverterPopoverStore(
    (state) => state.setPopoverOpen
  );

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <FloatingButton>
          <GearIcon />
        </FloatingButton>
      </PopoverTrigger>
      <PopoverContent className="sm:w-96 mx-4">
        <Tabs defaultValue="dms2dd" className="w-full">
          <TabsList className="flex">
            <TabsTrigger
              value="dms2dd"
              className="flex-1 data-[state=active]:bg-sky-200"
            >
              DMS To DD
            </TabsTrigger>
            <TabsTrigger
              value="dd2dms"
              className="flex-1 data-[state=active]:bg-sky-200"
            >
              DD To DMS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dms2dd">
            <DMS2DD />
          </TabsContent>
          <TabsContent value="dd2dms">
            <DD2DMS />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
