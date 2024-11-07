import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, ObraDetailComponent } from '../obra-detail/obra-detail.component';
import { IndiceServiceService } from '../indice-component/indice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-difineIndex-component',
  templateUrl: './difineIndex-component.component.html',
  styleUrls: ['./difineIndex-component.component.css']
})
export class DifineIndexComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DifineIndexComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private indServ: IndiceServiceService, private router: Router) { }

  tipoServicio: any;
  obra: any;
  valor: any;
  unidadesList: any = [];
  selectValue: any;
  unit: any;
  state: string = "";
  calcValues: any;
  listIndices: any = [];

  index_form = new FormGroup({
    unit: new FormControl('', Validators.required)
  })

  ngOnInit() {
    console.log(this.data)
    this.tipoServicio = this.data.tipoServicio
    this.obra = this.data.obra
    this.calcValues = this.data.valores;
    this.unidadesList = this.data.obra.obraUnidades

  }

  closeDialog() {
    this.dialogRef.close();
  }

  emptyUnidades: boolean = false;
  writeIndice() {
    // this.unit = this.index_form.controls['unit'].value
    if (this.unidadesList.length < 1) {
      this.emptyUnidades = true;
      return;
    }
    for (let unit of this.unidadesList) {
      const indice = {
        'valor': Number(this.calcValor(unit.cantidad)),
        'volumen': unit.cantidad,
        'obra': this.obra,
        'unidad': unit.unidadFin,
        'datosBase': this.calcValues,
        'estado': "directo"
      }
      this.listIndices.push(indice);
    }
    this.indServ.addIndice(this.listIndices).subscribe((response) => {
      this.router.navigate(['/indice']).then(() => {
        window.location.reload();
      });
      this.dialogRef.close();
    })


  }
  value: number = 0;
  calcValor(cant: any): any {
    var sum = this.calcValues.precioServicio
    var tempCalc = sum / Number(cant);
    this.value = Number(tempCalc.toFixed(2));
    return this.value;
  }



  cdState: boolean = false;
  eventCheckCD(event: any) {
    this.cdState = true;
    this.ctState = false;
    this.state = "directo";
  }

  ctState: boolean = false;
  eventCheckCT(event: any) {
    this.cdState = false;
    this.ctState = true;
    this.state = "total";
  }


}
