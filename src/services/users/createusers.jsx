import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//userData is the updated data that we need to update and it will return updated data by adding that new user data into dashboard
const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};
//Custom hook
export const useCreateUser = () => {
    //query client i have imported for quickly access cache
  const queryClient = useQueryClient();
  // Imports the useMutation hook for performing actions that modify data on the server
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); //This line tells tanStack qery that the data associated with the ['users'] query key (which is used by useUsers to fetch the list of users) is now outdated. This will trigger a background refetch of the user data the next time a component using
    },
    onError: (error) => {
      console.error('Error creating user: ', error);//if mutation fun fails then this error
    },
  });
};