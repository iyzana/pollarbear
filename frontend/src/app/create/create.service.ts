import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollCreate } from '../model/poll-create';
import { PollView } from '../model/poll-view';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  static POLL_CREATE_OPTIONS_SIMPLE = 'poll_create_options_simple';

  getPollInCreation(): PollCreate | null {
    const pollCreate = sessionStorage.getItem('poll_create');
    return pollCreate !== null ? JSON.parse(pollCreate) : null;
  }

  setPollInCreation(pollCreate: PollCreate | null): void {
    if (pollCreate === null) {
      sessionStorage.removeItem('poll_create');
    } else {
      sessionStorage.setItem('poll_create', JSON.stringify(pollCreate));
    }
  }

  constructor(private http: HttpClient) {}

  createPoll(pollCreate: PollCreate): Observable<PollView> {
    return this.http.post<PollView>('/api/poll/', pollCreate);
  }
}
