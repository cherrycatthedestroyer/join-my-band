import { getTimeSince } from "../../scripts/helper";

export const Comment: React.FC<{
  name: string;
  content: string;
  time: string;
}> = ({ name, content, time }) => {
  return (
    <div className="bg-white shadow-md rounded mb-2 flex flex-col gap-2 p-4">
      <div className="flex justify-between">
        <h2 className="text-sm md:mb-2 text-slate-700 mb-2 font-semibold">
          {name}
        </h2>
        <h2 className="text-sm md:mb-2 text-slate-500 mb-2">
          {getTimeSince(time)}
        </h2>
      </div>
      <p className="text-left font-normal text-stone-700 text-xs">{content}</p>
    </div>
  );
};
