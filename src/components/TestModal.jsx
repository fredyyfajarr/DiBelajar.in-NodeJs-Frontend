import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useSubmitTestResult } from '/src/hooks/useStudent.js';

const TestModal = ({ isOpen, onClose, courseId, material, courseSlug }) => {
  // Tambahkan courseSlug sebagai prop
  const { register, handleSubmit } = useForm();
  const { mutate: submitResult, isPending } = useSubmitTestResult();
  const questions = material?.testContent || [];

  const onSubmit = (data) => {
    let correctAnswers = 0;
    const submittedAnswers = [];

    questions.forEach((question, index) => {
      const studentAnswerIndex = parseInt(data.answers[index], 10);
      const studentAnswer = question.options[studentAnswerIndex];
      if (studentAnswer?.isCorrect) {
        correctAnswers++;
      }
      submittedAnswers.push({
        questionId: question._id,
        answer: studentAnswer?.optionText || 'Tidak dijawab',
      });
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    submitResult(
      {
        courseId,
        materialId: material._id,
        resultData: { score, answers: submittedAnswers },
        courseSlug,
      },
      {
        onSuccess: () => {
          onClose(); // Tutup modal setelah semuanya berhasil
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Tes: {material?.title}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-h-[80vh] overflow-y-auto pr-2"
        >
          {questions.map((question, qIndex) => (
            <div
              key={question._id || qIndex}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <p className="font-semibold text-gray-900">
                {qIndex + 1}. {question.questionText}
              </p>
              <div className="pl-4 mt-3 space-y-2">
                {question.options.map((option, oIndex) => (
                  <label
                    key={option._id || oIndex}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <input
                      type="radio"
                      value={oIndex}
                      {...register(`answers.${qIndex}`, { required: true })}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    {option.optionText}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isPending ? 'Mengirim...' : 'Selesai & Kirim Jawaban'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TestModal;
