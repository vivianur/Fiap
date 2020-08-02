const fs = require("fs");
const fse = require("fs-extra");
const git = require("nodegit");
const colors = require("colors");
const exec = require("child_process").exec;

const dir = {
  backup: "backup",
  backupVersion: createNameVersionBackup(),
  custom: "src/custom",
  assets: "src/assets",
  scripts: "scripts",
  tmp: "tmp",
  store: "store",
  git: ".git"
};

const userName = "diego.garcia";
const url = "git@git.fiap.com.br:ead/on-template.git";
const options = {};
options.fetchOpts = {
  callbacks: {
    credentials: function(url, userName) {
      return git.Cred.sshKeyNew(
        userName,
        `/Users/.ssh/id_rsa.pub`,
        `/Users/.ssh/id_rsa`,
        ""
      );
    }
  }
};

Promise.resolve(createBackupFolder)
  .then(start)
  .then(createBackupFolder)
  .then(copyFilesToBackupFolder)
  .then(createStoreFolder)
  .then(copyFilesToStore)
  .then(getRepositoryOfGit)
  .then(removeAllFolders)
  .then(moveTmpFilesToParent)
  .then(removeTmpFolder)
  .then(removeGitFolder)
  .then(removeGitIgnoreFile)
  .then(replaceFolders)
  .then(removeStoreFolder)
  .then(finish)
  .catch(error => {
    throw new Error(error);
  });

function start() {
  console.log("Aguarde...".yellow);
}

// Global

function readAllFolders(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (error, files) => {
      resolve(files);
      reject(error);
    });
  });
}

// Update template

function createBackupFolder() {
  if (!fs.existsSync(`./${dir.backup}`)) {
    fs.mkdirSync(`./${dir.backup}`);
    fs.mkdirSync(`./${dir.backup}/${dir.backupVersion}`);
  }else if(fs.existsSync(`./${dir.backup}`)){
    fs.mkdirSync(`./${dir.backup}/${dir.backupVersion}`);
  }
}

function copyFilesToBackupFolder() {
  return readAllFolders("./").then(files => {
    return files.forEach(file => {
      if (file != dir.backup)
        fse.copySync(`./${file}`, `./${dir.backup}/${dir.backupVersion}/${file}`);
    });
  });
}

function createNameVersionBackup(){
  //Cria objeto Date
  const today = new Date();
  //Pega variaveis da data, ja fazendo formatação em base decimal
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const month = (today.getMonth() + 1) < 10 ? "0" + today.getMonth()+1 : today.getMonth()+1;
  const hours = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
  const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  const seconds = today.getSeconds() < 10? "0" + today.getSeconds() : today.getSeconds();
  const nameVersionBackup = `${day}.${month}-${hours}h${minutes}m${seconds}s`;
  console.log("Backup version name: ".yellow + nameVersionBackup .yellow);
  //Monta e retorna string para nomear pasta de versão backup
  return nameVersionBackup;
}

function createStoreFolder() {
  return fs.mkdirSync(`./${dir.store}`);
}

function copyFilesToStore() {
  return readAllFolders("./").then(files => {
    return files.forEach(file => {
      if (file != dir.store)
        fse.copySync(`./${file}`, `./${dir.store}/${file}`);
    });
  });
}

function getRepositoryOfGit() {
  return git.Clone(url, `./${dir.tmp}`, options);
}

function removeAllFolders() {
  return readAllFolders("./").then(files => {
    return files.forEach(file => {
      if (
        file != dir.backup &&
        file != dir.scripts &&
        file != dir.tmp &&
        file != dir.store
      ) {
        fse.removeSync(`./${file}`);
      }
    });
  });
}

function moveTmpFilesToParent() {
  return fse.move(`./${dir.tmp}`, `./`);
}

function removeTmpFolder() {
  return fse.remove(`.${dir.tmp}`);
}

function removeGitFolder() {
  return fse.remove(`${dir.git}`);
}

function removeGitIgnoreFile() {
  return fse.remove(`.gitignore`);
}

function replaceFolders() {
  fse.copySync(`./${dir.store}/${dir.custom}`, `./${dir.custom}`);
  fse.copySync(`./${dir.store}/${dir.assets}`, `./${dir.assets}`);
}

function removeStoreFolder() {
  return fse.remove(`./${dir.store}`);
}

function finish() {
  console.log("Atualizacao da template realizada com sucesso!".green);
}
