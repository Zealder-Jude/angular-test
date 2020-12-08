import { Action, createReducer, on } from '@ngrx/store';
import { selectSymbol, bid } from './marketdata.actions';

export interface State {
  currentSymbol: string;
  bids: Object;
}

export interface AppStates {
  marketdata: State;
}

export const initialState: State = { currentSymbol: 'Apple', bids: {} };

const _marketdataReducer = createReducer(
  initialState,
  on(selectSymbol, (state, { symbol }) =>
    Object.assign({}, state, { currentSymbol: symbol })
  ),
  on(bid, (state, prop) => {
    let bids = Object.assign({}, state.bids);
    if (!bids[prop.symbol]) {
      // when it's first bid on a symbol
      bids[prop.symbol] = [];
    }
    let sliced = bids[prop.symbol].slice(-7);
    bids[prop.symbol] = [...sliced, {
      bid_price: prop.bid_price,
      order_quantity: prop.order_quantity,
      symbol: prop.symbol,
      timestamp: prop.timestamp,
      trade_type: prop.trade_type,
    }];
    return Object.assign({}, state, { bids: bids });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return _marketdataReducer(state, action);
}
