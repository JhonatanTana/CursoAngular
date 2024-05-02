import { Component } from '@angular/core';
import { Moment } from "../../../Moment";
import { MomentService } from "../../../service/moment.service";
import { MessagesService } from "../../../service/messages.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = 'Compartilhar!'


  constructor(
    private momentService:MomentService, //inicia o Serviço de Momentos
    private messageService:MessagesService, //incia o Serviço de Mensagens
    private router:Router, //inicia o router
  ) {}

  async createHandle(moment: Moment) {
    const formData = new FormData()

    //envia o titulo e a descrição
    formData.append("title", moment.title)
    formData.append("description", moment.description)

    //se tiver imagem
    if (moment.image) {
      formData.append("image", moment.image)
    }

    //ToDo

    //Envia o formulário
    await this.momentService.createMoment(formData).subscribe();

    //Adiciona mensagem
    this.messageService.add("Momento adicionado com sucesso")

    //Redirecionamento
    this.router.navigate(['/'])

  }
}
