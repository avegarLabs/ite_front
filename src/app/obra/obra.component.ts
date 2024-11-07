import { Component, OnInit } from '@angular/core';
import { ObraService } from './obra.service';
import { TipologiaServiceService } from '../tipology/tipologia-service.service';
import { TipoObraService } from '../tipo-obra/tipo-obra.service';
import { ObraFilterPipe } from '../obraFilter.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';
@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.css']
})
export class ObraComponent implements OnInit {

  listObra: any = [];
  tempList: any = [];
  filterKey: string = " ";
  valueChange: any;
  valueChangeTipo: any;
  tipologyList: any = [];
  tipoObraList: any = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  numItemList: number = 0;
  isLoading!: boolean;


  pgForm = new FormGroup({
    pgSize: new FormControl(this.pageSize),
  });

  constructor(
    private obra_srv: ObraService,
    private tservices: TipologiaServiceService,
    private tipoObraService: TipoObraService,
    public confirmDialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.getObrasLst();
    this.createTipoObraList();
    this.setPaginatorData();
  }

  createTipoObraList() {
    this.isLoading = true;
    this.tipoObraService.getAllTipoObra().subscribe(res => {
      if(res){
      this.isLoading = false;
        this.tipoObraList = res
      }
    });
  }

  getObrasLst() {
    this.isLoading = true;
    this.listObra = [];
    this.tempList = [];
    this.obra_srv.getAllObras().subscribe(
      response => {
        if(response){
        this.isLoading = false;
        this.tempList = response;
        this.listObra = response;
        }
      }
    )
  }

  deleteItem(obra_id: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar esta obra?',
      confirmText: 'Si',
      cancelText: 'No',
    }
    this.confirmDialogService.confirmDialog(confirmData).subscribe(deleteObra => {
      if (deleteObra) {
        this.obra_srv.deleteObra(obra_id).subscribe((result) => {
          this.getObrasLst();
        })
      }
    });
  }

  filterChangeTipology(newValue: any) {
    console.log(newValue)
    this.tipologyList = [];
    return this.tipoObraService.getObraTipologyList(Number(newValue.id)).subscribe(resp => {
      this.tipologyList = resp;
      this.listObra = [];
      this.listObra = this.tempList.filter((item: any) => String(item.tipoObra.descripcion).match(newValue.descripcion));
    });
  }


  filterChange(newValue: any) {
    const temp = this.listObra.filter((item: any) => String(item.tipology.description).match(newValue.description));
    this.listObra = [];
    this.listObra = temp
  }

  setPaginatorData() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.numItemList = this.listObra.length;
  }

  handlePageChange(index: number) {
    this.pageIndex = index;
  }

  setPageSize() {
    this.pageIndex = 0;
    this.pageSize = Number(this.pgForm.value.pgSize);
  }
}
