// Use the D3 library to read samples.json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Populate the dropdown menu
d3.json(url)
.then(x => x.names
.map(x => d3
.select("#selDataset")
.append("option")
.text(x)))

// Dashboard function
async function plotAll(sample_id)
{
    // User's selected individual
    let idFilter = sample_id

    // Data for the selected individual
    let data = await d3.json(url)
               .then(x => x.samples
               .filter(x => x.id == idFilter)[0])

    // Sample Values
    let sampleValues = data
                       .sample_values

    // Top 10 OTUs
    let toptenOTUs = sampleValues
                     .slice(0,10)

    // OTU ids
    let otuIds = data
                 .otu_ids
    
    // OTU labels
    let otuLabels = otuIds
                    .map(x => "OTU " + x)
    
    // Bar plot y labels
    let ylabel = otuLabels
                 .slice(0,10)

    // Bar plot hover text (tooltips)
    let yhover = data
                 .otu_labels
                 .slice(0,10)
    
    // Demographic Info for the selected indivdual
    let metaData = await d3.json(url)
                   .then(x => x.metadata
                   .filter(x => x.id == sample_id)[0])

    // Reverse arrays for Plotly
    toptenOTUs.reverse()
    ylabel.reverse()
    yhover.reverse()

    // Plotly bar plot
    let trace1 =
    {
        x:toptenOTUs,
        y:ylabel,
        text:yhover,
        type:"bar",
        orientation:"h",
        marker:
        {
            color:toptenOTUs,
            colorscale:"Grayred"
        }
    }

    bardata = [trace1]

    let barlayout = 
    {
        title: "Bacterial Abundance per Taxonomic Group"
    }

    Plotly.newPlot("bar",bardata,barlayout)

    // Clear the Demographic Info - Thanks, Jed
    let demInfo = d3.select("#sample-metadata").html("")

    // Populate the Demographic Info
    let newInfo = demInfo.append("text")
    for (const [x,y] of Object.entries(metaData))
    {
        newInfo.append("small")
               .text(`${x}: ${y}`)
        
        newInfo.append("br")
    }

    // Plotly bubble chart
    let trace2 = 
    {
        x:otuIds,
        y:sampleValues,
        mode: "markers",
        marker:
        {
          size:sampleValues,
          color:otuIds,
          colorscale:"Earth"
        },
        text:data.otu_labels
    }
      
    let bubbledata = [trace2];
      
    let bubblelayout = 
    {
    title: "Bacterial Abundance per Taxonomic Group",
    xaxis:
    {
        title:
        {
            text:"OTU ID"
        }
    },
    showlegend: false,
    height: 600,
    width: 1200
    }
    
    Plotly.newPlot("bubble",bubbledata,bubblelayout)

    // Gauge
    let gaugedata = 
    [
        {
          type: "indicator",
          mode: "gauge+number",
          value: metaData.wfreq,
          title: 
          {
            text:"Navel Washing Frequency <br><sub> Scrubs per Week </sub>",
            font:{size:24}
          },
          gauge: 
          {
            axis: 
            {
                range:[null,9],
                tickwidth:1,
                tickcolor:"darkblue",
                tickvals:[...Array(10).keys()]
            },
            bar: {color:"ff4800"},
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: 
            [
              {range: [0, 1], color: "F3F520"},
              {range: [1, 2], color: "E2F11D"},
              {range: [2, 3], color: "D1ED19"},
              {range: [3, 4], color: "C0E916"},
              {range: [4, 5], color: "AFE513"},
              {range: [5, 6], color: "9DE10F"},
              {range: [6, 7], color: "8CDD0C"},
              {range: [7, 8], color: "7BD909"},
              {range: [8, 9], color: "6AD505"},
            ],
            threshold: 
            {
              line: {color:"red",width:4},
              thickness: 0.75,
              value: 9
            }
          }
        }
      ]
      
      let gaugelayout = 
      {
        width: 400,
        height: 400,
        margin: {t:25,r:25,l:25,b:25},
        font: 
        {
            color: "darkblue",
            family: "Arial" 
        }
      };
      
      Plotly.newPlot("gauge", gaugedata, gaugelayout)
      
      
}

// Default dashboard view
plotAll("940")

// Repopulate dashboard based on user selection
function optionChanged(x)
{
    plotAll(x)
}