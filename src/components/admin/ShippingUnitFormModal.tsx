import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import type { ShippingUnit } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (unit: ShippingUnit) => void;
  editing?: ShippingUnit | null;
}

export const ShippingUnitFormModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, editing }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [estimatedDays, setEstimatedDays] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setCode(editing.code);
      setPrice(editing.price);
      setEstimatedDays(editing.estimatedDays || '');
      setActive(editing.active);
    } else {
      setName(''); setCode(''); setPrice(0); setEstimatedDays(''); setActive(true);
    }
  }, [editing, isOpen]);

  const handleSubmit = () => {
    const unit: ShippingUnit = {
      id: editing?.id || Date.now().toString(),
      name,
      code,
      price,
      estimatedDays,
      active,
    };
    onSubmit(unit);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Chỉnh sửa đơn vị' : 'Thêm đơn vị'} size="md">
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">Tên</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">Mã</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">Phí (VNĐ)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">Thời gian dự kiến</label>
          <input value={estimatedDays} onChange={(e) => setEstimatedDays(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          <div className="text-sm text-gray-700 dark:text-gray-300">Kích hoạt</div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Hủy</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Lưu</button>
        </div>
      </div>
    </Modal>
  );
};
