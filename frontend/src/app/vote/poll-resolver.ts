import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PollView } from '../model/poll-view';
import { VoteService } from './vote.service';

@Injectable({
  providedIn: 'root',
})
export class PollResolver implements Resolve<PollView> {
  constructor(private voteService: VoteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PollView> {
    return this.voteService.getPoll(route.params.id);
  }
}
