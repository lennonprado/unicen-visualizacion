function Circle(x, y, r, c){
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;
  this.s = 0;
  this.sx = 0;
  this.sy = 0;
  this.comido = 0;
}

Circle.prototype.select = function(x,y) {
  this.s = 1;
  this.sx=x;
  this.sy=y;
}

Circle.prototype.unSelect = function() {
  this.s = 0;
  this.sx = 0;
  this.sy = 0;
}

Circle.prototype.setX = function(x) {
  this.x = x;
}

Circle.prototype.setY = function(y) {
  this.y = y;
}

Circle.prototype.draw = function(ctx) {
  if(this.comido == 0){
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      ctx.fill();
      ctx.closePath();
  }
}


Circle.prototype.drawLine = function(ctx,lineWidth) {
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strockeStyle = 'black';
  ctx.fillStyle = this.c;
  ctx.stroke();
  ctx.closePath();
}

Circle.prototype.drawGrad = function(ctx) {
  ctx.beginPath();
  bg =ctx.createRadialGradient(this.x,this.y,this.r,this.x,this.y,0);
  bg.addColorStop(0,this.c);
  bg.addColorStop(1,"#FFFFFF");
  ctx.fillStyle = bg;
  ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

Circle.prototype.drawImage = function(ctx,myImg,repeat) {
  ctx.beginPath();
  var img = new Image();
  img.src = myImg;
  img.onload = function() {
      var pattern = ctx.createPattern(img,repeat);
      ctx.fillStyle = pattern;
  };
  ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

Circle.prototype.clickIn = function(posX,posY) {
  d1 = Math.sqrt(  Math.pow((this.x - posX),2) + Math.pow((this.y - posY),2) );
  if(this.r < d1)
    return false;
  else
    return true;
}

Circle.prototype.contiene = function(c){
  d1 = Math.sqrt(  Math.pow((this.x - c.x),2) + Math.pow((this.y - c.y),2) );
  dist = d1+c.r;
  if(this.r > d1)
    return true;
  else
    return false;
}

Circle.prototype.comer = function(c){
  c.comido = 1;
  this.r = this.r + c.r;
}
