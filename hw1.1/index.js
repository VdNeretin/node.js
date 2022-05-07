const path = require('path');
const fs = require('fs');

const directory = process.argv[2]
const newDirectory = process.argv[3]

fs.mkdir(newDirectory, (err, data) => {
  if (err) {
    throw err;
  }
  fileSorter(directory)
})


function fileSorter(targetDir) {
  fs.readdir(path.resolve(__dirname, targetDir), (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      const filePath = path.resolve(targetDir, file);

      fs.stat(filePath, (err, fileInfo) => {
        if (err) {
          throw err;
        }

        if (fileInfo.isDirectory()) {
          fileSorter()
        } else {
          const fileName = path.basename(filePath);
          const destinationDir = path.resolve(__dirname, newDirectory, fileName[0])
          if (fs.existsSync(destinationDir)) {
            const targetFileName = path.resolve(
              __dirname, newDirectory, fileName[0], fileName
            )
            fs.copyFile(filePath, targetFileName, (err) => {
              if (err) {
                throw err;
              }
            });
          } else {
            fs.mkdir(path.resolve(__dirname, newDirectory, fileName[0]), (err, data) => {
              const targetFileName = path.resolve(
                __dirname, newDirectory, fileName[0], fileName
              );
              fs.copyFile(filePath, targetFileName, (err) => {
                if (err) {
                  throw err;
                }
              });
            });
          }
        }
      })
    })
  })
}
