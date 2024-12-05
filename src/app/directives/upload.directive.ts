import { Directive, HostBinding, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appUpload]',
  standalone: true
})
export class UploadDirective {
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';
  @Output() onFileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event']) onDrop(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    let files = evt.dataTransfer.files;
    if (files.length > 0){
      let obj: any = {};
      obj.target = {files: files};
      this.onFileDropped.emit(obj);
    }
  }


}