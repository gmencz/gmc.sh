UPDATE "User"
SET "profilePicture" = 'https://cdn.gmc.sh/profile-pictures/default_profile_picture.png'
WHERE "profilePicture" IS NULL;