import { Component, OnInit } from '@angular/core';
import { ValoresService } from '../valores/valores.service';
import { EspecialidadesServiceService } from '../especialidades-component/especialidades-service.service';
import { ObraService } from '../obra/obra.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addValues-component',
  templateUrl: './addValues-component.component.html',
  styleUrls: ['./addValues-component.component.css']
})
export class AddValuesComponentComponent implements OnInit {
  id: any;
  espList: any = [];
  obra: any;
  // espValorList: Array<any> = [];
  flag: boolean = false;
  estadosList: any = ["Presupuesto de Diseño", "Presupuesto de PT", "Presupuesto de Obra"];
  dataFile: any;
  espArray: Array<any> = [];
  listEspAdd: Array<any> = [];
  dataEspecialidadesToJson: Array<any> = [];
  especialidad_item: any = {};
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


  constructor(private service: ValoresService, private activeRoute: ActivatedRoute, private espServ: EspecialidadesServiceService, private route: Router, private servObra: ObraService) { }


  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      this.id = param['obraId']
    });
    this.getObra(this.id);
    this.createEspecialidadesList();
  }
  getObra(id: any) {
    return this.servObra.getObraById(id).subscribe((res) => {
      this.obra = res;
    })
  }
  createEspecialidadesList() {
    return this.espServ.getEspecialidadesList().subscribe((allData) => {
      this.espList = allData;
    });
  }


  updateValores() {
    const item = {
      'estado': this.editValores.controls['estado'].value,
      'costoMateriales': this.editValores.controls['costoMateriales'].value,
      'costoManoObra': this.editValores.controls['costoManoObra'].value,
      'costoEquipos': this.editValores.controls['costoEquipos'].value,
      'catalogo': this.editValores.controls['catalogo'].value,
      'costoIndirectos': Number(this.editValores.controls['costoIndirectos'].value),
      'gastosFinancieros': Number(this.editValores.controls['gastosFinancieros'].value),
      'gastosTributarios': Number(this.editValores.controls['gastosTributarios'].value),
      'totalCostosGastosProduccion': Number(this.editValores.controls['totalCostosGastosProduccion'].value),
      'totalCostosGastos': Number(this.editValores.controls['totalCostosGastos'].value),
      'otrosConceptos': Number(this.editValores.controls['otrosConceptos'].value),
      'totalGastosObra': Number(this.editValores.controls['totalGastosObra'].value),
      'utilidades': Number(this.editValores.controls['utilidades'].value),
      'precioServicio': Number(this.editValores.controls['precioServicio'].value),
      'obra': this.obra,
      'valoresEspecialidades': this.espArray
    };
    console.log(item)
    return this.service.addValor(item).subscribe((res) => {
      this.route.navigate(["/detailObra/" + this.obra['id']]).then(() => {
        window.location.reload();
      })
    });
  }

  temp: Array<any> = [];
  addEspecialidadValores() {
    this.temp = [];
    this.espArray.forEach((item) => {
      this.temp.push(item['especialidades']);
    });
    const result = this.temp.filter(item => item['description'] === this.addValorEspecialidad.controls['especialidades'].value['description']);
    if (result.length > 0) {
      this.flag = true;
    } else {
      this.espArray.push(this.addValorEspecialidad.value);
      this.addValorEspecialidad.reset();
    }
  }

  deleteItem(item: any) {
    const index = this.espArray.indexOf(item);
    if (index !== -1) {
      this.espArray.splice(index, 1);
    }
  }

  closeAlert() {
    this.flag = false;
  }

  imort_form = new FormGroup({
    file_path: new FormControl('', Validators.required)
  });

  currentFile!: File;
  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      this.dataFile = reader.result;
    }
    reader.readAsText(this.currentFile);
  }

  getDataFromFile() {
    var data = JSON.parse(this.dataFile);
    this.dataEspecialidadesToJson = data.valoresEspecialidades;
    this.editValores = new FormGroup({
      estado: new FormControl(''),
      costoMateriales: new FormControl(Number(data.costoMateriales).toFixed(2), Validators.required),
      costoManoObra: new FormControl(Number(data.costoManoObra).toFixed(2), Validators.required),
      costoEquipos: new FormControl(Number(data.costoEquipos).toFixed(2), Validators.required),
      catalogo: new FormControl(data.catalogo, Validators.required),
      costoIndirectos: new FormControl(data.indirectos, Validators.required),
      gastosFinancieros: new FormControl(data.financieros, Validators.required),
      gastosTributarios: new FormControl(data.tributarios, Validators.required),
      totalCostosGastosProduccion: new FormControl(data.totalcgpo, Validators.required),
      totalCostosGastos: new FormControl(data.totalcg, Validators.required),
      otrosConceptos: new FormControl(data.otroscg, Validators.required),
      totalGastosObra: new FormControl(data.totalgo, Validators.required),
      utilidades: new FormControl(Number(data.utilidades).toFixed(2), Validators.required),
      precioServicio: new FormControl(Number(data.precio).toFixed(2), Validators.required),
    });
    this.checkEspecialidadesInITE();
    this.createDataFromEspecialidades(this.dataEspecialidadesToJson);
  }

  checkEspecialidadesInITE() {
    this.dataEspecialidadesToJson.forEach((item: any) => {
      var esp = this.getDatoByEspecialidad(item.description);
      if (esp == null) {
        this.especialidad_item.code = item.code;
        this.especialidad_item.description = item.description;
        this.listEspAdd.push(this.especialidad_item);
      }
    });
    if (this.listEspAdd.length > 0) {
      this.addNewEspecialidades(this.listEspAdd);
      this.createEspecialidadesList();
    }
  }
  addNewEspecialidades(listEspAdd: any[]) {
    return this.espServ.addListEspecialidades(listEspAdd).subscribe((resp) => {
      if(resp){
        this.createEspecialidadesList();
      }
    });
  }

  getDatoByEspecialidad(descrip: any) {
    let especialidad = this.espList.find((item: any) => String(item.description).trim() === String(descrip).trim());
    return especialidad;
  }

  createDataFromEspecialidades(dataEspecialidadesToJson: any[]) {
    this.espArray = [];
    dataEspecialidadesToJson.forEach((item: any) => {
      var esp = this.getDatoByEspecialidad(item.description);
      if (esp != null) {
        const itemEsp = {
          'especialidades': esp,
          'costoTotal': Number(item.valor).toFixed(2)
        }
        this.espArray.push(itemEsp);
      }
    });
  }



}
