import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PollView } from './model/poll-view';
import { PollService } from './poll.service';

@Injectable({
  providedIn: 'root',
})
export class PollResolver {
  constructor(private pollService: PollService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PollView> {
    return this.pollService.getPoll(route.params.id);
  }
}
