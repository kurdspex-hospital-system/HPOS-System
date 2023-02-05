import ExcelJS from 'exceljs';

const useSaveAsExcel = () => {
  return async (data, columns, name = 'record_data') => {
    const workbook = new ExcelJS.Workbook();

    workbook.created = new Date();

    workbook.views = [
      {
        x: 0, y: 0, width: 200, height: 10000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ]

    const worksheet =  workbook.addWorksheet('sheet', {
      pageSetup:{paperSize: 9, orientation:'portrait'}
    });

    worksheet.columns = columns;

    for(let i = 0; i < data.length; i++) {
      worksheet.addRow(data[i]);
    }

    try {
        await workbook.xlsx.writeFile(file.filePath + name.xlsx);
        return {type: "done", message: "The Excel File Created Successfully"}
    } catch(err) {
        console.log(err);
        return err;
    }
  }
};

export default useSaveAsExcel;
