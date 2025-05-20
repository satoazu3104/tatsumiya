<?php 
/**
 * 
 */
class _Price
{
  public static $prices = [];

  public static function add_fields()
  {
    $post_id = '';
    // ポストIDを取得
    if(isset($_GET['post']) || isset($_POST['post_ID'])) {
      $post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;
    }

    // IDからスラッグの取得
    $post_name = get_post_field('post_name', $post_id);

    // スラッグがpriceの場合のみ表示
    if($post_name == 'price')
    {
      add_meta_box('price_setting', '料金表', ['_Price', 'insert_fields'], 'page', 'normal');
    }
  }

  public static function insert_fields()
  { 
    global $post;
    $prices = get_post_meta($post->ID, 'prices', true);
    ?>
    <ul class="p-price__lists l-row">
      <?php 
      if($prices)
      {
        foreach($prices as $index => $price) {
          array_push(self::$prices, $price);
          self::elm($index, $price);
        }
      }
      else
      {
        self::elm(0, []);
      }
      ?>
      <button class='c-button c-button--end js-button-price-category-add'>カテゴリーを追加</button>
    </ul>
  <?php }

  public static function elm($index, $price)
  {
    ?>
    <li class="l-grid p-price__lists__item js-price-category">
      <div class="l-grid--4 p-price__left">
        <button class="js-button-price-category-remove c-button__remove" data-state="category"></button>
        <input
          class=" c-text__m c-text--bold c-input__no js-price-input-category"
          name="prices[<?php echo $index; ?>][title]"
          type="text"
          placeholder="料金カテゴリー名を入力"
          value="<?php echo $price['title']; ?>">
      </div>
      <div class="l-grid--8 p-price__wrap--body" data-state="right">
        <?php
        console_log($price['body']);
        if($price['body']) {
          foreach($price['body'] as $index_body => $body)
          {
            self::list($index, $index_body, $body);
          }
        }
        else
        {
          self::list(0, 0, []);
        }
        ?>
        <button class='c-button c-button--end js-button-price-list-add'>リストを追加</button>
      </div>
    </li>
  <?php }

  public static function list($index, $index_body, $body)
  {
    $bold = $body['label']['bold']; // ラベル
    $sup = $body['label']['sup']; // 補足
    $value = $body['value']; // 料金
    ?>
    <div class="p-price__body js-price-list">
      <button class="js-button-price-list-remove c-button__remove"></button>
      <div class="p-price__body__label">
        <div>
          <input
            class="c-input__no c-text__normal c-text--bold js-price-input-list"
            name="prices[<?php echo $index; ?>][body][<?php echo $index_body; ?>][label][bold]"
            type="text"
            placeholder="料金メニューを入力"
            data-name="[label][bold]"
            value="<?php echo $bold ? $bold : ''; ?>">
        </div>
        <div>
          <textarea
            class="c-input__no c-input__no__textarea c-text__s c-text--gray c-text--bold js-price-input-list"
            style="color: #919191;"
            name="prices[<?php echo $index; ?>][body][<?php echo $index_body; ?>][label][sup]"
            placeholder="補足説明を入力"
            type="text"
            data-name="[label][sup]"
            value="<?php echo $sup ? $sup : ''; ?>"><?php echo $sup ? $sup : ''; ?></textarea>
        </div>
      </div>
      <div>
        <textarea
          class="c-input__no c-input__no__textarea c-text__normal js-price-input-list c-text--main"
          name="prices[<?php echo $index; ?>][body][<?php echo $index_body; ?>][value]"
          placeholder="料金を入力"
          type="text"
          data-name="[value]"
          value="<?php echo $value ? $value : ''; ?>"><?php echo $value ? $value : ''; ?></textarea>
      </div>
    </div>
  <?php }

  public static function save_fields($post_id)
  {
    if(!empty($_POST['prices']))
    {
      update_post_meta($post_id, 'prices', $_POST['prices']);
      //update_post_meta($post_id, 'prices', []);
    }
  }
}

add_action('admin_menu', ['_Price', 'add_fields']);
add_action('save_post', ['_Price', 'save_fields']);
?>
