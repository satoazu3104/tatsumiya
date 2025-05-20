<?php

function voice_shortcode($atts)
{
  // デフォルトの投稿数を設定
  $atts = shortcode_atts(array(
    'count' => 4,
  ), $atts, 'voice');

  // クエリの作成
  $args = array(
    'post_type' => 'voice',
    'posts_per_page' => $atts['count'],
  );

  // カスタムフィールドの取得
  $voices = new WP_Query($args);
  $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage-voice.webp';

  // 投稿ループ
  $output = '<ul class="l-list__voice">';
  if ($voices->have_posts()) {
    $index = 0;
    while ($voices->have_posts()) {
      $voices->the_post();
      $index++;
      // $name = get_post_meta(get_the_ID(), 'name', true);
      // $review = get_post_meta(get_the_ID(), 'review', true);
      // $area = get_post_meta(get_the_ID(), 'area', true);
      // $comment = get_post_meta(get_the_ID(), 'comment', true);
      // $before_image = get_post_meta(get_the_ID(), 'before_image', true);
      // $after_image = get_post_meta(get_the_ID(), 'after_image', true);
      $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-img__voice'));
      // if ($review > 5) {
      //   $review = 5;
      // }
      $formatted_date = get_the_date('Y/m/d'); // フォーマットした投稿日を取得
      $categories = get_terms(array(
        'taxonomy' => 'voice-cat',
        'hide_empty' => true,
      ));
      if (empty($thumbnail)) {
        $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-img__voice" />';
      }

      ob_start(); ?>
      <li class="c-item__voice">

        <div class="l-content__voice">


          <div class="c-item__voice-header">
            <img class="p-img__user" src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/voice-user-' . $index . '.webp'; ?>" alt="user">
            <div class="l-content__med-s">
              <?php if ($categories[0]->name): ?>
                <div class="c-card__tag">
                  <p class="c-text__min c-text--white c-text--bold">
                    <?php echo $categories[0]->name ?? 'その他'; ?>
                  </p>
                </div>
              <?php endif; ?>
              <h4 class="c-text__title c-text--bold c-text--jp c-text__line-cut--1"><?php echo get_the_title(); ?></h4>
            </div>
          </div>

          <div class="c-text__normal p-post__content">
            <?php echo the_content(); ?>
          </div>
        </div>
      </li>
<?php
      $output .= ob_get_clean();
    }
  }
  $output .= '</ul>';
  wp_reset_postdata();
  return $output;
}
add_shortcode('voice', 'voice_shortcode');
