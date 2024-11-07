import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipologiaServiceService } from '../tipology/tipologia-service.service';
import { DialogData } from '../tipology/tipology.component';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { EntPoint } from '../entPoint';

@Component({
  selector: 'app-editTipologyModal-component',
  templateUrl: './editTipologyModal-component.component.html',
  styleUrls: ['./editTipologyModal-component.component.css']
})
export class EditTipologyModalComponentComponent implements OnInit {

  formHasErrors: boolean = false;
  fieldEditHasErrors: boolean = false;
  fieldSelectHasErrors: boolean = false;
  tipoObraList: any = [];
  tipoObraSelect: any = [];
  isTipoObraInTable: boolean = false;
  selectedTipoObra: any = [];

  constructor(public dialogRef: MatDialogRef<EditTipologyModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: TipologiaServiceService,
    private tipoObraSrv: TipoObraService,
    private router: Router,
    public validator: EntPoint) { }

  editTipology = new FormGroup({
    description: new FormControl(this.data.description),
    tipoObraTipologiasList: new FormControl(this.data.tipoObraTipologiasList)
  });

  ngOnInit() {
    console.log('Test', this.data)
    this.getTipoObraList();
    this.tipoObraSelect = this.data.tipoObraTipologiasList;
    this.selectedTipoObra = this.tipoObraSelect[0];
  }

  resetFlagErros() {
    if (this.fieldEditHasErrors) {
      this.fieldEditHasErrors = false;
    }
    if (this.fieldSelectHasErrors) {
      this.fieldSelectHasErrors = false;
    }
  }

  updateData() {
    if (this.validator.validateField(this.editTipology.controls['description'])) {
      this.fieldEditHasErrors = true;
      return;
    }
    this.editTipology.value.tipoObraTipologiasList = [];//this.tipoObraSelect;
    this.data.tipoObraTipologiasList = this.tipoObraSelect;
    this.service.updateTopology(this.data.id, this.editTipology.value).subscribe((result) => {
      this.dialogRef.close();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isTipoObraAdd(data: any) {
    const items = this.tipoObraSelect.filter((item: any) => item.tipoObra.id === data.tipoObraTipologiasList.id);
    if (items.length > 0) {
      return true;
    }
    return false;
  }

  getTipoObraList() {
    this.tipoObraSrv.getAllTipoObra().subscribe(
      response => {
        this.tipoObraList = response;
      }
    )
  }

  deleteTipoObra(item: any) {
    const idTipoObra = item.tipoObra.id;
    const idTipologia = this.data.id;
    const index = Number(this.tipoObraSelect.findIndex((element: any) => element.tipoObra.id === idTipoObra));
    this.tipoObraSelect.splice(index, 1);
    this.deleteRelation(idTipoObra, idTipologia);
  }

  deleteRelation(idTipoObra: any, idTipologia: number) {
    return this.service.deleteTipoObraTipology(idTipoObra, idTipologia).subscribe(res => {
      console.log(res)
    })
  }

  addTipoObraToTipology() {
    const data = this.editTipology.value;
    if (this.validator.validateField(this.editTipology.controls['tipoObraTipologiasList'])) {
      this.fieldSelectHasErrors = true;
      return;
    }
    if (this.isTipoObraAdd(data)) {
      this.isTipoObraInTable = true;
      return;
    }
    const itemTipoObra = {
      "tipoObra": data.tipoObraTipologiasList
    };
    this.tipoObraSelect.push(itemTipoObra);
    const item = data.tipoObraTipologiasList;
    this.service.addTipoObraTipology(this.data.id, item).subscribe();
  }

}
