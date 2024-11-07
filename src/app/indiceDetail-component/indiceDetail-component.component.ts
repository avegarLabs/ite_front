import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IndiceServiceService } from '../indice-component/indice-service.service';
import { ObraService } from '../obra/obra.service';
import { ExportarFileService } from '../exportarFile.service';
//import * as console from 'console';

@Component({
  selector: 'app-indiceDetail-component',
  templateUrl: './indiceDetail-component.component.html',
  styleUrls: ['./indiceDetail-component.component.css']
})
export class IndiceDetailComponentComponent implements OnInit {
  isLoading!:boolean;

  constructor(private activeRoute: ActivatedRoute,
    private service: IndiceServiceService,
    private servExport: ExportarFileService,
    private obraSer: ObraService) { }
  id: any;
  estado: any;
  Listindices: any;
  listIndexTable: any = [];
  obra: any;
  datosBase:any;
  flag_indirect_cost: boolean = true;
  costo: number = 0;
  fontSize: number = 10;
  um_str: string = '';
  
  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      this.id = param['obraid']
    });
    this.activeRoute.params.subscribe((param) => {
      this.estado = param['estado']
    });
    this.getDataObra(this.id);
    this.getDetalleIndice(this.id, this.estado);
  }

  getDataObra(id: any) {
    this.isLoading = true;
    return this.obraSer.getObraById(id).subscribe(resp => {
      this.obra = resp
    });
  }

  getDetalleIndice(id: any, stado: any) {
    return this.service.getSingleIndice(id, stado).subscribe(response => {
      this.Listindices = response
      this.createdIntexTable(this.Listindices);
       this.activeFlag(stado);
      // this.um_str = this.indice.unidad.um;
      this.setHeaderTables();
      this.setDataCostos();
      this.isLoading = false;
    })
  }

  createdIntexTable(Listindices: any) {
    Listindices.forEach((element: any) => {
      const indice = {
        'base': element.datosBase,
        'unidad': element.unidad.tipo + " - " + element.unidad.um,
        'cantidad': element.volumen,
        'indice': this.setCurrencyFormat(element.valor) + " / " + element.unidad.um
      }
      console.log(indice);
      this.listIndexTable.push(indice);
    });

    this.datosBase = this.listIndexTable[0].base;
  }

  activeFlag(state: any) {
    if (state === "total") {
     var val = this.datosBase.precioServicio;
     this.costo = Number(this.setFixedValue(val, 2));
     this.flag_indirect_cost = true;
    }else{
      var val = this.datosBase.precioServicio;
      this.costo = Number(this.setFixedValue(val, 2));
    }
  }

  setFixedValue(value: number, digits?: number) {
    if (typeof digits != 'undefined') {
      return value.toFixed(digits);
    }
    if (value == 0.0) {
      return value.toFixed(2);
    }
    if (value < 0.01) {
      return value.toFixed(3);
    }
    if (value < 1) {
      return value.toFixed(2);
    }
    if (value >= 1 && value < 10) {
      return value.toFixed(2);
    }
    return value.toFixed(1);
  }

  setCurrencyFormat(value: number) {
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    var result = numberFormat.format(value);
    result = result.replace('$', "").trim();
    return result;
  }

  setDataCostos() {
    const porCostMaterial = this.datosBase.costoMateriales / this.costo * 100;
    const porCostManoObr = this.datosBase.costoManoObra / this.costo * 100;
    const porCostEquipo = this.datosBase.costoEquipos / this.costo * 100;
    const porTotal = porCostMaterial + porCostManoObr + porCostEquipo;
    this.costosD = [
      {
        "c1" : "Costo Material",
        "c2" : this.setCurrencyFormat(this.datosBase.costoMateriales),
        "c3" : this.setFixedValue(porCostMaterial)
      },
      {
        "c1" : "Costo M. de Obra",
        "c2" : this.setCurrencyFormat(this.datosBase.costoManoObra),
        "c3" : this.setFixedValue(porCostManoObr)
      },
      {
        "c1" : "Costo de Equipos",
        "c2" : this.setCurrencyFormat(this.datosBase.costoEquipos),
        "c3" : this.setFixedValue(porCostEquipo)
      },
      {
        "c1" : "Total",
        "c2" : this.setCurrencyFormat(this.datosBase.costoMateriales + this.datosBase.costoManoObra + this.datosBase.costoEquipos),
        "c3" : this.setFixedValue(porTotal)
      },
    ];
    if (this.flag_indirect_cost) {
      this.costoOtros = [
        {
          'c1' : 'Total de Costos y Gastos de Producción de la Obra',
          'c2' : this.setCurrencyFormat(this.datosBase.totalCostosGastosProduccion),
          'c3' : this.setFixedValue(this.datosBase.totalCostosGastosProduccion / this.costo * 100)
        },
        {
          'c1' : 'Gastos Indirectos',
          'c2' : this.setCurrencyFormat(this.datosBase.costoIndirectos),
          'c3' : this.setFixedValue(this.datosBase.costoIndirectos / this.costo * 100)
        },
        {
          'c1' : 'Otros Conceptos de Gastos',
          'c2' : this.setCurrencyFormat(this.datosBase.otrosConceptos),
          'c3' : this.setFixedValue(this.datosBase.otrosConceptos / this.costo * 100)
        },
        {
          'c1' : 'Gastos Financieros',
          'c2' : this.setCurrencyFormat(this.datosBase.gastosFinancieros),
          'c3' : this.setFixedValue(this.datosBase.gastosFinancieros / this.costo * 100)
        },
        {
          'c1' : 'Gastos Tributarios',
          'c2' : this.setCurrencyFormat(this.datosBase.gastosTributarios),
          'c3' : this.setFixedValue(this.datosBase.gastosTributarios / this.costo * 100)
        },
        {
          'c1' : 'Total de Gastos de la Obra',
          'c2' : this.setCurrencyFormat(this.datosBase.totalGastosObra),
          'c3' : this.setFixedValue(this.datosBase.totalGastosObra / this.costo * 100)
        },
        {
          'c1' : 'Total de Costos y Gastos',
          'c2' : this.setCurrencyFormat(this.datosBase.totalCostosGastos),
          'c3' : this.setFixedValue(this.datosBase.totalCostosGastos / this.costo * 100)
        },
        {
          'c1' : 'Utilidades',
          'c2' : this.setCurrencyFormat(this.datosBase.utilidades),
          'c3' : this.setFixedValue(this.datosBase.utilidades / this.costo * 100)
        },
        {
          'c1' : 'Precio del Servicio de Construcción',
          'c2' : this.setCurrencyFormat(this.costo),
          'c3' : this.setFixedValue(100.00, 2)
        },
      ];
    } else {
      this.columnOtros = ['', '', ''];
      this.headerOtros = [{text: '', bold: false}, {text: '', bold: false}, {text: '', bold: false}];
      this.costoOtros = [];
    }

    if (this.datosBase.valoresEspecialidades.length == 0) {
      this.columnEsp = [];
      this.headerEsp = [];
    } else {
      this.datosBase.valoresEspecialidades.forEach((item : any) => {
        const Especialidad = String(item.especialidades.description).trim();
        const valor = this.setCurrencyFormat(item.costoTotal);
        const percent = (item.costoTotal / this.costo) * 100;
        const esp_item = {"c1": Especialidad,
                          "c2" : valor,
                          "c3": this.setFixedValue(percent) };
        this.costoEsp.push(esp_item);
      });
    }

    if (this.listIndexTable.length === 0) {
      this.headerUF = [];
    } else {
      this.listIndexTable.forEach((item: any) => {
        const uf = item.unidad;
        const cnt = item.cantidad;
        const idx = item.indice;
        const uf_item = {
          "c1" : uf,
          "c2" : cnt,
          "c3" : idx
        };
        this.dataUF.push(uf_item);
      });
    }

  }

  exportFile(indice: any, tableIndex: any){
   this.servExport.generateExeclFromITEData(indice, tableIndex);
  }

  columnsCost: any = [];
  headerDirectCost: any = [];
  costosD : any = [];

  columnEsp: any = [];
  headerEsp: any = [];
  costoEsp : any = [];

  columnOtros: any = [];
  headerOtros: any = [];
  costoOtros : any = [];

  columnUF: any = [];
  headerUF: any = [];
  dataUF: any = [];

  setHeaderTables() {
    this.columnsCost = ['c1', 'c2', 'c3'];
    this.headerDirectCost = [{text:'Concepto', bold: true}, {text: 'Valor', bold: true}, {text: '%', bold: true}];
    this.costosD = [];

    this.columnEsp = ['c1', 'c2', 'c3'];
    this.headerEsp = [{text:'Especialidad', bold: true}, {text: 'Valor', bold: true}, {text: '%', bold: true}];
    this.costoEsp = [];

    this.columnOtros = ['c1', 'c2', 'c3'];
    this.headerOtros = [{text:'Concepto', bold: true}, {text: 'Valor', bold: true}, {text: '%', bold: true}];
    this.costoOtros = [];

    this.columnUF = ['c1', 'c2', 'c3'];
    this.headerUF = [{text:'Unidad de Fin', bold: true}, {text: 'Cantidad', bold: true}, {text: 'Costo/Unidad', bold: true}];
    this.dataUF = [];
  }

  exportPdf() {
    const data = {
      pageSize: 'LETTER',
      footer: function(currentPage: any, pageCount: any) {
        return {
          margin: [20, 15],
          fontSize: 8,
          alignment: 'right',

          text: 'Página ' + currentPage.toString() + ' de ' + pageCount
        };
      },
      content: [
        '\n\n',
        {
          table:
          {
            headerRows: 1,
            body: [
              [{
              text: this.obra.code + " - " + this.obra.description.toUpperCase(),
              bold: true,
              color: '#000000',
              alignment: 'left',
              border: [false, true, false, true],
              margin: [0, 5, 0, 5],
              fontSize: this.fontSize
              }]
            ],
          },
        },
        '\n\n',
        {
          table:
          {
            widths: [ 200, 50, 200 ],
            body: [
              [
                { text: [{text: 'Tipo de obra: ', bold: true}, { text: this.obra.tipoObra.descripcion }], fontSize: this.fontSize, },
                {},
                { text: [{text: 'Año: ', bold: true, fontSize: this.fontSize}, {text: this.obra.fecha, fontSize: this.fontSize}] }
              ],
              [
                { text: [{text: 'Tipología: ', bold: true, fontSize: this.fontSize}, {text: this.obra.tipology.description, fontSize: this.fontSize}] },
                {},
                { text: [{text: 'Valor total: ', bold: true, fontSize: this.fontSize}, {text: this.setCurrencyFormat(this.costo), fontSize: this.fontSize}] },
              ],
              [
                { text: [{text: 'Sistema presupuestario: ', bold: true, fontSize: this.fontSize}, {text: this.datosBase.catalogo, fontSize: this.fontSize}]},
                {}, {}
              ]
            ],
          },
          layout: this.servExport.getTableLayout(2),
        },
        '\n\n',
        {
          text: this.obra.specifications,
          alignment: 'justify',
          fontSize: this.fontSize
        },
        '\n',
        {
            fontSize: this.fontSize,
            table: {
              headerRows: 1,
              widths: [350, '*', 'auto'],
              body: this.servExport.buildTable(this.dataUF, this.columnUF, this.headerUF)
            },
            layout: this.servExport.getTableLayout(3)
        },
        '\n',
        {
          columns:
          [
            [
              {
                width: '*',
                text: 'Costos Directos',
                bold: true,
                fontSize: this.fontSize,
                decoration: 'underline'
              },
              '\n',
              {
                width: '*',
                fontSize: this.fontSize,
                table: {
                  headerRows: 1,
                  widths: [140, '*', 'auto'],
                  body: this.servExport.buildTable(this.costosD, this.columnsCost, this.headerDirectCost)
                },
                layout: this.servExport.getTableLayout(3)
              },
              '\n',
              {
                width: '*',
                text: 'Otros Gastos Directos e Indirectos',
                bold: true,
                fontSize: this.fontSize,
                decoration: 'underline'
              },
              '\n',
              {
                width: '*',
                fontSize: this.fontSize,
                table: {
                  headerRows: 1,
                  widths: [140, '*', 'auto'],
                  body: this.servExport.buildTable(this.costoOtros, this.columnOtros, this.headerOtros)
                },
                layout: this.servExport.getTableLayout(3),
              }
            ],
            [
              {
                width: '*',
                text: 'Costos por Especialidades',
                bold: true,
                fontSize: this.fontSize,
                decoration: 'underline'
              },
              '\n',
              {
                width: '*',
                fontSize: this.fontSize,
                table: {
                  headerRows: 1,
                  //widths: [130, 64, 'auto'],
                  widths: [140, '*', 'auto'],
                  body: this.servExport.buildTable(this.costoEsp, this.columnEsp, this.headerEsp)
                },
                layout: this.servExport.getTableLayout(3),
              },
            ]
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 30,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 10]
        },
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
        tableStyle: {
          margin: [0, 5, 0, 5]
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };
    this.servExport.exportPDF(data);
  }

}
