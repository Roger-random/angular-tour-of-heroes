import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from '../app-routing.module';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

const mockHeroes: Hero[] = [{ id: 1, name: 'Zoq' }, { id: 2, name: 'Fot' }];
const newHero: Hero = {id: 3, name: 'Pik'};

class MockHeroService {
  heroList: Hero[] = mockHeroes;

  getHeroes(): Observable<Hero[]> {
    return of(this.heroList);
  }

  addHero(hero: Hero): Observable<Hero> {
    if(hero.name !== newHero.name) {
      throw new Error(`new hero name ${hero.name} did not match expected name ${newHero.name}`);
    }
    this.heroList.push(hero);
    return of(hero);
  }

  deleteHero(hero: Hero): Observable<Hero> {
    this.heroList = this.heroList.filter(h => h !== hero);
    return of(hero);
  }
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientTestingModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [
        HeroesComponent,
      ],
    })
    .overrideComponent(
      HeroesComponent,
      {set:
        {providers: [
          {provide: HeroService, useClass: MockHeroService}
        ]}
      }
    )
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve hero list in ngOnInit', () => {
    expect(component.heroes).withContext('retrieved mock hero list').toEqual(mockHeroes);
  });

  it('adding empty name should not change hero list', () => {
    component.add('');
    expect(component.heroes).withContext('unchanged mock hero list').toEqual(mockHeroes);
  });

  it('adding name should add to hero list', () => {
    var heroList: Hero[] = mockHeroes;
    component.add(newHero.name);
    heroList.push(newHero);
    expect(component.heroes).withContext('hero list with added hero').toEqual(heroList);
  });

  it('deleting hero should shorten hero list', () => {
    var heroList: Hero[] = mockHeroes.filter(h => h !== mockHeroes[0]);
    component.delete(mockHeroes[0]);
    expect(component.heroes).withContext('hero list with hero removed').toEqual(heroList);
  });
});
