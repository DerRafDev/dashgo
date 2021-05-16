import { useQuery } from 'react-query';
import { api } from '../api';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export async function getUsers(): Promise<User[]> {
    const { data } = await api.get('users')

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

    return users;
}

//this will return the users
export function useUsers() {
    return  useQuery('users', getUsers, {
        //this is for be in fresh for 5s, this way, if you change windows during
        //this time, it will not refresh the data
        staleTime: 1000 * 5, //5 s
    })
}