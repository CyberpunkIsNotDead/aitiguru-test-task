import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Add.module.scss';

import { useLogout } from '@/features/user/api/auth';
import { useToast } from '@/shared/lib/useToast';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Page } from '@/shared/ui/Page';
import Toast from '@/shared/ui/Toast';

interface FormData {
  title: string;
  brand: string;
  sku: string;
  price: string | number;
}

const Add = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const { toast, showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    brand: '',
    sku: '',
    price: '',
  });

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    // Check if at least one field has a value
    const hasValue = Object.values(formData).some((value) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      if (typeof value === 'number') {
        return !isNaN(value) && value > 0;
      }
      return false;
    });

    if (hasValue) {
      // Success - show form data in toast
      const formDataString = Object.entries(formData)
        .filter(([, value]) => {
          if (typeof value === 'string') {
            return value.trim() !== '';
          }
          if (typeof value === 'number') {
            return !isNaN(value) && value > 0;
          }
          return false;
        })
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

      showToast('Успешно', formDataString, 'success');
    } else {
      // Error - show validation message
      showToast('Ошибка', 'Заполните минимум одно поле', 'error');
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Page
      header={
        <div className={styles['add-header']}>
          <h1>Добавить товар</h1>
          <Button variant='opaque' onClick={() => handleLogout()}>
            Выйти
          </Button>
        </div>
      }
    >
      <form className={styles['add-form']} onSubmit={handleSubmit}>
        <div className={styles['form-fields']}>
          <Input
            placeholder='Наименование'
            value={formData.title}
            onChange={handleInputChange('title')}
            className={styles['form-field']}
          />
          <Input
            placeholder='Вендор'
            value={formData.brand}
            onChange={handleInputChange('brand')}
            className={styles['form-field']}
          />
          <Input
            placeholder='Артикул'
            value={formData.sku}
            onChange={handleInputChange('sku')}
            className={styles['form-field']}
          />
          <Input
            placeholder='Цена'
            type='number'
            value={formData.price}
            onChange={handleInputChange('price')}
            className={styles['form-field']}
          />
        </div>

        <div className={styles['form-buttons']}>
          <Button type='submit'>Добавить</Button>
          <Button
            variant='opaque'
            onClick={() => {
              navigate('/');
            }}
          >
            Назад
          </Button>
        </div>
      </form>

      <Toast
        title={toast.title}
        description={toast.description}
        open={toast.open}
        onOpenChange={() => {
          /* empty */
        }}
        variant={toast.variant}
      />
    </Page>
  );
};

export default Add;
