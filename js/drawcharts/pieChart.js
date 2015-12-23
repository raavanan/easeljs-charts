function drawPieChart(chartdata, stage, drawingContainer) {
var chartData = chartdata.charts;
         var chart = chartData.chart;
		var maxValue = 0;
		var colors = chartdata.colors;

		var chartContainer = new createjs.Container();
    drawingContainer.addChild(chartContainer);
		var thisAngle = 0;
		var gridMax = 0;
		var totalValue = 0;
		for(i=0;i<chart.length;i++){

			gridMax = Math.max(chart[i].value1, gridMax);
			maxValue += chart[i].value1;
		}
	 if(chartData.chartName == 'simplepie'){

			//calculating the total of chart values

		console.log("chart max value::"+maxValue);

		//drawing the chart
		for(i=0;i<chart.length;i++){
			var param = chart[i];

			var valuePercent = param.value1 * 100 / maxValue;
			var valueAngle = valuePercent * 360 / 100;
			var startAngle = thisAngle * Math.PI/180;
			var endAngle = (thisAngle + valueAngle) * Math.PI/180;
			var arc = new createjs.Shape();
		arc.graphics.f(colors[i]).moveTo(0,0)
				.arc(0, 0, 250, startAngle, endAngle);

		arc.scaleY = 0;
		arc.scaleX = 0;
		arc.x = stage.canvas.width * 0.5;
		arc.y = stage.canvas.height *0.5;


		var valueLabel = new createjs.Text(param.value1, "25px arial", "#fff");

		var labelAngle = 1.5*Math.PI + endAngle + 0.8;
		console.log("labelAngle::"+labelAngle+" endAngle::"+endAngle+" startAngle::"+startAngle);
		valueLabel.x =  arc.x + 135 * Math.cos(labelAngle);
		valueLabel.y = arc.y + 150 * Math.sin(labelAngle);

		console.log("chart::"+param.value1);

		valueLabel.alpha = 0;
		chartContainer.addChild(arc, valueLabel);
		thisAngle += valueAngle;

		// animating
		var interval = i * 200;
		createjs.Tween.get(arc, {loop:false})
			.wait(interval).to({scaleY : 1, scaleX : 1}, 1500, createjs.Ease.backOut);
		createjs.Tween.get(valueLabel, {loop:false})
			.wait(1500).to({alpha:1}, 1500, createjs.Ease.linear);
		}

		//constructing legend
		var legendConatiner = new createjs.Container();
		legendConatiner.x = stage.canvas.width * 5 / 100;
		legendConatiner.y = stage.canvas.height - 100;
		legendConatiner.alpha = 1;
    drawingContainer.addChild(legendConatiner);
		for(i = 0;i<chart.length;i++){
		var legendColor = new createjs.Shape();
		legendColor.graphics.beginFill("#"+colors[i].substring(2))
					.drawRect(0, 0, 30, 10).endFill();
		legendColor.x = 200*i;
		legendColor.y = 5;
		legendConatiner.addChild(legendColor);
		var legendLabel = new createjs.Text(chart[i].name, "16px Arial", "#222222");
		legendLabel.y = 0;
		legendLabel.x = legendColor.x + 40;
		legendConatiner.addChild(legendLabel);
		}
		stage.update();

		createjs.Ticker.setFPS(24);
    function updateStage(){
      if(createjs.Tween.hasActiveTweens()){
        stage.update();
      }
    }
    createjs.Ticker.addEventListener("tick", stage);

}	else if(chartData.chartName == 'doughnut'){
			//calculating the total of chart values
		console.log("chart max value::"+maxValue);
		var mask = new createjs.Shape();
			mask.graphics.beginFill("#ff9900")
    			.arc(0,0,250,0,Math.PI*2,true)
    			.arc(0,0,100,Math.PI*2,0,false);
			mask.x = stage.canvas.width * 0.5;
			mask.y = stage.canvas.height *0.5;
			mask.scaleY = 1.3;
			mask.scaleX = 1.3;

			//chartContainer.addChild(mask);
		//drawing the chart
		for(i=0;i<chart.length;i++){
			var param = chart[i];

			var valuePercent = parseInt(param.value1) * 100 / maxValue;

			var valueAngle = valuePercent * 360 / 100;
			var startAngle = thisAngle * Math.PI/180;
			var endAngle = (thisAngle + valueAngle) * Math.PI/180;
			var arc = new createjs.Shape();
		arc.graphics.f(colors[i]).moveTo(0,0)
				.arc(0, 0, 250, startAngle, endAngle);
		arc.mask = mask;
		arc.scaleY = 1.3;
		arc.scaleX = 1.3;
		arc.alpha = 0;
		arc.x = stage.canvas.width * 0.5;
		arc.y = stage.canvas.height *0.5;



		var valueLabel = new createjs.Text(param.value1, "25px arial", "#fff");
		var labelAngle = 1.5*Math.PI + endAngle + 0.8;
		console.log("labelAngle::"+labelAngle+" endAngle::"+endAngle+" startAngle::"+startAngle);
		valueLabel.x =  arc.x + 150 * Math.cos(labelAngle);
		valueLabel.y = arc.y + 160 * Math.sin(labelAngle);
		console.log("chart::"+param.value1);
		valueLabel.alpha = 0;
		chartContainer.addChild(arc, valueLabel);
		thisAngle += valueAngle;

		// animating
		var interval = i * 200;
		createjs.Tween.get(mask, {loop:false})
			.wait(interval).to({scaleY : 1, scaleX : 1}, 1500, createjs.Ease.backOut);
		createjs.Tween.get(arc, {loop:false})
    .wait(interval).to({scaleY : 1, scaleX : 1, alpha:1}, 1500, createjs.Ease.backOut);
		createjs.Tween.get(valueLabel, {loop:false})
    .wait(1500).to({alpha:1}, 1500, createjs.Ease.linear);
		}

		//constructing legend
		var legendConatiner = new createjs.Container();
		legendConatiner.x = stage.canvas.width * 20 / 100;
		legendConatiner.y = stage.canvas.height - 100;
		legendConatiner.alpha = 1;
    drawingContainer.addChild(legendConatiner);
		for(i = 0;i<chart.length;i++){
		var legendColor = new createjs.Shape();
		legendColor.graphics.beginFill(colors[i])
					.drawRect(0, 0, 30, 10).endFill();
		legendColor.x = 200*i;
		legendColor.y = 5;
		legendConatiner.addChild(legendColor);
		var legendLabel = new createjs.Text(chart[i].name, "16px Arial", "#222222");
		legendLabel.y = 0;
		legendLabel.x = legendColor.x + 40;
		legendConatiner.addChild(legendLabel);
		}
		stage.update();

		createjs.Ticker.setFPS(24);
    function updateStage(){
      if(createjs.Tween.hasActiveTweens()){
        stage.update();
      }
    }
    createjs.Ticker.addEventListener("tick", updateStage);

} else if(chartData.chartName == 'comparisonpie'){
		maxValue = 0;
			//calculating the total of chart values
		for(i=0;i<2;i++){

			maxValue += chartData.chart[i].value1;

		}
		console.log("chart max value::"+maxValue);

		//drawing the chart
		for(i=0;i<2;i++){
			var param = chart[i];

			var valuePercent = parseInt(param.value1) * 100 / maxValue;

			var valueAngle = valuePercent * 360 / 100;
			var startAngle = thisAngle * Math.PI/180;
			var endAngle = (thisAngle + valueAngle) * Math.PI/180;
			var arc = new createjs.Shape();
		arc.graphics.f(colors[i]).moveTo(0,0)
				.arc(0, 0, 250, startAngle, endAngle);
		arc.x = stage.canvas.width * 0.5;
		arc.y = stage.canvas.height * 0.5;
		arc.scaleY = 0;
		arc.scaleX = 0;

		var valueLabel = new createjs.Text(param.value1, "25px arial", "#fff");
		valueLabel.x = arc.x - 30 * i;
		valueLabel.y = arc.y - 40 * i;
		console.log("chart::"+param.value1);

		chartContainer.addChild(arc);
		thisAngle += valueAngle;

		// animating
    var interval = i * 200;
		createjs.Tween.get(arc, {loop:false})
    .wait(interval).to({scaleY : 1, scaleX : 1}, 1500, createjs.Ease.backOut);
		}

		//constructing legend
		var legendConatiner = new createjs.Container();
		legendConatiner.x = stage.canvas.width * 20 / 100;
		legendConatiner.y = stage.canvas.height - 100;
		legendConatiner.alpha = 1;
    drawingContainer.addChild(legendConatiner);
		for(i = 0;i<2;i++){
		var legendColor = new createjs.Shape();
		legendColor.graphics.beginFill(colors[i])
					.drawRect(0, 0, 30, 10).endFill();
		legendColor.x = 200*i;
		legendColor.y = 5;
		legendConatiner.addChild(legendColor);
		var legendLabel = new createjs.Text(chart[i].name, "16px Arial", "#222222");
		legendLabel.y = 0;
		legendLabel.x = legendColor.x + 40;
		legendConatiner.addChild(legendLabel);
		}
		stage.update();

		createjs.Ticker.setFPS(24);
    function updateStage(){
      if(createjs.Tween.hasActiveTweens()){
        stage.update();
      }
    }
    createjs.Ticker.addEventListener("tick", stage);

} else if (chartData.chartName == 'halfpie') {
		//calculating the total of chart values

		console.log("chart max value::"+maxValue);

		//drawing the chart
		for(i=0;i<chart.length;i++){
			var param = chart[i];

			var valuePercent = param.value1 * 100 / maxValue;

			var valueAngle = valuePercent * 180 / 100;
			var startAngle = thisAngle * Math.PI/180;
			var endAngle = (thisAngle + valueAngle) * Math.PI/180;
			var arc = new createjs.Shape();
		arc.graphics.f(colors[i]).moveTo(0,0)
				.arc(0, 0, 350, startAngle, endAngle);
		arc.x = 0;
		arc.y = 0;
		arc.scaleY = 0;
		arc.scaleX = 0;

		var valueLabel = new createjs.Text(param.value1, "25px arial", "#fff");

		var labelAngle = 1.5*Math.PI + endAngle + 1.2;
		//console.log("labelAngle::"+labelAngle+" endAngle::"+endAngle+" startAngle::"+startAngle);
		valueLabel.x =  arc.x + 130 * Math.cos(labelAngle);
		valueLabel.y = arc.y + 150 * Math.sin(labelAngle);

		console.log("chart::"+param.value1);

		valueLabel.alpha = 1;
		valueLabel.rotation = -180;
		chartContainer.addChild(arc, valueLabel);
		chartContainer.x = stage.canvas.width * 0.5;
		chartContainer.y = stage.canvas.height * 0.6;
		chartContainer.rotation = 180;
		thisAngle += valueAngle;

		// animating
		var interval = i * 200;
		createjs.Tween.get(arc, {loop:false})
					.wait(interval).to({scaleY : 1, scaleX : 1}, 1500, createjs.Ease.backOut);
		}

		//constructing legend
		var legendConatiner = new createjs.Container();
		legendConatiner.x = stage.canvas.width * 22 / 100;
		legendConatiner.y = stage.canvas.height - 200;
		legendConatiner.alpha = 1;
    drawingContainer.addChild(legendConatiner);
		for(i = 0;i<chart.length;i++){
		var legendColor = new createjs.Shape();
		legendColor.graphics.beginFill(colors[i])
					.drawRect(0, 0, 30, 10).endFill();
		legendColor.x = 200*i;
		legendColor.y = 5;
		legendConatiner.addChild(legendColor);
		var legendLabel = new createjs.Text(chart[i].name, "16px Arial", "#222222");
		legendLabel.y = 0;
		legendLabel.x = legendColor.x + 40;
		legendConatiner.addChild(legendLabel);
		}
		stage.update();

		createjs.Ticker.setFPS(24);
    function updateStage(){
      if(createjs.Tween.hasActiveTweens()){
        stage.update();
      }
    }
    createjs.Ticker.addEventListener("tick", stage);

} else if(chartData.chartName == 'swatch'){
		var circles = new createjs.Container();
		chartContainer.addChild(circles);
		var highValue = 0;
		for(i=0;i<chart.length;i++){

			highValue = Math.max(chart[i].value1, highValue);
		}
		for(i=0;i<chart.length;i++){
			var param = chart[i];
			var valuePercent = param.value1 * 100 / highValue;

			var valueAngle = valuePercent * 360 / 100;
			var startAngle = thisAngle * Math.PI/180;
			var endAngle = (thisAngle + valueAngle) * Math.PI/180;
			var arc = new createjs.Shape();
		arc.graphics.f(colors[i]).moveTo(0,0)
				.arc(0, 0, 250, startAngle, endAngle);
				arc.x = stage.canvas.width * 0.5;
			arc.y = stage.canvas.height * 0.5;
			//circles.addChild(arc);

			var radius = 33 * (i+1);
			var circle = new createjs.Shape();
			circle.graphics.beginFill(colors[i])
    			  .arc(0,0,radius,0,Math.PI*2,true)
    			  .arc(0,0,radius - 30,Math.PI*2,0,false);
    		circle.x = stage.canvas.width * 0.5;
			circle.y = stage.canvas.height * 0.5;
			circle.mask = arc;
			circle.scaleY = 1.3;
			circle.scaleX = 1.3;

			var value = new createjs.Text(param.value1, "15px arial", "#fff");

			value.y = stage.canvas.height * 0.5;
			value.x = stage.canvas.width * 0.5 + (50*i);
			circles.addChild(circle, value);

		}


		var mask = new createjs.Shape();
		mask.x = stage.canvas.width * 0.5;
		mask.y = stage.canvas.height * 0.5;
		circles.mask = mask;
		var endAngle = 0.1;
		function tick() {
			if(endAngle < Math.PI*2.5){
			mask.graphics.f("#00cc66").moveTo(0,0).arc(0,0,500,0,endAngle);
			endAngle += 0.1;
			stage.update();
		}
		}


		createjs.Ticker.setFPS(24);
		createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.addEventListener('tick', stage);
	} else if (chartData.chartName == 'stackedvenn'){
		var maxRadius = 250;
		var circleRadius = 0;
		chart.sort(function (a, b) {
                  if (a.value < b.value) {
                    return 1;
                  }
                  if (a.value > b.value) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                });
		console.log("sorted::"+chart[0].value);
		for (i=0;i<chart.length;i++){
			var param = chart[i];
			var paramPercent = param.value1 * 100 / gridMax;

			circleRadius = paramPercent * 250 / 100;
		var circle = new createjs.Shape();
		circle.graphics.f(colors[i]).drawCircle(0,0,circleRadius);
		circle.regY = circleRadius;
		circle.scaleX = circle.scaleY = 0.1;
		circle.y = stage.canvas.height - 135;
		circle.x = stage.canvas.width * 0.5;

		var value = new createjs.Text(param.value1, "25px arial", "#fff");

		value.y = stage.canvas.height - 130;
		value.x = stage.canvas.width * 0.5 - 20;
		value.alpha = 0;
		chartContainer.addChild(circle, value);
		var valueY = (stage.canvas.height - 130) - (circleRadius * 2);
			var interval = 100 * i;
			createjs.Tween.get(circle, {loop:false})
			 .wait(interval).to({scaleY : 1, scaleX : 1}, 1200, createjs.Ease.backOut);
			createjs.Tween.get(value, {loop:false})
			 .wait(interval).to({alpha: 1, y:valueY}, 1200, createjs.Ease.backOut);
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
