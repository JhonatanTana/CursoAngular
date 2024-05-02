import {Component, OnInit} from '@angular/core';
import { MomentService } from "../../../service/moment.service";
import { Moment } from "../../../Moment";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent implements OnInit{
  moment?: Moment

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe(item => this.moment = item.data)
  }
}
