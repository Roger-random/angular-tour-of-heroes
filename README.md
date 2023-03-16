# Angular Tour Of Heroes

This repository follows Angular JavaScript application framework's
["Tour of Heroes" tutorial](https://angular.io/tutorial/tour-of-heroes). It
represents my second attempt to learn Angular. My first effort is archived
and available under the `angular-11` branch because Angular was at version 11
at the time. My second attempt will use Angular 15.

## Angular Material Component Library

After completing the Angular 15 updated version of "Tour of Heroes" tutorial,
I changed its visual appearance with
["Angular Material"](https://material.angular.io) components. This reduced the
amount of in-app CSS which makes it faster to build and iterate an app. But
the tradeoff is that
[app size increased significantly](https://newscrewdriver.com/2023/03/07/angular-material-impact-on-download-size/)
which could be a problem for size/bandwidth-constrained scenarios.

## Unit Testing

After playing with Angular Material, I explore unit testing infrastructure
already set up by Angular application boilerplate generator. Making
```ng test``` useful required studying the following:
* [Angular Developer Guide to Testing](https://angular.io/guide/testing)
* [Observables and RxJS in Angular](https://angular.io/guide/observables)
* [Testing HTTP requests](https://angular.io/guide/http#testing-http-requests)

I was able to increase code coverage to 100%, which is great but doesn't test
functionality outside of code. For example, I only have partial test coverage
to verify important controls haven't disappeared from the HTML template. There
is more Angular testing I can do (verify router behavior, etc.) I was ready to
move on to another topic, though, so unit tests were left incomplete.
