# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false, add_index|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many : user_groups
- has_many : messages
