import { Component } from '@angular/core';
import { CsvService } from '../csv.service';
import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'app-csv-viewer',
  templateUrl: './csv-viewer.component.html',
  styleUrls: ['./csv-viewer.component.css']
})
export class CsvViewerComponent {
  csvData: any[] = [];
  sum: number = 0;
  errorMessage: string | null = null;

  constructor(private csvService: CsvService) {}

  ngOnInit(): void {
    this.csvService.getCsvData().subscribe({
      next: (data) => {
        this.csvData = data;
        this.errorMessage = null;
        this.sum = this.csvService.sumColumn('Valor');
      },
      error: (error) => {
        console.error('Error getting CSV data:', error);
        this.csvData = [];
        this.errorMessage = 'Error getting CSV data';
      }
  });
  }
  
  onFileSelected(file: File): void {
    this.csvService.readCsv(file);
  }
}