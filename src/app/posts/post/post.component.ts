import { PostService } from './../../post.service';
import { Article } from './../../interfaces/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  article$: Observable<Article>

  constructor(
    private route: ActivatedRoute,
    private postService: PostService

  ) { }

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.postService.getArticle(id)),
      map(singleArticle => singleArticle.article),
      // shareReplay(1)
    );

    // this.route.paramMap.pipe(
    //   map(paramMap => paramMap.get('id')),
    //   switchMap(id => this.postService.getArticle(id))
    // ).subscribe(result => {
    //   this.article = result.article;
    // });
  }

}
