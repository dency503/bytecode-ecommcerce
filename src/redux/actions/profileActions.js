import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_ADDRESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,UPDATE_ADDRESS_SUCCESS
} from '@/constants/constants';

export const clearProfile = () => ({
  type: CLEAR_PROFILE
});

export const setProfile = (user) => ({
  type: SET_PROFILE,
  payload: user
});

export const updateAddress = (address) => ({
  type: UPDATE_ADDRESS,
  payload: address
});


export const updateProfile = (newProfile) => ({
  type: UPDATE_PROFILE,
  payload: {
    updates: newProfile.updates,
    files: newProfile.files,
    credentials: newProfile.credentials
  }
});

export const updateProfileSuccess = (updates) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates
});

export const updateAddressSuccess = (updates) => ({
  type: UPDATE_ADDRESS_SUCCESS,
  payload: updates
});