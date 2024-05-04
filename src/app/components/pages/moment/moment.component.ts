import { Component,OnInit } from "@angular/core";
import { FormGroup,FormControl, Validators, FormGroupDirective, } from "@angular/forms";
import { MomentService } from "../../../service/moment.service";
import { MessagesService } from "../../../service/messages.service";
import { Comment } from '../../../Comment';
import { CommentService } from "../../../service/comment.service";
import { ActivatedRoute } from "@angular/router";
import { Moment } from "../../../Moment";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { faTimes,faEdit } from "@fortawesome/free-solid-svg-icons";


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

  commentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,
  ) {}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get('id')) //pega o id da URL

    this.momentService
      .getMoment(id).subscribe(item =>
      (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    })
  }

  get text() {
    return this.commentForm.get("text")!
  }

  get username() {
    return this.commentForm.get("username")!
  }

  async removeHandler(id:number) { //remove Momentos
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add(" momento excluido com sucesso! ");
    this.router.navigate (["/"])
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add(`Comentário adicionado!`);

    //reseta o formulario
    this.commentForm.reset();
    formDirective.resetForm();
  }
}
