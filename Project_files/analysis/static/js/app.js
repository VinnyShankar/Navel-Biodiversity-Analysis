// Use the D3 library to read samples.json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Dashboard function
async function plotAll(sample_id)
{
    // User's selected individual
    let idFilter = sample_id

    // Data for the selected individual
    let data = await d3.json(url)
               .then(x => x.samples
               .filter(x => x.id == idFilter)[0])

    // Top 10 OTUs for the selected individual
    let xdata = data
                .sample_values
                .slice(0,10)

    // OTU ids
    let otuIds = data
                 .otu_ids
                 .slice(0,10)
    
    // Bar plot y labels
    let ylabel = otuIds
                 .map(x => "OTU " + x.toString())

    // Bar plot hover text (tooltips)
    let yhover = data
                 .otu_labels
                 .slice(0,10)
    
    console.log(yhover)
    
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

    // Plotly bubble chart
    let trace2 = 
    {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        mode: 'markers',
        marker: {
          size: [40, 60, 80, 100]
        }
      };
      
      let bubbledata = [trace2];
      
      let bubblelayout = 
      {
        title: 'Marker Size',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot("bubble", bubbledata, bubblelayout);
      
}

// Default plot
plotAll("940")