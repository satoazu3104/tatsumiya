<?php
function fetch_data_callback() {
  // あなたのデータ取得と処理のコード
  $url = "https://genbakun.com/privacy/";
  $conn = curl_init(); // cURLセッションの初期化

  curl_setopt($conn, CURLOPT_URL, $url); // 取得するURLを指定
  curl_setopt($conn, CURLOPT_RETURNTRANSFER, true); // 実行結果を文字列で返す

  $res = curl_exec($conn);

  if ($res === false) {
    // echo "cURL error: " . curl_error($conn);
  } else {
    if (preg_match('/<div class="header-logo">(.*?)<\/div>/s', $res, $matches)) {
    } else {
      // echo "No match found.";
    }

    preg_match('/<p>登録者数：(.*?)社様<\/p>/s', $matches[1], $regist_count);
    
  }
curl_close($conn); //セッションの終了
// 結果をJSON形式で返す
header('Content-Type: application/json');
echo json_encode([
    'matches' => $matches,
    'regist_count' => $regist_count
]);
wp_die();
  
}

add_action('wp_ajax_fetch_data_callback', 'fetch_data_callback');
add_action('wp_ajax_nopriv_fetch_data_callback', 'fetch_data_callback');
