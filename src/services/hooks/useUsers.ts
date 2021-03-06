import { useQuery, UseQueryOptions } from 'react-query';
import { api } from '../api';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get('users', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])

    //this is to format the date
    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })

        }
    });

    return {
        users,
        totalCount
    };
}

//this will return the users
export function useUsers(page: number)  { //options: UseQueryOptions) {
    return  useQuery(['users', page], () => getUsers(page), {
        //this is for be in fresh for 5s, this way, if you change windows during
        //this time, it will not refresh the data
        staleTime: 1000 * 60 * 10, //10 minutes
        //...options,
    })
}