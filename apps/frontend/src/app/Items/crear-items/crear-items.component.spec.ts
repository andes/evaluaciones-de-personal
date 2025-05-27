import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearItemsComponent } from './crear-items.component';

describe('CrearCategoriasComponent', () => {
  let component: CrearItemsComponent;
  let fixture: ComponentFixture<CrearCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearItemsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
