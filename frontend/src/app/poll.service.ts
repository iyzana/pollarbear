import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollView } from './model/poll-view';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private http: HttpClient) {}

  getPoll(ref: string): Observable<PollView> {
    return this.http.get<PollView>(`/api/poll/${ref}`);
  }
}
