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
    if ($lang == 'en') {
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

/**
 * customDataAttrs をHTML属性へ変換
 */
function portart_parse_custom_data_attrs($custom_data_attrs)
{
    if (empty($custom_data_attrs)) {
        return '';
    }

    $attrs = '';

    // 改行ごとに分割
    $lines = preg_split('/\r\n|\r|\n/', $custom_data_attrs);

    foreach ($lines as $line) {

        $line = trim($line);

        if (empty($line)) {
            continue;
        }

        // = が無ければスキップ
        if (strpos($line, '=') === false) {
            continue;
        }

        [$key, $value] = array_map(
            'trim',
            explode('=', $line, 2)
        );

        // data- 以外は禁止
        if (strpos($key, 'data-') !== 0) {
            continue;
        }

        // " を除去
        $value = trim($value, '"\'');

        $attrs .= sprintf(
            ' %s="%s"',
            esc_attr($key),
            esc_attr($value)
        );
    }

    return $attrs;
}

/**
 * wrapper block render
 */
function portart_render_wrapper_block($attributes, $content)
{
    $add_class_name   = $attributes['addClassName'] ?? '';
    $add_id           = $attributes['addId'] ?? '';
    $custom_data_attrs = $attributes['customDataAttrs'] ?? '';
    $link_url         = $attributes['linkUrl'] ?? '';
    $is_checked       = !empty($attributes['isChecked']);
    $display          = $attributes['display'] ?? '';
    $tag_name         = $attributes['tagName'] ?? 'div';

    // class生成
    $class = trim($add_class_name . ' ' . $display);

    // 属性生成
    $attrs = '';

    if (!empty($add_id)) {
        $attrs .= ' id="' . esc_attr($add_id) . '"';
    }

    if (!empty($class)) {
        $attrs .= ' class="' . esc_attr($class) . '"';
    }

    // custom data attrs
    $attrs .= portart_parse_custom_data_attrs($custom_data_attrs);

    /**
     * aタグ出力
     */
    if (!empty($link_url)) {

        $target = '';
        $url = $link_url;
        if (portart_get_lang() == 'en') {
            if (!$is_checked) {
                $url = get_site_url() . '/en' . $url;
            }
        }

        if ($is_checked) {
            $target = ' target="_blank" rel="noopener noreferrer"';
        }

        return sprintf(
            '<a href="%s"%s%s>%s</a>',
            esc_url($url),
            $target,
            $attrs,
            $content
        );
    }

    /**
     * 許可タグ
     */
    $allowed_tags = [
        'div',
        'section',
        'article',
        'main',
        'aside',
        'header',
        'footer',
        'span'
    ];

    if (!in_array($tag_name, $allowed_tags, true)) {
        $tag_name = 'div';
    }

    return sprintf(
        '<%1$s%2$s>%3$s</%1$s>',
        esc_attr($tag_name),
        $attrs,
        $content
    );
}
