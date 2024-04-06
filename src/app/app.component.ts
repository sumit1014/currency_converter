import { Component , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  currencies: any = [];
  selectedFromCurrency: string = 'USD';
  selectedToCurrency: string = 'INR';
  amount: number = 1;
  convertedAmount: number = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe(data => {
      this.currencies = Object.keys(data.rates);
      this.currencyService.updateExchangeRates();
      this.convertCurrency();
    });
  }
  convertCurrency(): void {
    const fromRate = this.currencyService.currenciesRates[this.selectedFromCurrency];
    const toRate = this.currencyService.currenciesRates[this.selectedToCurrency];
    this.convertedAmount = (this.amount / fromRate) * toRate;
  }
}