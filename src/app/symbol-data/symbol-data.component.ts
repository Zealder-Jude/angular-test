import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Chart from 'chart.js';
import { BreakpointObserver } from '@angular/cdk/layout';

import { AppStates } from '../marketdata.reducer';

@Component({
  selector: 'app-symbol-data',
  templateUrl: './symbol-data.component.html',
  styleUrls: ['./symbol-data.component.scss'],
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class SymbolDataComponent implements OnInit {
  symbol$: Observable<string>;
  bidPrice$: Observable<number>;
  bidDiff$: Observable<number>;
  diffChange: string;
  diffPercent: string;
  chart: any;
  chartData$: Observable<Array<number>>;
  isSmallScreen: boolean;

  constructor(
    private store: Store<AppStates>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.symbol$ = this.store.select((states) =>
      this.stateSelect('currentSymbol', states.marketdata)
    );

    this.bidPrice$ = this.store.select((states) =>
      this.stateSelect('bidPrice', states.marketdata)
    );

    this.bidDiff$ = this.store.select((states) =>
      this.stateSelect('bidDiff', states.marketdata)
    );

    this.onResize();
  }

  ngOnInit() {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'bids',
            data: null,
            backgroundColor: '#d6cce8',
            borderColor: '#9e86ca',
          },
        ],
      },
      options: { tooltips: { enabled: false } },
    });
  }

  stateSelect(prop, state) {
    let symbol = state.currentSymbol;
    let symbolArr = state.bids[symbol];

    switch (prop) {
      case 'currentSymbol':
        return symbol;
      case 'bidPrice':
        if (symbolArr?.length > 0) {
          this.chart.data.datasets[0].data = symbolArr.map(
            (data) => data.bid_price
          );
          this.chart.data.labels = symbolArr.map((data) =>
            new Date(data.timestamp * 1000).toLocaleTimeString('en-US')
          );
          this.chart.update();
          return symbolArr[symbolArr.length - 1].bid_price;
        } else return null;
      case 'bidDiff':
        if (symbolArr?.length > 1) {
          let diff =
            symbolArr[symbolArr.length - 1].bid_price -
            symbolArr[symbolArr.length - 2].bid_price;
          this.diffChange =
            diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'none';
          let diffPercent =
            (diff / symbolArr[symbolArr.length - 1].bid_price) * 100;
          this.diffPercent =
            diffPercent.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + '%';
          return diff.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        } else return '0.00';
    }
  }

  onResize() {
    this.isSmallScreen = this.breakpointObserver.isMatched(
      '(max-width: 599px)'
    );
  }
}
