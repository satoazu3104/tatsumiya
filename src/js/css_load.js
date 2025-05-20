function CssLoad(urls) {
  return new Promise(resolve => {
    setTimeout(() => {
      let loadedCount = 0; // ロードされた CSS ファイルの数を追跡

      urls.forEach((url) => {
        var myCSS = document.createElement("link");
        myCSS.rel = "stylesheet";
        myCSS.href = url;
        myCSS.media = 'print';
        myCSS.addEventListener('load', () => {
          myCSS.media = 'all';
          loadedCount++; // CSS ファイルがロードされるたびにカウントアップ
          if (loadedCount === urls.length) {
            resolve('fin'); // すべての CSS ファイルがロードされたら resolve
          }
        });
        document.head.appendChild(myCSS); // より簡単で確実な方法で head に追加
      });

    }, 10);
  });
}

window.addEventListener('load', async() => {
  await CssLoad([tmp_path.temp_uri + '/font/font.css']);
  // ここで CSS ロード後に実行したい関数を呼び出す
  myFunction(); // 例: CSS ロード後に実行したい関数
});

function myFunction() {
  const sectionLoad = document.getElementsByClassName('l-section__load')[0];
  if(sectionLoad) {
    sectionLoad.style.opacity = 0
  }
  
  const fvLogo = document.getElementsByClassName('c-fv__img--logo__picture')[0];
  if(fvLogo) {
    fvLogo.classList.add('is-active');
  }
}