<?php
function block_enqueue()
{
    $blocks = [
        'firstview',
        'contentbox',
        'title',
        'bodytext',
        'middletext',
        'space',
        'medias',
        'wrapper',
        'listproblem',
        'listproblemuser',
        'listfaq',
        'listcompany',
        'linkbutton',
        'splide',
        'dectitle',
        'interview'
    ];

    foreach ($blocks as $value) {
        $asset_file = include get_theme_file_path('/dist/assets/js/blocks/' . $value . '.asset.php');

        wp_register_script(
            $value,
            get_theme_file_uri('/dist/assets/js/blocks/' . $value . '.js'),
            $asset_file['dependencies'],
            $asset_file['version']
        );

        if ($value === 'medias') {
            wp_localize_script(
                $value,
                'portartMedia',
                [
                    'themeUrl' => get_template_directory_uri()
                ]
            );
        }

        $args = [
            'editor_script' => $value,
        ];

        // bodytextブロックだけ動的レンダリング
        if ($value === 'bodytext') {
            $args['render_callback'] = 'portart_render_bodytext_block';
        }

        register_block_type(
            'portart/' . $value,
            $args
        );
    }
}
add_action('init', 'block_enqueue');

function portart_render_bodytext_block($attributes, $content, $block)
{
    $text         = $attributes['text'] ?? '';
    $text_en      = $attributes['text_en'] ?? '';
    $variation    = $attributes['variation'] ?? '';
    $fontfamily   = $attributes['fontfamily'] ?? '';
    $add_id       = $attributes['addId'] ?? '';
    $add_class    = $attributes['addClassName'] ?? '';

    // 改行を半角スペースに変換
    $fix_class = str_replace(["\r\n", "\r", "\n"], ' ', $add_class);

    // 基本class
    $base_class = $fix_class
        ? $fix_class . ' ' . $fontfamily
        : $variation . ' c-text__normal ' . $fontfamily;

    $id_attr = $add_id ? ' id="' . esc_attr($add_id) . '"' : '';

    $lang = portart_get_lang();
    if ($lang === 'en') {
        $set_text = $text_en ? $text_en : $text;
        return sprintf(
            '<p class="%s"%s>%s</p>',
            esc_attr(trim($base_class)),
            $id_attr,
            wp_kses_post($set_text),
        );
    } else {
        return sprintf(
            '<p class="%s"%s>%s</p>',
            esc_attr(trim($base_class)),
            $id_attr,
            wp_kses_post($text)
        );
    }
}
