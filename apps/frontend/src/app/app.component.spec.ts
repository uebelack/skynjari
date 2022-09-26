import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { Store } from '@ngrx/store';
import { SensorsListComponent } from '@skynjari/ui';
import AppComponent from './app.component';
import SensorsService from './sensors/sensors.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockComponent(SensorsListComponent),
      ],
      providers: [
        MockProvider(SensorsService),
        MockProvider(Store),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
