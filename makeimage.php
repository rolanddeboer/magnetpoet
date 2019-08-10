<div id="imagetemplate">
  <?php
    $words = $_POST['words'];
    foreach ($words as $word) {
      if(!isset($word['text'])) continue;
      $left = $word['left'];
      $top = $word['top'];
      $right = $word['right'];
      $bottom = $word['bottom'];
      $text = $word['text'];
      if ($left < 0 || $top < 0 || $right > 394 || $bottom > 394) continue;
      echo '<div class="imageword" style="left:' .$left . '; top:' .$top . ';">' . $text . '</div>';
    }
  
  
  ?>


</div>
