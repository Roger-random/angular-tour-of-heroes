# Angular Tour Of Heroes

This repository follows Angular JavaScript application framework's
["Tour of Heroes" tutorial](https://angular.io/tutorial/tour-of-heroes). It
represents my second attempt to learn Angular. My first effort is archived
and available under the `angular-11` branch because Angular was at version 11
at the time. My second attempt will use Angular 15.

After completing the Angular 15 updated version of "Tour of Heroes" tutorial,
I changed its visual appearance with
["Angular Material"](https://material.angular.io) components. This reduced the
amount of in-app CSS which makes it faster to build and iterate an app. But
the tradeoff is that
[app size increased significantly](https://newscrewdriver.com/2023/03/07/angular-material-impact-on-download-size/)
which could be a problem for size/bandwidth-constrained scenarios.

After playing with Angular Material, I explore unit testing infrastructure
already set up by Angular application boilerplate generator. Making
```ng test``` useful required studying the following:
* [Angular Developer Guide to Testing](https://angular.io/guide/testing)
* [Observables and RxJS in Angular](https://angular.io/guide/observables)
* [Testing HTTP requests](https://angular.io/guide/http#testing-http-requests)
Initial focus was on getting code coverage numbers up, setting up imports
properly and mostly mocking HeroService before going into component interaction
and router testing.
