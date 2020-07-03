# DB設計

## Chatspace 要件定義（未完成）
|ChatSpace機能|機能詳細|エンティティ|リレーション|
|-------------|--------|------------|------------|
|アカウント新規登録機能|Name,email,passwordを入力して新規アカウント作成|users||
|アカウント編集機能|Nameとemailの変更可能|users||
|ユーザーログイン機能|email,passwordで登録されているアカウントにログイン|users||
|ユーザーログアウト機能|ログインしているアカウントからログアウト|users||
|新規チャットグループ作成機能|グループ名とメンバーを追加して新規チャットグループ作成|groups||
|チャットグループ編集機能|表示中のチャットグループのグループ名変更、メンバーの追加削除|groups||
|チャットグループ切替機能|表示するチャットグループの切替|groups||
|テキスト投稿機能|テキストメッセージを投稿|messages||
|画像投稿機能|画像を投稿|messages||
|投稿内容表示機能|投稿された内容を表示|messages||


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many : user_groups
- has_many : messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many : user_groups
- has_many : messages

## user_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to : group
- belongs_to : user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

### Association
- belongs_to : group
- belongs_to : user
