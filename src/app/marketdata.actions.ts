import { createAction, props } from '@ngrx/store';

export const selectSymbol = createAction(
  '[Root Component] selectSymbol',
  props<{ symbol: string }>()
);
export const bid = createAction(
  '[Root Component] bid',
  props<{
    bid_price: number;
    order_quantity: number;
    symbol: string;
    timestamp: number;
    trade_type: string;
  }>()
);
