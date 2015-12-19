var bar = [];
var cStage;
var chartData;
function drawStackColumnChart(chartdata, stage, drawingContainer){
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
console.log("gridMin::"+gridMin);
console.log("gridMax::"+gridMax);

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
gridContainer.alpha = 0;
chartContainer.addChild(gridContainer);
var xAxis = new createjs.Text(chartData.xaxis, "18px Arial", "#999999");
xAxis.y = 670;
xAxis.x = 500;
xAxis.alpha = 1;

chartContainer.addChild(xAxis);

var yAxis = new createjs.Text(chartData.yaxis, "18px Arial", "#999999");
yAxis.y = 440;
yAxis.x = 0;
yAxis.alpha = 1;
yAxis.rotation = 270;

chartContainer.addChild(yAxis);

var sourceText = new createjs.Text(chartData.source, "14px Arial", "#999999");
sourceText.y = stage.canvas.height - 35;
sourceText.x = stage.canvas.width - 150;

drawingContainer.addChild(sourceText);

var gridNumberFactor = gridMax/10;
for(i=0;i<10;i++){
var line = new createjs.Shape();
line.graphics.beginFill("#eeeeee").drawRect(0, 0, chartWidth - (chartWidth * 15/100), 2).endFill();
line.y = 60*i;
line.x = 20;
var gridText = new createjs.Text(Math.floor(gridMax - (gridNumberFactor * i)), "12px Arial", "#000");
gridText.y = 60*i;
gridText.x = 0;
gridContainer.addChild(gridText, line);
}//end grid for

 gridContainer.alpha = 1;

//==============base line======================
var gridBounds = gridContainer.getBounds();
gridContainer.regY = gridBounds.height;
var baseLine = new createjs.Shape();
baseLine.graphics.beginFill("#333333").drawRect(0, 0, chartWidth - (chartWidth * 15/100), 3 ).endFill();
baseLine.y = stage.canvas.height - 135;
baseLine.x = chartWidth * 5/100;
baseLine.alpha = 1;
gridContainer.x = 35;
gridContainer.y =stage.canvas.height - 135;
chartContainer.addChild(baseLine);

/*=================================constructing the graph========================*/
var graphContainer = new createjs.Container();
chartContainer.addChild(graphContainer);
graphContainer.x = 70;
var barTop = [];
var barCenter = [];
var barBottom = [];
var barIcon = [];

var barWidth = 80;
var barSpace = 125;
if(chart.length == 2){
  var barWidth = 120;
  var barSpace = 185;
  graphContainer.x = 300;
} else if(chart.length == 3){
  var barWidth = 100;
  var barSpace = 175;
  graphContainer.x = 250;
} else if(chart.length == 4){
  var barWidth = 80;
  var barSpace = 165;
  graphContainer.x = 200;
} else if(chart.length == 5){
  var barWidth = 80;
  var barSpace = 155;
  graphContainer.x = 150;
} else if(chart.length == 6){
  var barWidth = 80;
  var barSpace = 145;
  graphContainer.x = 100;
}
var gridHeight = gridBounds.height;
if(hasNeg){
  gridHeight = gridBounds.height/2
  baseLine.y = baseLine.y - gridHeight;
}
function displace (value, index) {
  var barPercent = (maxValue[index] * 100)/ gridMax;
  var barSize = barPercent * gridHeight / 100;
  var stackPercent = value * 100 / maxValue[index];
  var displace = (barSize * stackPercent/100);
  return displace;
}
for (i=0;i<chart.length;i++){
  var param = chart[i];

    var duration = 1200;
    var delay = 200 * i;

      bar[i] = new createjs.Container();
      graphContainer.addChild(bar[i]);
      bar[i].regY = 1;
      bar[i].x = barSpace * i;
      bar[i].y = baseLine.y;
      var prevScaleValue = 0;

        for(j=0;j<series;j++){
          var col = new createjs.Shape();
          col.graphics.beginFill(colors[j]).drawRect(0, 0, barWidth, 1).endFill();
          col.alpha = 0;
          var value = eval("param.value"+(j+1));
          var scaleValue = displace(parseInt(value), i);

           //adding value
           var value = new createjs.Text(value, "26px arial", "#fff");
           value.x =  bar[i].x + barWidth/2 - 15;
           value.y = baseLine.y - 40;
           value.alpha = 0;
           graphContainer.addChild(value);
           if(j!=0){
             col.y = -prevScaleValue;
             value.y = gridBounds.height - prevScaleValue + 40;
           }

           prevScaleValue += scaleValue;
          bar[i].addChild(col);
          createjs.Tween.get(col, {loop:false})
          .wait(duration*j).to({scaleY:-(scaleValue), alpha:1}, duration, createjs.Ease.sineOut);
          createjs.Tween.get(value, {loop:false})
          .wait(600).wait(delay + 800)
                     .to({alpha:1}, 800, createjs.Ease.sineOut);
        }
       //adding icon
        if(param.iconbitmap){
          barIcon[i] = param.iconbitmap;
          var iScale = (barWidth)/barIcon[i].getBounds().width;
          barIcon[i].scaleX = barIcon[i].scaleY = iScale;
          barIcon[i].x = bar[i].x;
          if(chartData.layoutdetails.iconplaceholder.position == "itemTop"){
            barIcon[i].y = (gridBounds.height - displace) +15+ (barIcon[i].getBounds().height * iScale);
          }
          if(chartData.layoutdetails.iconplaceholder.position == "top"){
            barIcon[i].y = (gridBounds.height - displace);
          }
          if(chartData.layoutdetails.iconplaceholder.position == "itemBottom"){
            barIcon[i].y = bar[i].y - (barIcon[i].getBounds().height * iScale);
          }
          barIcon[i].alpha = 0;
          graphContainer.addChild(barIcon[i])
        }


       /*========================animating the graph================*/


        if(barIcon.length > 0){
            var oY = barIcon[i].y;
            barIcon[i].y = barIcon[i].y + 50;
            createjs.Tween.get(barIcon[i], {loop:false})
                  .wait(1000).wait(delay+600).to({alpha:1, y:oY}, duration, createjs.Ease.sineOut);
          }

  //add bar labels
  var barLabel = new createjs.Text(param.name, "14px Arial", "#333333");
    barLabel.x = bar[i].x;
     barLabel.y = stage.canvas.height - 120;
     graphContainer.addChild(barLabel);
}//for loop end

chartContainer.scaleX = chartContainer.scaleY = 1;
stage.update();
createjs.Ticker.setFPS(24);
createjs.Ticker.addEventListener("tick", stage);
}
