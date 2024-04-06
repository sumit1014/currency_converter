// currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = `https://openexchangerates.org/api/latest.json?app_id=46476186f66b47529e5d121137749903`;
  public currenciesRates: any = {};

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateExchangeRates(): void {
    this.getExchangeRates().subscribe(data => {
      this.currenciesRates = data.rates;
    });
  }
}