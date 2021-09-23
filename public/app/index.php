<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once ("microlite/index.php");
$app = $app = new \Microlite\Microlite();
$app->route($_SERVER['REQUEST_URI'], json_decode($_POST['data']));
