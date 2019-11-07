<?php

/*
if( $file_handle = fopen( FILENAME,'r') ) {
	while( $data = fgets($file_handle) ){
	
		$split_data = preg_split( '/\'/', $data);
	
		$message = array(
			'view_name' => $split_data[1],
			'message' => $split_data[3],
			'post_date' => $split_data[5]
		);
		array_unshift( $message_array, $message);
	}

	// ファイルを閉じる
	fclose( $file_handle);
}
*/

// データベースに接続
$mysqli = new mysqli( 'localhost', 'root', '', 'mydb');

// 接続エラーの確認
if( $mysqli->connect_errno ) {
	$error_message[] = 'データの読み込みに失敗しました。 エラー番号 '.$mysqli->connect_errno.' : '.$mysqli->connect_error;
} else {
    
    $sql = "SELECT * FROM suki ORDER BY title DESC";
	$res = $mysqli->query($sql);
	
	if( $res ) {
		$message_array = $res->fetch_all(MYSQLI_ASSOC);
	}
	
    $mysqli->close();
    
}

//wakaranai

?>
