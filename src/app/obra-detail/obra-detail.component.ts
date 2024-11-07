import {Component, OnInit} from '@angular/core';
import {ObraService} from "../obra/obra.service";
import {ValoresService} from "../valores/valores.service";
import { UnidadFinService } from '../unidad-fin/unidad-fin.service';
import {ActivatedRoute} from "@angular/router";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DifineIndexComponentComponent } from '../difineIndex-component/difineIndex-component.component';

export interface DialogData {
  idObra: number;
  obra: any;
  volumen: number;
  unidadFin: string;
  tipoServicio: any;
  valores: any ;
  unidadList: any;
}

@Component({
  selector: 'app-obra-detail',
  templateUrl: './obra-detail.component.html',
  styleUrls: ['./obra-detail.component.css']
})
export class ObraDetailComponent implements OnInit {
  isLoading!:boolean;
  constructor(private service: ObraService, private  activeRoute: ActivatedRoute, private valoreService: ValoresService, private dialog: MatDialog, private unidService: UnidadFinService) {
  }

  obra: any;
  test: any;
  id: any;
  chart: any;
  valores: any = [];
  labels: any = [];
  calcValores: any = [];
  unidadFin: any;
  csc: any;
  valorEspecialidades: any = [];
  especialidadesValor: any = [];
  unidadesList: any = [];
  total: number = 0;
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataSets[] = [];
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getObraByParam(this.id);
    this.getValoresBThisObra(this.id);
    this.buildBarChart();
    this.createUnidadList();
  }
  createUnidadList() {
   return this.unidService.getUnidadFinList().subscribe(response=> {
    if(response){
      this.unidadesList = response;
      this.isLoading = false;
    }
   })
  }

  getObraByParam(obra_id: any) {
    this.isLoading = true;
    this.service.getObraById(obra_id).subscribe((result) => {
      console.log(result)
      this.obra = result;
      this.unidadFin = this.obra['unidad'];
    })
  }

  getValoresBThisObra(obra_id: any) {
   // this.isLoading = true;
    this.valoreService.getValoresByObra(obra_id).subscribe((allData) => {
      this.valores = allData;
      this.valores.forEach((res: any) => {
        this.labels.push(res['estado']);
        this.csc = res['precioServicio'];
        console.log(this.csc)
        this.calcValores.push(Number(this.csc).toFixed(2));

      });
    // this.isLoading =false;
    });
  }

  public colors = [{
    backgroundColor: [
      '#209ad8',
      '#209ad8',
      '#209ad8',
    ]
  }]

  buildBarChart() {
    this.barChartLabels = this.labels;
    this.barChartData = [
      {data: this.calcValores, label: 'Servicios'},
    ]
  }

  deleteItem(valor_id: any){
   this.valoreService.deleteValor(valor_id).subscribe((result) => {
    this.getObraByParam(this.id);
    this.getValoresBThisObra(this.id);
    this.buildBarChart();
    })

  }

  showModalToIndex(data: any){
    const dialogRef = this.dialog.open(DifineIndexComponentComponent, {
     width: '550px',
      data: { idObra: this.obra['id'], obra: this.obra, tipoServicio: data.estado, valores: data ,  unidadList:this.unidadesList },
    });
  }


}
