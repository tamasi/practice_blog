json.extract! @comment, :id, :user_id, :article_id, :body, :created_at, :updated_at
json.user do
	json.email @comment.user.email
	json.full_name @comment.user.profile.full_name
end