function buildGauge(value_sent=0)
{

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: value_sent,
      title: { text: "Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "cyan" },
          { range: [1, 2], color: "royalblue" },
          { range: [2, 3], color: "cyan" },
          { range: [3,4], color: "royalblue" },
          { range: [4, 5], color: "cyan" },
          { range: [5, 6], color: "royalblue" },
          { range: [6, 7], color: "cyan" },
          { range: [7, 8], color: "royalblue" },
          { range: [8, 9], color: "cyan" },

        ],
      },
      //color={"gradient":True,"ranges":{"green":[0,6],"yellow":[6,8],"red":[8,10]}},
    }
  ];
  
  var layout = { margin: { t: 0, b: 0 } };
  GAUGE = document.getElementById('gauge');
  //GAUGE.html("");
  Plotly.newPlot(GAUGE, data, layout);

};



function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  const url_meta = `/metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
  let data = d3.json(url_meta).then(function(sample){
  // Use d3 to select the panel with id of `#sample-metadata`
  let selection = d3.select("#sample-metadata");
  selection.html("");
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(function([key,value]){
      var row = selection.append("p");
      row.text(`${key}:${value}`)
      if(`${key}` === "WFREQ")
      {
        WFREQ = `${value}`;
        console.log(WFREQ);
        buildGauge(WFREQ);
      }
    })
    // BONUS: Build the Gauge Chart

    
   
 
})


}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
   // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  const url = `/samples/${sample}`;
  d3.json(url).then(data => {

    
    
     data1 = [{
      values:  data.sample_values.slice(0,10),
      labels : data.otu_ids.slice(0,10),
      type: 'pie',
      hovertext: data.otu_labels.slice(0,10)
    }]
      
    PIE = document.getElementById('pie');
    Plotly.newPlot(PIE, data1)

    data2 = [{
      y:  data.sample_values,
      x : data.otu_ids,
      type: 'scatter',
      text: data.otu_labels,
      mode:'markers',
      marker:{
        size: data.sample_values,
        symbol: 'circle',
        color:data.otu_ids,

      }

    }]

    BUBBLE = document.getElementById('bubble');
    Plotly.newPlot(BUBBLE, data2)



  })

    // @TODO: Build a Bubble Chart using the sample data

   
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);

}

// Initialize the dashboard
init();
