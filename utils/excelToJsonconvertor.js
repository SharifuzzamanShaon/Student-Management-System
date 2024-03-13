const XLSX = require('xlsx');


const convertExcetToJsonData=async(excelFile)=>{
    const workbook = XLSX.readFile(excelFile.path);

    // Access the first sheet from the workbook
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert the sheet data to JSON format
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
}


module.exports={
    convertExcetToJsonData
}