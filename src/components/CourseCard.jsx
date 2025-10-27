export default function CourseCard({ title, tag = "Начальный", onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="text-left group w-full sm:w-72 border border-cyan-200 rounded-2xl p-4 bg-white/90 hover:bg-cyan-50 transition-all shadow-sm hover:shadow-md"
    >
      <div className="h-28 rounded-xl mb-3 bg-gradient-to-br from-cyan-100 to-white border border-cyan-100" />
      <div className="text-sm text-cyan-700 mb-1">{tag}</div>
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-500">Открыть →</div>
    </button>
  );
}
