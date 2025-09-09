/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form'; // 1. Tambahkan 'useFieldArray'
import Modal from '/src/components/Modal.jsx';
import { useCreateMaterial, useUpdateMaterial } from '/src/hooks/useAdmin.js';
import TinyMCEEditor from '/src/components/TinyMCEEditor.jsx';

// Komponen terpisah untuk mengelola Opsi Jawaban
const OptionsArray = ({ control, nestIndex, register, getValues }) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `testContent.${nestIndex}.options`,
  });

  return (
    <div className="pl-4 space-y-2">
      <label className="text-sm font-medium">
        Opsi Jawaban (Pilih satu jawaban yang benar):
      </label>
      {fields.map((item, k) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="radio"
            name={`correctOption_${nestIndex}`}
            onChange={() => {
              // PERBAIKAN: Ambil nilai terkini dari form
              const options = getValues(`testContent.${nestIndex}.options`);

              options.forEach((option, idx) => {
                // Update dengan mempertahankan optionText yang sudah ada
                update(idx, {
                  ...option, // <-- Gunakan data terkini dari 'options'
                  isCorrect: idx === k,
                });
              });
            }}
            checked={item.isCorrect}
          />
          <input
            {...register(`testContent.${nestIndex}.options.${k}.optionText`, {
              required: true,
            })}
            placeholder={`Opsi ${k + 1}`}
            className="flex-grow border rounded p-1"
          />
          <button
            type="button"
            onClick={() => remove(k)}
            className="text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ optionText: '', isCorrect: false })}
        className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
      >
        + Tambah Opsi
      </button>
    </div>
  );
};

// Komponen Modal Utama
const MaterialFormModal = ({
  isOpen,
  onClose,
  mode,
  currentMaterial,
  courseId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      testContent: [], // 2. Tambahkan defaultValues untuk tes
    },
  });

  // 3. Tambahkan hook useFieldArray untuk pertanyaan
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testContent',
  });

  const { mutate: createMaterial, isPending: isCreating } = useCreateMaterial();
  const { mutate: updateMaterial, isPending: isUpdating } = useUpdateMaterial();

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && currentMaterial) {
        reset({
          title: currentMaterial.title,
          description: currentMaterial.description,
          testContent: currentMaterial.testContent || [], // Reset dengan data tes jika ada
        });
      } else {
        reset({
          title: '',
          description: '',
          testContent: [],
        });
      }
    }
  }, [isOpen, mode, currentMaterial, reset]);

  const onSubmit = (data) => {
    // Hapus testContent jika kosong agar tidak tersimpan di DB
    const handleSuccess = () => {
      reset(); // <-- PERBAIKAN: Reset form di sini
      onClose(); // Kemudian tutup modal
    };
    if (data.testContent?.length === 0) {
      delete data.testContent;
    }

    if (mode === 'edit') {
      updateMaterial(
        { courseId, materialId: currentMaterial._id, materialData: data },
        { onSuccess: handleSuccess }
      );
    } else {
      createMaterial(
        { courseId, materialData: data },
        { onSuccess: handleSuccess }
      );
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Materi' : 'Tambah Materi Baru'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
        >
          <div>
            <label className="block text-sm font-medium">Judul Materi</label>
            <input
              {...register('title', { required: 'Judul wajib diisi' })}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Deskripsi wajib diisi' }}
              render={({ field: { onChange, value } }) => (
                <TinyMCEEditor
                  value={value}
                  onChange={onChange}
                  placeholder="Tulis deskripsi materi di sini..."
                  height={300}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <hr />

          {/* 4. TAMBAHKAN KEMBALI BAGIAN FORM UNTUK MEMBUAT TES */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Buat Tes (Opsional)</h3>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="p-4 border rounded-md mb-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <label className="font-semibold">
                    Pertanyaan #{index + 1}
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Hapus Pertanyaan
                  </button>
                </div>
                <input
                  {...register(`testContent.${index}.questionText`, {
                    required: true,
                  })}
                  placeholder="Tulis pertanyaan di sini"
                  className="w-full border rounded p-2"
                />
                <Controller
                  name={`testContent.${index}.options`}
                  control={control}
                  render={({ field }) => (
                    <OptionsArray
                      control={control}
                      nestIndex={index}
                      register={register}
                      getValues={getValues}
                    />
                  )}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({
                  questionText: '',
                  options: [
                    { optionText: '', isCorrect: true },
                    { optionText: '', isCorrect: false },
                  ],
                })
              }
              className="mt-2 text-sm bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              + Tambah Pertanyaan
            </button>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
            >
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MaterialFormModal;
