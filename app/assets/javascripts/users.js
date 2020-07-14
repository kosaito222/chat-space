$(function(){

  function  addUser(name, id){
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value=${id} />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
  $('.ChatMembers').append(html)
}

  let search_list = $("#UserSearchResult");

  function appendUser(user){
    let html = `
      <div class="ChatMember clearfix">
        <p class="ChatMember__name">${user.name}</p>
        <div class="ChatMember__add ChatMember__button" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
      </div>
    `
    search_list.append(html);
  }

  function appendErrMsgToHTML() {
    let html = `
      <div class="ChatMember clearfix">
        <p class="ChatMember__name">ユーザーが見つかりません</p>
      </div>
      `
    search_list.append(html);
  }
  
  // インクリメンタルサーチ
  $('.SettingGroupForm__input').on('keyup', function(){
    let input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      search_list.empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  // チャットメンバ-追加
  $('#UserSearchResult').on("click", '.ChatMember__button',function() {
    let userName = $(this).attr("data-user-name");
    let userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addUser(userName, userId);
  });

  // チャットメンバ-削除
  $('.ChatMembers').on("click", '.ChatMember__button',function() {
    $(this).parent().remove();
  });

});