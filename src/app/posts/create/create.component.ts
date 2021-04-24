import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // post = new FormGroup({
  //   title: new FormControl(),
  //   tags: new FormArray([
  //     new FormControl('HTML'),
  //     new FormControl('JavaScript'),
  //     new FormControl('CSS')
  //   ])
  // });

  post = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
    tags: this.formBuilder.array([
      this.formBuilder.control('Angular'),
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS')
    ])
  });

  get title(): AbstractControl {
    return this.post.get('title');
  }

  get body(): AbstractControl {
    return this.post.get('body');
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  getTagsControl(): FormArray {
    return this.post.get('tags') as FormArray;
  }

  addTag(tag: string): void {
    (this.post.get('tags') as FormArray).push(this.formBuilder.control(tag));
  }

  removeTag(index: number): void {
    (this.post.get('tags') as FormArray).removeAt(index)
  }

  createPost(): void {
    console.log(this.post.value);
  }

  ngOnInit(): void {
  }

  send() {
    console.log(this.post.value);
  }
}
