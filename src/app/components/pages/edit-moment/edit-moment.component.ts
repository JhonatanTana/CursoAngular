import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Moment } from "../../../Moment";
import { MomentService } from "../../../service/moment.service";
import { MessagesService } from "../../../service/messages.service";

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
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id
    const formData = new FormData()

    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if (momentData.image) {
      formData.append('image', momentData.image)
    }
    await this.momentService.updateMoment(id!, formData).subscribe()

    this.messageService.add(`Momento ${id} foi atualizado com sucesso`)

    this.router.navigate(["/"])
  }
}
