var bar = [];
var cStage;
var chartData;
function drawStackBarChart(chartdata, stage, drawingContainer) {
  cStage = stage;
  var chartWidth = 1024;
  var chartHeight = 768;
  chartData = chartdata.charts;
  var series = chartData.series;
  console.log("series::"+series);
  var chart = chartData.chart;
  var colors = chartdata.colors;
  var color1 = colors[0],
  color2 = colors[1], color3 = colors[2],
  color4 = colors[3], color5 = colors[4],
  color6 = colors[5], color7 = colors[6];
  //console.log(chartdata.themedetails.theme._name , color1, color2, color3, color4, color5, color6, color7);
  var maxValue = [];
  for(i=0;i<chart.length;i++){
    maxValue[i] = 0;
  }
  var gridMax = 0;
  var totalValue = 0;
  var gridMin = 0;
  var hasNeg = false;
if(series > 1){
    for(j=0;j<series;j++){
        for(i=0;i<chart.length;i++){
          var val = eval("chart[i].value"+(j+1))
          maxValue[i] += parseInt(val);
          if(parseInt(val) < 0){
            hasNeg = true;
          }
        }
  }
  for(var i=0;i<maxValue.length;i++){
    gridMax = Math.max(maxValue[i], gridMax);
    gridMin = Math.min(maxValue[i], gridMin);
  }
  console.log(maxValue);
  console.log(gridMax);
  console.log(gridMin);
} else {
  for(i=0;i<chart.length;i++){
    gridMax = Math.max(chart[i].value1, gridMax);
    gridMin = Math.min(chart[i].value1, gridMin);
    maxValue += chart[i].value;
    if(chart[i].value < 0){
      hasNeg = true;
    }
  }
}

  var chartName = chartData.chartname;
  var chartContainer = new createjs.Container();
  chartContainer.x = 35;
  chartContainer.y = 65;
  drawingContainer.addChild(chartContainer);

  //=======================constructing legend=============================
  var legendConatiner = new createjs.Container();
  drawingContainer.addChild(legendConatiner);
  legendConatiner.x = 700;
  legendConatiner.y = 300;
  legendConatiner.alpha = 0;
  drawingContainer.addChild(legendConatiner);

  for(i = 0;i<chart.length;i++){
  var legendColor = new createjs.Shape();
  legendColor.graphics.beginFill(colors[i]).drawRect(0, 0, 30, 10).endFill();
  legendColor.y = 30*i;
  legendConatiner.addChild(legendColor);
  var legendLabel = new createjs.Text(chart[i].name, "16px Arial", "#222222");
  legendLabel.y = 29*i;
  legendLabel.x = 50;
  legendConatiner.addChild(legendLabel);
  }

  //=====================constructing the grid==============================
  var gridContainer = new createjs.Container();
  gridContainer.alpha = 1;
  chartContainer.addChild(gridContainer);
  var xAxis = new createjs.Text(chartData.xaxis, "18px Arial", "#999999");
  xAxis.y = 670;
  xAxis.x = 500;
  xAxis.alpha = 1;

  var yAxis = new createjs.Text(chartData.yaxis, "18px Arial", "#999999");
  yAxis.y = 440;
  yAxis.x = 0;
  yAxis.alpha = 1;
  yAxis.rotation = 270;

  var sourceText = new createjs.Text(chartData.source, "14px Arial", "#999999");
  sourceText.y = stage.canvas.height - 35;
  sourceText.x = stage.canvas.width - 150;

  var gridNumberFactor = gridMax/10;
  for(i=0;i<10;i++){
  var line = new createjs.Shape();
  line.graphics.beginFill("#eeeeee").drawRect(0, 0, 2, chartHeight - (chartHeight * 30/100)).endFill();
  line.y = 20;
  line.x = 80*i;
  var gridText = new createjs.Text(Math.floor(gridNumberFactor * i+5), "12px Arial", "#000");
  gridText.y = chartHeight - (chartHeight * 30/100) + 20;
  gridText.x = 80*i;
  gridContainer.addChild(gridText, line);
  }//end grid for

  //==============base line======================
  var gridBounds = gridContainer.getBounds();
  gridContainer.regY = gridBounds.height;
  var baseLine = new createjs.Shape();
  baseLine.graphics.beginFill("#333333").drawRect(0, 0, 1, chartHeight - (chartHeight * 20/100) ).endFill();
  baseLine.y = 0;
  baseLine.x = 135;
  baseLine.alpha = 1;
  gridContainer.x = 150;
  gridContainer.y = 60;
  chartContainer.addChild(baseLine);


/*=================================constructing the graph========================*/
var graphContainer = new createjs.Container();
chartContainer.addChild(graphContainer);
graphContainer.y = 80;
var barTop = [];
var barCenter = [];
var barBottom = [];
var barIcon = [];
var barHeight = 50;
var barSpace = 75;
if(chart.length == 2){
  var barHeight = 120;
  var barSpace = 185;
  graphContainer.y = 200;
} else if(chart.length == 3){
  var barHeight = 85;
  var barSpace = 120;
  graphContainer.y = 150;
} else if(chart.length == 4){
  var barHeight = 80;
  var barSpace = 100;
  graphContainer.y = 150;
} else if(chart.length == 5){
  var barHeight = 70;
  var barSpace = 95;
  graphContainer.y = 100;
} else if(chart.length == 6){
  var barHeight = 60;
  var barSpace = 85;
  graphContainer.y = 90;
}
var gridWidth = gridBounds.width;
if(hasNeg){
  gridWidth = gridBounds.width/2
  baseLine.x = baseLine.x + gridWidth;
}
function displace (value, index) {
  var barPercent = (maxValue[index] * 100)/ gridMax;
  var barSize = barPercent * gridWidth / 100;
  var stackPercent = value * 100 / maxValue[index];
  var displace = (barSize * stackPercent/100);
  return displace;
}

for (i=0;i<chart.length;i++){
        var param = chart[i];
        var duration = 1200;
        var delay = 200 * i;
        bar[i] = new createjs.Container();
        bar[i].y = barSpace * i;
        bar[i].x = baseLine.x;
        graphContainer.addChild(bar[i]);
        var prevScaleValue = 0;
         for(j=0;j<series;j++){
           var col = new createjs.Shape();
           col.graphics.beginFill(colors[j]).drawRect(0, 0, 1, barHeight).endFill();
           col.alpha = 0;
           bar[i].addChild(col);
           var value = eval("param.value"+(j+1));
           var scaleValue = displace(parseInt(value), i);
           if(j!=0){
             col.x = prevScaleValue;
           }
           //adding value

           var valueLabel = new createjs.Text(value, "24px arial", "#fff");
           valueLabel.y = bar[i].y + barHeight/2 - 15;
           valueLabel.x = prevScaleValue + baseLine.x + 10;
           valueLabel.alpha = 1;
           graphContainer.addChild(valueLabel);
           prevScaleValue += scaleValue;
           createjs.Tween.get(col, {loop:false}).wait(duration*j)
                   .to({scaleX:scaleValue, alpha:1}, duration, createjs.Ease.sineOut);

         }

       /*========================animating the graph================*/


  //add bar labels
  var barLabel = new createjs.Text(param.name, "14px Arial", "#333333");
    barLabel.x = 35;
     barLabel.y = bar[i].y + (barHeight/2);
     graphContainer.addChild(barLabel);
}//for loop end
stage.update();
createjs.Ticker.setFPS(24);
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick", stage);
}
