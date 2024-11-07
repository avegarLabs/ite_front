import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TipologiaServiceService } from '../tipology/tipologia-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EntPoint } from '../entPoint';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';

@Component({
  selector: 'app-addTipology-component',
  templateUrl: './addTipology-component.component.html',
  styleUrls: ['./addTipology-component.component.css']
})
export class AddTipologyComponentComponent implements OnInit {

  list :any =[];
  @Output() updateList = new EventEmitter<any[]>();
  isLoading!:boolean;
  enableButton!:boolean;

  constructor(private service: TipologiaServiceService,
              private tipoObraSrv: TipoObraService,
              private router: Router,
              public validator: EntPoint) { }

  form = new FormGroup({
    description: new FormControl(''),
    tipoObraTipologiasList: new FormControl('')
  });

  flag: boolean = false;
  formHasErrors: boolean = false;
  showTable: boolean = false;
  tipoObraList: any = [];
  tipoObraSelect: any = [];
  isTipoObraInTable: boolean = false;

  ngOnInit() {
    this.getTipoObraList();
  }

  resetForm(){
   this.form = new FormGroup({
      description: new FormControl(''),
      tipoObraTipologiasList: new FormControl('')
    });
  }

  getTipoObraList() {
    this.tipoObraSrv.getAllTipoObra().subscribe(
      response => {
        this.tipoObraList = response;
      }
    )
  }

  deleteTipoObra(index: number) {
    this.tipoObraSelect.splice(index, 1);
  }

  loadTipos(){
    return this.service.getTipologyList().subscribe(data => {
      if(data){
        this.list = data;
        this.updateList.emit(this.list);
        this.list = [];
        this.resetForm();
        this.isLoading = false
        this.enableButton = false;
      }
    })
  }

  addTipoObraToTipology() {
    const data = this.form.value;
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    const itemTipoObra = {
      "tipoObra" : data.tipoObraTipologiasList
    };
    if (this.isTipoObraAdd(itemTipoObra)) {
      this.isTipoObraInTable = true;
      return;
    }
    this.tipoObraSelect.push(itemTipoObra);
    this.enableButton = true;
  }

  isTipoObraAdd(data: any) {
    const items = this.tipoObraSelect.filter((item: any) => item.tipoObra.id === data.tipoObra.id);
    if (items.length > 0) {
      return true;
    }
    return false;
  }

  addData() {
    this.isLoading = true;
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    let data = this.form.value;
    data.tipoObraTipologiasList = this.tipoObraSelect;
    this.service.addTipology(data).subscribe((result) => {
      if(result){
         this.tipoObraSelect = [];
         this.loadTipos();
      }
      
    });
  }
}
