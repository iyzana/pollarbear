import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollCreate } from '../model/poll-create';
import { PollView } from '../model/poll-view';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  constructor(private http: HttpClient) {}

  createPoll(pollCreate: PollCreate): Observable<PollView> {
    return this.http.post<PollView>('/api/poll/', pollCreate);
  }
}
