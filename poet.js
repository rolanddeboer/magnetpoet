var url = '/toys/magwords.php?getajax=1&'; // The server-side script
var last;
var words = [];
$(document).ready(function() {
});
function renderimage_click() {
  $('#dialog').center();
  $('#blinder').show();
  $.post("makeimage.php", { 'words': words }, function(data, status) 
    {
      $('#dialogcontent').html(data);
      $('#dialog').show();
       html2canvas($("#imagetemplate"), {
          onrendered: function(canvas) {
            $("#dialogcontent").html( canvas );
          },
            width: 404,
            height: 404
        });
      
    } 
  )
}

function closeimage_click() {
  
  $('#blinder').hide();
  $('#dialog').hide();
  $('#dialogcontent').html('');
}

function renderimage() {
//var doc=document.getElementById("wordcontainer");
//var doc =document.getElementById("wordcontainer");
//doc.remove();
  html2canvas(document.getElementById("wordcontainer"), {
    onrendered: function(canvas) {
      document.getElementById("imagecontainer").appendChild( canvas );
    },
      width: 1000,
      height: 500
  });
}

function handleHttpResponse()
{
   var line;
   var xobj;
   last = 0;
   if (http.readyState != 4)
   {
      return false;
   }
   lines = http.responseText.split('|');
   for(var lineID in lines)
   {
      line = lines[lineID];
      if(line == '')
      {  break;  }

      worddata = line.split(',');
      if(last == 0)
      {
         last = worddata[0];
         document.getElementById('users').innerHTML = worddata[1];
         document.getElementById('s').innerHTML = worddata[2];
         continue;
      }
      worddata = line.split(',');
      xobj = document.getElementById(worddata[0]);
      xobj.style.left = worddata[1];
      xobj.style.top  = worddata[2];
   }
}

function getHTTPObject() {
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}
//var http = getHTTPObject(); // We create the HTTP Object

function scrollToCoordinates() {
  window.scrollTo(0, 0);
}

var ie=document.all;
var nn6=document.getElementById&&!document.all;
var isdrag=false;
var x,y;
var dobj;

function movemouse(e)
{
  if (isdrag)
  {
    dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x;
    dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y;
    document.magword.x.value = (nn6 ? tx + e.clientX - x: tx + event.clientX - x) - -12;
    document.magword.y.value  = (nn6 ? ty + e.clientY - y : ty + event.clientY - y) - -54;
    return false;
  }
}

function selectmouse(e)
{
  var fobj       = nn6 ? e.target : event.srcElement;
  var topelement = nn6 ? "HTML" : "BODY";
  while (fobj.tagName != topelement && fobj.className != "drag")
  {
    fobj = nn6 ? fobj.parentNode : fobj.parentElement;
  }
  if (fobj.className=="drag")
  {
    isdrag = true;
    dobj = fobj;
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = dobj.getBoundingClientRect();
    
    dobj.style.position = "absolute";
    dobj.style.top = elemRect.top - bodyRect.top;
    dobj.style.left = elemRect.left - bodyRect.left;
    tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    x = nn6 ? e.clientX : event.clientX;
    y = nn6 ? e.clientY : event.clientY;
    document.onmousemove=movemouse;
    return false;
  }
}

function unselmouse(e)
{
	isdrag=false;
   var w = dobj.id;
   var sx = (document.all)?document.body.scrollLeft:window.pageXOffset;
   var sy = (document.all)?document.body.scrollTop:window.pageYOffset;
   var wx = document.magword.x.value;
   var wy = document.magword.y.value;
   
   var fobj       = nn6 ? e.target : event.srcElement;
   var id = $(fobj).attr('id');
   if(typeof words[id] === 'undefined') {
    //alert('first');
   }
     var text = $(fobj).html();
     var posleftcanvas = $('#imagecanvas').position().left;
     var postopcanvas = $('#imagecanvas').position().top;
     var posleft = $(fobj).position().left - posleftcanvas;
     var posright = posleft + $(fobj).width();
     var postop = $(fobj).position().top - postopcanvas;
     var posbottom = postop + $(fobj).height();
     words[id] = {
       'text': text,
       'left': posleft,
       'right': posright,
       'top': postop,
       'bottom': posbottom
     };
   //alert(JSON.stringify(words));
   //alert(postop + "," + posbottom);
   
   //alert(fobj.style.left.replace(/\D/g,''));
  // if ((fobj.style.left.replace("px",'')*1)<15) fobj.style.left=15;
   if ((fobj.style.right.replace("px",'')*1)<400) {
    //var w = fobj.offsetWidth;
    //fobj.style.right="400px";
    //fobj.style.width ="50px";
   }
   var qstring = 'w=' + w + '&x=' + wx + '&y=' + wy + '&sx=' + sx + '&sy=' + sy + '&last=' + last;
   //http.open('GET', url + qstring, true);
   //http.onreadystatechange = handleHttpResponse;
   //http.send(null);
}
document.onmousedown=selectmouse;
document.onmouseup=unselmouse;


	var IE = document.all?true:false;
	if (!IE) document.captureEvents(Event.MOUSEMOVE)
		document.onmousemove = getMouseXY;

	var tempX = 0;
	var tempY = 0;
	function getMouseXY(e) {
		if (IE)
		{  // grab the x-y pos.s if browser is IE
			tempX = event.clientX + document.body.scrollLeft;
			tempY = event.clientY + document.body.scrollTop;
		}
		else {  // grab the x-y pos.s if browser is NS
			tempX = e.pageX;
			tempY = e.pageY;
		}
		if (tempX < 0){tempX = 0;}
		if (tempY < 0){tempY = 0;}
		document.magword.x.value = tempX + -54;
		document.magword.y.value = tempY + -12;
		return true;
	}
	
	jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

