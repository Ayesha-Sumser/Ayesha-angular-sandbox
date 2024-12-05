import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-table-list-template',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
  
  ],
  templateUrl: './table-list-template.component.html',
  styleUrl: './table-list-template.component.scss'
})
export class TableListTemplateComponent {
@Input() list: any[] = [];
}
