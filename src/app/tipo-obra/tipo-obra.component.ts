import { Component, OnInit } from '@angular/core';
import { TipoObraService } from './tipo-obra.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTipoObraModalComponent } from '../edit-tipo-obra-modal/edit-tipo-obra-modal.component';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';

export interface TipoObraData {
  id: number;
  descripcion: string;
};

@Component({
  selector: 'app-tipo-obra',
  templateUrl: './tipo-obra.component.html',
  styleUrls: ['./tipo-obra.component.css']
})

export class TipoObraComponent implements OnInit {

  tipoObraList : any = [];
  isLoading!: boolean;

  constructor(private service : TipoObraService, public dialog: MatDialog, public confirmDialogService: DialogService) { }

  ngOnInit(): void {
    this.getTipoObraList();
  }

  getTipoObraList() {
    this.isLoading = true;
    this.service.getAllTipoObra().subscribe(
      response => {
        this.tipoObraList = response;
        this.isLoading = false;
      }
    )
  }

  deleteItem(data: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar este tipo de obra?',
      confirmText: 'Si',
      cancelText: 'No',
    }
    this.confirmDialogService.confirmDialog(confirmData).subscribe(action => {
      if (action) {
        this.service.deleteTipoObra(data.id).subscribe((result) => {
          this.getTipoObraList();
        });
      }
    });
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(EditTipoObraModalComponent, {
      width: '350px',
      data: { id: data['id'], descripcion: data['descripcion'] },
    });

    dialogRef.afterClosed().subscribe(result => {
       this.getTipoObraList();
    });
  }

}
