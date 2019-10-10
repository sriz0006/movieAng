import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actorsDB: any[] = [];
  movieDB: any[] = [];
  section = 1;
  fullName = '';
  bYear = 0;
  actorId = '';
  title = '';
  year = 0;
  actor: any = 'test';
  movie: any;
  movieId = '';
  aYear = 0;
  constructor(private dbService: DatabaseService) { }

  onSaveMovie() {
    const obj = {title: this.title, year: this.year};
    this.dbService.createMovie(obj).subscribe(result => {
    this.onGetMovies();
    });
  }

  onSaveActor() {
    const obj = {name:this.fullName, bYear: this.bYear};
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onGetActor(item) {
    this.dbService.getActor(item._id).subscribe((data: any ) => {
      this.actor = data;
      console.log(this.actor);
    });
  }


  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  selectMovie(item) {
    this.movieId = item._id;
    this.movie = {id : this.movieId};
  }

  addActor() {
    console.log(this.movieId +" : "+this.actorId);
    this.dbService.addActor(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovies();
    });
  }
  ngOnInit() {
     this.onGetActors();
     this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';
    this.title = '';
    this.year = 0;
    this.movieId = '';

  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
      console.log(this.movieDB);
    });
  }

  selectActor(item) {
    this.actorId = item._id;
    this.onGetActor(item._id);
  }


  onDeleteMovie(item) {

    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
}

onDeleteAllMovies(aYear) {
    let i;
    for (i = 0; i < this.movieDB.length; i++ ) {
        if (this.movieDB[i].year < aYear) {
          this.dbService.deleteMovie(this.movieDB[i]._id).subscribe(() => {
            this.onGetMovies();
          });
        }
      }
   }
}
