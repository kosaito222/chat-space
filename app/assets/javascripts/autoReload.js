$(function(){
  function buildHTML(message){
    if ( message.image ) {
      // messageに画像が含まれていた場合の処理
      let html =
        `<div class="message-field" data-message-id=${message.id}>
          <div class="message-field__member-box">
            <div class="member-name">
              ${message.user_name}
            </div>
            <div class="timestamp">
              ${message.created_at}
            </div>
          </div>
          <p class="message-field__member-message">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
        `
      return html;
    } else {
      // messageに画像が含まれていない場合の処理
      let html = `
      <div class="message-field" data-message-id=${message.id}>
        <div class="message-field__member-box">
          <div class="member-name">${message.user_name}</div>
          <div class="timestamp">${message.created_at}</div>
        </div>
        <p class="message-field__member-message">${message.content}</p>
      </div>
      `
      return html;
    };
  }

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.message-field:last').data("message-id") || 0;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});