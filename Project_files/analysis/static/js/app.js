// Use the D3 library to read samples.json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Dashboard function
async function plotAll(sample_id)
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
    
    // Demographic Info for the selected indivdual
    let metaData = await d3.json(url)
                   .then(x => x.metadata
                   .filter(x => x.id == sample_id)[0])

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

    // Populate Demographic Info
    let demInfo = d3.select("#sample-metadata")
    let newInfo = demInfo.append("text")
    for (const [x,y] of Object.entries(metaData))
    {
        newInfo.append("small").text(`${x}: ${y}`)
        newInfo.append("br")
    }
}

// Default plot
plotAll("940")