var bar = [];
var cStage;
var chartData;
function drawColumnChart(chartdata, stage, drawingContainer){
  cStage = stage;
  var chartWidth = stage.canvas.width;
  var chartHeight = stage.canvas.height;
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
  var maxValue = 0;
  var gridMax = 0;
  var totalValue = 0;
  var gridMin = 0;
  var hasNeg = false;
if(series > 1){
  for(i=0;i<chart.length;i++){
    for(j=1;j<=series;j++){
    var val = eval("chart[i].value"+j)
    gridMax = Math.max(parseInt(val), gridMax);
    gridMin = Math.min(parseInt(val), gridMin);
    maxValue += parseInt(val);
    if(parseInt(val) < 0){
      hasNeg = true;
    }
  }
  }
} else {
  for(i=0;i<chart.length;i++){
    gridMax = Math.max(parseInt(chart[i].value1), gridMax);
    gridMin = Math.min(parseInt(chart[i].value1), gridMin);
    maxValue += chart[i].value;
    if(parseInt(chart[i].value) < 0){
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
gridContainer.y = stage.canvas.height - 135;
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
function displace (value) {
  var barPercent = (value * 100)/ gridMax;
  var displace = (gridHeight * barPercent/100);
  return displace;
}
for (i=0;i<chart.length;i++){
  var param = chart[i];
  if (chartData.asset.assettype == "fxg" || chartData.asset.assettype == "movieClip") {
    bar[i] = new createjs.Container();
    if(chartData.asset.assettype == "fxg" ){
    for(j=0;j<param.svgs.length;j++){
      if(param.svgs[j].id == "top"){
        barTop[i] = param.svgs[j].bitmap;
        barTop[i].scaleX = barTop[i].scaleY = barWidth/barTop[i].getBounds().width;
      }
      if(param.svgs[j].id == "center"){
        barCenter[i] = param.svgs[j].bitmap;
        barCenter[i].scaleX = barWidth/barCenter[i].getBounds().width;
        barCenter[i].scaleY = 1;
      }
      if(param.svgs[j].id == "bottom"){
        barBottom[i] = param.svgs[j].bitmap;
        barBottom[i].scaleX = barWidth/barBottom[i].getBounds().width;
      }
    }
  } else if(chartData.asset.assettype == "movieClip"){
    var barTF = eval("lib."+chartData.asset.assetid+"_top");
    var barMF = eval("lib."+chartData.asset.assetid+"_mid");
    var barBF = eval("lib."+chartData.asset.assetid+"_bot");
    if (barTF) {
      barTop[i] = new barTF(colors[i]);
      barTop[i].setBounds(0,0,barTF.width,barTF.height);
    }
    if (barMF) {
      barCenter[i] = new barMF(colors[i]);
      barCenter[i].setBounds(0,0,barMF.width,barMF.height);
    }
    if (barBF) {
      barBottom[i] = new barBF(colors[i]);
      barBottom[i].setBounds(0,0,barBF.width,barBF.height);
    }
  }

    if (barTop.length > 0) {
      barTop[i].x = 0;
      barTop[i].y = -(barCenter[i].getBounds().height);
      barTop[i].regY = barTop[i].getBounds().height;
      bar[i].addChild(barTop[i]);
    }
    if (barCenter.length > 0) {
      barCenter[i].regY = barCenter[i].getBounds().height;
      barCenter[i].x = 0;
      barCenter[i].y = 0;
      bar[i].addChild(barCenter[i]);
    }

    var displaceScale = (displace(param.value1) - barCenter[i].getBounds().height) / barCenter[i].getBounds().height;
    var displaceMove = displace(param.value1) - barCenter[i].getBounds().height - 1;

    if (barBottom.length > 0) {
      bar[i].addChild(barBottom[i]);
      barBottom.regY = barBottom[i].getBounds().height;
      barBottom[i].y = -(barBottom[i].getBounds().height);

      barBottom.regY = barBottom[i].getBounds().height;
      barCenter[i].y = -(barBottom[i].getBounds().height);
      if (barTop.length > 0) {
        barTop[i].y = barCenter[i].y - barCenter[i].getBounds().height;
      }
      displaceScale = (displace(param.value1) - barCenter[i].getBounds().height - barBottom[i].getBounds().height) / barCenter[i].getBounds().height;
      displaceMove = displace(param.value1) - barCenter[i].getBounds().height - 1;
    }
    bar[i].x = barSpace * i;
    bar[i].y = baseLine.y;
    graphContainer.addChild(bar[i]);

    //adding value

    var value = new createjs.Text(param.value1, "40px arial", "#222");
    value.x = 0;
    value.y = -(displaceMove + 100);
    value.alpha = 0;

    if(chartdata.charts.valueLabel == "middle"){
      value.y = -(displaceMove + 30);
      value.color= "#fff";
      value.alpha = 1;
    }
    else if(chartdata.charts.valueLabel == "bottom")
    {
      value.y = -50;
      value.color= "#fff";
      value.alpha = 1;
    }
    bar[i].addChild(value);

    /*========================animating the graph================*/
    var duration = 1200;
    var delay = 200 * i;

     createjs.Tween.get(barCenter[i], {loop:false})
     .wait(delay)
             .to({scaleY:displaceScale}, duration, createjs.Ease.sineOut);
     if (barTop.length > 0) {
        createjs.Tween.get(barTop[i], {loop:false})
        .wait(delay)
                 .to({y:-(displaceMove)}, duration, createjs.Ease.sineOut);
      }

      createjs.Tween.get(value, {loop:false}).wait(delay + 800)
                       .to({alpha:1}, 800, createjs.Ease.sineOut);

  } else {
    var duration = 1200;
    var delay = 200 * i;

      bar[i] = new createjs.Container();
      if(series > 1){
        for(j=0;j<series;j++){
          var col = new createjs.Shape();
          col.graphics.beginFill(colors[i]).drawRect(0, 0, 20, 1).endFill();
          col.x = 22*j;
          bar[i].addChild(col);
          var value = eval("param.value"+(j+1));
          var scaleValue = displace(parseInt(value));
          createjs.Tween.get(col, {loop:false})
          .wait(600).wait(delay)
                  .to({scaleY:-(scaleValue)}, duration, createjs.Ease.sineOut);
        }
      }else {
        var col = new createjs.Shape();
        col.graphics.beginFill(colors[i]).drawRect(0, 0, barWidth, 1).endFill();
        bar[i].addChild(col);
        createjs.Tween.get(col, {loop:false})
        .wait(600).wait(delay)
                .to({scaleY:-(displace(param.value1))}, duration, createjs.Ease.sineOut);
      }


       graphContainer.addChild(bar[i]);
       bar[i].regY = 1;
       bar[i].x = barSpace * i;
       bar[i].y = baseLine.y;

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
       //adding value
       var value = new createjs.Text(param.value1, "40px arial", "#222");
       value.x =  bar[i].x + barWidth/2 - 25;
       value.y = gridBounds.height - displace(param.value1);

       value.alpha = 0;
        if(chartdata.charts.valueLabel == "middle"){
        value.y = (gridBounds.height + 100)- displace(param.value1);
        value.color= "#fff";
        }
        else if(chartdata.charts.valueLabel == "bottom")
        {
         value.y =  gridBounds.height + 20;
          value.color= "#fff";
        }
         else if(chartdata.charts.valueLabel == "top")
        {
         value.y =  gridBounds.height - displace(param.value1);
          value.color= "#222";
        }

       graphContainer.addChild(value);


       /*========================animating the graph================*/


       createjs.Tween.get(value, {loop:false})
       .wait(600).wait(delay + 800)

                  .to({alpha:1}, 800, createjs.Ease.sineOut);

        if(barIcon.length > 0){
            var oY = barIcon[i].y;
            barIcon[i].y = barIcon[i].y + 50;
            createjs.Tween.get(barIcon[i], {loop:false})
                  .wait(1000).wait(delay+600).to({alpha:1, y:oY}, duration, createjs.Ease.sineOut);
          }
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
