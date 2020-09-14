import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService,
  ) {
    this.hero = undefined;
  }

  private log(message: string) {
    this.messageService.add(`HeroDetailComponent: ${message}`);
  }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.heroService.getHero(+id)
        .subscribe(hero => this.hero = hero);
    } else {
      this.log('No hero ID');
    }
  }

  save(): void {
    if (this.hero != undefined) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    } else {
      this.log('Hero is undefined');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
