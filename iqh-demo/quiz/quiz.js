function Pick1(c,b,e,...a){
  this.a = a;
  this.b = b;
  this.c = c;
  this.e = e;
  this.t = "P";
}
function Click(x,y,w,h,b,...a){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.b = b;
  this.a = a;
  this.t = "X";
}
function Keypad(c,b){
  this.c = c;
  this.b = b;
  this.t = "Z";
}
Object.defineProperty(CanvasRenderingContext2D.prototype,"letterSize",{
  get(){
    return this.measureText("H").fontBoundingBoxAscent+this.measureText("H").fontBoundingBoxDescent;
  }
})
CanvasRenderingContext2D.prototype.verticalAlign = "top";
CanvasRenderingContext2D.prototype.textWrap = function(t,w){
  let tx = "";
  let tw = "";
  let twl = 0;
  let tl = 0;
  let r = [""];
  for(let i = 0;i<t.length;i++){
    if(t[i]==" "){
      if(twl+tl>w){
        tx = tw;
        r.push(tx);
      }else{
        if(tx>""){
          tx += " ";
        }
        tx+=tw;
      }
      tw = "";
      tl = this.measureText(tx).width;
      r[r.length-1] = tx;
    }else{
      tw += t[i];
      twl = this.measureText(tw).width;
      if(twl>w&&!(i==t.length-1||t[i+1]==" ")){
        if(r[r.length-1]>""){
          r.push(tw);
        }else{
          r[r.length-1] = tw;
        }
        r.push("")
        tw = "";
        tx = "";
      }
    }
  }
  if(twl+tl>w){
    tx = tw;
    r.push(tx);
  }else{
    if(tx>""){
      tx += " ";
    }
    tx+=tw;
  }
  r[r.length-1] = tx;
  return r.filter(function(l){
    return l>"";
  });
};
CanvasRenderingContext2D.prototype.fillTextWrap = function(t,x,y,w){
  r = this.textWrap(t,w);
  if(this.verticalAlign=="bottom"){
    y -= this.letterSize*(r.length-1)
  }else if(this.verticalAlign=="middle"){
    y -= this.letterSize*(r.length-1.5)/2
  }
  for(let i = 0;i<r.length;i++){
    this.fillText(r[i],x,y);
    y += this.letterSize;
  }
};
CanvasRenderingContext2D.prototype.strokeTextWrap = function(t,x,y,w){
  r = this.textWrap(t,w);
  if(this.verticalAlign=="bottom"){
    y -= this.letterSize*(r.length-1)
  }else if(this.verticalAlign=="middle"){
    y -= this.letterSize*(r.length-1.5)/2
  }
  for(let i = 0;i<r.length;i++){
    this.strokeText(r[i],x,y);
    y += this.letterSize;
  }
};
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.font = "35px sans-serif";
let music = new Audio("BCMGF1137 - Awome19 Returns.mp3");
music.loop = true;
music.play();
let death = new Audio("DEATH.wav");
let mouseX = -Infinity;
let mouseY = -Infinity;
let mouseDown = false;
function mouseInRect(x,y,w,h){
  return (x<mouseX)&&(mouseX<x+w)&&(y<mouseY)&&(mouseY<y+h);
}
let clickYesX = ctx.measureText("Click yes!").width;
clickYesX = canvas.width/2-clickYesX/2;
let clickYesW = ctx.measureText("Click ").width;
clickYesX += clickYesW;
clickYesW = ctx.measureText("yes!").width;
let nothing4MeX = ctx.measureText("There's nothing left 4 me...").width;
nothing4MeX = canvas.width/2-nothing4MeX/2;
let nothing4MeW = ctx.measureText("There's nothing left ").width;
nothing4MeX += nothing4MeW;
nothing4MeW = ctx.measureText("4").width;
let time = Date.now()
let timer = 0;
let anim = 0;
let entered = "";
let qNum = -1;
const qArray = [
  "How do you participate in H: The Series?",
  "If there are 10 H projects and you take away 6, how many do you have?",
  "If you have an opinion...",
  "Which H-maker was born after 2011?",
  "When was \"Rather Be\" by Clean Bandit released?",

  "According to no known laws of aviation...",
  "Click yes!",
  "How many of each clean animal of each gender did Noah bring onto the Ark?",
  "How many holes in a tremolo?",
  "What does arithmetic stand for?",

  "DISPLAY",
  "What happened to Lucca in class?",
  "What two European countries start with the same 4 letters?",
  "What does \"TAKOS\" stand for?",
  "What sound does a sidewinder make?",

  "Why do you even play this quiz? It's all just meta-references and stuff. Sure some are funny, but even THEY get so goshdarn OLD after 0.69 milliseconds.",
  "Leave site? Changes you made may not be saved.",
  "Click on the song that was not released in a year ending in a 1.",
  "There's nothing left 4 me...",
  "Wanna sprite cranberry?",

  "WHAT FLAVO(U)R IS PLASTIC?",
  "WHICH OF THESE VITAMINS IS NOT PRESENT IN SUPERVITAMIN CHOCOLATE?",
  "PICK THE WORST ELEMENTCAT!",
  "WHAT DOES PTA STAND FOR?",
  "WHAT IS H'S ID?"
];
let answers = [
  new Pick1(1,0,"\"You don't\" is tempting, because you start of with ignoring the question in the GD Impossible quiz, but you actually need to answer this question.","You don't","Just make a project","Join H: The Server","The first one's always free"),
  new Pick1(3,0,"You take 6 from a pile of 10, not the other way around...","3","4","5","6"),
  new Pick1(2,0,"In your face.","tell it to the world","write an essay","shove it","don't talk about it"),
  new Pick1(0,0,"Okay, this one's real, no trickery used here.","Daily271","Corkie","BombCraft","Axothan"),
  new Pick1(0,0,"Because, that's when it was released!","2014","2015","2016","2017"),

  new Pick1(2,0,"...people should stop making these jokes.","...there is no way a bee should be able to fly.","...this is a dead meme","...there are multiple ways a bee should be able to be swallowed up by antimatter.","...people should stop making these jokes."),
  new Click(clickYesX,100-ctx.measureText("H").fontBoundingBoxAscent,clickYesW,ctx.letterSize,0,"OUT OF ORDER","OUT OF ORDER","OUT OF ORDER","OUT OF ORDER"),
  new Pick1(1,0,"Kappa.","1","7","2","14"),
  new Pick1(2,0,"Kappa.","1","4","9","16"),
  new Pick1(1,10000,"A-R-I-T-H-M-E-T-I-C, see?","Mathematics, of course","A rat in teacher's hair might excite the innocent children.","Most nights, it doesn't know...","Some old happy cats are having tea on aircraft."),
  
  new Pick1(2,15000,"OKAY?","UHHH","UH HUH","UH UH","WHAT?"),
  new Pick1(2,0,"Kappa.","He listened to horrible fart music","Who's Lucca?","He had to leave chem","Is this Dalton's suggestion???"),
  new Pick1(1,2000,"Because they do!","Pakistan and Afghanistan","Slovakia and Slovenia","Union of Soviet Social/Sovereign Republics and the United States of America","Yugoslavia and Czechoslovakia"),
  new Pick1(2,0,"T-A-K-O-S, see?","These Answers Kill Our Souls","It's spelled \"tacos\"","Tangle-Arm Kragle Outside Sprayer","TAKe-OutS"),
  new Pick1(3,0,"This is boring...","BONG","SSSS","(y)","boop-bing-bop-froon-tangsss-boom-bing-bang-aww-1.798e308-deddedded-lol-awome19-130000177013"),

  new Pick1(3,0,"Disregard this question. There is no H-Maker named \"BombCraft\".","You're using meta-references yourself!","...I guess I'd rather live in the Backrooms","It never gets old!","Disregard this question. There is no continent named \"Asia\"."),
  new Pick1(3,0,"Okay?","YES","NO","CANCEL","LEAVE"),
  new Pick1(2,0,"Yes.","Tainted Love","Just Like A Pill","Mirrors","Nothing Else Matters"),
  new Click(nothing4MeX,100-ctx.measureText("H").fontBoundingBoxAscent,nothing4MeW,ctx.letterSize,0,"Sad.","O RLY?","(Blunder!) BIG MISTAKE, RESIGN NOW.","Indeed","fr fr"),
  new Pick1(4,0,"Ultimate Haxxor Mode enabled, Not...","Sure","Nope","I don't do soda","You copybara","Clear"),

  new Pick1(3,10000,"WHAT?!","HONEY","STOAT3","VIENNA SAUSAGE","AMERICAN CHEESE","EGG MAYONNAISE","WATER"),
  new Pick1(0,0,"Vitiman S doesn't even exist","S","T","U","V","W"),
  new Pick1(1,0,"Aircat sux","LEAFCAT","AIRCAT","WATERCAT","FLARECAT","AETHERCAT"),
  new Pick1(1,10000,"Could we stop screaming?","PROJECTS THAT ATTACK","PARENTS WHO TALK A LOT","PARENT TEACHER ADMINISTRATION","NATIONAL DYSLEXIA ASSOCIATION"),
  new Keypad(5974533,5500)
]
let bomb;
function nextQuestion(){
  entered = "";
  qNum++;
  if(qNum==20){
    music.pause();
    music.src = "8.wav";
    music.loop = true;
    music.currentTime = 0;
    music.play();
  }
  if(qNum==24){
    music.pause();
    music.src = "10.wav";
    music.loop = true;
    music.currentTime = 0;
    anim = 1;
    qNum--;
    return;
  }
  res = answers[qNum];
  try{
    bomb = res.b>0?res.b:-Infinity;
  }catch{
    bomb = -Infinity;
  }
}
function die(){
  qNum = -1;
  death.currentTime = 0;
  death.play()
}
function dieButton(){
  document.getElementById('die').innerHTML = 'DIE.';
  die();
}
nextQuestion()
function ResponsePosition(i){
  if(answers[qNum].t=="Z"){
    if(i>0){
      i++;
    }
    if(i==-2){
      i = 1;
    }
    i++;
    this.x = (i%3)*60+270;
    this.y = Math.floor(4-(i+1)/3)*60+220
    this.w = 60;
    this.h = 60;
  }else{
    if(qNum<14){
      this.x = 295*(i%2)+85;
      this.y = (i<2?180:357.5);
      this.w = 260;
      this.h = 142.5;
      this.c = ["navy","#0000c0","#000055","blue"];
    }else if(qNum==20){
      this.x = 295*(i%2)+85;
      this.y = (i<2?180:(i<4?215+250/3:250+500/3));
      this.w = 260;
      this.h = 250/3;
    }else{
      this.x = 140*i+20;
      this.y = 180;
      this.w = 120;
      this.h = 320;
      this.c = ["teal","#00c0c0","#005555","aqua"];
    }
  }
  if(qNum>19){
    this.c = ["white","white","lightgray","red"];
  }
  if(qNum==24){
    this.c = ["black","gray","black","white"];
  }
}
function anim1(){
  if(timer<1000) return;
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if(timer<1250) return;
  if(1250<timer&&timer<1750){
    ctx.fillStyle = "#ffffff"+Math.floor((timer-1250)*0.51).toString(16);
    console.log(ctx.fillStyle);
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText("FINAL QUESTION",canvas.width/2,canvas.height/2+ctx.letterSize/4);
    return;
  }
  if(1750<timer&&timer<2500){
    ctx.fillStyle = "white";
    ctx.font = "80px serif"
    ctx.textAlign = "center"
    ctx.fillText("FINAL QUESTION",canvas.width/2,canvas.height/2+ctx.letterSize/4);
    return;
  }
  if(2500<timer&&timer<3000){
    ctx.fillStyle = "#ffffff"+Math.floor((500-(timer-2500))*0.51).toString(16);
    console.log(ctx.fillStyle);
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText("FINAL QUESTION",canvas.width/2,canvas.height/2+ctx.letterSize/4);
    return;
  }
  if(timer<3500) return;
  anim = 0;
  qNum++;
  music.play();
  res = answers[qNum];
  try{
    bomb = res.b>0?res.b:-Infinity;
  }catch{
    bomb = -Infinity;
  }
}
canvas.addEventListener("click",function(){
  if(qNum==-1||qNum==25){
    ctx.font = "40px serif";
    let textWidth = ctx.measureText("TRY AGAIN?").width;
    if(mouseInRect(canvas.width/2-textWidth/2,(480+ctx.letterSize/2)-ctx.measureText("H").fontBoundingBoxAscent,textWidth,ctx.letterSize)){
      timer = 0;
      anim = 0;
      qNum = -1;
      nextQuestion()
      music.currentTime = 0;
      music.src = "Ryzmik-Permafrost.mp3";
      music.play();
    }
    if(qNum==25){
    let textWidth = ctx.measureText("EXPLANATIONS AND MORE").width;
    if(mouseInRect(canvas.width/2-textWidth/2,(420+ctx.letterSize/2)-ctx.measureText("H").fontBoundingBoxAscent,textWidth,ctx.letterSize)){
      document.location = "explanations/";
    }
    }
    return;
  }
  if(music.paused){
    music.play();
  }
  let pos;
  let res = answers[qNum]
  if(res.t=="Z"){
    for(let i = -2;i<10;i++){ 
      pos = new ResponsePosition(i);
      if(mouseInRect(pos.x,pos.y,pos.w,pos.h)){
        if(i==-1){
          entered="";
          return;
        }
        if(i==-2){
          if(entered==res.c){
            nextQuestion();
          }else{
            die()
          }
          return;
        }
        entered += i;
      }
    }
    return;
  }
  for(let i = 0;i<res.a.length;i++){
    pos = new ResponsePosition(i);
    if(mouseInRect(pos.x,pos.y,pos.w,pos.h)){
      if(res.t=="X"){
        die()
        return;
      }
      if(i==res.c){
        nextQuestion();
      }else{
        die()
      }
      return;
    }
  }
  if(res.t=="X"){
    if(mouseInRect(res.x,res.y,res.w,res.h)){
      nextQuestion()
      return;
    }
  }
});
canvas.addEventListener("mouseup",function(e){
  mouseDown = false;
});
canvas.addEventListener("mousedown",function(e){
  mouseDown = true;
});
canvas.addEventListener("mousemove",function(e){
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});
canvas.addEventListener("mouseout",function(){
  mouseX = -Infinity;
  mouseY = -Infinity;
  mouseDown = false;
});
setInterval(function(){
  time = Date.now()-time;
  if(qNum==-1||qNum==25){
    music.pause();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText(qNum==25?"YOU WIN":"GAME OVER",canvas.width/2,90)
    ctx.fillStyle = "green";
    ctx.font = "40px serif";
    let textWidth = ctx.measureText("TRY AGAIN?").width;
    ctx.font = (mouseInRect(canvas.width/2-textWidth/2,(480+ctx.letterSize/2)-ctx.measureText("H").fontBoundingBoxAscent,textWidth,ctx.letterSize)?"50":"40")+"px serif";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeText("TRY AGAIN?",canvas.width/2,480+ctx.letterSize/2)
    ctx.fillText("TRY AGAIN?",canvas.width/2,480+ctx.letterSize/2)
    if(qNum==25){
    ctx.font = "40px serif";
    let textWidth = ctx.measureText("EXPLANATIONS AND MORE").width;
    ctx.font = (mouseInRect(canvas.width/2-textWidth/2,(420+ctx.letterSize/2)-ctx.measureText("H").fontBoundingBoxAscent,textWidth,ctx.letterSize)?"50":"40")+"px serif";
    ctx.strokeText("EXPLANATIONS AND MORE",canvas.width/2,420+ctx.letterSize/2)
    ctx.fillText("EXPLANATIONS AND MORE",canvas.width/2,420+ctx.letterSize/2)
    }
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(mouseX,mouseY);
    ctx.ellipse(mouseX,mouseY,5,5,0,0,2*Math.PI);
    ctx.fill();
    return
  }
  res = answers[qNum];
  if(qNum==24){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.verticalAlign = "top";
    ctx.font = "60px serif";
    let len = ctx.textWrap(qArray[qNum],canvas.width-60);
    if(len.length>2){
      ctx.font = "40px serif";
    }
    ctx.fillTextWrap(qArray[qNum],canvas.width/2,80,canvas.width-60);
  }else{
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.verticalAlign = "top";
    if(qNum<20){
      ctx.font = "35px sans-serif";
      let len = ctx.textWrap(qArray[qNum],canvas.width-60);
      if(len.length>2){
        ctx.font = "25px sans-serif";
      }
      ctx.fillTextWrap(qArray[qNum],canvas.width/2,100,canvas.width-60);
      ctx.font = "40px sans-serif";
      ctx.textAlign = "start";
      ctx.fillText(qNum+1+".",20,50);
    }else{
      ctx.font = "40px serif";
      let len = ctx.textWrap(qArray[qNum],canvas.width-60);
      if(len.length>2){
        ctx.font = "30px serif";
      }
      ctx.strokeStyle = "red";
      ctx.lineWith = 4;
      ctx.strokeTextWrap(qArray[qNum],canvas.width/2,110,canvas.width-60);
      ctx.font = "50px serif";
      ctx.textAlign = "start";
      ctx.strokeText(qNum+1+".",20,55);
    }
  }
  if(bomb>-Infinity){
    if(bomb>0){
      ctx.fillStyle = qNum==24?"white":"black";
      ctx.beginPath();
      ctx.moveTo(660,50);
      ctx.ellipse(660,50,Math.sin(bomb/1000*Math.PI)*5+25,Math.sin(bomb/1000*Math.PI)*5+25,0,0,2*Math.PI);
      ctx.fill();
      ctx.fillStyle = qNum==24?"black":"white";
      ctx.font = ((Math.sin(bomb/1000*Math.PI)*5+25)*0.9).toString() + "px serif"
      ctx.textAlign = "center";
      ctx.fillText((Math.ceil(bomb/100)/10),660,50+ctx.letterSize/4);
      bomb -= time;
    }else{
      if(anim<1) die();
    }
  }
  let pos;
  if(res.t=="Z"){
    for(let i = -2;i<10;i++){
      pos = new ResponsePosition(i);
      ctx.fillStyle = mouseInRect(pos.x,pos.y,pos.w,pos.h)?(mouseDown?pos.c[2]:pos.c[1]):pos.c[0];
      ctx.fillRect(pos.x,pos.y,pos.w,pos.h)
      ctx.lineWidth = 5;
      ctx.strokeStyle = pos.c[3];
      ctx.strokeRect(pos.x,pos.y,pos.w,pos.h)
      ctx.fillStyle = pos.c[3];
      ctx.font = "36px monospace"
      ctx.textAlign = "center";
      ctx.fillText(i>=0?i:(i==-2?"=":"C"),pos.x+pos.w/2,pos.y+pos.h/2+ctx.letterSize/4)
    }
    ctx.fillStyle = pos.c[0];
    ctx.fillRect(270,160,180,60)
    ctx.strokeStyle = pos.c[3];
    ctx.strokeRect(270,160,180,60)
    ctx.fillStyle = pos.c[3];
    ctx.textAlign = "start";
    ctx.font = "36px monospace"
    ctx.fillText(entered,280,190+ctx.letterSize/4)
  }else{
    for(let i = 0;i<res.a.length;i++){
      pos = new ResponsePosition(i);
      ctx.fillStyle = mouseInRect(pos.x,pos.y,pos.w,pos.h)?(mouseDown?pos.c[2]:pos.c[1]):pos.c[0];
      ctx.fillRect(pos.x,pos.y,pos.w,pos.h)
      ctx.lineWidth = 5;
      ctx.strokeStyle = pos.c[3];
      ctx.strokeRect(pos.x,pos.y,pos.w,pos.h)
      ctx.fillStyle = pos.c[3];
      if(qNum < 14){
        ctx.font = "24px sans-serif"
        len = ctx.textWrap(res.a[i],pos.w-20);
        if(len.length*ctx.letterSize>pos.h-20){
          ctx.font = "20px sans-serif";
        }
      }else{
        ctx.font = "20px sans-serif"
        len = ctx.textWrap(res.a[i],pos.w-20);
        if(len.length*ctx.letterSize>pos.h-20){
          ctx.font = "15px sans-serif";
        }
      }
      ctx.textAlign = "center";
      ctx.verticalAlign = "middle";
      ctx.fillTextWrap(res.a[i],pos.x+pos.w/2,pos.y+pos.h/2,pos.w-20)
    }
  }
  if(anim>0&&timer<1000){
    ctx.fillStyle = "#000000"+(timer<16?"0":"")+Math.floor(timer*0.255).toString(16);
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }else{
    ctx.fillStyle = qNum==24?"white":"black";
    ctx.beginPath();
    ctx.moveTo(mouseX,mouseY);
    ctx.ellipse(mouseX,mouseY,5,5,0,0,2*Math.PI);
    ctx.fill();
  }
  if(anim>0){
    if(anim==1){
      anim1();
    }
    timer += time;
  }
  time = Date.now();
},50/3);
