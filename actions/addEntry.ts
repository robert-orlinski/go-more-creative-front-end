import { Dispatch } from 'react';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { addEntryToApi } from '../utils/requests';

import { EntryType, FetchedEntryType } from '../types/global';

import { add } from '../store/entriesSlice';
import { selectRandom } from '../store/topicsSlice';

export const addEntry =
  (data: EntryType, setError: UseFormSetError<FieldValues>) =>
  async (dispatch: Dispatch<{ payload?: FetchedEntryType; type: string }>) => {
    const saveEntry = await addEntryToApi(data);
    const savedEntry = await saveEntry.json();

    const isEntrySaved = saveEntry.ok;

    if (isEntrySaved) {
      dispatch(add(savedEntry));
      dispatch(selectRandom());
    } else {
      const errorMessage = await saveEntry.text();

      setError('form', {
        type: 'server',
        message: errorMessage,
      });
    }
  };
