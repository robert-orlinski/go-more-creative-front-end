import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getTopicsFromApi } from '../../utils/requests';

import { getRandomItemFromArray } from '../../helpers/functions';
import { TopicsType } from '../types';

export const statusMessages = {
  pending: 'loading...',
  fulfilled: undefined,
  rejected: "couldn't fetch topics.",
};

export const initialState: TopicsType = {
  list: [],
  currentTopic: {
    _id: '',
    name: '',
    level: 'easy',
  },
  statusMessage: statusMessages.pending,
};

export const fetchTopics = createAsyncThunk('topics/fetchTopics', async () => {
  const response = await getTopicsFromApi();
  const data = await response.json();

  return data;
});

const slice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    selectedRandomTopic: (state) => ({
      ...state,
      currentTopic: getRandomItemFromArray(state.list),
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTopics.pending, (state) => ({
        ...state,
        statusMessage: statusMessages.pending,
      }))
      .addCase(fetchTopics.fulfilled, (state, { payload }) => ({
        list: payload,
        currentTopic: getRandomItemFromArray(payload),
        statusMessage: statusMessages.fulfilled,
      }))
      .addCase(fetchTopics.rejected, (state) => ({
        ...state,
        statusMessage: statusMessages.rejected,
      })),
});

export const { selectedRandomTopic } = slice.actions;

export default slice.reducer;
