export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2 font-open">
      <h1 className="font-bold text-center uppercase">Loading</h1>
      <div className="flex items-center justify-center">
        <div className="relative block w-10 h-6 loader-dots">
          <div className="absolute top-0 my-2.5 w-1.5 h-1.5 rounded-full bg-white opacity-75"></div>
          <div className="absolute top-0 my-2.5 w-1.5 h-1.5 rounded-full bg-white opacity-75"></div>
          <div className="absolute top-0 my-2.5 w-1.5 h-1.5 rounded-full bg-white opacity-75"></div>
          <div className="absolute top-0 my-2.5 w-1.5 h-1.5 rounded-full bg-white opacity-75"></div>
        </div>
      </div>
    </div>
  );
}
