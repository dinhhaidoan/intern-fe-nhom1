// components/admin/CategoryFormModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import type { Category } from '../../types';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  editingCategory: Category | null;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: editingCategory || { name: '', slug: '', description: '' }
  });

  const name = watch('name');

  React.useEffect(() => {
    if (editingCategory) {
      reset({ 
        name: editingCategory.name, 
        slug: editingCategory.slug, 
        description: editingCategory.description 
      });
    } else {
      reset({ name: '', slug: '', description: '' });
    }
  }, [editingCategory, reset]);

  // Auto-generate slug from name
  React.useEffect(() => {
    if (!editingCategory && name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setValue('slug', slug);
    }
  }, [name, editingCategory, setValue]);

  const handleFormSubmit = (data: CategoryFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={editingCategory ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: 'Tên danh mục là bắt buộc' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập tên danh mục"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            {...register('slug', { required: 'Slug là bắt buộc' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="ten-danh-muc"
          />
          {errors.slug && (
            <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">URL thân thiện cho danh mục</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mô tả
          </label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập mô tả danh mục"
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {editingCategory ? 'Cập nhật' : 'Thêm Danh mục'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </Modal>
  );
};