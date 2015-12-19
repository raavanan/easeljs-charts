(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:


// stage content:
(lib.rocket = function() {
	this.initialize();

	// Layer 1
	this.mc9sAnimPlane = new lib.mc9sAnimPlane();
	this.mc9sAnimPlane.setTransform(100,144,1,1,0,0,0,0,-108.2);

	this.addChild(this.mc9sAnimPlane);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(175,135.8,50,115.4);


// symbols:
(lib.mc9sAnimPlane = function(color) {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f(color).s().p("AgEIyQgCgTgRgXQgGgKgFgKQgIgSgCgSQgFgcAKgWQgDAEgFAIQgIARAAAUIgFAKQgCAKgIADQgBgSgLgyIgDgPQgDgUAAgQIAAgRQABgJAEgJQAGgSAPgMIgJAbQgCALABAMQABARAEARIADAJIALgSIAGgGQAJgMANgJIAGgEIgCAJQgCAMAAAOQADAoAcAjQgBgRAFgTQAGgTAKgPQAJgNAMgKIACgDIADgBIAEgCIAGAMIABADIAAAEIABAGQABAMgFALQAFgGAFgKIABgEIABgCIAAgBQALghgKgoIAGALQAFAMAEAOQAEAcgEAaIgCAHQgEAPgHAPIgKAYQgJAZAEAJQgIgIgHgMQgKgVABgTQABgGACgGIgGANIAAACQgEAUADAiQAFAmgTAYQgFAIgIAHIgKAHQABgFgCgJgAj5BpIBNg7QgCAdAYBcQAMAtANApIhOCTgACrFBIgqhOQANgjALgqQAXhUgFglIBPA1IgmEsIgphNgAiSjOQAQh+AhhRIC7AAQBZDeghD4QgRB9gfBRIi7ADQhajeAhj6gAgsk+QgVASgCAbQgBAbARAVQATAUAaABQAaADATgSQAVgSACgbQACgbgSgVQgSgUgbgCIgEAAQgXAAgSAQgAgloUQASgaAQgRQAQARAjA9QARAeANAcIiiABQALgqAkg0g");
	this.shape.setTransform(25,57.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,50,115.4);


(lib.mc9sAnimPlane_bot = function(color) {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f(color).s().p("Aj5JrQAmhPAphzQBRjnAPi0QAJh0AAjHQgDjbABhhIAQAXIAQgNIAlA/IAYgtIAZAEIAUghQADCMAMC4IAXE0QAQDXBADZQAgBsAdBBg");
	this.shape.setTransform(25.3,0.1,1,0.008,0,0,0,0.3,-37.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,50,1);


(lib.mc9sAnimPlane_top = function(mode,startPosition,loop, color) {
	this.initialize(mode,startPosition,loop, color, {});

	// Layer 3
	this.instance = new lib.mc9sAnimPlane_top(color);
	this.instance.setTransform(0,-158.8,1,1,0,0,0,25,57.6);


	this.shape = new cjs.Shape();
	this.shape.graphics.f(color).s().p("AgOImQgIgKgKgaIgBgEQgJgZgCgYQgEgbAIgVIgNAOQgLAJgEAKQgCAMABAHIAAAPQgWgiAEgfIABgFIAKgrIAEgRIAFgWIAFgUIADASQABAMAAAMQABAWgFAVIAAACIAMgNQALgHAHgIQAIgIAEgJIADAFIAAAAQAIALgBAaQgDAaADAoQAOgVAFgTQAFgPAJgMQAHgPANgKIACgCIADgBQACgDADgBIAFAMIACAEIAAAFIABAGQAAAKgFAKQAGgGADgJIABgDIACgDIAAgDQALgdgJgoIAFAGQAKAOAFAeQAEARgJAZIgDAGQgEAKgHAOIgHAWQgHAbgVAGQAGgKABgOQAAgKgFgKIgEgMIgHAWQgGAOgJAOQgOAcACASQACAUgBAGQgBAHAAACQgFgEgJgLgAj5B0IBNg7QgCAdAYBbQAMAuANApIhOCTgACrFLIgqhNQANgkALgqQAXhTgFglIBPA1IgmEsIgphOgAiSjDQAQh+AhhRIC7AAQBZDeghD3QgRB9gfBSIi7ACQhajdAhj6gAgsk0QgVASgCAcQgBAbARAUQATAVAaABQAaADATgTQAVgRACgcQACgagSgVQgSgUgbgCIgEAAQgXAAgSAPgAgloKQASgaAQgQQAQARAjA8QARAfANAcIiiABQALgrAkg0g");
	this.shape.setTransform(0,-159.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f(color).s().p("AgEIyQgCgTgRgXQgGgKgFgKQgIgSgCgSQgFgcAKgWQgDAEgFAIQgIARAAAUIgFAKQgCAKgIADQgBgSgLgyIgDgPQgDgUAAgQIAAgRQABgJAEgJQAGgSAPgMIgJAbQgCALABAMQABARAEARIADAJIALgSIAGgGQAJgMANgJIAGgEIgCAJQgCAMAAAOQADAoAcAjQgBgRAFgTQAGgTAKgPQAJgNAMgKIACgDIADgBIAEgCIAGAMIABADIAAAEIABAGQABAMgFALQAFgGAFgKIABgEIABgCIAAgBQALghgKgoIAGALQAFAMAEAOQAEAcgEAaIgCAHQgEAPgHAPIgKAYQgJAZAEAJQgIgIgHgMQgKgVABgTQABgGACgGIgGANIAAACQgEAUADAiQAFAmgTAYQgFAIgIAHIgKAHQABgFgCgJgAj5BpIBNg7QgCAdAYBcQAMAtANApIhOCTgACrFBIgqhOQANgjALgqQAXhUgFglIBPA1IgmEsIgphNgAiSjOQAQh+AhhRIC7AAQBZDeghD4QgRB9gfBRIi7ADQhajeAhj6gAgsk+QgVASgCAbQgBAbARAVQATAUAaABQAaADATgSQAVgSACgbQACgbgSgVQgSgUgbgCIgEAAQgXAAgSAQgAgloUQASgaAQgRQAQARAjA9QARAeANAcIiiABQALgqAkg0g");
	this.shape_1.setTransform(0,-158.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ffffff").s().p("Aj5JrQAmhPAphzQBRjnAPi0QAJh0AAjHQgDjbABhhIAQAXIAQgNIAlA/IAYgtIAZAEIAUghQADCMAMC4IAXE0QAQDXBADZQAgBsAdBBg");
	this.shape_2.setTransform(0.3,-123.7,1,0.008,0,0,0,0.3,-37.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f(color).s().p("AgUIkIgNgOIgDgLQgHgUAGgYQAHgggCgSIgDgLQAFAYgQAUQgHAKgIAHQAEgIgFgXIgHgXQgCgFAAgHQgGgTABgSQABgOAFgQIABgHIAIgQIAGgHIgFAQQgEASACAPIABAOIAHASIACAEIgBgEQgDgPAFgMIAHgMQAKAIAGAIQANATAFAZQACASgCANQAXgWAHgcIAEgMIABgVIgCgIIALAIQAGAFAFAIIAGAIIAGARQADgDABgEIABgEIACgCQAHgWAAgWIgEgYQAQASAAAaQAAARgFAYQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIgBAEIgEAMIAAABIgIAVIgKAkQgFgEgDgKQgBgEABgEIAAgMQgCgLgDgKIgFgKQAFARgFAWIgBAEQgGAZgSAVQgPATgEAQQgDAIABAEIgJgHgAj5B+IBNg7QgCAdAYBcQAMAtANApIhOCTgACrFWIgqhOQANgjALgqQAXhUgFglIBPA1IgmEsIgphNgAiSi5QAQh+AhhRIC7AAQBZDeghD4QgRB9gfBRIi7ADQhajeAhj6gAgskpQgVASgCAbQgBAbARAVQATAUAaABQAaADATgSQAVgSACgbQACgbgSgVQgSgUgbgCIgEAAQgXAAgSAQgAgln/QASgaAQgRQAQARAjA9QARAeANAcIiiABQALgqAkg0g");
	this.shape_3.setTransform(0,-160.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).to({state:[{t:this.shape_2},{t:this.shape_3}]},3).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-216.4,50,115.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
