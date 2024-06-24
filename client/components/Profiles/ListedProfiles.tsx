import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ProfileType } from '@/Types';
import axios, { AxiosResponse } from 'axios';
import { useDataContext } from '@/context/globalContext';

// TODO: move axios into ApiService
const API_URL = 'http://localhost:3000'
export const axiosAllProfiles = async (userId: number): Promise<ProfileType[]> => {
    try {
        const response: AxiosResponse<ProfileType[]> = await axios.get(`${API_URL}/users/${userId}/profiles`);
        return response.data;
    } catch (e) {
        console.log('error getting profiles', e);
        throw e;
    }
};



const ListedProfiles = () => {
    const {user, profiles, setProfiles, setSelectedProfile } = useDataContext();

    if (!user) {
        return null
    }

    useEffect(()=> {

    }, [])

    setProfiles = axiosAllProfiles(user.id)


  return (
    <View>
      <Text>ListedProfiles</Text>
    </View>
  )
}

export default ListedProfiles