import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CreateService } from '../create.service';

@Injectable({
  providedIn: 'root',
})
export class PollInCreationGuard implements CanActivate {
  constructor(private createService: CreateService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.createService.getPollInCreation() !== null
      ? true
      : this.router.parseUrl('/create');
  }
}
