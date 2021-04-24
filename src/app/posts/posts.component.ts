import { map } from 'rxjs/operators';
import { PostService } from './../post.service';
import { Article } from './../interfaces/article';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostService) { }

  articles$: Observable<Article[]>;

  ngOnInit(): void {
    this.articles$ = this.postService.getArticles()
      .pipe(
        map(result => result.articles)
      );
  }

}
