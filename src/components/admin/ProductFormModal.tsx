// components/admin/ProductFormModal.tsx 
import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import { useAdminStore } from '../../stores/adminStore';
import type { Product } from '../../types';

interface ProductFormData {
  code?: string;
  name: string;
  price: number;
  categoryId: string;
  stock: number;
  description: string;
  image: string;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  editingProduct: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
}) => {
  const { categories } = useAdminStore();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: editingProduct 
      ? {
          code: editingProduct.code || '',
          name: editingProduct.name,
          price: editingProduct.price,
          categoryId: editingProduct.categoryId || '',
          stock: editingProduct.stock,
          description: editingProduct.description,
          image: editingProduct.image,
        }
      : {
          code: '',
          name: '',
          price: 0,
          categoryId: '',
          stock: 0,
          description: '',
          image: ''
        }
  });

  // Local preview state for uploaded image
  const [preview, setPreview] = React.useState<string>('');

  // Watch image field so we can keep preview in sync when url is typed
  const watchedImage = watch('image');

  React.useEffect(() => {
    if (!watchedImage) return;
    // If the image is a data URL or remote URL, use it for preview
    setPreview(watchedImage);
  }, [watchedImage]);

  // Lọc danh mục active
  const activeCategories = categories.filter(cat => cat.status === 'active');

  React.useEffect(() => {
    if (editingProduct) {
      reset({
        code: editingProduct.code || '',
        name: editingProduct.name,
        price: editingProduct.price,
        categoryId: editingProduct.categoryId || '',
        stock: editingProduct.stock,
        description: editingProduct.description,
        image: editingProduct.image,
      });
      // initialize preview from editing product image
      setPreview(editingProduct.image || '');
    } else {
      reset({
        code: '',
        name: '',
        price: 0,
        categoryId: '',
        stock: 0,
        description: '',
        image: ''
      });
      setPreview('');
    }
  }, [editingProduct, reset]);

  const handleFormSubmit = (data: ProductFormData) => {
    // Tìm tên danh mục từ categoryId
    const category = categories.find(cat => cat.id === data.categoryId);
    const productData = {
      code: data.code || '',
      ...data,
      category: category?.name || '',
    };
    onSubmit(productData as any);
    reset();
    setPreview('');
  };

  // Handle file input change: convert to data URL and set form's image field
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setValue('image', result, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePreview = () => {
    setPreview('');
    setValue('image', '');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mã sản phẩm (SKU)
            </label>
            <input
              {...register('code')}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập mã sản phẩm (ví dụ: IP15PM256)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name', { required: 'Vui lòng nhập tên sản phẩm' })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('price', { 
                required: 'Vui lòng nhập giá',
                min: { value: 0, message: 'Giá phải lớn hơn 0' }
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập giá"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              {...register('categoryId', { required: 'Vui lòng chọn danh mục' })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">-- Chọn danh mục --</option>
              {activeCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Số lượng <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('stock', { 
                required: 'Vui lòng nhập số lượng',
                min: { value: 0, message: 'Số lượng phải >= 0' }
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập số lượng"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mô tả
          </label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập mô tả sản phẩm"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL Hình ảnh
          </label>
          <div className="flex gap-3 items-start">
            <input
              {...register('image')}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập URL hình ảnh"
            />

            {/* File upload input */}
            <div className="flex flex-col items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-700 dark:text-gray-200">
                Tải lên
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              {preview ? (
                <div className="relative w-20 h-20 rounded overflow-hidden border border-gray-200 dark:border-gray-600">
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemovePreview}
                    aria-label="Xóa ảnh"
                    className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg"
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {editingProduct ? 'Cập nhật' : 'Thêm'}
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