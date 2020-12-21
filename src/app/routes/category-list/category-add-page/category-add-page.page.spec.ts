import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryADDPagePage } from './category-add-page.page';

describe('CategoryADDPagePage', () => {
  let component: CategoryADDPagePage;
  let fixture: ComponentFixture<CategoryADDPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryADDPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryADDPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
