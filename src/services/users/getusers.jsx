import api from '../api';
import { useQuery } from '@tanstack/react-query';
// This module defines functions for interacting with your /users mock API endpoint using the api instance from api.js. This basically only for fetching data
//fetchUsers: this is an asynchronous function that makes a GET request to /users using api.get() and returns the response data which will be list of users
const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
//This is custom react Hook that usese tanstack query hook name as use query hook to fetch the users dats
//queryKey: ['users']: This is a unique key used by TanStack Query to identify and cache the results of this query.
//queryFn: fetchUsers: This is the function that will be called to actually fetch the data when the query needs to be executed.
//whenever we use useUsers in the component it returns object containing isLoading error isError and data
export const useUsers = () => {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};