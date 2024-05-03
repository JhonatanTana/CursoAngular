import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Moment } from "../../../Moment";
import { MomentService } from "../../../service/moment.service";

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moment
  btnText:string = 'Editar'

  constructor(
    private momentService:MomentService,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }
}
