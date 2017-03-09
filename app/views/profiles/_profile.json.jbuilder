json.extract! profile, :id, :user, :first_name, :last_name, :about, :created_at, :updated_at
json.url profile_url(profile, format: :json)
