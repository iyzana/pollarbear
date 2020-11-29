import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerCreate } from '../model/answer-create';
import { PollView } from '../model/poll-view';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private http: HttpClient) {}

  getVoting(): AnswerCreate | null {
    const answerCreate = sessionStorage.getItem('answer_create');
    return answerCreate !== null ? JSON.parse(answerCreate) : null;
  }

  setVoting(answerCreate: AnswerCreate | null) {
    if (answerCreate === null) {
      sessionStorage.removeItem('answer_create');
    } else {
      sessionStorage.setItem('answer_create', JSON.stringify(answerCreate));
    }
  }

  getPoll(ref: string): Observable<PollView> {
    return this.http.get<PollView>(`/api/poll/${ref}`);
  }
}
