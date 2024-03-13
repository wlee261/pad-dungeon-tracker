import { FloorSection } from "@/components/floor-section";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="my-4">March Challenge Floor 15</h1>
      <div className="w-full max-w-screen-xl rounded border border-black p-4">
        <FloorSection floorNum={1} />
      </div>
    </div>
  );
}
