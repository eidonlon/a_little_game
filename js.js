function allowDrop(ev){
	ev.preventDefault();
}

function drag(ev){
    ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev){
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	ev.target.appendChild(document.getElementById(data));
}

var del=[];

function start(){
	var aCard=document.querySelectorAll(".card");
	var oBox=document.getElementById("box");
	var oContainer=document.querySelector(".container");
  var aTd=document.getElementsByTagName("td");
  
  var list=[];
	var count=10;
  var cNode=null; 


   for(var i=0;i<aTd.length;i++){   //找出所有空的格子
    if(aTd[i].innerHTML==""){
       list.push(aTd[i]);
    }
  }

	for(var i=0;i<aCard.length;i++){
        var that=null;
        aCard[i].ondragstart=function(){  //开始拖动元素
           drag(event);
           that=this;           
        }

        for(var j=0;j<list.length;j++){
            list[j].ondragover=function(){  //让所有空格子阻止浏览器对数据的默认操作
             allowDrop(event);
            }

           list[j].ondrop=function(){

           cNode=that.cloneNode(true);
           oContainer.appendChild(cNode);

           that.id="card"+count;
            count++;  
           drop(event);
           del.push(cNode);
           dele();
           }
        }
   }
	   
}

start();

function dele(){
  var oDelete=document.getElementById("delete");

   for(var t=0;t<del.length;t++){
    del[t].ondragstart=function(){  //开始拖动元素
           drag(event);
    }

    oDelete.ondragover=function(){
        allowDrop(event);
    }
    oDelete.ondrop=function(){
        drop(event);
        this.innerHTML="";
    }
  }
}

function check(){
  var oBtn=document.getElementById("btn");

  oBtn.onclick=function(){
    isWin();
  }
}


function isWin(){
  var aTd=document.getElementsByTagName("td");
  var flag=0;

  for(var i=0;i<aTd.length;i++){
    if(aTd[i].innerHTML==""){
      console.log(aTd[i].innerHTML);
       flag++;
    }
  }
  if(flag==0){
    checkRows();
    checkCells();
    ss();
     if(z!=0){
    alert("不对哦！");
    }
    else{
    alert("恭喜你，赢啦！");
    }
  }
  else{
    alert("你还没有填完呢！");
  }
}

 check();
  var z=0;

 function compare(arr){
   var ff=0;

   for(var i=0;i<arr.length;i++){
     for(var j=0;j<i;j++){
       if(arr[i]==arr[j]){
         ff++;
       }
       else{
        ff=0;
       }
     }
   }
   if(ff==0){
       z=0;
   }
   else{
    z++;
   }
 }


function checkRows(){
  var oBox=document.getElementById("box");
  var c_list;
  for(var i=0;i<9;i++){
    var str=oBox.rows[i].innerHTML;
      var pent=/\d(?=<)/g;
      c_list=str.match(pent);
      console.log(c_list);
      compare(c_list);
  }
}

function checkCells(){
   var oBox=document.getElementById("box");
    for(var i=0;i<9;i++){
    var str='';
      for(var j=0;j<9;j++){
        str+=oBox.rows[j].cells[i].innerHTML;        
      }
      var pent=/\d(?!\")/g;
      c_list=str.match(pent);
        console.log(c_list);
      compare(c_list);
  }
}

function ss(){
  var oBox=document.getElementById("box");
  var c_list;

  for(var i=0;i<9;i++){
    var str="";
    var elem="color"+i;
      var aStr=document.getElementsByClassName(elem);
      for(var j=0;j<aStr.length;j++){
          str+=aStr[j].innerHTML;
      }
      var pent=/\d(?!\")/g;
      c_list=str.match(pent);
        console.log(c_list);
      compare(c_list);
  }

}
