export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        <div className="border-4 border-gray-200 rounded-full w-12 h-12"></div>
        <div className="top-0 absolute border-4 border-purple-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
      <span className="ml-4 text-gray-700 text-lg">Cargando...</span>
    </div>
  );
}
