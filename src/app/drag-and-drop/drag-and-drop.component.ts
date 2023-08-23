import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent {
  @Output() notifyParentEvent = new EventEmitter<File>();
  isDragging = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.notifyParentEvent.emit(file);
    }
  }
  openFileSelector() {
    const inputElement = document.querySelector('.drag-drop-container input') as HTMLInputElement | null;
    if (inputElement) {
      inputElement.click();
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files && fileInput.files[0];

    if (selectedFile) {
      this.notifyParentEvent.emit(selectedFile);
    }
    console.log('Arquivo selecionado:', selectedFile);
  }

}