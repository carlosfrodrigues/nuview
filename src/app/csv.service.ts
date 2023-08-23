import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private csvDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor() { }

  readCsv(file: File): void {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        this.csvDataSubject.next(result.data);
      },
      error: (error) => {
        console.error('Error reading CSV:', error);
        this.csvDataSubject.next([]);
      }
    });
  }

  getCsvData(): Observable<any[]> {
    return this.csvDataSubject.asObservable();
  }
  
  sumColumn(columnName: string): number {
    let sum = 0;
    this.csvDataSubject.getValue().forEach((row) => {
      const cellValue = parseFloat(row[columnName]);
      if (!isNaN(cellValue)) {
        sum += cellValue;
      }
    });
    return sum;
  }
  getAccountBalance(): Map<string, number> {
    const accountBalanceMap = new Map<string, number>([["positive", 0],["negative", 0]]);
    this.csvDataSubject.getValue().forEach((row) => {
      if (row['Valor'] >= 0) {
        const currentSum = accountBalanceMap.get("positive") || 0;
        accountBalanceMap.set("positive", currentSum + parseFloat(row['Valor']));
      }else{
        const currentSum = accountBalanceMap.get("negative") || 0;
        accountBalanceMap.set("negative", currentSum + parseFloat(row['Valor']));
      }
    });
    accountBalanceMap.set("positive", parseFloat((accountBalanceMap.get("positive")as number).toFixed(2)));
    accountBalanceMap.set("negative", parseFloat((accountBalanceMap.get("negative")as number).toFixed(2)));

    return accountBalanceMap;
  }
  getSumByDescription(type: boolean = false): Map<string, number> {
    const descriptionSumMap = new Map<string, number>();

    this.csvDataSubject.getValue().forEach((row) => {
      
      const description = type ? row['Descrição'].split("-")[0] : row['Descrição'].split("-")[1];
      const value = Number(row['Valor']);

      if (description && !isNaN(value)) {
        if (descriptionSumMap.has(description)) {
          const currentSum = descriptionSumMap.get(description) || 0;
          descriptionSumMap.set(description, currentSum + value);
        } else {
          descriptionSumMap.set(description, value);
        }
      }
    });

    return descriptionSumMap;
  }

  
}