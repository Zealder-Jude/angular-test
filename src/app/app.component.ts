import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppStates } from './marketdata.reducer';
import { selectSymbol } from './marketdata.actions';
import { MarketOrdersService } from './market-orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  symbol$: Observable<string>;
  symbols$: Observable<Array<string>>;

  constructor(
    private store: Store<AppStates>,
    private marketOrdersService: MarketOrdersService
  ) {
    this.symbol$ = this.store.select(
      (states) => states?.marketdata?.currentSymbol
    );

    this.symbols$ = this.store.select((states) => {
      let symbols = [];
      for (const prop in states?.marketdata?.bids) {
        if (states?.marketdata?.currentSymbol !== prop) {
          symbols.push(prop);
        }
      }
      return symbols;
    });
  }

  changeSymbol(symbol) {
    this.store.dispatch(selectSymbol({ symbol }));
  }
}
