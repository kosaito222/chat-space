$(function(){
  function buildHTML(message) {
    if (message.image) {
      // messageに画像が含まれていた場合の処理
      let html = `
      <div class="message-field">
        <div class="message-field__member-box">
          <div class="member-name">${message.user_name}</div>
          <div class="timestamp">${message.created_at}</div>
        </div>
        <p class="message-field__member-message">${message.content}</p>
        <img class="Message__image" src="${message.image}">
      </div>
      `
      return html
    } else {
      // messageに画像が含まれていない場合の処理
      let html = `
      <div class="message-field">
        <div class="message-field__member-box">
          <div class="member-name">${message.user_name}</div>
          <div class="timestamp">${message.created_at}</div>
        </div>
        <p class="message-field__member-message">${message.content}</p>
      </div>
      `
      return html
    }
  }

  $('.form').on('submit', function(e) {
    e.preventDefault();
    console.log(this);
    let formData = new FormData(this);
    let url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html).animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});;
      $('form')[0].reset();
      $('.form__btn').prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    });
  });
});