import { Component, OnInit } from '@angular/core';
import { ValoresService } from '../valores/valores.service';
import { EspecialidadesServiceService } from '../especialidades-component/especialidades-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators  } from '@angular/forms';
import { EntPoint } from '../entPoint';

@Component({
  selector: 'app-editValues-component',
  templateUrl: './editValues-component.component.html',
  styleUrls: ['./editValues-component.component.css']
})
export class EditValuesComponentComponent implements OnInit {

  formEditHasErrors: boolean = false;
  formEspHasErrors: boolean = false;

  constructor(private service: ValoresService,
    private activeRoute: ActivatedRoute,
    private espServ: EspecialidadesServiceService,
    private route: Router,
    public validator: EntPoint) { }
  id: any;
  id_valor: any;
  obra: any;
  obra_id: any;
  valor: any;
  selectValue: any;
  espList: any = [];
  espValorList: Array<any> = [];
  flag: boolean = false;
  estadosList: any = ["Presupuesto de Diseño", "Presupuesto de PT", "Presupuesto de Obra"];
  editValores = new FormGroup({
    estado: new FormControl(''),
    catalogo: new FormControl(''),
    costoMateriales: new FormControl(''),
    costoManoObra: new FormControl(''),
    costoEquipos: new FormControl(''),
    costoIndirectos: new FormControl(''),
    gastosFinancieros: new FormControl('', Validators.required),
    gastosTributarios: new FormControl('', Validators.required),
    totalCostosGastosProduccion: new FormControl('', Validators.required),
    totalCostosGastos: new FormControl('', Validators.required),
    otrosConceptos: new FormControl('', Validators.required),
    totalGastosObra: new FormControl('', Validators.required),
    utilidades: new FormControl('', Validators.required),
    precioServicio: new FormControl('', Validators.required),
  });

  addValorEspecialidad = new FormGroup({
    especialidades: new FormControl(''),
    costoTotal: new FormControl(''),

  });

  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      this.id = param['id']
    });
    this.getSingleValue(this.id);
    this.createEspecialidadesList();
  }
  createEspecialidadesList() {
    return this.espServ.getEspecialidadesList().subscribe((allData) => {
      this.espList = allData;
    });
  }

  getSingleValue(id: any) {
    return this.service.getDetailValor(id).subscribe((result) => {
      this.valor = result;
      this.espValorList = this.valor['valoresEspecialidades'];
      this.obra = this.valor['obra'];
      this.obra_id = this.obra['id'];
      this.editValores = new FormGroup({
        estado: new FormControl(this.valor.estado),
        catalogo: new FormControl(this.valor.catalogo),
        costoMateriales: new FormControl(this.valor.costoMateriales),
        costoManoObra: new FormControl(this.valor.costoManoObra),
        costoEquipos: new FormControl(this.valor.costoEquipos),
        costoIndirectos: new FormControl(this.valor.costoIndirectos),
        gastosFinancieros: new FormControl(this.valor.gastosFinancieros),
        gastosTributarios: new FormControl(this.valor.gastosTributarios),
        totalCostosGastosProduccion: new FormControl(this.valor.totalCostosGastosProduccion),
        totalCostosGastos: new FormControl(this.valor.totalCostosGastos),
        otrosConceptos: new FormControl(this.valor.otrosConceptos),
        totalGastosObra: new FormControl(this.valor.totalGastosObra),
        utilidades: new FormControl(this.valor.utilidades),
        precioServicio: new FormControl(this.valor.precioServicio),
      });
    });
  }
  updateValores() {
    if (this.validator.validateForm(this.editValores)) {
      this.formEditHasErrors = true;
      return;
    }
    const item = {
      'estado': this.editValores.controls['estado'].value,
      'costoMateriales': this.editValores.controls['costoMateriales'].value,
      'costoManoObra': this.editValores.controls['costoManoObra'].value,
      'costoEquipos': this.editValores.controls['costoEquipos'].value,
      'catalogo': this.editValores.controls['catalogo'].value,
      'costoIndirectos': Number(this.editValores.controls['costoIndirectos'].value),
      'gastosFinancieros':  Number(this.editValores.controls['gastosFinancieros'].value),
      'gastosTributarios':  Number(this.editValores.controls['gastosTributarios'].value),
      'totalCostosGastosProduccion':  Number(this.editValores.controls['totalCostosGastosProduccion'].value),
      'totalCostosGastos':  Number(this.editValores.controls['totalCostosGastos'].value),
      'otrosConceptos':  Number(this.editValores.controls['otrosConceptos'].value),
      'totalGastosObra':  Number(this.editValores.controls['totalGastosObra'].value),
      'utilidades':  Number(this.editValores.controls['utilidades'].value),
      'precioServicio':  Number(this.editValores.controls['precioServicio'].value),
      'obra': this.obra,
      'valoresEspecialidades': this.espValorList
    };
    return this.service.updateValor(this.valor['id'], item).subscribe((res) => {
      this.route.navigate(["/detailObra/" + this.obra_id]).then(() => {
        window.location.reload();
      })
    });
  }

  temp: Array<any> = [];
  addEspecialidadValores() {
    if (this.validator.validateForm(this.addValorEspecialidad)) {
      this.formEspHasErrors = true;
    }
    this.espValorList.forEach((item) => {
      this.temp.push(item['especialidades']);
    });
    const result = this.temp.filter(item => item['description'] === this.addValorEspecialidad.controls['especialidades'].value['description']);
    if (result.length > 0) {
      this.flag = true;
    } else {
      this.createNewValue(this.addValorEspecialidad.value);
      this.addValorEspecialidad.reset();
    }

  }
  createNewValue(value: any) {
    return this.service.addValorEspecialidad(this.valor.id, value).subscribe(response => {
      this.espValorList.push(response);
    })
  }
  deleteItem(item: any) {
    const index = this.espValorList.indexOf(item);
    if (index !== -1) {
      this.espValorList.splice(index, 1);
      this.deleteRelation(item);
    }
  }
  deleteRelation(item: any) {
    return this.service.deleteValorEspecialidad(this.valor.id, item.especialidades.id).subscribe(response => {
      console.log(response);
    });
  }
  closeAlert() {
    this.flag = false;
  }
}
