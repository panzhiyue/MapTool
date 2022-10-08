import * as Excel from "exceljs";
import { saveAs } from "file-saver"
const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

export interface Worksheet {
    data: Array<Object>,  //要导出的数据
    fields: Array<string>,  //要导出的 JSON 对象内的字段。如果未提供，则 JSON 中的所有属性都将被导出。
    name: string,  //文件名称
    header: Array<string>,  //表头
}


/**
 * json转excel
 * @param worksheets 表数组
 */
export function json2Excel(worksheets: Array<Worksheet>): Excel.Workbook {
    let workbook = new Excel.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    for (let i = 0; i < worksheets.length; i++) {
        let worksheetOptions = worksheets[i];
        let worksheet = workbook.addWorksheet(worksheetOptions.name);
        if (worksheetOptions.header) {
            let header;
            if (worksheetOptions.header instanceof Array) {
                header = worksheetOptions.header;
            } else if (worksheetOptions.header == true) {
                header = getHeaderFromJSON(worksheetOptions.data[0]);
            } else {
                throw "header mot an array or boolean";
            }
            worksheet.addRow(header);
        }

        worksheetOptions.data.forEach((item, index) => {
            let row: Array<string> = [];
            let keys: Array<string> = Object.keys(item);
            for (let i in keys) {
                let field = keys[i];
                if (worksheetOptions.fields && worksheetOptions.fields.indexOf(field) == -1) {
                    continue;
                } else {
                    row.push(item[field]);
                }
            }
            worksheet.addRow(row);
        })
    }
    return workbook;
}

/**
 * 
 */
export function download(options: {
    name: string,  //文件名
    worksheets: Array<Worksheet>
}) {
    let workbook = json2Excel(options.worksheets);

    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: EXCEL_TYPE });
        saveAs(blob, options.name + ".xlsx");
    });
}

/**
 * 
 */
 export function downloadAsCsv(options: {
    name: string,  //文件名
    worksheets: Array<Worksheet>
}) {
    let workbook = json2Excel(options.worksheets);

    workbook.csv.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: EXCEL_TYPE });
        saveAs(blob, options.name + ".csv");
    });
}

/**
 * 从Json数据中获取表头
 */
function getHeaderFromJSON(json: Object): Array<string> {
    let header: Array<string> = [];
    let keys: Array<string> = Object.keys(json);
    for (let i in keys) {
        let field = keys[i];
        header.push(field);
    }
    return header;
}

/**
 * excel转json
 * @param buffer 
 */
export async function excel2json(buffer): Promise<Object[]> {
    let jsons: Object[] = [];
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(buffer);
    return new Promise((resolve, rejects) => {
        workbook.eachSheet(function (worksheet, sheetId) {
            let json: { name: string, header: string[], data: Object[] } = {
                name: worksheet.name,
                header: [],
                data: []
            };
            let header = worksheet.getRow(1);
            for (let j = 1; j <= header.cellCount; j++) {
                json.header.push(header.getCell(j).value as string);
            }

            for (let i = 2; i <= worksheet.rowCount; i++) {
                let item = {};
                let row = worksheet.getRow(i);
                for (let j = 1; j <= header.cellCount; j++) {
                    item[(header.getCell(j).value as string)] = row.getCell(j).value;
                }
                json.data.push(item);
            }
            jsons.push(json);

        })
        resolve(jsons);
    })

}