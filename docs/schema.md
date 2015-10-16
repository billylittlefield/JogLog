# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## workouts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | string    | not null
activity    | string    | not null
date        | datetime  | not null
distance    | float     |
duration    | time      |
notes       | text      |

## teams
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
admin_id    | integer   | not null, foreign key (references users), indexed
name        | string    | not null

## memberships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
member_id   | integer   | not null, foreign key (references users), indexed
team_id     | integer   | not null, foreign key (references teams), indexed

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foriegn key (references users), indexed
followee_id | integer   | not null, foreign key (references users), indexed

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
workout_id  | integer   | not null, foreign_key (referneces workouts), indexed
author_id   | integer   | not null, foreign_key (references users), indexed
