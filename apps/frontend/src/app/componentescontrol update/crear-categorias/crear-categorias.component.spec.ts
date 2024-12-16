import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriasComponent } from './crear-categorias.component';

describe('CrearCategoriasComponent', () => {
  let component: CrearCategoriasComponent;
  let fixture: ComponentFixture<CrearCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
