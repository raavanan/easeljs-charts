function drawShapeCharts(chartdata, stage, drawingContainer) {

    var chart = chartdata.charts.chart;
		var colors = chartdata.colors;
		var chartContainer = new createjs.Container();
		drawingContainer.addChild(chartContainer);

		var totalValue = 0;
		for(i=0;i<chart.length;i++){
			totalValue += chart[i].value1;

		}
		console.log("totalValue::"+totalValue);
		//to percetage utility function
		function getPercent(value, total){
			var percentage = value * 100/total;
			return percentage;
		}
		//to get rectangle height
		function getHeight(percentage, shapeHeight){
			var height = percentage * shapeHeight/100;
			return height;
		}
		//console.log(getPercent(45, totalValue));

		var maskShape = new createjs.Shape();
		if(chartdata.charts.chartName == "funnel"){
		maskShape.graphics.f("#00cc66").s().p("EgGOAhcIAAn+MgbNg6vMBC3gAKMgbgA7NIAAHqg");
		maskShape.y = 0;
	} else if (chartdata.charts.chartName == "pyramid") {
			maskShape.graphics.f("#444444").s().p("EgwHAyAMAynhkAMAtoBkAg");
			maskShape.y = stage.canvas.height;
			maskShape.scaleX=0.68;
			maskShape.scaleY=0.68;
		}

		maskShape.x = stage.canvas.width * 0.5;
		var rect = new createjs.Shape();
		var yOffset = 0;

		rect.x = 300;

		for(i=chart.length -1;i>=0;i--){

			var percent = getPercent(chart[i].value1, totalValue);
			var height = getHeight(percent, 428);
			rect.graphics.beginFill(colors[i])
							.drawRect(0,yOffset,600, height);
			yOffset += height;
		}
		rect.y = stage.canvas.height - yOffset - 235;
		rect.mask = maskShape;

		chartContainer.addChild(rect);
		var valueOffset = 0;
		for(i=0;i<chart.length;i++){

			var percent = getPercent(chart[i].value1, totalValue);
			var height = getHeight(percent, 428);
			var value = new createjs.Text(chart[i].value1, "24px arial", "#fff");
			value.x = maskShape.x - 13;
			value.y = (rect.y + yOffset);
			valueOffset += height;
			value.y = value.y - (valueOffset - (height * 0.5))+25;
			//chartContainer.addChild(value);
		}
		//constructing legend
		var legendConatiner = new createjs.Container();
		legendConatiner.x = stage.canvas.width * 22 / 100;
		legendConatiner.y = stage.canvas.height - 100;
		legendConatiner.alpha = 1;
		drawingContainer.addChild(legendConatiner);
		for(i = 0;i<chart.length;i++){
		var legendColor = new createjs.Shape();
		legendColor.graphics.beginFill(colors[i])
					.drawCircle(0, 0, 10).endFill();
		legendColor.x = 200*i;
		legendColor.y = 5;
		legendConatiner.addChild(legendColor);
		var legendLabel = new createjs.Text(chart[i].name, "16px Arial", "#222222");
		legendLabel.y = 0;
		legendLabel.x = legendColor.x + 40;
		legendConatiner.addChild(legendLabel);
		}

		createjs.Tween.get(maskShape, {loop:false}).to({y:stage.canvas.height*0.4}, 1600,
				createjs.Ease.cubicOut);




	stage.update();
	createjs.Ticker.setFPS(24);
	function updateStage(){
		if(createjs.Tween.hasActiveTweens()){
			stage.update();
		}
	}
	createjs.Ticker.addEventListener("tick", stage);
}
