import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CsvViewerComponent } from './csv-viewer/csv-viewer.component';
import { CsvService } from './csv.service';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvViewerComponent,
    DragAndDropComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [CsvService],
  bootstrap: [AppComponent]
})
export class AppModule { }