import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HeroSearchComponent } from './hero-search.component';
import { Hero } from '../hero';

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
        // TODO: This never gets called?
        componentHeroes = heroes;
        done()
      },
      error: error => {
        done.fail;
      }
    });
    component.search('m');
    tick(100);
    component.search('ma');
    tick(500);
    fixture.whenStable().then(() => {
      expect(componentHeroes).toEqual([]);
    });
  }));
});
