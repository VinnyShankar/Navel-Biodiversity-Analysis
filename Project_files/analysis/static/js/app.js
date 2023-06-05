// Use the D3 library to read the .json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Generic bar plot function
async function plotbars(sample_id)
{
    // User's selected individual
    let idFilter = sample_id

    // Top ten OTUs in the selected individual
    let xdata = await d3.json(url)
                .then(x => x.samples
                .filter(x => x.id == idFilter)[0]
                .sample_values
                .slice(0,10))

    // OTU labels
    let ylabel = await d3.json(url)
                .then(x => x.samples
                .filter(x => x.id == idFilter)[0]
                .otu_ids.slice(0,10)
                .map(x => "OTU " + x.toString()))

    // Hover text (tooltips)
    let yhover = await d3.json(url)
                .then(x => x.samples
                .filter(x => x.id == idFilter)[0]
                .otu_labels.slice(0,10))

    // Reverse arrays for Plotly
    xdata.reverse()
    ylabel.reverse()
    yhover.reverse()

    // Plotly bar plot
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

plotbars("940")