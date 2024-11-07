import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EspecialidadesServiceService } from '../especialidades-component/especialidades-service.service';
import { DialogData } from '../especialidades-component/especialidades-component.component';
import { EntPoint } from '../entPoint';


@Component({
  selector: 'app-editEspecialidadModal-component',
  templateUrl: './editEspecialidadModal-component.component.html',
  styleUrls: ['./editEspecialidadModal-component.component.css']
})
export class EditEspecialidadModalComponentComponent implements OnInit {

  formHasErrors: boolean = false;
  isCodeEspAdd: boolean = false;
  espList: any = [];
  selectedCodeEsp: any = 0;

  constructor(public dialogRef: MatDialogRef<EditEspecialidadModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: EspecialidadesServiceService,
    private router:Router,
    public validator: EntPoint) { }

    editEspecialidad = new FormGroup({
      code: new FormControl(''),
      description: new FormControl('')
    });


  ngOnInit() {
    this.editEspecialidad = new FormGroup({
      code: new FormControl(this.data.code),
      description: new FormControl(this.data.description)
    });
    this.getEspList();
    this.selectedCodeEsp = this.data.code;
  }

  updateData(){
    if (this.validator.validateForm(this.editEspecialidad)) {
      this.formHasErrors = true;
      return;
    }    
    if (this.isCodeEsp(this.editEspecialidad.value.code)) {
      this.isCodeEspAdd = true;
      return;
    }    
    console.log(this.editEspecialidad.value)
    this.service.updateEspecialidad(this.data.id, this.editEspecialidad.value).subscribe((result)=>{
       console.log(result);
       this.dialogRef.close();
     })
   }

   closeDialog(){
     this.dialogRef.close();
    }

    getEspList() {
      this.service.getEspecialidadesList().subscribe((data) => {
        this.espList = data;        
      });
    }

    isCodeEsp(code: any) {
      if (code === this.selectedCodeEsp) {
        return false;
      }
      for (let esp of this.espList) {
        if (code === esp.code) {
          return true;
        }
      }
      return false;
    }

}
