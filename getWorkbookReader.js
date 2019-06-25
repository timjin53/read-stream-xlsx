const XlsxStreamReader = require("xlsx-stream-reader");

const getWorkbookReader = (resultStream) => {
  const workBookReader = new XlsxStreamReader();

  workBookReader.on('error', function (error) {
      throw (error);
  });
  
  workBookReader.on('worksheet', function (workSheetReader) {
      workSheetReader.on('row', function (row) {
          console.log(row.values);
          resultStream.write(row.values);
      });
  
      workSheetReader.on('end', function () {
          console.log(workSheetReader.rowCount);
          resultStream.end();
      });
  
      workSheetReader.process();
  });

  return workBookReader;
}

module.exports = getWorkbookReader
