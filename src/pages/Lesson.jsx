import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Lesson() {
  const nav = useNavigate();
  const downloadPdf = () => {
    const blob = new Blob([`Тестовый конспект урока. Сгенерировано EduMVP.`], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lesson-notes.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card title="Урок: Введение">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="aspect-video rounded-xl overflow-hidden border border-cyan-200 shadow">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/7RhFlrACEbI"
              title="Lesson video"
              allowFullScreen
            />
          </div>
          <div className="space-y-3">
            <p className="text-gray-600">Посмотри видео, затем открой конспект и переходи к заданиям.</p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={downloadPdf} className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition shadow">
                📘 Открыть конспект (PDF)
              </button>
              <button onClick={() => nav('/tasks')} className="px-4 py-2 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition">
                🧩 Перейти к заданиям
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
