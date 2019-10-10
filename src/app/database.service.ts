import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@ Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) {

  }

  result: any;


  createActor(data) {
    return this.http.post('/actors', data, httpOptions);
  }
  createMovie(data) {
    return this.http.post('/movies', data, httpOptions);
  }
  getActor(id: string) {
    const url = '/actors/' + id;
    return this.http.get(url);
  }
  getActors() {
    return this.http.get('/actors');
  }

getMovies() {
  return this.http.get('/movies');
}
getMovie(id: string) {
  const url = '/Movies/' + id;
  return this.http.get(url);
}

add(id, data) {
  const url = '/movies/' + id + '/' + data;
  return this.http.post(url, data, httpOptions);
}

addActor(movieId,actorId)
{
  const url = "/movies/"+movieId+"/"+actorId;
  return this.http.post(url,httpOptions);
}

deleteMovie(item) {
  return this.http.delete('/movies/' + item, httpOptions);
}
deleteAllMovies(aYear) {
  return this.http.delete('/movies/' + aYear, httpOptions);
}
}
