import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CreateService } from '../create.service';

@Injectable({
  providedIn: 'root',
})
export class PollInCreationGuard {
  constructor(private createService: CreateService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.createService.getPollInCreation() !== null
      ? true
      : this.router.parseUrl('/create');
  }
}
