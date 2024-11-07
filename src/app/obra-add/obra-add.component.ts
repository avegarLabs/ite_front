import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObraService } from '../obra/obra.service';
import { TipologiaServiceService } from '../tipology/tipologia-service.service';
import { ObraValuesService } from '../obra-values/obra-values.service';
import { EspecialidadesServiceService } from '../especialidades-component/especialidades-service.service';
import { Router } from '@angular/router';
import { UnidadFinService } from '../unidad-fin/unidad-fin.service';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { EntPoint } from '../entPoint';
//import * as console from 'console';

export interface Typology {
  id: number;
  description: string;
}

export interface Especialidad {
  code: string;
  description: string;
}
export interface ObraValues {
  costoMateriales: number;
  costoManoObra: number;
  costoEquipos: number;
  costoIndirectos: number;
  gastosFinancieros: number;
  gastosTributarios: number;
  totalCostosGastosProduccion: number;
  totalCostosGastos: number;
  otrosConceptos: number;
  totalGastosObra: number;
  utilidades: number;
  precioServicio: number;
  estado: string;
  catalogo: string;
  obra: any;
  valoresEspecialidades: any;
}

@Component({
  selector: 'app-obra-add',
  templateUrl: './obra-add.component.html',
  styleUrls: ['./obra-add.component.css'],
})
export class ObraAddComponent implements OnInit {
  tipologyList: any = [];
  espList!: any;
  status: boolean = false;
  isEspAdd: boolean = false;
  obra: any;
  estadosList: any = [
    'Presupuesto de PT',
    'Presupuesto de Obra',
    'Presupuesto de Diseño',
  ];
  um_list: any = [];
  obraList: any = [];
  unidadFlag: boolean = false;
  unidadesCantidad: any = [];
  tipoObraList: any = [];
  selectedTipology: any = [];
  selectedTipoObra: any = [];

  espArray: Array<any> = [];
  listEspAdd: Array<any> = [];
  dataEspecialidadesToJson: Array<any> = [];

  obra_values_item: any = {};
  especialidad_item: any = {};
  dataFile: any;
  formAddHasErrors: boolean = false;
  formValuesHasErrors: boolean = false;
  formEspHasErrors: boolean = false;
  isCodeObraAdd: boolean = false;
  formUnidadHasErrors: boolean = false;
  data: any = {};
  fromFile: boolean = false;
  isLoading!:boolean

  add_form = new FormGroup({
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    specifications: new FormControl('', Validators.required),
    tipoObra: new FormControl('', Validators.required),
    tipology: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    obraUnidades: new FormControl('000'),
  });

  values_form = new FormGroup({
    estado: new FormControl('', Validators.required),
    catalogo: new FormControl('', Validators.required),
    costoMateriales: new FormControl('', Validators.required),
    costoManoObra: new FormControl('', Validators.required),
    costoEquipos: new FormControl('', Validators.required),
    costoIndirectos: new FormControl('', Validators.required),
    gastosFinancieros: new FormControl('', Validators.required),
    gastosTributarios: new FormControl('', Validators.required),
    totalCostosGastosProduccion: new FormControl('', Validators.required),
    totalCostosGastos: new FormControl('', Validators.required),
    otrosConceptos: new FormControl('', Validators.required),
    totalGastosObra: new FormControl('', Validators.required),
    utilidades: new FormControl('', Validators.required),
    precioServicio: new FormControl('', Validators.required),
  });

  esp_form = new FormGroup({
    especialidades: new FormControl('', Validators.required),
    costoTotal: new FormControl('', Validators.required),
  });

  addUnidadObra = new FormGroup({
    volumen: new FormControl('', Validators.required),
    unidad: new FormControl('', Validators.required),
  });

  imort_form = new FormGroup({
    file_path: new FormControl('', Validators.required),
  });

  constructor(
    private obra_service: ObraService,
    private typology_srv: TipologiaServiceService,
    private obra_values_srv: ObraValuesService,
    private esp_srv: EspecialidadesServiceService,
    private um_srv: UnidadFinService,
    private router: Router,
    private tipoObraServ: TipoObraService,
    public validator: EntPoint
  ) {}

  ngOnInit(): void {
    // this.getTypologoList();
    this.getEspList();
    this.getUMList();
    this.getObraList();
    this.getTipoObraList();
  }

  getTypologoList() {
    this.typology_srv.getTipologyList().subscribe((response) => {
      this.tipologyList = response;
    });
  }

  getEspList() {
    //this.espList = [];
    return this.esp_srv.getEspecialidadesList().subscribe((data) => {
      if(data){
       this.espList = data;
      }
    });
  }

  getEspListJSON(data: any) {
    const esp_data = data.valoresEspecialidades;
    var esp_item;
    this.espArray = [];
    esp_data.forEach((item: any) => {
      console.log(item.description)
      let espData = this.getDatoByEspecialidad(item.description);
      esp_item = {
        especialidades: espData,
        costoTotal: Number(item.valor).toFixed(2),
      };
      this.espArray.push(esp_item);
    });
   
  }

  getUMList() {
    this.um_srv.getUnidadFinList().subscribe((data) => {
      this.um_list = data;
    });
  }

  getUMListJSON(data: any) {
    const uf_data = data.unidadesFin;
    this.unidadesCantidad = [];
    var uf;
    uf_data.forEach((item: any) => {
      const tipo_um = item.unidad.split(' - ');
      const uf = this.um_list.filter(
        (item: any) => String(item.tipo).trim() === tipo_um[0].trim()
      );

      const itemUnidad = {
        unidadFin: uf[0],
        cantidad: item.catidad,
      };
      this.unidadesCantidad.push(itemUnidad);
    });
  }

  getObraList() {
    this.obra_service.getAllObras().subscribe((response) => {
      this.obraList = response;
    });
  }

  addDataObra() {
    this.isLoading = true;
    this.add_form.value.obraUnidades = this.unidadesCantidad;
    if (this.validator.validateForm(this.add_form)) {
      this.formAddHasErrors = true;
      return;
    } else {
      const code = this.add_form.value.code;
      if (this.isCodeObra(code)) {
        this.isCodeObraAdd = true;
        return;
      } else {
        this.obra_service.addObra(this.add_form.value).subscribe((result) => {
          if (result) {
            this.isLoading = false;
            this.status = true;
            this.obra = result;
            if (this.fromFile) {
              this.getEspList();
              this.addDataToValuesForm(this.data);
              this.createDataFromEspecialidades(this.data.valoresEspecialidades);
              this.getEspListJSON(this.data);
            }
          }
        });
      }
    }
  }

  addDataValues() {
    this.isLoading = true;
    if (this.validator.validateForm(this.values_form)) {
      this.formValuesHasErrors = true;
      return;
    } else {
      this.obra_values_item.costoMateriales =
        this.values_form.value.costoMateriales;
      this.obra_values_item.costoManoObra =
        this.values_form.value.costoManoObra;
      this.obra_values_item.costoEquipos = this.values_form.value.costoEquipos;
      this.obra_values_item.costoIndirectos =
        this.values_form.value.costoIndirectos;
      this.obra_values_item.gastosFinancieros =
        this.values_form.value.gastosFinancieros;
      this.obra_values_item.gastosTributarios =
        this.values_form.value.gastosTributarios;
      this.obra_values_item.totalCostosGastosProduccion =
        this.values_form.value.totalCostosGastosProduccion;
      this.obra_values_item.totalCostosGastos =
        this.values_form.value.totalCostosGastos;
      this.obra_values_item.otrosConceptos =
        this.values_form.value.otrosConceptos;
      this.obra_values_item.totalGastosObra =
        this.values_form.value.totalGastosObra;
      this.obra_values_item.precioServicio =
        this.values_form.value.precioServicio;
      this.obra_values_item.utilidades = this.values_form.value.utilidades;
      this.obra_values_item.estado = this.values_form.value.estado;
      this.obra_values_item.catalogo = this.values_form.value.catalogo;
      this.obra_values_item.obra = this.obra;
      this.obra_values_item.valoresEspecialidades = this.espArray;
      this.obra_values_srv
        .addObraValues(this.obra_values_item)
        .subscribe((result) => {
          if (result) {
            this.isLoading = false;
            this.router.navigate(['/Obras']);
          }
        });
    }
  }

  addDataEspecialidades() {}

  addEspTable() {
    if (this.espList.length === 0) {
      return;
    }
    if (
      this.esp_form.value.especialidades === '' ||
      this.esp_form.value.costoTotal === ''
    ) {
      return;
    }
    const esp_sel = this.esp_form.value.especialidades.description;
    for (let esp of this.espArray) {
      if (esp_sel === esp.especialidades.description) {
        this.isEspAdd = true;
        return;
      }
    }
    this.espArray.push(this.esp_form.value);
    this.isEspAdd = false;
    this.esp_form.reset();
  }

  poblateTable() {
    if (this.validator.validateForm(this.addUnidadObra)) {
      this.formUnidadHasErrors = true;
      return;
    }
    if (this.chekIfExistUnit(this.addUnidadObra.get('unidad')?.value)) {
      this.unidadFlag = true;
    } else {
      const itemUnidad = {
        unidadFin: this.addUnidadObra.get('unidad')?.value,
        cantidad: Number(this.addUnidadObra.get('volumen')?.value).toFixed(2),
      };
      this.unidadesCantidad.push(itemUnidad);
      this.addUnidadObra.reset();
    }
  }

  chekIfExistUnit(unidad: any) {
    var review: boolean = false;
    const unidadList = this.unidadesCantidad.filter(
      (item: any) => item.unidadFin.id === unidad.id
    );
    if (unidadList.length > 0) {
      review = true;
    }
    return review;
  }

  delEspTable(index: number) {
    this.espArray.splice(index, 1);
  }

  currentFile!: File;
  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      this.dataFile = reader.result;
    };
    reader.readAsText(this.currentFile);
  }

  getDataFromFile() {
    this.fromFile = true;
    this.data = JSON.parse(this.dataFile);
    this.dataEspecialidadesToJson = this.data.valoresEspecialidades;
    this.checkEspecialidadesInITE(this.data.valoresEspecialidades);
    this.getUMListJSON(this.data);

    this.add_form = new FormGroup({
      code: new FormControl(this.data.codigo, Validators.required),
      description: new FormControl(this.data.descripcion, Validators.required),
      tipoObra: new FormControl(this.data.tipo, Validators.required),
      specifications: new FormControl(
        this.data.especificacion,
        Validators.required
      ),
      tipology: new FormControl('', Validators.required),
      fecha: new FormControl(this.data.annos, Validators.required),
    });
  }

  checkEspecialidadesInITE(dataEspecialidadesToJson: any[]) {
    if (this.espList.length > 0) {
      dataEspecialidadesToJson.forEach((item: any) => {
        var esp = this.getDatoByEspecialidad(item.description);
        if (esp == null) {
          this.especialidad_item = {
            code: item.code,
            description: item.description,
          };

          this.listEspAdd.push(this.especialidad_item);
        }
      });
    } else {
      dataEspecialidadesToJson.forEach((item: any) => {
        var esp = this.getDatoByEspecialidad(item.description);
        if (esp == null) {
          this.especialidad_item = {
            code: item.code,
            description: item.description,
          };

          this.listEspAdd.push(this.especialidad_item);
        }
      });
    }
    if (this.listEspAdd.length > 0) {
      this.addNewEspecialidades(this.listEspAdd);
    }
  }

  addNewEspecialidades(listEspAdd: any[]) {
   return this.esp_srv
      .addListEspecialidades(listEspAdd)
      .subscribe((resp) => {
        this.getEspList();
      });
  }

  createDataFromEspecialidades(dataEspecialidadesToJson: any[]) {
    dataEspecialidadesToJson.forEach((item: any) => {
      let esp = this.getDatoByEspecialidad(item.description);
     if (esp != null) {
        const itemEsp = {
          especialidades: esp,
          costoTotal: Number(item.valor).toFixed(2),
        };
        this.espArray.push(itemEsp);
      }
    });
  
  }

  getDatoByEspecialidad(descrip: string) {
    if(this.espList.length === 0){
      this.getEspList();
    }
    return this.espList.find(
      (item: any) =>
        String(item.description).toLowerCase().trim() ===
        String(descrip).toLowerCase().trim()
    );
    
  }

  addDataToValuesForm(data: any) {
    this.values_form = new FormGroup({
      costoMateriales: new FormControl(
        Number(data.costoMateriales).toFixed(2),
        Validators.required
      ),
      costoManoObra: new FormControl(
        Number(data.costoManoObra).toFixed(2),
        Validators.required
      ),
      costoEquipos: new FormControl(
        Number(data.costoEquipos).toFixed(2),
        Validators.required
      ),
      estado: new FormControl('', Validators.required),
      catalogo: new FormControl(data.catalogo, Validators.required),
      costoIndirectos: new FormControl(Number(data.indirectos).toFixed(2), Validators.required),
      gastosFinancieros: new FormControl(Number(data.financieros).toFixed(2), Validators.required),
      gastosTributarios: new FormControl(Number(data.tributarios).toFixed(2), Validators.required),
      totalCostosGastosProduccion: new FormControl(
        Number(data.totalcgpo).toFixed(2),
        Validators.required
      ),
      totalCostosGastos: new FormControl(Number(data.totalcg).toFixed(2), Validators.required),
      otrosConceptos: new FormControl(Number(data.otroscg).toFixed(2), Validators.required),
      totalGastosObra: new FormControl(Number(data.totalgo).toFixed(2), Validators.required),
      utilidades: new FormControl(
        Number(data.utilidades).toFixed(2),
        Validators.required
      ),
      precioServicio: new FormControl(
        Number(data.precio).toFixed(2),
        Validators.required
      ),
    });
  }

  isCodeObra(code: any) {
    for (let obra of this.obraList) {
      if (code === obra.code) {
        return true;
      }
    }
    return false;
  }

  deleteUnidad(item: any) {
    const index = this.unidadesCantidad.indexOf(item);
    if (index !== -1) {
      this.unidadesCantidad.splice(index, 1);
    }
  }

  resetFlagValue() {
    this.unidadFlag = false;
  }

  getTipoObraList() {
    this.tipoObraServ.getAllTipoObra().subscribe((response) => {
      this.tipoObraList = response;
      this.selectedTipoObra = this.tipoObraList[0];
      this.add_form.value.tipoObra = this.selectedTipoObra;
      this.setTipologies();
    });
  }

  setTipologies() {
    const tipoObra = this.add_form.value.tipoObra;
    this.tipoObraServ.getObraTipologyList(tipoObra.id).subscribe((response) => {
      this.tipologyList = response;
      this.selectedTipology = this.tipologyList[0];
    });
  }

  codeIsInvalid: boolean = false;
  validateCode() {
    const code = this.add_form.value.code;
    var codeClass: string = '';
    if (String(code).length > 6) {
      codeClass = 'form-control is-invalid';
      this.codeIsInvalid = true;
    } else {
      codeClass = 'form-control';
      this.codeIsInvalid = false;
    }
    document.getElementById('code')?.setAttribute('class', codeClass);
  }
}
