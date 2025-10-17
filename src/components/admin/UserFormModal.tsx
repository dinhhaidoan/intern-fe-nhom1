// components/admin/UserFormModal.tsx 
import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import type { User } from '../../types';

interface UserFormData {
  name: string;
  email: string;
  password?: string;
}

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  editingUser: User | null;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingUser,
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    defaultValues: editingUser 
      ? { 
          name: editingUser.name, 
          email: editingUser.email,
          password: '' 
        }
      : { name: '', email: '', password: '' }
  });

  React.useEffect(() => {
    if (editingUser) {
      reset({ name: editingUser.name, email: editingUser.email, password: '' });
    } else {
      reset({ name: '', email: '', password: '' });
    }
  }, [editingUser, reset]);

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={editingUser ? 'Sửa User' : 'Thêm User'}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tên <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: 'Vui lòng nhập tên' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập tên user"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email', { 
              required: 'Vui lòng nhập email',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email không hợp lệ'
              }
            })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mật khẩu {!editingUser && <span className="text-red-500">*</span>}
          </label>
          <input
            type="password"
            {...register('password', { 
              required: !editingUser ? 'Vui lòng nhập mật khẩu' : false,
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự'
              }
            })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={editingUser ? "Để trống nếu không đổi mật khẩu" : "Nhập mật khẩu"}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
          {editingUser && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Chỉ nhập mật khẩu nếu muốn thay đổi
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {editingUser ? 'Cập nhật' : 'Thêm'}
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