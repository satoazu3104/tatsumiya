<?php
$formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得

$gallery_images_ids = get_post_meta(get_the_ID(), 'gallery_images_ids', true);
$work_points = get_post_meta(get_the_ID(), 'work_points', true);
$work_region = get_post_meta(get_the_ID(), 'work_region', true);
$gallery_images_ids = explode(',', $gallery_images_ids);
$image_url = wp_get_attachment_url($gallery_images_ids[0]);

$thumbnail = '<img src="' . $image_url . '" alt="media" class="p-post__img--thumb" />';

if (empty($thumbnail)) {
  $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-post__img--thumb" />';
}
?>

<div class="wp-block-portart-wrapper">
  <div id="" class="l-page__wrap--head"=""="">
    <figure class="wp-block-image size-large l-page__img--head">
      <img decoding="async" loading="lazy" src="<?php echo get_template_directory_uri() . '/dist/assets/images/head/works.webp'; ?>" class="wp-image-227" alt="media" </figure>
      <div class="wp-block-portart-wrapper">
        <div id="" class="l-page__wrap--head__text"=""="">
          <div class="wp-block-portart-title">
            <div class="p-title__wrap--center p-title__wrap" id="">
              <div class="p-title__wrap--en">
                <div class="p-title__img--icon animation active"></div>
                <h3 class="c-text__section-title c-text--en c-text--white animation active">WORKS</h3>
              </div>
              <p class="c-text__section-title-jp c-text--jp2 c-text--white c-text--bold animation c-text--back--text active">施工事例</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>

<div class="js-space" data-space-pc="120" data-space-sp="80"></div>

<div class="l-row">
  <div class="p-width__fit">
    <h1 class="c-text__header-title c-text--bold c-text--back c-text--jp2"><?php echo get_the_title(); ?></h1>
  </div>
  <div class="js-space" data-space-pc="48" data-space-sp="32"></div>

  <!-- 画像ギャラリー-->
  <section class="splide">

    <!-- 矢印 -->
    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <img src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/icon-prev.webp'; ?>" alt="prev">
      </button>
      <button class="splide__arrow splide__arrow--next">
        <img src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/icon-next.webp'; ?>" alt="next">
      </button>
    </div>
    <!-- /矢印 -->

    <div class="splide__track">
      <ul class="splide__list">
        <?php
        foreach ($gallery_images_ids as $image_id) {
          $image_url = wp_get_attachment_url($image_id);
        ?>
          <li class="splide__slide">
            <img class="p-post__img" src="<?php echo $image_url; ?>" alt="media">
          </li>
        <?php
        }
        ?>
      </ul>
    </div>
  </section>
  <!-- /画像ギャラリー-->

  <div class="js-space" data-space-pc="80" data-space-sp="48"></div>

  <ul class="p-post__works__list">
    <li class="p-post__works__items">
      <p class="c-text__header-title c-text--white c-text--jp2">施工ポイント</p>
      <div class="p-post__works__items--inner">
        <p class="c-text__title-reg c-text--white"><?php echo $work_points; ?></p>
      </div>
    </li>
    <li class="p-post__works__items">
      <p class="c-text__header-title c-text--white c-text--jp2">施工情報</p>
      <div class="p-post__works__items--inner">
        <p class="c-text__title c-text--white">地域</p>
        <div class="js-space" data-space-pc="32" data-space-sp="24"></div>
        <p class="c-text__title-reg c-text--white"><?php echo $work_region; ?></p>
      </div>
    </li>
  </ul>

  <div class="js-space" data-space-pc="80" data-space-sp="48"></div>

  <?php if ($gallery_images_ids) : ?>
    <ul class="p-post__works__items--thumb">
      <?php
      foreach ($gallery_images_ids as $image_id) {
        $image_url = wp_get_attachment_url($image_id); ?>
        <li>
          <img class="p-post__img--thumb" src="<?php echo $image_url; ?>" alt="media">
        </li>
      <?php }
      ?>
    </ul>
  <?php endif; ?>

  <div class="js-space" data-space-pc="80" data-space-sp="48"></div>

  <a href="<?php echo site_url() . '/work'; ?>" class="c-button__wrap c-button__wrap--center">
    <div class="c-button">
      <p class="c-text--center c-text--black c-text__title">施工事例一覧に戻る</p>
    </div>
  </a>
  <div class="js-space" data-space-pc="160" data-space-sp="100"></div>

</div>
<div class="wp-block-portart-wrapper">
  <div id="" class="p-wrap__back--white"=""="">
    <div class="wp-block-portart-wrapper">
      <div id="" class="l-row"=""="">
        <div class="wp-block-portart-space js-space" data-space-pc="160" data-space-sp="100" style="height: 160px;"></div>

        <div class="wp-block-portart-wrapper">
          <div id="" class="p-wrap__button--tri"=""="">
            <div class="wp-block-portart-linkbutton"><a href="<?php echo site_url() . '/faq'; ?>" id="button-faq" class="c-button__wrap c-button__wrap--squ">
                <div class="c-button">
                  <p class="c-text--center c-text__bold">よくあるご質問</p>
                </div>
              </a></div>

            <div class="wp-block-portart-linkbutton"><a href="<?php echo site_url() . '/recruit'; ?>" id="button-rec" class="c-button__wrap c-button__wrap--squ">
                <div class="c-button">
                  <p class="c-text--center c-text__bold">採用情報</p>
                </div>
              </a></div>

            <div class="wp-block-portart-linkbutton"><a href="<?php echo site_url() . '/company'; ?>" id="button-company" class="c-button__wrap c-button__wrap--squ">
                <div class="c-button">
                  <p class="c-text--center c-text__bold">会社概要</p>
                </div>
              </a></div>
          </div>
        </div>

        <div class="wp-block-portart-space js-space" data-space-pc="160" data-space-sp="100" style="height: 160px;"></div>
      </div>
    </div>
  </div>
</div>