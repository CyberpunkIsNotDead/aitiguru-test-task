import { useForm } from '@tanstack/react-form';
import type { LoginCredentials } from '../api/auth';

const validateLoginForm = ({ value }: { value: LoginCredentials }) => {
  if (!value.username.trim()) {
    console.error('Username cannot be empty');
    return {
      username: 'Username cannot be empty',
    };
  }
  if (!value.password.trim()) {
    console.error('Password cannot be empty');
    return {
      password: 'Password cannot be empty',
    };
  }
  return undefined;
};

export const useLoginForm = ({
  onSubmit,
}: {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: LoginCredentials) => Promise<void>;
}) => {
  return useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onChange: validateLoginForm,
      onSubmit: validateLoginForm,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
};

export type { LoginCredentials };
