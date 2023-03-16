// Angular Core
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

// Angular Test Support
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Application objects under test
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

class MockHeroService {
  getHero(id: number): Observable<Hero> {
    return of({id:0, name:'Captain Placeholder'});
  }

  updateHero(hero: Hero): Observable<any> {
    return of(hero);
  }
}

function getHTMLElement(fixture: ComponentFixture<HeroDetailComponent>) : HTMLElement {
  expect(fixture.nativeElement instanceof HTMLElement).withContext('hero detail should be HTMLElement').toBeTruthy();
  return fixture.nativeElement as HTMLElement;
}

describe('HeroDetailComponent', () => {
  const placeholderHero: Hero =
    { id: 1, name: 'A' };

  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [
        HeroDetailComponent,
      ]
    })
    .overrideComponent(
      HeroDetailComponent,
      {set:
        {providers: [
          {provide: HeroService, useClass: MockHeroService}
        ]}
      }
    )
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', async () => {
    component.save();
    expect(component).toBeTruthy();
  });

  it('should display heading', () => {
    const heroDetailElement: HTMLElement = getHTMLElement(fixture);

    const header = heroDetailElement.querySelector('h2');
    expect(header?.textContent).toEqual('CAPTAIN PLACEHOLDER Details');
  });

  it('should have text input for new name', () => {
    const heroDetailElement: HTMLElement = getHTMLElement(fixture);

    const input = heroDetailElement.querySelector('input');
    expect(input?.id).toEqual('hero-name');
  });

  it('should have two buttons', () => {
    const heroDetailElement: HTMLElement = getHTMLElement(fixture);

    const buttons = heroDetailElement.querySelectorAll('button');
    expect(buttons.length).toEqual(2);
  });
});
