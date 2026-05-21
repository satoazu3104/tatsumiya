<?php

// 投稿一覧に「翻訳」列を追加
add_filter('manage_post_posts_columns', function ($columns) {
    $columns['language'] = '言語';
    return $columns;
});
add_filter('manage_post_posts_columns', function ($columns) {
    $columns['translation'] = '翻訳';
    return $columns;
});

// 翻訳列の中身
add_action('manage_post_posts_custom_column', function ($column, $post_id) {
    if ($column !== 'translation') return;

    $en_id = get_post_meta($post_id, '_translation_en', true);
    $ja_id = get_post_meta($post_id, '_translation_ja', true);

    if ($en_id) {
        echo '<a class="button" href="' . esc_url(get_edit_post_link($en_id)) . '">英語版を編集</a>';
    } elseif ($ja_id) {
        echo '<p><a class="button" href="' . esc_url(get_edit_post_link($ja_id)) . '">日本語版を編集</a></p>';
    } else {
        $url = wp_nonce_url(
            admin_url('admin-post.php?action=create_translation_en&post_id=' . $post_id),
            'create_translation_en_' . $post_id
        );

        echo '<a class="button button-primary" href="' . esc_url($url) . '">英語版を作成</a>';
    }
}, 10, 2);

//　言語列の中身
add_action('manage_post_posts_custom_column', function ($column, $post_id) {
    if ($column !== 'language') return;

    $language = get_post_meta($post_id, '_language', true);

    if ($language === 'en') {
        echo '英語';
    } elseif ($language === 'ja') {
        echo '日本語';
    } else {
        echo '未設定';
    }
}, 10, 2);

// 英語版作成処理
add_action('admin_post_create_translation_en', function () {
    $post_id = isset($_GET['post_id']) ? intval($_GET['post_id']) : 0;

    if (!$post_id || !current_user_can('edit_post', $post_id)) {
        wp_die('権限がありません。');
    }

    check_admin_referer('create_translation_en_' . $post_id);

    $original = get_post($post_id);
    if (!$original) {
        wp_die('投稿が見つかりません。');
    }

    // すでに英語版がある場合は編集画面へ
    $existing_en_id = get_post_meta($post_id, '_translation_en', true);
    if ($existing_en_id) {
        wp_redirect(get_edit_post_link($existing_en_id, 'redirect'));
        exit;
    }

    // 本文ブロックをコピーして下書き作成
    $en_id = wp_insert_post([
        'post_type'    => $original->post_type,
        'post_status'  => 'draft',
        'post_title'   => $original->post_title . ' English',
        'post_content' => $original->post_content,
        'post_author'  => get_current_user_id(),
    ]);

    if (is_wp_error($en_id)) {
        wp_die('英語版の作成に失敗しました。');
    }

    // 相互に紐づけ
    update_post_meta($post_id, '_translation_en', $en_id);
    update_post_meta($en_id, '_translation_ja', $post_id);

    update_post_meta($post_id, '_language', 'ja');
    update_post_meta($en_id, '_language', 'en');

    wp_redirect(get_edit_post_link($en_id, 'redirect'));
    exit;
});

add_action('add_meta_boxes', function () {
    add_meta_box(
        'translation_box',
        '翻訳ページ',
        'render_translation_box',
        'post',
        'side',
        'high'
    );
});

function render_translation_box($post)
{
    $en_id = get_post_meta($post->ID, '_translation_en', true);
    $ja_id = get_post_meta($post->ID, '_translation_ja', true);

    if ($en_id) {
        echo '<p><a class="button button-primary" href="' . esc_url(get_edit_post_link($en_id)) . '">英語版を編集</a></p>';
    } elseif ($ja_id) {
        echo '<p><a class="button" href="' . esc_url(get_edit_post_link($ja_id)) . '">日本語版を編集</a></p>';
    } else {
        $url = wp_nonce_url(
            admin_url('admin-post.php?action=create_translation_en&post_id=' . $post->ID),
            'create_translation_en_' . $post->ID
        );

        echo '<p><a class="button button-primary" href="' . esc_url($url) . '">英語版を作成</a></p>';
    }
}

add_action('before_delete_post', function ($post_id) {

    if (get_post_type($post_id) !== 'post') {
        return;
    }

    $en_id = get_post_meta($post_id, '_translation_en', true);
    $ja_id = get_post_meta($post_id, '_translation_ja', true);

    // 日本語投稿を削除した場合：英語側の _translation_ja を削除
    if ($en_id && get_post($en_id)) {
        delete_post_meta($en_id, '_translation_ja');
    }

    // 英語投稿を削除した場合：日本語側の _translation_en を削除
    if ($ja_id && get_post($ja_id)) {
        delete_post_meta($ja_id, '_translation_en');
    }

    // 自分自身のメタも削除
    delete_post_meta($post_id, '_translation_en');
    delete_post_meta($post_id, '_translation_ja');
    delete_post_meta($post_id, '_language');
});
