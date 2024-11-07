import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { IndiceServiceService } from './indice-service.service';
import { TipologiaServiceService } from '../tipology/tipologia-service.service';
import { Router } from '@angular/router';
import { IndiceFilterPipePipe } from '../IndiceFilterPipe.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';

@Component({
  selector: 'app-indice-component',
  templateUrl: './indice-component.component.html',
  styleUrls: ['./indice-component.component.css']
})
export class IndiceComponentComponent implements OnInit {

  indiceList: any = [];
  filterKey: any;
  valueChange: any;
  valueChangeTipo: any;
  tipologyList: any = [];
  tempList: any = [];
  generalList: any = [];
  pageSize: number = 3;
  pageIndex: number = 0;
  numItemList: number = 0;
  tipoObraList: any = [];
  isLoading!:boolean;

  pgForm = new FormGroup({
    pgSize: new FormControl(this.pageSize),
  });

  constructor(private indiceSev: IndiceServiceService,
              private tipologyService: TipologiaServiceService,
              private tipoObraService: TipoObraService,
              public confirmDialogService: DialogService) { }

  ngOnInit() {
    this.getAllIndices();
    this.createTipoObraService();
    this.setPaginatorData();
  }

  createTipoObraService(){
    this.tipoObraService.getAllTipoObra().subscribe(res => {
     this.tipoObraList = res
    })
  }

  getAllIndices() {
    this.isLoading = true;
    return this.indiceSev.getAllIndicesList().subscribe(res => {
      this.generalList = res;
      const distint = this.generalList.filter((thing:any, i:any, arr:any) => arr.findIndex((t:any) => t.obra.id === thing.obra.id &&  t.estado === thing.estado) === i);
      this.indiceList = distint
       this.tempList = distint;
       this.isLoading = false;
    });
  }

  filterChangeTipology(newValue: any) {
    this.tipologyList = [];
    return this.tipoObraService.getObraTipologyList(Number(newValue.id)).subscribe(resp => {
      this.tipologyList = resp;
      this.indiceList = [];
      this.indiceList = this.tempList.filter((item: any) => String(item.obra.tipoObra.descripcion).match(newValue.descripcion));
    });
  }


  filterChange(newValue: any) {
    const temp = this.tempList.filter((item: any) => String(item.obra.tipology.description).match(newValue.description));
    this.indiceList = [];
    this.indiceList = temp
  }


  refreshDatos() {
    this.ngOnInit();
  }

  deleteItem(id: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar este índice?',
      confirmText: 'Si',
      cancelText: 'No',
    }
    this.confirmDialogService.confirmDialog(confirmData).subscribe(action => {
      if (action) {
        this.indiceSev.deleteIndice(id).subscribe((response) => {
          this.ngOnInit();
        });
      }
    });
  }

  setPaginatorData() {
    this.pageSize = 3;
    this.pageIndex = 0;
    this.numItemList = this.indiceList.length;
  }

  handlePageChange(index: number) {
    this.pageIndex = index;
  }

  setPageSize() {
    this.pageIndex = 0;
    this.pageSize = Number(this.pgForm.value.pgSize);
  }

}
