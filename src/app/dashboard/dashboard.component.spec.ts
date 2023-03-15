import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

const heroes = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

class MockHeroService {
  getHeroes(): Observable<Hero[]> {
    return of(heroes);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatInputModule,
      ],
      declarations: [
        DashboardComponent,
        HeroSearchComponent,
      ]
    })
    .overrideComponent(
      DashboardComponent,
      {set:
        {providers: [
          {provide: HeroService, useClass: MockHeroService}
        ]}
      }
    )
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve hero slice 1-5 on startup', () => {
    expect(component.heroes).toEqual(heroes.slice(1, 5));
  });
});
