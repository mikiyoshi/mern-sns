function FormData() {
  // this.name = name;
  // this.file = file;
}
// var data = new FormData('Bar 1', 2021);

const data = new FormData(file);
const file = {
  name: 'img12.jpg',
  lastModified: 1612417081853,
  webkitRelativePath: '',
  size: 206448,
  type: 'image/jpeg',
};
data.append('name', 2021);
data.append('file', file);
console.log(data.name);
