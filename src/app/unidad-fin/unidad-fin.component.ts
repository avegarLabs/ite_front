import { Component, OnInit } from '@angular/core';
import { UnidadFinService } from './unidad-fin.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUnidadFinComponent } from '../edit-unidad-fin/edit-unidad-fin.component';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';
import { trace } from 'console';
export interface UnidadFin {
  id: number;
  tipo: string;
  um: string;
}

@Component({
  selector: 'app-unidad-fin',
  templateUrl: './unidad-fin.component.html',
  styleUrls: ['./unidad-fin.component.css'],
})
export class UnidadFinComponent implements OnInit {
  unidadFinList: any = [];
  isLoading!:boolean;

  constructor(
    private uf_srv: UnidadFinService,
    public dialog: MatDialog,
    public confirmDialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getUnidadFinList();
  }

  getUnidadFinList() {
    this.isLoading = true;
    this.uf_srv.getUnidadFinList().subscribe((allData) => {
      this.unidadFinList = allData;
      this.isLoading = false;
    });
  }

  deleteUnidadFin(id: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar esta unidad de fin?',
      confirmText: 'Si',
      cancelText: 'No',
    };
    this.confirmDialogService.confirmDialog(confirmData).subscribe((action) => {
      if (action) {
        this.uf_srv.deleteUnidadFin(id).subscribe((result) => {
          this.getUnidadFinList();
          
        });
      }
    });
  }

  modalDialogUpdate(unidadFin: any) {
    const dialogRef = this.dialog.open(EditUnidadFinComponent, {
      width: '350px',
      data: {
        id: unidadFin['id'],
        tipo: unidadFin['tipo'],
        um: unidadFin['um'],
      },
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getUnidadFinList();
   });
  }
}
