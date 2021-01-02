import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollView } from '../model/poll-view';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  constructor(private http: HttpClient) {}

  getPoll(pollRef: string): Observable<PollView> {
    return this.http.get<PollView>(`/api/poll/${pollRef}`);
  }
}
