var bar = [];
var cStage;
var chartData;
function drawBarChart(chartdata, stage, drawingContainer) {
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
  var maxValue = 0;
  var gridMax = 0;
  var gridMin = 0;
  var totalValue = 0;
  var hasNeg = false;
if(series > 1){
  for(i=0;i<chart.length;i++){
    for(j=1;j<=series;j++){
    var val = eval("chart[i].value"+j)
    gridMax = Math.max(val, gridMax);
    gridMin = Math.min(val, gridMin);
    maxValue += val;
    if(val < 0){
      hasNeg = true;
    }
  }
  }
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
else if(chart.length >= 8){
var barHeight = 550/(chart.length*1.2);
var barSpace = barHeight*1.1;
  graphContainer.y = 50;
}

var gridWidth = gridBounds.width;
if(hasNeg){
  gridWidth = gridBounds.width/2
  baseLine.x = baseLine.x + gridWidth;
}
function displace (value) {
  var barPercent = (value * 100)/ gridMax;
  var displace = (gridWidth * barPercent/100);
  return displace;
}

for (i=0;i<chart.length;i++){
  var param = chart[i];

  if (chartData.asset.assettype == "fxg" || chartData.asset.assettype == "movieClip") {
    bar[i] = new createjs.Container();
    if(chartData.asset.assettype == "fxg" ){
    for(j=0;j<param.svgs.length;j++){
      if(param.svgs[j].id == "right"){
        barTop[i] = param.svgs[j].bitmap;
        barTop[i].scaleX = barTop[i].scaleY = barHeight/barTop[i].getBounds().height;
      }
      if(param.svgs[j].id == "center"){
        barCenter[i] = param.svgs[j].bitmap;
        barCenter[i].scaleY = barHeight/barCenter[i].getBounds().height;
      }
      if(param.svgs[j].id == "left"){
        barBottom[i] = param.svgs[j].bitmap;
        barBottom[i].scaleY = barHeight/barBottom[i].getBounds().height;
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
      barTop[i].x = barCenter[i].getBounds().width;
      barTop[i].y = 0;
      bar[i].addChild(barTop[i]);
    }
    if (barCenter.length > 0) {
      barCenter[i].x = 0;
      barCenter[i].y = 0;
      bar[i].addChild(barCenter[i]);
    }

    var displaceScale = (displace(param.value1) - barCenter[i].getBounds().width) / barCenter[i].getBounds().width;
    var displaceMove = displace(param.value1) - barCenter[i].getBounds().width - 10;

    if (barBottom.length > 0) {
      bar[i].addChild(barBottom[i]);
      barBottom[i].x = 0;

      barCenter[i].x = barBottom[i].getBounds().width;
      if (barTop.length > 0) {
        barTop[i].x = barCenter[i].x + barCenter[i].getBounds().width;
      }
      displaceScale = (displace(param.value1) - barCenter[i].getBounds().width - barBottom[i].getBounds().width) / barCenter[i].getBounds().width;
      displaceMove = displace(param.value1) - barCenter[i].getBounds().width - 10;
    }
    bar[i].y = barSpace * i;
    bar[i].x = baseLine.x;
    graphContainer.addChild(bar[i]);

    //adding value

    var value = new createjs.Text(param.value, "30px arial", "#222");
    value.y = bar[i].y + barHeight/2 - 15;
    value.x = displace + baseLine.x;
    value.alpha = 0;
      if(chartdata.charts.valueLabel == "barmiddle"){
        value.x = displace(param.value1) + baseLine.x - 80;
        value.color= "#222";
        value.alpha = 1;
      }
      else if(chartdata.charts.valueLabel == "bartop")
      {
      value.x = displace(param.value1) + baseLine.x + 10;
        value.color= "#222";
        value.alpha = 1;
      }
      else if(chartdata.charts.valueLabel == "barbottom")
      {
        value.x =  baseLine.x + 10;
        value.color= "#222";
        console.log('vale'+ value.x)
        value.alpha = 1;
      }

    graphContainer.addChild(value);


    /*========================animating the graph================*/
    var duration = 1200;
    var delay = 200 * i;

     createjs.Tween.get(barCenter[i], {loop:false}).wait(delay)
             .to({scaleX:displaceScale}, duration, createjs.Ease.sineOut);
     if (barTop.length > 0) {
        createjs.Tween.get(barTop[i], {loop:false}).wait(delay)
                 .to({x:(displaceMove)}, duration, createjs.Ease.sineOut);
      }
      createjs.Tween.get(value, {loop:false}).wait(delay + 800)
                       .to({alpha:1}, 800, createjs.Ease.sineOut);

  } else if(chartData.asset.assettype == "drawRect"){
    var duration = 1200;
    var delay = 200 * i;
        bar[i] = new createjs.Container();
        bar[i].y = barSpace * i;
        bar[i].x = baseLine.x;
        graphContainer.addChild(bar[i]);
       if(series > 1){
         for(j=0;j<series;j++){
           var col = new createjs.Shape();
           col.graphics.beginFill(colors[i]).drawRect(0, 0, 1, 20).endFill();
           col.y = 22*j;
           bar[i].addChild(col);
           var value = eval("param.value"+(j+1));
           var scaleValue = displace(param.value1)(parseInt(value));
           createjs.Tween.get(col, {loop:false}).wait(delay)
                   .to({scaleX:displace(param.value1)}, duration, createjs.Ease.sineOut);

         }
       } else {
       var col = new createjs.Shape();
       col.graphics.beginFill(colors[i]).drawRect(0, 0, 1, barHeight).endFill();
       bar[i].addChild(col);

       //adding value
       var value = new createjs.Text(param.value1, "30px arial", "#222");
       value.y = bar[i].y + barHeight/2 - 15;
       value.x = displace(param.value1) + baseLine.x + 10;

       value.alpha = 1;
 if(chartdata.charts.valueLabel == "barmiddle"){
       value.x = displace(param.value1) + baseLine.x - 50;
        value.color= "#fff";
      }
      else if(chartdata.charts.valueLabel == "bartop")
      {
      value.x = displace(param.value1) + baseLine.x + 10;
        value.color= "#222";
      }
      else if(chartdata.charts.valueLabel == "barbottom")
      {
       value.x =  baseLine.x + 10;
        value.color= "#222";
      }

       graphContainer.addChild(value);
       console.log("displace::"+displace(param.value1))

       createjs.Tween.get(col, {loop:false}).wait(delay)
               .to({scaleX:displace(param.value1)}, duration, createjs.Ease.sineOut);
               createjs.Tween.get(value, {loop:false}).wait(delay + 800)
                          .to({alpha:1}, 800, createjs.Ease.sineOut);
      }


       //adding icon
        if(param.iconbitmap){
          barIcon[i] = param.iconbitmap;
          var iScale = (barHeight)/barIcon[i].getBounds().height;
          barIcon[i].scaleX = barIcon[i].scaleY = iScale;
          barIcon[i].y = bar[i].y;
          barIcon[i].alpha = 0;
          graphContainer.addChild(barIcon[i])
        }



       /*========================animating the graph================*/


      if(barIcon.length > 0){
        var oX = barIcon[i].x;
        barIcon[i].x = barIcon[i].x - 50;
        createjs.Tween.get(barIcon[i], {loop:false})
                      .wait(delay+600).to({alpha:1, x:oX}, duration, createjs.Ease.sineOut);
    }

  }
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

var callout = new createjs.Container();
function showBarHighlight (num) {
  for(i=0;i<bar.length;i++){
    if(i != parseInt(num)){
      createjs.Tween.get(bar[i], {loop:false}).to({alpha:0.2}, 800, createjs.Ease.sineOut);
      cStage.update();
    } else {
      var highlightText = new createjs.Text(chartData.chart[parseInt(num)]._caption, "24px arial", "#fff");
      highlightText.x = 25;
      highlightText.y =25;

      var calloutBg = new createjs.Shape();
      calloutBg.graphics.f('#333').drawRoundRect(0,0,200,100,10);
      callout.addChild(calloutBg, highlightText);
      callout.x = bar[i].x +100;
      callout.y = bar[i].y;
      callout.alpha = 0;
      cStage.addChild(callout);
      createjs.Tween.get(callout, {loop:false}).to({alpha:1}, 600, createjs.Ease.sineOut);
      cStage.update();
    }
  }
}

function hideBarHighlight () {
  for(i=0;i<bar.length;i++){
    createjs.Tween.get(bar[i], {loop:false}).to({alpha:1}, 800, createjs.Ease.sineOut);
  }
  createjs.Tween.get(callout, {loop:false}).to({alpha:0}, 600, createjs.Ease.sineOut);
  cStage.update();
  setTimeout(function () {
    cStage.removeChild(callout);
  }, 800);

}
