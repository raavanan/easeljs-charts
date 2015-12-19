function drawLayout(stage, drawingContainer, titleContainer, text, layout){
var layout = eval(layout);

if(layout.chart){
  drawingContainer.x = layout.chart.x;
  drawingContainer.y = layout.chart.y;
  drawingContainer.scaleX = layout.chart.scalex;
  drawingContainer.scaleY = layout.chart.scaley;
}
/*Creating the title*/


 var titleBg = new createjs.Shape();
 titleBg.graphics.beginFill("#999").drawRect(0,0, layout.bg.width, layout.bg.height);
 titleBg.alpha = 0;
 titleContainer.addChild(titleBg);
 titleContainer.x = 0;
 titleContainer.y = 0;

 var titleText = new createjs.Text(text.title, '50px SourceSansProBold', '#333');
 //titleText.regX = titleText.getBounds().width / 2;
 titleText.maxWidth = 800;
 if(layout.layoutName == "layout2" || layout.layoutName == "layout3"){
   titleText.maxWidth = 250;
 }
 titleText.textAlign = "center"
 titleText.x = layout.title.x;
 titleText.y = layout.title.y;
 titleContainer.addChild(titleText);

  var subTitleText = new createjs.Text(text.subtitle, '36px SourceSansProRegular', '#555');
  //subTitleText.regX = subTitleText.getBounds().width / 2;
  subTitleText.maxWidth = 800;
  if(layout.layoutName == "layout2" || layout.layoutName == "layout3"){
    subTitleText.maxWidth = 250;
  }
  subTitleText.textAlign = "center";
  subTitleText.x = layout.subTitle.x;
  subTitleText.y = layout.subTitle.y;
  titleContainer.addChild(subTitleText);

  var sourceText = new createjs.Text(text.source, "14px SourceSansProRegular", "#666");
  sourceText.y = stage.canvas.height - 35;
  sourceText.x = stage.canvas.width - 150;
  titleContainer.addChild(sourceText);
  stage.update();
}
