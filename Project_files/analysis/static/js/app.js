// Use the D3 library to read the .json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
async function plotbars()
{
    let idFilter = "940"
    let xdata = await d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].sample_values.slice(0,10))
    let ylabel = await d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].otu_ids.slice(0,10).map(x => "OTU " + x.toString()))
    let yhover = await d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].otu_labels.slice(0,10))
    console.log(xdata)
    console.log(ylabel)
    console.log(yhover)
    xdata.reverse()
    ylabel.reverse()
    yhover.reverse()
    let trace1 =
    {
        x:xdata,
        y:ylabel,
        text:yhover,
        type:"bar",
        orientation:"h"
    }
    bardata = [trace1]
    Plotly.newPlot("bar",bardata)
}
plotbars()