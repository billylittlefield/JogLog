json.teams @user.teams do |team|
  json.id team.id
  json.name team.name
end

json.memberships @user.memberships do |membership|
  json.merge! membership
end

json.followees @user.followees do |followee|
  json.merge! followee
end
