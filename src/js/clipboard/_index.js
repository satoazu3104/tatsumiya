function Clipboard()
{
  var copyButton = document.getElementsByClassName("copy--button");

  if(!copyButton) return;
  Array.from(copyButton).forEach((button, index) => {

    // ボタンがクリックされたときの処理
    button.addEventListener("click", function () {
      // コピーするテキストを取得
      let textid = button.dataset.textid;
      var textToCopy = document.getElementById(textid).textContent;

      // テキストをクリップボードにコピーする
      navigator.clipboard.writeText(textToCopy).then(function () {
        // コピーが成功した場合の処理
        alert("テキストがクリップボードにコピーされました: ");
      }).catch(function (err) {
        // コピーが失敗した場合の処理
        console.error("テキストのコピーに失敗しました: ", err);
      });
    });
  })
}

Clipboard();