( function( blocks, element ) {
  var el = element.createElement;
 
  //インラインスタイル
  var blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
  };
 
  //registerBlockType でブロックを登録
  blocks.registerBlockType( 
    //ブロックの名前 （名前空間/ブロック名）
    'my-blocks/works-gallery', 
    //ブロックのプロパティ（動作を定義するオブジェクト）
    {
      title: 'gallery',
      icon: 'universal-access-alt',
      category: 'layout',
      //エディター内でのブロックの構造を記述する関数
      edit: function() {
        return el(
          'p',
          { style: blockStyle },
          '<div></div>'
        );
      },
      //ブロックがフロントエンドでどのように表示されるかを記述する関数
      save: function() {
        return el(
          'p',
          { style: blockStyle },
          '<div></div>'
        );
      },
    }
  );
}(
  window.wp.blocks,
  window.wp.element
) );
