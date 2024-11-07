import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnidadFinService } from '../unidad-fin/unidad-fin.service';
import { Router } from '@angular/router';
import { EntPoint } from '../entPoint';
import { UnidadFin} from 'src/models/unidad-fin';

@Component({
  selector: 'app-add-unidad-fin',
  templateUrl: './add-unidad-fin.component.html',
  styleUrls: ['./add-unidad-fin.component.css']
})
export class AddUnidadFinComponent implements OnInit {

  formHasErrors: boolean = false;
  list :any =[];
  @Output() updateList = new EventEmitter<any[]>();
  isLoading!:boolean;

  constructor(
    private uf_srv: UnidadFinService,
    private router: Router,
    public validator: EntPoint
  ) { }

  form_uf = new FormGroup({
    tipo: new FormControl('', Validators.required),
    um: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  loadUnidades(){
    return this.uf_srv.getUnidadFinList().subscribe(data => {
      if(data){
        this.list = data;
        this.updateList.emit(this.list);
        this.list = [];
        this.isLoading = false;
      }
    })
  }

  addDataUF() {
    this.isLoading = true;
    if (this.validator.validateForm(this.form_uf)) {
      this.formHasErrors = true;
      return;
    }
    this.uf_srv.addUnidadFin(this.form_uf.value).subscribe((result) => {
     if(result){
      this.loadUnidades();
    }
    });
    this.form_uf.reset();
  }

}
