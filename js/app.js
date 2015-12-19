function init(){
  var stage = new createjs.Stage('canvas');
    var data = newChartdata;
    var mainContainer = new createjs.Container();
    stage.addChild(mainContainer);

    var bgContainer = new createjs.Container();
    mainContainer.addChild(bgContainer);

    var drawingContainer = new createjs.Container();
    mainContainer.addChild(drawingContainer);

    var titleContainer = new createjs.Container();
    mainContainer.addChild(titleContainer);

    drawColumnChart(data, stage, drawingContainer);

}
