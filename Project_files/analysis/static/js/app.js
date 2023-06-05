// Use the D3 library to read the .json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
async function plotbars()
{
    let idFilter = "940"
    let xdata = await d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].sample_values.slice(0,10))
    let ydata = await d3.json(url).then(x => x.samples.filter(x => x.id == idFilter)[0].otu_ids.slice(0,10).map(x => "OTU " + x.toString()))
    console.log(xdata)
    console.log(ydata)
    xdata.reverse()
    ydata.reverse()
    let trace1 =
    {
        x:xdata,
        y:ydata,
        type:"bar",
        orientation:"h"
    }
    bardata = [trace1]
    Plotly.newPlot("bar",bardata)
}
plotbars()