import { Injectable } from '@angular/core';
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Injectable({
  providedIn: 'root'
})
export class ExportarFileService {

  constructor() { }
  dataEsp: Array<string | number | number>[] = [];
  dataCostD: Array<string | number>[] = [];
  dataCostI: Array<string | number>[] = [];
  dataIndex: Array<string | number | String>[] = [];
  vol: number = 0;
  costo: number = 0;
  indexCalc: any;

  generateExeclFromITEData(indice: any, tableIndex: any) {
    this.createdCostoDirectos(indice);
    this.vol = Number(indice.volumen);
    this.indexCalc = indice;
    this.createdEspArray(indice.valoresEspecialidades);
    this.createdDataIndex(tableIndex);

    const title = indice.obra.code + " - " + indice.obra.description;
    const headerTableIndex = ["Unidad de Fin", "Cantidad", "Costo/Unidad"];
    const headerTableCostos = ["Concepto", "Valor", "%"];
    const headerTableEspecialidades = ["Especialidad", "Valor", "%"];

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('ITE-' + indice.obra.code);
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Arial', family: 4, size: 14, bold: true }
    worksheet.mergeCells('A1:C2');
    worksheet.addRow([]);

    var FileName = "ITE-" + indice.obra.code;
    let tipology = worksheet.addRow(["Tipo de Obra: " + indice.obra.tipoObra.descripcion, "Sistema Presupuestario:" + indice.catalogo]);
    tipology.font = { name: 'Arial', family: 2, size: 10, bold: true }
    //let total = worksheet.addRow(["Tipología: " + indice.obra.tipology.description, "Valor Total: " + this.calcCostoTotal(this.indexCalc)]);
    let total = worksheet.addRow(["Tipología: " + indice.obra.tipology.description, "Valor Total: " + Number(indice.precioServicio).toLocaleString('en-US')]);
    total.font = { name: 'Arial', family: 2, size: 10, bold: true }
    let anno = worksheet.addRow(["Año: " + indice.obra.fecha, " "]);
    anno.font = { name: 'Arial', family: 2, size: 10, bold: true }
    worksheet.addRow([]);
    let desc = worksheet.addRow(["Especificaciones"]);
    desc.font = { name: 'Arial', family: 2, size: 10, bold: true }
    let esp = worksheet.addRow([indice.obra.specifications]);
    esp.font = { name: 'Arial', family: 2, size: 10 }
    worksheet.addRow([]);

    let tr0 = worksheet.addRow(["Indices por Unidad de Fin"]);
    tr0.font = { name: 'Arial', family: 2, size: 10, bold: true }
    const headerRowIndex = worksheet.addRow(headerTableIndex);
    headerRowIndex.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'e5e7e9' },
        bgColor: { argb: 'e5e7e9' },
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.font = { name: 'Arial', family: 2, size: 10, bold: true }
      cell.alignment = { vertical: 'bottom', horizontal: 'left' };
    })
    this.dataIndex.forEach(d => {
      let row = worksheet.addRow(d);
      row.alignment = { vertical: 'bottom', horizontal: 'left' };
    }
    );
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);

    let tr1 = worksheet.addRow(["Costos Directos"]);
    tr1.font = { name: 'Arial', family: 2, size: 10, bold: true }
    const headerRow1 = worksheet.addRow(headerTableCostos);
    //Add Header Row
    // Cell Style : Fill and Border
    headerRow1.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'e5e7e9' },
        bgColor: { argb: 'e5e7e9' },
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.font = { name: 'Arial', family: 2, size: 10, bold: true }
      cell.alignment = { vertical: 'bottom', horizontal: 'left' };
    })
    // Add Data and Conditional Formatting
    this.dataCostD.forEach(d => {
      let row = worksheet.addRow(d);
      row.alignment = { vertical: 'bottom', horizontal: 'left' };
    }
    );
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);

    let tr2 = worksheet.addRow(["Otros Gastos Directos e Indirectos"]);
    tr2.font = { name: 'Arial', family: 2, size: 10, bold: true }
    this.createdCostoIndirectos(indice);

    const headerRow2 = worksheet.addRow(headerTableCostos);
    //Add Header Row
    // Cell Style : Fill and Border
    headerRow2.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'e5e7e9' },
        bgColor: { argb: 'e5e7e9' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.font = { name: 'Arial', family: 2, size: 10, bold: true }
      cell.alignment = { vertical: 'bottom', horizontal: 'left' };
    })
    // Add Data and Conditional Formatting
    this.dataCostI.forEach(d => {
      let row = worksheet.addRow(d);
      row.alignment = { vertical: 'bottom', horizontal: 'left' };
    }
    );
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);

    let tr3 = worksheet.addRow(["Costos por Especialidades"]);
    tr3.font = { name: 'Arial', family: 2, size: 10, bold: true }
    const headerRow = worksheet.addRow(headerTableEspecialidades);
    //Add Header Row
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'e5e7e9' },
        bgColor: { argb: 'e5e7e9' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.font = { name: 'Arial', family: 2, size: 10, bold: true }
      cell.alignment = { vertical: 'bottom', horizontal: 'left' };
    })
    // Add Data and Conditional Formatting
    this.dataEsp.forEach(d => {
      let row = worksheet.addRow(d);
      row.alignment = { vertical: 'bottom', horizontal: 'left' };
    }
    );
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 30;
    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, FileName + '.xlsx');
    });

  }
  createdDataIndex(tableIndex: any) {
    tableIndex.forEach((element: any) => {
      const item = this.createdTempIndexArray(element.unidad, element.cantidad, element.indice);
      this.dataIndex.push(item);
    });
    return this.dataIndex;
  }
  createdCostoDirectos(indice: any) {
    const data1: Array<string | number> = [];
    const data2: Array<string | number> = [];
    const data3: Array<string | number> = [];
    data1.push("Costo Materiales", Number(indice.costoMateriales).toLocaleString('en-US'), Number(Number(indice.costoMateriales / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data2.push("Costo Mano de Obra", Number(indice.costoManoObra).toLocaleString('en-US'), Number(Number(indice.costoManoObra / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data3.push("Costo Equipos", Number(indice.costoEquipos).toLocaleString('en-US'), Number(Number(indice.costoEquipos / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    this.dataCostD.push(data1);
    this.dataCostD.push(data2);
    this.dataCostD.push(data3);
    return this.dataCostD;
  }

  createdCostoIndirectos(indice: any) {
    const data1: Array<string | number> = [];
    const data2: Array<string | number> = [];
    const data3: Array<string | number> = [];
    const data4: Array<string | number> = [];
    const data6: Array<string | number> = [];
    const data7: Array<string | number> = [];
    const data8: Array<string | number> = [];
    const data9: Array<string | number> = [];
    const data5: Array<string | number> = [];

    data1.push("Total de Costos y Gastos de Producción de la Obra", Number(indice.totalCostosGastosProduccion).toLocaleString('en-US'), Number(Number(indice.totalCostosGastosProduccion / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data2.push("Gastos Indirectos", Number(indice.costoIndirectos).toLocaleString('en-US'), Number(Number(indice.costoIndirectos / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data3.push("Otros Conceptos de Gastos", Number(indice.otrosConceptos).toLocaleString('en-US'), Number(Number(indice.otrosConceptos / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data4.push("Gastos Financieros", Number(indice.gastosFinancieros).toLocaleString('en-US'), Number(Number(indice.gastosFinancieros / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data6.push("Gastos Tributarios", Number(indice.gastosTributarios).toLocaleString('en-US'), Number(Number(indice.gastosTributarios / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data7.push("Total de Gastos de la Obra", Number(indice.totalGastosObra).toLocaleString('en-US'), Number(Number(indice.totalGastosObra / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data8.push("Total de Costos y Gastos", Number(indice.totalCostosGastos).toLocaleString('en-US'), Number(Number(indice.totalCostosGastos / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data5.push("Utilidades", Number(indice.utilidades).toLocaleString('en-US'), Number(Number(indice.utilidades / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    data9.push("Precio del Servicio de Construcción", Number(indice.precioServicio).toLocaleString('en-US'), Number(Number(indice.precioServicio / indice.precioServicio * 100).toFixed(2)).toLocaleString('en-US'));
    this.dataCostI.push(data1);
    this.dataCostI.push(data2);
    this.dataCostI.push(data3);
    this.dataCostI.push(data4);
    this.dataCostI.push(data6);
    this.dataCostI.push(data7);
    this.dataCostI.push(data8);
    this.dataCostI.push(data5);
    this.dataCostI.push(data9);
    return this.dataCostI;
  }

  createdEspArray(espList: any) {
    espList.forEach((element: any) => {
      const item = this.createdTempArray(element.especialidades.description, element.costoTotal);
      this.dataEsp.push(item);
    });
    return this.dataEsp;
  }
  createdTempArray(description: any, costoTotal: any) {
    const data: Array<string | number | number> = [];
    var calc = costoTotal / this.indexCalc.precioServicio;
    var val = Number(calc * 100).toFixed(2);
    data.push(description, Number(costoTotal).toLocaleString('en-US'), Number(val).toLocaleString('en-US'));
    return data
  }

  createdTempIndexArray(unidad: any, cantidad: any, costUnidad: any) {
    const data: Array<string | number | String> = [];
    data.push(unidad, cantidad, costUnidad);
    return data
  }

  calcCostoTotal(indice: any) {
    var val = indice.costoMateriales + indice.costoManoObra +
      indice.costoEquipos + indice.costoIndirectos + indice.totalCostosGastosProduccion +
      indice.costoIndirectos + indice.otrosConceptos + indice.gastosFinancieros + indice.gastosTributarios + indice.totalGastosObra + indice.totalCostosGastos + indice.utilidades;
    this.costo = Number(val);
    return this.costo
  }

  buildTableBody(data: any, columns: any, colStyle?: any, push_cols: boolean = false) {
    var body = [];
    if (typeof colStyle === 'undefined') {
      body.push(columns);
    } else {
      body.push(colStyle);
    }
    //body.push(columns);
    data.forEach((row: any) => {
      var dataRow: any = [];
      columns.forEach((column: any) => {
        dataRow.push(row[column].toString());
      })
      body.push(dataRow);
    });
    return body;
  }

  buildTable(data: any, columns: any, header?: any) {
    var body = [];
    if (typeof(header) != 'undefined') {
      body.push(header);
    }
    data.forEach((row: any) => {
        var dataRow: any = [];
        columns.forEach((column: any) => {
          dataRow.push(row[column].toString());
        })
        body.push(dataRow);
    });
    return body;
  }

  data2table(data: any, columns: any) {
    var colWidth = [];
    for (let index = 0; index < columns.length; index++) {
      if (index == 0) {
        colWidth.push(50);
      } else {
        colWidth.push('*');
      }
    }
    return {
      table: {
        headerRows: 1,
        widths: colWidth,
        body: this.buildTableBody(data, columns)
      },
      layout: this.getTableLayout(4)
    };
  }

  dataToStyledTable(data: any, columns: any) {
    const style = {
      border: [false, false, false, true],
      margin: [0, 5, 0, 5],
      alignment: 'left',
    }
  }

  exportTablePDF(data: any, columns: any) {
    const docDefinition = {
      content: [
        { text: 'Tabla', style: 'header' },
        this.data2table(data, columns)
      ]
    }
    pdfMake.createPdf(docDefinition).open();
  }

  exportPDF(data: any) {
    pdfMake.createPdf(data).open();
  }


  getTableLayout(layaut: number) {
    switch (layaut) {
      case 1: {
        return {
          fillColor: function (rowIndex: any, node: any, columnIndex: any) {
            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
          },
          hLineColor: function (i: number) {
            return i === 1 ? 'black' : '#fff';
          },
          hLineWidth: function (i: number, node: any) {
            if (i === 0 || i === node.table.body.length) {
              return 0;
            }
            return (i === node.table.headerRows) ? 2 : 1;
          }
        }
      }

      case 2: {
        return 'headerLineOnly';
      }

      case 3: {
        return 'lightHorizontalLines';
      }

      case 4: {
        return {
          hLineWidth: function (i: number, node: any) {
            if (i === 0 || i === 1) {
              return 1;
            }
            return 0;
          },
          vLineWidth: function (i: number) {
            return 0;
          },
        };
      }

      case 5: {
        return {
          hLineWidth: function (i: number, node: any) {
            if (i === 0) {
              return 1;
            }
            if (i === node.table.body.length) {
              return 1;
            }
            return 0;
          },
          vLineWidth: function (i: number, node: any) {
            if (i === 0) {
              return 1;
            }
            if (i === node.table.body[0].length) {
              return 1;
            }
            return 0;
          },
        };
      }

      default: {
        return 'noBorders';
      }
    }
  }

}
