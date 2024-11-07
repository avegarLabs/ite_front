import { Component, OnInit } from '@angular/core';
import { TipologiaServiceService } from './tipologia-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTipologyModalComponentComponent } from '../editTipologyModal-component/editTipologyModal-component.component';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';

export interface DialogData {
  id: number;
  description: string;
  tipoObraTipologiasList: any;
}

@Component({
  selector: 'app-tipology',
  templateUrl: './tipology.component.html',
  styleUrls: ['./tipology.component.css']
})
export class TipologyComponent implements OnInit {
  constructor(private service: TipologiaServiceService, public dialog: MatDialog, public confirmDialogService: DialogService) { }

  tipologyList: any = []
  isLoading!:boolean;
  ngOnInit(): void {
    this.getAllTipologys();
  }

  getAllTipologys() {
    this.isLoading = true;
    this.service.getTipologyList().subscribe((allData) => {
      this.tipologyList = allData;
      this.isLoading = false;
    })
  }

  deleteItem(tipology_id: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar esta tipología?',
      confirmText: 'Si',
      cancelText: 'No',
    }
    this.confirmDialogService.confirmDialog(confirmData).subscribe(action => {
      if (action) {
        this.service.deleteTipology(tipology_id).subscribe((result) => {
          this.getAllTipologys();
        });
      }
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(EditTipologyModalComponentComponent, {
      width: '350px',
      data: { id: data['id'], description: data['description'], tipoObraTipologiasList: data['tipoObraTipologiasList'] },
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getAllTipologys();
    });

  }
}
