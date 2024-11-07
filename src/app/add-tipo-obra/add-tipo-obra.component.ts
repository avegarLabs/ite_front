import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { Router } from '@angular/router';
import { EntPoint } from '../entPoint';

@Component({
  selector: 'app-add-tipo-obra',
  templateUrl: './add-tipo-obra.component.html',
  styleUrls: ['./add-tipo-obra.component.css']
})
export class AddTipoObraComponent implements OnInit {

  formHasErrors: boolean = false;
  list :any =[];
  @Output() updateList = new EventEmitter<any[]>();
  isLoading!:boolean;

  constructor(
    private service : TipoObraService,
    public validator: EntPoint,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  loadTipos(){
    return this.service.getAllTipoObra().subscribe(data => {
      if(data){
        this.list = data;
        this.updateList.emit(this.list);
        this.list = [];
        this.isLoading = false;
      }
    })
  }

  form = new FormGroup({
    descripcion: new FormControl('')
  });

  addData() {
    this.isLoading = true;
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    this.service.addTipoObra(this.form.value).subscribe((result) => {
     if(result){
      this.loadTipos();
     }
    });
  }

}
