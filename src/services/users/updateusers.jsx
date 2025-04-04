import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateUser = async ({ id, userData }) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error updating user: ', error);
    },
  });
};