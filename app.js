function builtPlot() {
    d3.json('15-Interactive-Visualizations-and-Dashboards_Homework_Instructions_data_samples.json').then(function(jdata) {
        console.log(jdata.samples[0].otu_ids)
        // BAR PLOT 
        bar_y_labels = []
        var ids = jdata.samples[0].otu_ids.slice(0,10);
        for (var i = 0; i < ids.length; i++) {
            labels = 'OTU' + ids[i];
            bar_y_labels.push(labels);
        }

        var data1 = [{
            type: 'bar',
            y: bar_y_labels.reverse(),
            x: jdata.samples[0].sample_values.slice(0,10).reverse(),
            text: jdata.samples[0].otu_labels.slice(0,10).reverse(),
            orientation: 'h'
        }];

        Plotly.react('bar', data1)

        // BUBBLE CHART
        var data2 = [{
            x: jdata.samples[0].otu_ids,
            y: jdata.samples[0].sample_values,
            mode: 'markers',
            text: jdata.samples[0].otu_labels,
            marker: {
              color: jdata.samples[0].otu_ids,
              opacity: [1, 0.8, 0.6, 0.4],
              size: jdata.samples[0].sample_values
            }
        }];
            
        var layout = {
        showlegend: false,
        height: 600,
        width: 1200
        };
          
        Plotly.react('bubble', data2, layout);

        // DROPDOWN
        dropdown = document.getElementById('selDataset');
        defaultOption = document.createElement('option')
        options = jdata.names
        for (i=0; i < options.length; i++){
            option = document.createElement('option');
            option.text = options[i];
            option.value = options[i];
            dropdown.add(option);
        };

        // METADATA
        box = d3.selectAll('#sample-metadata');
        metadata = jdata.metadata[0];

        Object.entries(metadata).forEach(([key,value]) => {
            console.log(`${key}: ${value}`);
            box.append('ul').text(`${key}: ${value}`);
        });

    });
}; 

d3.selectAll('#selDataset').on('change', getData);

function getData() {
    
    dropdownMenu = d3.select('#selDataset');
    dataset = dropdownMenu.property('value');
   
    d3.json('15-Interactive-Visualizations-and-Dashboards_Homework_Instructions_data_samples.json').then(function(jdata) {   
        options = jdata.names
        for (i=0; i < options.length; i++) {
            if (dataset == options[i]) {
                    // BAR PLOT 
                    bar_y_labels = []
                    var ids = jdata.samples[i].otu_ids.slice(0,10);
                    for (var j = 0; j < ids.length; j++) {
                        labels = 'OTU' + ids[j];
                        bar_y_labels.push(labels);
                    }
            
                    var data1 = [{
                        type: 'bar',
                        y: bar_y_labels.reverse(),
                        x: jdata.samples[i].sample_values.slice(0,10).reverse(),
                        text: jdata.samples[i].otu_labels.slice(0,10).reverse(),
                        orientation: 'h'
                    }];

            
                    // BUBBLE CHART
                    var data2 = [{
                        x: jdata.samples[i].otu_ids,
                        y: jdata.samples[i].sample_values,
                        mode: 'markers',
                        text: jdata.samples[i].otu_labels,
                        marker: {
                        color: jdata.samples[i].otu_ids,
                        opacity: [1, 0.8, 0.6, 0.4],
                        size: jdata.samples[i].sample_values
                        }
                    }];
                  
        
                    // METADATA
                    box = d3.selectAll('#sample-metadata');
                    metadata = jdata.metadata[i];

                    Object.entries(metadata).forEach(([key,value]) => {
                        console.log(`${key}: ${value}`);
                        box.append('ul').text(`${key}: ${value}`);
                    });
            updatePlotly(data1, data2, metadata)
                }       
            
            
       } 
    });
        
   
    
}

function updatePlotly(newdata1, newdata2, metadata) {
    var layout2 = {
        showlegend: false,
        height: 600,
        width: 1200
        };
    Plotly.react('bar',newdata1);
    Plotly.react('bubble', newdata2, layout2);

    box = d3.selectAll('#sample-metadata');
    box.html('');
    
    Object.entries(metadata).forEach(([key,value]) => {
        console.log(`${key}: ${value}`);
        box.append('ul').text(`${key}: ${value}`);
    });
}

builtPlot();
    

