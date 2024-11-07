import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipologiaServiceService } from '../tipology/tipologia-service.service';
import { ObraService } from "../obra/obra.service";
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { UnidadFinService } from '../unidad-fin/unidad-fin.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { EntPoint } from '../entPoint';

@Component({
  selector: 'app-obra-update',
  templateUrl: './obra-update.component.html',
  styleUrls: ['./obra-update.component.css']
})
export class ObraUpdateComponent implements OnInit, AfterViewInit {

  constructor(
    private typology_srv: TipologiaServiceService,
    private activeRoute: ActivatedRoute,
    private obra_srv: ObraService,
    private unidad_srv: UnidadFinService,
    private router: Router,
    private tipoObraServ: TipoObraService,
    public validator: EntPoint) { }

  tipologyList: any = [];
  unidadFinList: any = [];
  tipoObraList: any = [];
  obra: any;
  id: any;
  selectedTipology: any;
  selectedUnidad: any;
  selectedTipoObra: any;
  formHasErrors: boolean = false;
  unidadesCantidad: any = [];
  formAddHasErrors: boolean = false;
  formValuesHasErrors: boolean = false;
  formEspHasErrors: boolean = false;
  unidadFlag: boolean = false;
  formUnidadHasErrors: boolean = false;

  update_form = new FormGroup({
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    specifications: new FormControl('', Validators.required),
    tipoObra: new FormControl('', Validators.required),
    tipology: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    volumen: new FormControl('', Validators.required),
    unidad: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getObraByParam(this.id);
    this.getUnidadFinList();
    this.getTipoObraList();
  }

  ngAfterViewInit(): void {
    this.setTipologies(true);
  }

  getTypologoList() {
    this.typology_srv.getTipologyList().subscribe(
      (response) => {
        this.tipologyList = response;
        this.compareTipology(this.tipologyList);
      }
    )
  }

  getTipoObraList() {
    this.tipoObraServ.getAllTipoObra().subscribe(
      response => {
        this.tipoObraList = response;
        this.compareTipoObra(this.tipoObraList);
      }
    )
  }

  getUnidadFinList() {
    this.unidad_srv.getUnidadFinList().subscribe(
      (response) => {
        this.unidadFinList = response;
      }
    )
  }

  compareTipology(tipologyList: any) {
    tipologyList.forEach((element: any) => {
      if (element['id'] === this.obra.tipology.id) {
        this.selectedTipology = element;
      }
    });
  }

  compareTipoObra(tipoObraList: any) {
    tipoObraList.forEach((element: any) => {
      if (element['id'] === this.obra.tipoObra.id) {
        this.selectedTipoObra = element;
      }
    });
  }

  updateDataObra() {
    if (this.validator.validateForm(this.update_form)) {
      this.formHasErrors = true;
      return;
    }
    this.obra_srv.updateObra(this.obra.id, this.update_form.value).subscribe((result) => {
      this.router.navigate(['/Obras']);
    });
  }

  getObraByParam(obra_id: any) {
    this.obra_srv.getObraById(obra_id).subscribe((result) => {
      this.obra = result;
      this.unidadesCantidad = this.obra.obraUnidades
      this.update_form.patchValue({
        code: this.obra.code,
        description: this.obra.description,
        specifications: this.obra.specifications,
        tipoObra: this.obra.tipoObra,
        tipology: this.obra.tipology,
        fecha: this.obra.fecha,
        volumen: this.obra.volumen,
        unidad: this.obra.unidad
      });
    })
  }


  addUnidadObra = new FormGroup({
    volumen: new FormControl('', Validators.required),
    unidad: new FormControl('', Validators.required),
  });

  poblateTable() {
    if (this.validator.validateForm(this.addUnidadObra)) {
      this.formUnidadHasErrors = true;
      return;
    }
    if (this.chekIfExistUnit(this.addUnidadObra.get('unidad')?.value)) {
      this.unidadFlag = true;
    } else {
      const itemUnidad = {
        'unidadFin': this.addUnidadObra.get('unidad')?.value,
        'cantidad': Number(this.addUnidadObra.get('volumen')?.value).toFixed(2)
      }
      this.saveAction(itemUnidad);
      this.unidadesCantidad.push(itemUnidad);
      this.addUnidadObra.reset()
    }
  }

  chekIfExistUnit(unidad: any) {
    var review: boolean = false;
    const unidadList = this.unidadesCantidad.filter((item: any) => item.unidadFin.id === this.addUnidadObra.get('unidad')?.value.id);
    if (unidadList.length > 0) {
      review = true;
    }
    return review;
  }

  saveAction(itemUnidad: { unidadFin: any; cantidad: string; }) {
    return this.unidad_srv.addUnidadObra(this.obra.id, itemUnidad).subscribe(response => {
      console.log(response)
    })
  }

  deleteUnidad(item: any) {
    const index = this.unidadesCantidad.indexOf(item);
    if (index !== -1) {
      this.unidadesCantidad.splice(index, 1);
      this.deleteAction(item);
    }
  }
  deleteAction(item: any) {
    this.unidad_srv.deleteUnidadObra(this.obra.id, item.unidadFin.id).subscribe(resp => {
      console.log(resp);
    })
  }

  resetFlagValue(){
    this.unidadFlag = false;
  }

  setTipologies(isAfterInit: boolean) {
    let tipoObra;
    if (isAfterInit) {
      tipoObra = this.obra.tipoObra;
    }
    else {
      tipoObra = this.update_form.value.tipoObra;
    }
    this.tipoObraServ.getObraTipologyList(tipoObra.id).subscribe(
      response => {
        this.tipologyList = response;
        if (isAfterInit) {
          const selTipology = this.tipologyList.filter((item: any) => item.description === this.obra.tipology.description);
          if (selTipology.length > 0) {
            this.selectedTipology = selTipology[0];
          }
          else {
            this.selectedTipology = this.tipologyList[0];
          }
        }
        else {
          this.selectedTipology = this.tipologyList[0];
        }
      }
    )
  }

}
