// Angular Test Support
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// Application objects under test
import { Hero } from './hero';
import { HeroService } from './hero.service';

// Application supporting objects
import { MessageService } from './message.service';

describe('HeroService', () => {
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

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    heroService.getHeroes().subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('expected heroes')
          .toEqual(expectedHeroes);
        done();
      },
      error: done.fail
    });

    req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush(expectedHeroes);
  });

  it('should return an empty list when the server returns a 404', (done: DoneFn) => {
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

    req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).withContext('HTTP method').toEqual('GET');
    req.flush('test 404 error', {status: 404, statusText: 'Not Found'})
  });
});
