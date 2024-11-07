import { Component, Inject, OnInit } from '@angular/core';
import { UnidadFinService } from '../unidad-fin/unidad-fin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UnidadFin } from '../unidad-fin/unidad-fin.component';
import { EntPoint } from '../entPoint';

@Component({
  selector: 'app-edit-unidad-fin',
  templateUrl: './edit-unidad-fin.component.html',
  styleUrls: ['./edit-unidad-fin.component.css'],
})
export class EditUnidadFinComponent implements OnInit {
  formHasErrors: boolean = false;

  constructor(
    public updateDialog: MatDialogRef<EditUnidadFinComponent>,
    @Inject(MAT_DIALOG_DATA) public data_uf: UnidadFin,
    private router: Router,
    private uf_srv: UnidadFinService,
    public validator: EntPoint
  ) {}

  form_uf = new FormGroup({
    tipo: new FormControl('', Validators.required),
    um: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.form_uf.patchValue({ tipo: this.data_uf.tipo, um: this.data_uf.um });
  }

  updateData() {
    if (this.validator.validateForm(this.form_uf)) {
      this.formHasErrors = true;
      return;
    }
    this.uf_srv
      .updateUnidadFin(this.data_uf.id, this.form_uf.value)
      .subscribe((result) => {
        if(result){
          this.updateDialog.close();
        }
      });
  }

  closeDialog() {
    this.updateDialog.close();
  }
}
