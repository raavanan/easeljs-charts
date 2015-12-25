function init(){
  var stage = new createjs.Stage('canvas');
    var data = newChartdata;
    var mainContainer = new createjs.Container();
    stage.addChild(mainContainer);

    var drawingContainer = new createjs.Container();
    mainContainer.addChild(drawingContainer);

    var titleContainer = new createjs.Container();
    mainContainer.addChild(titleContainer);

    drawColumnChart(data, stage, drawingContainer);

    $("#barChart").click(function(){
      drawingContainer.removeAllChildren();
      drawBarChart(data, stage, drawingContainer);
    });
    $("#columnChart").click(function(){
      drawingContainer.removeAllChildren();
      drawColumnChart(data, stage, drawingContainer);
    });
    $("#pieChart").click(function(){
      console.log(data.charts.chartName);
      data.charts.chartName = 'simplepie';
      drawingContainer.removeAllChildren();
      drawPieChart(data, stage, drawingContainer);
    });
    $("#donut").click(function(){
      console.log(data.charts.chartName);
      data.charts.chartName = 'donut';
      drawingContainer.removeAllChildren();
      drawPieChart(data, stage, drawingContainer);
    });
    $("#halfpie").click(function(){
      console.log(data.charts.chartName);
      data.charts.chartName = 'halfpie';
      drawingContainer.removeAllChildren();
      drawPieChart(data, stage, drawingContainer);
    });

}
