import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { InitialFavoriteType } from './index';
import { responseToOfferTypeAdapter } from '../../../shared/utils/response-adapter';
import { FavoriteRequestParams } from '../../../shared/consts';
import { favoriteRequestAction, fetchFavoriteOffersAction } from './actions';
import { OfferType } from '../../../shared/types';

const initialState: InitialFavoriteType = {
  favoriteOffers: [],
  isLoading: false,
};

const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFavoriteOffersAction.fulfilled,
        (state, { payload }: PayloadAction<OfferType[]>) => {
          state.isLoading = false;
          state.favoriteOffers = payload;
        }
      )
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.favoriteOffers = [];
      })
      .addCase(favoriteRequestAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(favoriteRequestAction.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.requestParams === `${FavoriteRequestParams.ADD}`) {
          const adaptedPayload = responseToOfferTypeAdapter(action.payload);
          state.favoriteOffers = [...state.favoriteOffers, adaptedPayload];
          toast.success('Added to favorites');
        }
        if (action.meta.arg.requestParams === `${FavoriteRequestParams.DEL}`) {
          state.favoriteOffers = state.favoriteOffers.filter(
            (offer) => offer.id !== action.payload.id
          );
          toast.success('Removed from favorites');
        }
      })
      .addCase(favoriteRequestAction.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.requestParams === `${FavoriteRequestParams.ADD}`) {
          toast.warn('Не смог связаться с сервером');
        }
        if (action.meta.arg.requestParams === `${FavoriteRequestParams.DEL}`) {
          toast.success('Removed from favorites');
        }
      });
  },
});

export default favoriteSlice;
