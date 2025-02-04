<?php
//получаем данные информера и сохраняем в кеш
//10 секундный кеш не будет нагружать наш сервер
$win1251=0; //1 - чтобы использовать кодировку 1251
$revert=1; //0 или 1 - сортировка последних песен
$cachefile="cache8414.json";
if(!ini_get("allow_url_fopen")) echo "<font color=red>Please enable allow_url_fopen!</font><br>";
if(@filemtime($cachefile)<time()-10) { 
	$informer=@file_get_contents("http://myradio24.com/users/8414/status.json");
	file_put_contents($cachefile,$informer);
}

//читаем данные информера из кеш файла (если надо, меняем кодировку)
$informer=(array)json_decode(file_get_contents($cachefile),1);
if($win1251) array_walk_recursive($informer,function(&$v) {$v=@iconv("utf-8","windows-1251//TRANSLIT",$v);});

//переменная по умолчанию
$_GET['get']=$_GET['get'] ?? '';

//вывод структуры полей (в ссылке добавить ?get=print)
if($_GET['get']=="print") echo "<pre>".print_r($informer,true)."</pre>";

//вывод информации в формате JSON (в ссылке добавить ?get=json)
if($_GET['get']=="json") echo json_encode($informer);

//вывод информации в формате JSONP (в ссылке добавить ?get=jsonp)
if($_GET['get']=="jsonp") echo "var informer=".json_encode($informer).";";

//вывод информации в HTML (параметр get не указан)
if(!$_GET['get'])  {

//вывод различной информации
$nextsong=$informer['nextsongs'][0];
echo "<b>Общая информация</b><br><br>
<table>
<tr><td>Станция:</td><td>{$informer['title']}</td></tr>
<tr><td>Песня:</td><td>{$informer['song']}</td></tr>
<tr><td>Следующая:</td><td>{$nextsong['song']}</td></tr>
<tr><td>Вещает DJ:</td><td>{$informer['djname']}</td></tr>
<tr><td>Качество:</td><td>{$informer['kbps']} kbps</td></tr>
<tr><td>Слушателей:</td><td><b>{$informer['listeners']}</b></td></tr>
<tr><td>Пик слушателей:</td><td>{$informer['plisteners']}</td></tr>
<tr><td>Исполнитель:</td><td>{$informer['artist']}</td></tr>
<tr><td colspan=2><img src=http://myradio24.com/{$informer['img']} width=300 border=0></td></tr>
</table><br>
<b>Статистика DJ's</b><br><br>";
if(!count($informer['rank'])) echo "Ничего не найдено.<br><br>";
else { 
	echo "<table><tr><td>Ведущий</td><td>Рейтинг</td><td>Вещаний</td><td>Онлайн</td></tr>";
	for($i=0; $i<count($informer['rank']); $i++) {
		$rank=$informer['rank'][$i]; if(isset($rank[0])) $rank=array('djname'=>$rank[0], 'rating'=>$rank[1], 'hours'=>$rank[2], 'count'=>$rank[3], 'avatar'=>$rank[4]);
		echo "<tr><td>DJ {$rank['djname']}</td><td align=center>{$rank['rating']}</td><td align=center>{$rank['count']}</td><td align=right>{$rank['hours']} часов</td></tr>";
	}
	echo "</table><br>";
}
$lastsongs="";
for($i=0; $i<count($informer['songs']); $i++) {
	$song=$informer['songs'][$i]; if(isset($song[0])) $song=array('time'=>$song[0], 'song'=>$song[1], 'img'=>$song[2]);	
	$str="<tr><td>{$song['time']}</td><td>{$song['song']}</td></tr>"; 
	if($revert) $lastsongs=$str.$lastsongs; else $lastsongs.=$str; 
}
echo "<b>Последние песни</b><br><br>
<table>$lastsongs</table>";

}

?>
