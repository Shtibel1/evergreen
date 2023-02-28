import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      
    })
  }
  onDet() {
    console.log('det edit-header');
  }

}
