import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Chart  from 'chart.js/auto';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @ViewChild('chartCanvas') myChartCanvas!: ElementRef;
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  sum: number = 0;
  balance: Map<string, number> = new Map<string, number>([["positive", 0],["negative", 0]]);
  constructor(private csvService: CsvService){}
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.csvService.getCsvData().subscribe({
      next: (data) => {
        this.errorMessage = null;
        this.sum = this.csvService.sumColumn('Valor');
        this.balance = this.csvService.getAccountBalance();
        this.generateChart();
        this.generatePie();
      },
      error: (error) => {
        console.error('Error getting CSV data:', error);
        this.errorMessage = 'Error getting CSV data';
      }
  });
  }
  generateChart() {
    const ctx: CanvasRenderingContext2D = this.myChartCanvas.nativeElement.getContext('2d');
    const sumByDescription = this.csvService.getSumByDescription();
    const chartData = {
      labels: Array.from(sumByDescription.keys()),
      datasets: [
        {
          label: 'Gastos',
          data: Array.from(sumByDescription.values()),
          backgroundColor: Array.from(sumByDescription.values()).map(value => value >= 0 ? 'rgba(54, 162, 235, 0.7)' : 'rgba(255, 99, 132, 0.7)'),
          borderWidth: 1,
        },
      ],
    };
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            display: false
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  generatePie() {
    const ctx: CanvasRenderingContext2D = this.pieCanvas.nativeElement.getContext('2d');
    const sumByType = this.csvService.getSumByDescription(true);
    const chartData = {
      labels: Array.from(sumByType.keys()),
      datasets: [
        {
          label: 'Valor',
          data: Array.from(sumByType.values())
        },
      ],
    };
    new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: {
        responsive: true,
      },
    });
  }
}
