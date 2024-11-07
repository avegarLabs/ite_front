import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { TipoObraData, TipoObraComponent } from '../tipo-obra/tipo-obra.component';
import { EntPoint } from '../entPoint';

@Component({
  selector: 'app-edit-tipo-obra-modal',
  templateUrl: './edit-tipo-obra-modal.component.html',
  styleUrls: ['./edit-tipo-obra-modal.component.css']
})
export class EditTipoObraModalComponent implements OnInit {

  formHasErrors: boolean = false;

  editTipoObra = new FormGroup( {
    descripcion: new FormControl(this.data.descripcion)
  } );

  constructor(public dialogRef: MatDialogRef<EditTipoObraModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoObraData,
    private service: TipoObraService,
    private router:Router,
    public validator: EntPoint
    ) { }

  ngOnInit(): void {
  
  }

  updateData() {
    if (this.validator.validateForm(this.editTipoObra)) {
      this.formHasErrors = true;
      return;
    }
   this.service.updateTipoObra(this.data.id, this.editTipoObra.value).subscribe((result)=>{
       this.dialogRef.close();
    })
  }

  closeDialog(){
    this.dialogRef.close();
    }

}
