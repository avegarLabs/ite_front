import { Component, OnInit } from '@angular/core';
import { EspecialidadesServiceService } from './especialidades-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditEspecialidadModalComponentComponent } from '../editEspecialidadModal-component/editEspecialidadModal-component.component';
import { EntPoint } from '../entPoint';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';

export interface DialogData {
  id: number;
  code: string;
  description: string;
}

@Component({
  selector: 'app-especialidades-component',
  templateUrl: './especialidades-component.component.html',
  styleUrls: ['./especialidades-component.component.css']
})
export class EspecialidadesComponentComponent implements OnInit {

  formHasErrors: boolean = false;
  isCodeEspAdd: boolean = false;
  isLoading!:boolean;

  constructor(private service: EspecialidadesServiceService,
    public dialog: MatDialog,
    public validator: EntPoint,
    public confirmDialogService: DialogService) { }
  especialidadesList: any = []

  form = new FormGroup({
    code: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit() {
    this.getEspecialidadesList();
  }

  getEspecialidadesList() {
    this.isLoading = true;
    this.service.getEspecialidadesList().subscribe((allData) => {
      this.especialidadesList = allData;
      this.especialidadesList.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      });
      this.isLoading = false;
    })
  }



  addData() {
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    if (this.isCodeEsp(this.form.value.code)) {
      this.isCodeEspAdd = true;
      return;
    }
    console.log(this.form.value)
    this.service.addEspecialidad(this.form.value).subscribe((result) => {
      this.getEspecialidadesList();
      this.form.reset();
    });
  }

  deleteItem(tipology_id: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar esta especialidad?',
      confirmText: 'Si',
      cancelText: 'No',
    }
    this.confirmDialogService.confirmDialog(confirmData).subscribe(action => {
      if (action) {
        this.service.deleteEspecialidad(tipology_id).subscribe((result) => {
          this.getEspecialidadesList();
        });
      }
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(EditEspecialidadModalComponentComponent, {
      width: '350px',
      data: { id: data['id'], code: data['code'], description: data['description'] },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEspecialidadesList();
    });
  }

  isCodeEsp(code: any) {
    for (let esp of this.especialidadesList) {
      if (code === esp.code) {
        return true;
      }
    }
    return false;
  }

  

}
