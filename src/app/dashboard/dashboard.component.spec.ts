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

function getHTMLElement(fixture: ComponentFixture<DashboardComponent>) : HTMLElement {
  expect(fixture.nativeElement instanceof HTMLElement).withContext('dashboard should be HTMLElement').toBeTruthy();
  return fixture.nativeElement as HTMLElement;
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

  it('should display heading', () => {
    const dashboardElement: HTMLElement = getHTMLElement(fixture);

    const header = dashboardElement.querySelector('h2');
    expect(header?.textContent).toEqual('Top Heroes');
  });

  it('should show list of 4 heroes', () => {
    const dashboardElement: HTMLElement = getHTMLElement(fixture);

    const heroLinks = dashboardElement.querySelectorAll('a');
    expect(heroLinks.length).toBe(4);
  });

  it('first hero link should have matching name and href', () => {
    const dashboardElement: HTMLElement = getHTMLElement(fixture);

    const heroLinks = dashboardElement.querySelectorAll('a');
    const firstHero = heroLinks.item(0);

    expect(firstHero.textContent?.trim()).toEqual('Bombasto');
    expect(firstHero.pathname).toEqual('/detail/13');
  });

  it('should host search', () => {
    const dashboardElement: HTMLElement = getHTMLElement(fixture);

    // This test cares only that search component hasn't gone missing.
    // Functionality to be tested by search component's own unit test.
    expect(dashboardElement.querySelector('app-hero-search')).withContext('find instance of app-hero-search').toBeTruthy();
  });
});
