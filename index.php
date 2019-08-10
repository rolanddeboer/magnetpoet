<?php

  $lists = [
    'essentials/the-poet',
    'little boxes/happiness'  
  ];
  $max_words = 300;
  $shuffle = true;

  
  
  $wordlist = [];
  foreach ($lists as $filename) {
    $wordstxt = file_get_contents('words/' . $filename . '.lst');
    $newlist = explode( "\n", $wordstxt);
    $wordlist = array_merge($wordlist, $newlist);
  }
  
  if ($shuffle) shuffle($wordlist);
?> 

<html><head>
    <title>Magnetic Poet</title>
  <link href="https://fonts.googleapis.com/css?family=PT+Mono&display=swap" rel="stylesheet"> 
  <link rel='stylesheet' href='poet.css' type='text/css' media='all' />
  <script type='text/javascript' src='lib/jquery-1.11.2.min.js'></script>
  <script type='text/javascript' src='poet.js'></script>
  <script type='text/javascript' src='lib/html2canvas5.js'></script>
  </head> <body onload='javascript:scrollToCoordinates()'>
  <div id="blinder"></div>
  <div id="dialog">
    <div id="dialogcontent"></div>
    <button id="button_closeimage" onclick="javascript:closeimage_click()">Close</button>
  </div>
  <div id="imagecontainer"></div>
  <div id="imagecanvaswrapper">
    <div id="imagecanvas"></div>
  </div>
  <div id="wordcontainer" onload='document.magword.w.focus()'>
  <button id="button_renderimage" onclick="javascript:renderimage_click()">Render image</button>
<?php
  $id = 0;
  $left = 0;
  $top = 0;
  foreach ($wordlist as $word) {
    if ($max_words && $id > $max_words) break;
    $word = trim($word);
    if ($word=='' || strpos($word, 'Magnetic Poetry') !== false) continue;
    echo ' <span class="drag" id="' . $id . '">' . $word . '</span>';
    $id ++;
    $left = $left + 80;
    if ($left > 1000) { $top = $top + 20; $left = 0;}
  }
?>

</div>



<form name=magword method=GET action=/toys/magwords.php>
	<input name=w type=hidden><input name=x type=hidden><input name=y type=hidden><input name=sx type=hidden><input name=sy type=hidden>
	</form>
	
</body>
</html>

