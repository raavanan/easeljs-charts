function drawLineChart(chartdata, stage, drawingContainer) {
	var chartWidth = 1024;
	var chartHeight = 768;
	var chartData = chartdata.charts;
	var chart = chartData.chart;
	var series = chartData.series;
	var colors = chartdata.colors;
	var color1 = colors[0],
	color2 = colors[1], color3 = colors[2],
	color4 = colors[3], color5 = colors[4],
	color6 = colors[5], color7 = colors[6];
	//console.log(chartdata.themedetails.theme.name , color1, color2, color3, color4, color5, color6, color7);
	var maxValue = 0;
	var gridMax = 0;
	var totalValue = 0;
	var gridMin = 0;
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
		maxValue += chart[i].value1;
		if(chart[i].value1 < 0){
			hasNeg = true;
		}
	}
}
console.log("gridMin::"+gridMin);
console.log("gridMax::"+gridMax);

	var chartname = chartData.chartName;
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
baseLine.graphics.beginFill("#333333").drawRect(0, 0, chartWidth - (chartWidth * 15/100), 5 ).endFill();
baseLine.y = stage.canvas.height - 135;
baseLine.x = chartWidth * 5/100;
baseLine.alpha = 1;
gridContainer.x = 35;
gridContainer.y = baseLine.y;
chartContainer.addChild(baseLine);
var barSpace = chartWidth/chart.length - 10;

	//-----------------------constructing the line chart----------------------------------
		if(chartData.chartName == "area"){
		var prevPointY = 0;
		var prevPointX = 0;
		var firstPointX = 0;
		var firstPointY = 0;

		var mask = new createjs.Shape();
			mask.graphics.f("#999").drawRect(0,0,1,700).endFill();
			mask.x = chartWidth * 10/100;
			mask.y = 100;

		var graphLine = new createjs.Shape();
			graphLine.mask = mask;
			graphLine.graphics.beginStroke(colors[1]).setStrokeStyle(5);
			graphLine.graphics.beginFill(colors[1])
			.moveTo(chartWidth * 10/100,(gridBounds.height - paramPercentage * gridBounds.height/100) + 140);

		for (i=0;i<chart.length;i++){
			var param = chart[i];
			var paramPercentage = param.value1 * 100/gridMax;
			var point = new createjs.Shape();
			point.graphics.beginFill(colors[1])
					.drawCircle(0,0,5).endFill();
			point.y = (gridBounds.height - paramPercentage * gridBounds.height/100) + 140;
			point.x = chartWidth * 10/100 + (barSpace*(i));
			var valueBg = new lib.thoughtBubble(colors[2]);
			valueBg.x = point.x - 25;
			valueBg.y = point.y;
			valueBg.alpha = 0;
			valueBg.scaleX = valueBg.scaleY = 0.8;
			var value = new createjs.Text(param.value1, "25px arial", "#fff");
			value.x = valueBg.x + 12;
			value.y = valueBg.y - 55;
			value.alpha = 0;
			chartContainer.addChild(valueBg, value);
			graphLine.graphics.lineTo(point.x,point.y);

			if(i == 0){
				firstPointX = point.x;
				firstPointY = point.y;
			}
			prevPointX = point.x;
			prevPointY = point.y;
			console.log(prevPointX, prevPointY);

			chartContainer.addChild(point);
			//add bar labels
			var barLabel = new createjs.Text(param.name, "14px Arial", "#333");
				barLabel.x = chartWidth * 10/100 + (barSpace*(i));
				barLabel.y = baseLine.y + 10;
				chartContainer.addChild(barLabel);
				var interval = i * 800;
			createjs.Tween.get(point, {loop:false}).wait(200+interval)
					.to({scaleY:1,scaleX:1}, 600, createjs.Ease.backOut);
			createjs.Tween.get(valueBg, {loop:false}).wait(200+interval)
					.to({y:valueBg.y - 60, alpha:1}, 600, createjs.Ease.backOut);
			createjs.Tween.get(value, {loop:false}).wait(200+interval)
					.to({alpha:1}, 600, createjs.Ease.backOut);


		}

		graphLine.graphics.lineTo(prevPointX, baseLine.y);

		graphLine.graphics.lineTo(chartWidth * 10/100, baseLine.y)
				.moveTo(chartWidth * 10/100, baseLine.y)
				.lineTo(firstPointX, firstPointY).closePath();

		chartContainer.addChild(graphLine);
		createjs.Tween.get(mask, {loop:false})
					.to({scaleX:point.x}, 2600,
							createjs.Ease.linear);
		stage.update();
		createjs.Ticker.setFPS(24);
		createjs.Ticker.addEventListener("tick", stage);

	} else if (chartData.chartName == 'line') {
		var prevPointY = 0;
		var prevPointX = 0;
		for(j=1;j<=series;j++){
			lineGraph(j);
		}
  function lineGraph (j) {
		for (i=0;i<chart.length;i++){
			var param = chart[i];
			var value = eval("param.value"+j);
				var paramPercentage = value * 100/gridMax;
				var point = new createjs.Shape();
				point.graphics.beginFill(colors[j])
						.drawCircle(0,0,6).endFill();
				point.y = (gridBounds.height - paramPercentage * gridBounds.height/100) + 140;
				point.x = chartWidth * 10/100 + (barSpace*(i));
				point.scaleX = 0;
				point.scaleY = 0;
				var valueBg = new lib.thoughtBubble(colors[2]);
				valueBg.x = point.x - 25;
				valueBg.y = point.y;
				valueBg.alpha = 0;
				valueBg.scaleX = valueBg.scaleY = 0.8;
				var value = new createjs.Text(param.value1, "25px arial", "#fff");
				value.x = valueBg.x + 12;
				value.y = valueBg.y - 55;
				value.alpha = 0;

				var mask = new createjs.Shape();
				mask.graphics.f("#999").drawRect(0,0,1,700).endFill();
				mask.x = chartWidth * 10/100;
				mask.y = 100;

				if(i != 0){
				var graphLine = new createjs.Shape();
				graphLine.graphics.setStrokeStyle(2);
				graphLine.graphics.beginStroke(colors[j]);
				graphLine.graphics.moveTo(point.x,point.y);
				graphLine.graphics.lineTo(prevPointX,prevPointY).endStroke();
				graphLine.mask = mask;
				chartContainer.addChild(graphLine);
				}
				chartContainer.addChild(valueBg, value);
				prevPointX = point.x;
				prevPointY = point.y;
				console.log(prevPointX, prevPointY);
				//add bar labels
				if(j == 1){
				var barLabel = new createjs.Text(param.name, "14px Arial", "#333333");
					barLabel.x = chartWidth * 10/100 + barSpace * i;
					barLabel.y = baseLine.y + 10;
					barLabel.textAlign = "center";
					chartContainer.addChild(barLabel);
				}
				chartContainer.addChild(point);
				var interval = i * 0;
				createjs.Tween.get(point, {loop:false}).wait(200+interval)
						.to({scaleY:1,scaleX:1}, 600, createjs.Ease.backOut);
				createjs.Tween.get(valueBg, {loop:false}).wait(200+interval)
						.to({y:valueBg.y - 60, alpha:0}, 600, createjs.Ease.backOut);
				createjs.Tween.get(value, {loop:false}).wait(200+interval)
						.to({alpha:0}, 600, createjs.Ease.backOut);
				createjs.Tween.get(mask, {loop:false})
						.wait(interval).to({scaleX:point.x}, 600,
								createjs.Ease.linear);
						} // end for




		}// end linegraph func

		stage.update();
		createjs.Ticker.setFPS(24);
		createjs.Ticker.addEventListener("tick", stage);

	} else if(chartData.chartName == 'waterfall'){
		gridContainer.alpha = 0;
		baseLine.alpha =1;
		var barWidth = (chartWidth - (chartWidth * 15/100))/chart.length;
		function percent (value, total){
			var percentage = value * 100/total;
			return percentage;
		}
		var prevHeight = 0;
		for(i=0;i<chart.length;i++){
		var param = chart[i];
		var valuePercent = percent(param.value1, maxValue);
		var height = valuePercent * 630/100;
		var bar = new createjs.Shape();
		bar.graphics.f(colors[1]).drawRect(0,0,barWidth,1);
		bar.y = prevHeight;
		bar.alpha = 0;
		bar.x = baseLine.x + (barWidth * i);
		prevHeight += height;
		//add value
		var value = new createjs.Text(param.value1, "35px arial", "#fff");
		value.y = bar.y + (height*0.5);
		value.x = bar.x + (barWidth*0.4);
		value.alpha = 0;

		//add bar labels
			var barLabel = new createjs.Text(param.name, "14px Arial", "#333333");
				barLabel.x = bar.x + (barWidth*0.3);
				barLabel.y = baseLine.y + 10;


		chartContainer.addChild(bar, barLabel, value);
		var interval = 500 * i;
		createjs.Tween.get(bar, {loop:false})
		 			.wait(interval).to({alpha:1}, 10, createjs.Ease.backOut);
		createjs.Tween.get(value, {loop:false})
		 			.wait(interval).to({alpha:1}, 10, createjs.Ease.backOut);

		 createjs.Tween.get(bar, {loop:false})
		 			.wait(interval).to({scaleY:height}, 800, createjs.Ease.backOut);

		}

		stage.update();
		createjs.Ticker.setFPS(24);
		function updateStage(){
			if(createjs.Tween.hasActiveTweens()){
				stage.update();
			}
		}
		createjs.Ticker.addEventListener("tick", stage);
	}
}
