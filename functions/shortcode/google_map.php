<?php
function google_map_shortcode($atts) {
    // ショートコードの属性を取得
    $atts = shortcode_atts(
        array(
            'src' => 'https://www.google.co.jp/maps/place/%E6%9D%B1%E4%BA%AC%E9%A7%85/@35.6812362,139.7645499,17z/data=!3m1!4b1!4m6!3m5!1s0x60188bfbd89f700b:0x277c49ba34ed38!8m2!3d35.6812362!4d139.7671248!16zL20vMDFfdnY3?hl=ja&entry=ttu', // ここにはデフォルトのGoogleマップのURLを入力してください
            'style' => 'border:0',
        ), 
        $atts
    );

    // Google MapsのIframeを作成
    $map = '<iframe class="p-access__map" style="' . $atts['style'] . '" allowfullscreen="" loading="lazy" src="' . $atts['src'] . '"></iframe>';

    // Iframeを返す
    return $map;
}
add_shortcode('google_map', 'google_map_shortcode');