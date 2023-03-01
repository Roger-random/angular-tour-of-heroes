import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import { MessageService } from './message.service';

/****************************************************************************/
/* async-observable-helpers.ts */
/*
* Mock async observables that return asynchronously.
* The observable either emits once and completes or errors.
*
* Must call `tick()` when test with `fakeAsync()`.
*
* THE FOLLOWING DON'T WORK
* Using `of().delay()` triggers TestBed errors;
* see https://github.com/angular/angular/issues/10127 .
*
* Using `asap` scheduler - as in `of(value, asap)` - doesn't work either.
*/
import { defer } from 'rxjs';

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/**
 * Create async observable error that errors
 * after a JS engine turn
 */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
/****************************************************************************/

describe('HeroService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let heroService: HeroService;
  let messageService: MessageService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService();
    heroService = new HeroService(httpClientSpy, messageService);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedHeroes: Hero[] =
      [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

    heroService.getHeroes().subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('expected heroes')
          .toEqual(expectedHeroes);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  xit('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    heroService.getHeroes().subscribe({
      next: heroes => done.fail('expected an error, not heroes'),
      error: error  => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    });
  });
});

