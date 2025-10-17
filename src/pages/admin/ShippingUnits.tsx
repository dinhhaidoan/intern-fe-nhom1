import React, { useState, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { FilterBar } from '../../components/common/FilterBar';
import { ShippingUnitsTable } from '../../components/admin/ShippingUnitsTable';
import { ShippingUnitFormModal } from '../../components/admin/ShippingUnitFormModal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import type { ShippingUnit } from '../../types';

export const ShippingUnits: React.FC = () => {
  const { shippingUnits, setShippingUnits } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<ShippingUnit | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

  const openCreate = useCallback(() => { setEditing(null); setIsModalOpen(true); }, []);

  const handleEdit = useCallback((u: ShippingUnit) => { setEditing(u); setIsModalOpen(true); }, []);

  const handleSubmit = useCallback((unit: ShippingUnit) => {
    if (shippingUnits.some(s => s.id === unit.id)) {
      setShippingUnits(shippingUnits.map(s => s.id === unit.id ? unit : s));
    } else {
      setShippingUnits([...shippingUnits, unit]);
    }
  }, [shippingUnits, setShippingUnits]);

  const handleToggle = useCallback((id: string) => {
    setShippingUnits(shippingUnits.map(s => s.id === id ? { ...s, active: !s.active } : s));
  }, [shippingUnits, setShippingUnits]);

  const handleDelete = useCallback((id: string) => setDeleteConfirm({ isOpen: true, id }), []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirm.id) {
      setShippingUnits(shippingUnits.filter(s => s.id !== deleteConfirm.id));
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm, shippingUnits, setShippingUnits]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Đơn vị vận chuyển</h1>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quản lý phương thức vận chuyển</div>
        </div>
        <div>
          <button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Thêm</button>
        </div>
      </div>

      <FilterBar searchValue={''} onSearchChange={() => {}} />

      <ShippingUnitsTable
        units={shippingUnits}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggle}
      />

      <ShippingUnitFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editing={editing}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Xóa đơn vị"
        message="Bạn có chắc muốn xóa đơn vị vận chuyển này?"
        confirmText="Xóa"
        type="danger"
      />
    </div>
  );
};
