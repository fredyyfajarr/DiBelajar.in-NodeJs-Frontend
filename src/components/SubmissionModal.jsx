import React from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, FileUp } from 'lucide-react';
import Modal from './Modal';
import { useSubmitAssignment } from '/src/hooks/useStudent.js';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ['zip', 'pdf', 'doc', 'docx', 'txt', 'rar'];

const getFileExtension = (fileName = '') =>
  fileName.split('.').pop()?.toLowerCase();

const SubmissionModal = ({
  isOpen,
  onClose,
  courseId,
  material,
  courseSlug,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate: submit, isPending } = useSubmitAssignment();

  const handleClose = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!data.submissionFile?.[0]) return;

    const formData = new FormData();
    formData.append('submissionFile', data.submissionFile[0]);
    submit(
      { courseId, materialId: material._id, formData, courseSlug },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      <div className="w-full p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <FileUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Kumpulkan tugas
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {material?.title || 'Materi pilihan'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <label className="block text-sm font-semibold text-gray-800">
              File tugas
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Format: PDF, DOC, DOCX, TXT, ZIP, atau RAR. Maksimal{' '}
              {MAX_FILE_SIZE_MB}MB.
            </p>
            <input
              type="file"
              accept={ACCEPTED_EXTENSIONS.map((extension) => `.${extension}`).join(
                ','
              )}
              className="mt-4 w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/15"
              {...register('submissionFile', {
                required: 'Anda harus memilih file.',
                validate: {
                  fileType: (files) => {
                    const extension = getFileExtension(files?.[0]?.name);
                    return (
                      ACCEPTED_EXTENSIONS.includes(extension) ||
                      'Format file belum didukung.'
                    );
                  },
                  fileSize: (files) =>
                    files?.[0]?.size <= MAX_FILE_SIZE ||
                    `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`,
                },
              })}
            />
            {errors.submissionFile && (
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-600">
                <AlertCircle className="h-4 w-4" />
                {errors.submissionFile.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
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
