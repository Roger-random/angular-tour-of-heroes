// Angular Test Support
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Application objects under test
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  const placeholderHero: Hero =
    { id: 1, name: 'A' };

  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        HeroDetailComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
    const req = httpTestingController.expectOne('api/heroes/0');
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush(placeholderHero);
  });

  afterEach(() => {
    // Assert there are no more pending requests
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
