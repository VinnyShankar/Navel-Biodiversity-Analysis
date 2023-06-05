// Use the D3 library to read the .json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
async function plotbars()
{
    let idFilter = "940"
    let data = await d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].sample_values.slice(0,10))
    console.log(data)
    data.reverse()
    let trace1 =
    {
        x:data,
        y:["a","b","c","d","e","f","g","h","i","j"],
        type:"bar",
        orientation:"h"
    }
    bardata = [trace1]
    Plotly.newPlot("bar",bardata)
}
plotbars()