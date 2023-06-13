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
function plots(sample_id)
{
    d3.json(url)
    .then(function(x)
    {
        // Samples for selected id
        let data = x
                   .samples
                   .find(x => x.id == sample_id)

        console.log(data)
        
        // Sample values for selected id
        let sampleValues = data
                           .sample_values

        console.log(sampleValues)
        
        // Top 10 sample values for selected id
        let toptenSampleValues = sampleValues
                             .slice(0,10)
                             .reverse()

        console.log(toptenSampleValues)
        
        // OTU Ids for selected id
        let otuIds = data
                     .otu_ids

        console.log(otuIds)
        
        // Top 10 OTU Ids for selected id
        let toptenOTUIds = otuIds
                           .slice(0,10)
                           .reverse()
                           .map(x => "OTU "+x)

        console.log(toptenOTUIds)
        
        // OTU labels for selected id
        let otuLabels = data
                        .otu_labels

        console.log(otuLabels)

        // Top 10 OTU labels for selected id
        let toptenOTULabels = otuLabels
                              .slice(0,10)
                              .reverse()
        
        console.log(toptenOTULabels)

        // Metadata for selected id
        let metaData = x
                       .metadata
                       .find(x => x.id == sample_id)
        
        console.log(metaData)

        // Plotly bar chart for selected id
        let bartrace = 
        {
            x:toptenSampleValues,
            y:toptenOTUIds,
            text:toptenOTULabels,
            type:"bar",
            orientation:"h",
            marker:
            {
                color:toptenSampleValues,
                colorscale:"Grayred"
            }
        }

        let bardata = [bartrace]

        let barlayout = 
        {
            title:"Top Ten Bacterial Species (OTUs) by Abundance"
        }
        
        Plotly.newPlot("bar",bardata,barlayout)

        // Clear the Demographic Info - Thanks, Jed
        let demInfo = d3.select("#sample-metadata").html("")

        // Populate the Demographic Info for the selected id
        let newInfo = demInfo.append("text")
        for (const [x,y] of Object.entries(metaData))
        {
            newInfo.append("small")
                   .text(`${x}: ${y}`)
                   .append("br")
        }

        // Plotly bubble chart for selected id
        let bubbletrace = 
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
            text:otuLabels
        }
      
        let bubbledata = [bubbletrace];
        
        let bubblelayout = 
        {
            title: "All Bacterial Species Found in Selected Test Subject (Radius = Abundance)",
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

        // Plotly gauge for selected id
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

    })
}

// Default dashboard
plots("940")

// Repopulate dashboard based on user selection
function optionChanged(x)
{
    plots(x)
}