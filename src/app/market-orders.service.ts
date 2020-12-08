import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppStates } from './marketdata.reducer';
import { bid } from './marketdata.actions';

declare global {
  interface Window {
    PubNub: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MarketOrdersService {
  pubnub;

  constructor(private store: Store<AppStates>) {
    this.pubnub = new window.PubNub({
      subscribeKey: 'sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe',
    });

    this.pubnub.addListener({
      message: ({ message }) => this.store.dispatch(bid(message)),
    });

    this.pubnub.subscribe({
      channels: ['pubnub-market-orders'],
    });
  }
}
