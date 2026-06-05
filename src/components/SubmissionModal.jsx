import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useSubmitAssignment } from '/src/hooks/useStudent.js';

const SubmissionModal = ({
  isOpen,
  onClose,
  courseId,
  material,
  courseSlug,
}) => {
  // Tambahkan courseSlug sebagai prop
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: submit, isPending } = useSubmitAssignment();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('submissionFile', data.submissionFile[0]);
    submit(
      { courseId, materialId: material._id, formData, courseSlug },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Kumpulkan Tugas
        </h2>
        <p className="text-gray-600 mb-6">
          Untuk materi: <span className="font-semibold">{material?.title}</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih File Tugas
            </label>
            <input
              type="file"
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              {...register('submissionFile', {
                required: 'Anda harus memilih file.',
              })}
            />
            {errors.submissionFile && (
              <p className="text-red-500 text-xs mt-2">
                {errors.submissionFile.message}
              </p>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isPending ? 'Mengunggah...' : 'Kumpulkan'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SubmissionModal;
