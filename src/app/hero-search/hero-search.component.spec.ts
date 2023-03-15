import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HeroSearchComponent } from './hero-search.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

const searchTerm: string = 'man';
const batSuperMan: Hero[] = [{ id: 1, name: 'Batman' }, { id: 2, name: 'Superman' }];

class MockHeroService {
  searchHeroes(name: string): Observable<Hero[]> {
    if (name !== searchTerm) {
      throw new Error(`Expected search term ${searchTerm} but received ${name}`);
    }
    return of(batSuperMan);
  }
}

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [
        HeroSearchComponent,
      ],
    })
    .overrideComponent(
      HeroSearchComponent,
      {set:
        {providers: [
          {provide: HeroService, useClass: MockHeroService}
        ]}
      }
    )
    .compileComponents();

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search returns empty Heroes', fakeAsync((done: DoneFn) => {
    let componentHeroes: Hero[] = [];

    component.heroes$.subscribe({
      next: heroes => {
        componentHeroes = heroes;
        done;
      },
      error: error => {
        done.fail;
      }
    });
    component.search('m'); // Should never reach MockHeroService due to debounceTime()
    tick(100);
    component.search('ma');  // Should never reach MockHeroService due to debounceTime()
    tick(100);
    component.search('man');
    tick(500);
    fixture.whenStable().then(() => {
      expect(componentHeroes).toEqual(batSuperMan);
    });
  }));
});
