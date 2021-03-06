import { User } from './../models/user.model';
import { Message } from './../models/message.model';
import { Note } from './../models/note.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getNotes() {
    return this.http.get<Note[]>('/api/note')
  }

  create(note: Note) {
    return this.http.post<Note>('/api/note', note);
  }

  update(note: Note) {
    return this.http.patch<Note>(`/api/note/${note._id}`, note);
  }

  delete(note: Note) {
    return this.http.delete<any>(`/api/note/${note._id}`);
  }


}
