function drawPieChartImage (chartdata, stage, drawingContainer) {
    var chartData = chartdata.charts;
         stage.autoClear = true;
         var chart = chartData.chart;

		//var colors = chartData.themeDetails.items.color.split(",");

		var angle = chartData.chart[0].value1 * 360 / 100;
		var chartContainer = new createjs.Container();
		drawingContainer.addChild(chartContainer);
		if(chartData.chartName == "singleFootBall"){
			var video = document.createElement('video');
			video.src = 'images/football.mp4';
			video.setAttribute('width', '1280');
			video.autoplay = true;

			var bg = new createjs.Bitmap(video);
			bg.scaleX = 1.25;
			bg.scaleY = 1.25;
			drawingContainer.addChild(bg);
			console.log('video');
		} else if(chartData.chartName == "singleEarthPie"){
			var video = document.createElement('video');
			video.src = 'images/earth.mp4';
			video.setAttribute('width', '1280');
			video.autoplay = true;

			var bg = new createjs.Bitmap(video);
			bg.scaleX = 1.25;
			bg.scaleY = 1.25;

			drawingContainer.addChild(bg);
			console.log('video');
		}
		var plate = new createjs.Bitmap("/jsp/app/img/chartAssets/plate.png");
		plate.x = 275-40;
		plate.y = 235-40;
		plate.alpha = 0;
		var knife = new createjs.Bitmap("/jsp/app/img/chartAssets/knife.png");
		knife.x = 200-40;
		knife.y = 284-40;
		knife.alpha = 0;
		var fork = new createjs.Bitmap("/jsp/app/img/chartAssets/fork.png");

		fork.x = 120-40;
		fork.y = 300-40;
		fork.alpha = 0;
		var table = new createjs.Container();
		chartContainer.addChild(table);
		table.addChild(plate, knife, fork);
		table.alpha = 1;


		var value = new createjs.Text(chartData.chart[0].value1 + "%", "96px arial", "#0f705e");
		value.x = 874;
		value.y = stage.canvas.height * 0.4;
		value.alpha = 0;
		var label = new createjs.Text(chartData.chart[0].name, "46px arial", "#999");
		label.x = 874;
		label.y = stage.canvas.height * 0.5 + 50;
		label.alpha = 0;
		chartContainer.addChild(value, label);
		var mainSliceContainer = new createjs.Container();
		mainSliceContainer.x = 335;
		mainSliceContainer.y = 275;
		mainSliceContainer.alpha = 0;
		mainSliceContainer.scaleX = 0.6;
		mainSliceContainer.scaleY = 0.6;
		chartContainer.addChild(mainSliceContainer);

		var pizza = new createjs.Bitmap("/jsp/app/img/chartAssets/"+chartData.asset.assetid+".png");
		pizza.x = 00;
		pizza.y = 00;
		pizza.shadow = new createjs.Shadow("#888", 5,5,5);
		var mainArc = new createjs.Shape();
		mainArc.graphics.f("#333").moveTo(0,0)
				.arc(0, 0, 350, angle*Math.PI/180, 360*Math.PI/180);
		mainArc.x = 350;
		mainArc.y = 350;
		mainArc.shadow = new createjs.Shadow("#888", 5,5,5);
		pizza.mask = mainArc;
		//pizza.scaleX = 0.5;
		//pizza.scaleY = 0.5;
		mainSliceContainer.addChild(pizza);
		var sliceContainer = new createjs.Container();
		sliceContainer.x = 0;
		sliceContainer.y = 0;
		var arc = new createjs.Shape();
		arc.graphics.f("#333").moveTo(0,0).arc(0, 0, 350, 0, angle*Math.PI/180);
		arc.x = 350;
		arc.y = 350;

		var slicePizza = new createjs.Bitmap("/jsp/app/img/chartAssets/"+chartData.asset.assetid+".png");

		slicePizza.x = 00;
		slicePizza.y = 00;
		slicePizza.shadow = new createjs.Shadow("#888", 5,5,5);
		slicePizza.mask = arc;
		sliceContainer.addChild(slicePizza);
		mainSliceContainer.addChild(sliceContainer);
		var scaleFactor = stage.canvas.width/1200;
		if(scaleFactor >= 1){
			scaleFactor = 1;
		}
		chartContainer.scaleY = scaleFactor;
		chartContainer.scaleX = scaleFactor;
		if(chartData.chartName == "singleFootBall"){
			chartContainer.x = 110;
			chartContainer.y = -40;
			createjs.Tween.get(bg, {loop:false}).wait(4000).to({alpha:0}, 1800, createjs.Ease.linear);

		createjs.Tween.get(value, {loop:false}).wait(4500)
						.to({alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(label, {loop:false}).wait(4800)
						.to({alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(mainSliceContainer, {loop:false}).wait(4500)
						.to({alpha:1}, 1300,createjs.Ease.cubicOut);
		createjs.Tween.get(sliceContainer, {loop:false}).wait(5000).to({x:25, y:15}, 1000, createjs.Ease.bounceOut);
	} else if(chartData.chartName == "singleEarthPie"){
			chartContainer.scaleX = 1.35;
			chartContainer.scaleY = 1.35;
			value.scaleX = value.scaleY = label.scaleY = label.scaleX = 0.4;
			label.y = value.y + 40;
			chartContainer.y = -145;
			chartContainer.x = -145;
			createjs.Tween.get(bg, {loop:false}).wait(6000).to({alpha:0}, 1800, createjs.Ease.linear);

		createjs.Tween.get(value, {loop:false}).wait(6500)
						.to({alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(label, {loop:false}).wait(6800)
						.to({alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(mainSliceContainer, {loop:false}).wait(6500)
						.to({alpha:1}, 1300,createjs.Ease.cubicOut);
		createjs.Tween.get(sliceContainer, {loop:false}).wait(8000).to({x:25, y:15}, 1000, createjs.Ease.bounceOut);
	} else {
		createjs.Tween.get(plate, {loop:false}).wait(1000).to({x:275,y:235, alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(knife, {loop:false}).wait(1000).wait(400).to({x:200,y:284, alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(fork, {loop:false}).wait(1000).wait(300).to({x:120,y:300, alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(value, {loop:false}).wait(1000).wait(1500)
						.to({alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(label, {loop:false}).wait(1000).wait(1800)
						.to({alpha:1}, 1000,createjs.Ease.cubicOut);
		createjs.Tween.get(mainSliceContainer, {loop:false}).wait(1000).wait(1500)
						.to({alpha:1}, 1300,createjs.Ease.cubicOut);
		createjs.Tween.get(sliceContainer, {loop:false}).wait(1000).wait(2000).to({x:25, y:15}, 1000, createjs.Ease.bounceOut);
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
