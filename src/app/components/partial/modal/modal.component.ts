import { Component, Input, TemplateRef } from '@angular/core';
import {ModalModule, BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Car } from '../../../models/car';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ModalModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [
    BsModalService
  ]
})
export class ModalComponent {
  @Input() item?: Car | any;
  modalRef: BsModalRef = new BsModalRef();
  
  constructor(private modalService: BsModalService){}
 
  ngOnInit():void{
    console.log('item :', this.item);
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    this.modalRef.hide();
  }

}
