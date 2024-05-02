import { Component } from '@angular/core';
import { MomentService } from "../../../service/moment.service";
import { Moment } from "../../../Moment";
import { environment } from "../../../../environments/environment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    allMoments:Moment[] = [];
    moments:Moment[] = [];
    baseApiUrl = environment.baseApiUrl

    constructor(
      private momentService:MomentService, //inicializa o serviço de momentos

    ) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = items.data;
      this.moments = items.data;
    });
  }
}

