<?php
$code = $_POST["code_input"];
$tmp_file = fopen("/Users/rohildshah/Sites/tmp.txt", "w");
fwrite($tmp_file, $code);
fclose($tmp_file);

$output = `python tmp.txt`;
echo($output);
