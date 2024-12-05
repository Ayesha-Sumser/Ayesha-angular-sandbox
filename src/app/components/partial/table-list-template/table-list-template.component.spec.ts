import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListTemplateComponent } from './table-list-template.component';

describe('TableListTemplateComponent', () => {
  let component: TableListTemplateComponent;
  let fixture: ComponentFixture<TableListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
