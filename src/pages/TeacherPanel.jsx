import React from "react";
import Card from "../components/Card";
import tasksData from "../data/tasks.json";
import coursesData from "../data/courses.json";

export default function TeacherPanel() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Панель учителя</h2>

      <Card title="Домашние задания по курсам">
        {Object.entries(coursesData).map(([key, course]) => (
          <div key={key} className="mb-4">
            <h3 className="font-semibold mb-2">{course.title}</h3>
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="ml-4 text-sm">
                <p className="font-medium">{lesson.title}</p>
                <ul className="list-disc ml-5 text-gray-700">
                  {lesson.homework.map((id) => {
                    const task = tasksData.find((t) => t.id === id);
                    return (
                      <li key={id}>{task?.question || "— вопрос не найден —"}</li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </Card>

      <Card title="Комментарии к работам (в будущем)">
        <p className="text-gray-600 text-sm">
          Здесь будет возможность оставлять комментарии к домашним заданиям
          учеников и отмечать их как «Принято» или «Требует доработки».
        </p>
      </Card>
    </div>
  );
}
