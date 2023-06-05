const fs = require("fs");
const Handlebars = require("handlebars");
const excelData = require("./data.json");

const createFile = async (obj, name, path) => {
  try {
    if (path) {
      fs.mkdirSync(path, { recursive: true });
      fs.writeFileSync(path + name, obj);
      return true;
    } else {
      fs.writeFileSync(name, obj);
      return true;
    }
  } catch (e) {
    return e.message;
  }
};

const jsonData = excelData.models.find((model) => model.name === "TableView").fields


const main = (data, file, out, path) => {

//   console.log(data.models.find((model) => model.name === "TableView").fields);
// console.log(data)
  const templateContent = fs.readFileSync(file, "utf-8");
  const template = Handlebars.compile(templateContent);

  const reactFileContent = template(jsonData);
  createFile(reactFileContent, out, path);
};

main(jsonData, "./listRender.hbs", "ListRender.jsx");
