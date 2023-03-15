// Angular Test Support
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// Application objects under test
import { Hero } from './hero';
import { HeroService } from './hero.service';

// Application supporting objects
import { MessageService } from './message.service';

describe('HeroService', () => {
  const heroesUrl = 'api/heroes';  // URL to web api
  const expectedHeroes: Hero[] =
    [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

  let httpTestingController: HttpTestingController;
  let messageService: MessageService;
  let heroService: HeroService;
  let req : TestRequest;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    heroService = TestBed.inject(HeroService);
  });

  afterEach(() => {
    // Assert there are no more pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('getHeroes() should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    heroService.getHeroes().subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('expected heroes')
          .toEqual(expectedHeroes);
        done();
      },
      error: done.fail
    });

    req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush(expectedHeroes);
  });

  it('getHeroes() HTTP 404 should return an empty list', (done: DoneFn) => {
    heroService.getHeroes().subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('expected empty list')
          .toEqual([]);
        done();
      },
      error: error  => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush('test 404 error', {status: 404, statusText: 'Not Found'})
  });

  it('getHero() HTTP GET single hero', (done: DoneFn) => {
    heroService.getHero(2).subscribe({
      next: hero => {
        expect(hero)
          .withContext('get expected hero #2')
          .toEqual(expectedHeroes[1]);
        done();
      },
      error: error => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(`${heroesUrl}/2`);
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush(expectedHeroes[1]);
  });

  it('updateHero() HTTP PUT single hero', (done: DoneFn) => {
    heroService.updateHero(expectedHeroes[0]).subscribe({
      next: hero => {
        expect(hero)
          .withContext('get expected hero #1')
          .toEqual(expectedHeroes[0]);
        done();
      },
      error: error => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).withContext('HTTP method').toEqual('PUT');
    req.flush(expectedHeroes[0]);
  });

  it('addHero() HTTP POST single hero', (done: DoneFn) => {
    heroService.addHero(expectedHeroes[1]).subscribe({
      next: hero => {
        expect(hero)
          .withContext('get expected hero #2')
          .toEqual(expectedHeroes[1]);
        done();
      },
      error: error => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).withContext('HTTP method').toEqual('POST');
    req.flush(expectedHeroes[1]);
  });

  it('deleteHero() HTTP DELETE single hero', (done: DoneFn) => {
    heroService.deleteHero(expectedHeroes[1]).subscribe({
      next: hero => {
        expect(hero)
          .withContext('get expected hero #2')
          .toEqual(expectedHeroes[1]);
        done();
      },
      error: error => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(`${heroesUrl}/2`);
    expect(req.request.method).withContext('HTTP method').toEqual('DELETE');
    req.flush(expectedHeroes[1]);
  });

  it('searchHeroes() HTTP GET with search term', (done: DoneFn) => {
    const term = 'st'; // search term

    heroService.searchHeroes(term).subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('get expected hero list')
          .toEqual(expectedHeroes);
        done();
      },
      error: error => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(`${heroesUrl}/?name=${term}`);
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush(expectedHeroes);
  });

  it('searchHeroes() HTTP GET with no search hits', (done: DoneFn) => {
    const term = 'santa'; // search term

    heroService.searchHeroes(term).subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('get expected hero list')
          .toEqual([]);
        done();
      },
      error: error => {
        done.fail;
      }
    });

    req = httpTestingController.expectOne(`${heroesUrl}/?name=${term}`);
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush([]);
  });

  it('searchHeroes() HTTP GET with no search term', (done: DoneFn) => {
    const term = '   '; // whitespace search term

    heroService.searchHeroes(term).subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('get empty list')
          .toEqual([]);
        done();
      },
      error: error => {
        done.fail;
      }
    });
  });
});
