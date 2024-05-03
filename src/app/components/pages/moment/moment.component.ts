import {Component, OnInit} from '@angular/core';
import { MomentService } from "../../../service/moment.service";
import { Moment } from "../../../Moment";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent implements OnInit{
  moment?: Moment
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get('id')) //pega o id da URL

    this.momentService.getMoment(id).subscribe(item => this.moment = item.data)
  }
}
