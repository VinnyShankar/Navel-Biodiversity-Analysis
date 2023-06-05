// Use the D3 library to read the .json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let idFilter = "940"
const data = d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].sample_values.slice(0,10))
console.log(data)