UPDATE "User"
SET "profilePicture" = 'https://gmcsh.blob.core.windows.net/profile-pictures/default_profile_picture.png'
WHERE "profilePicture" IS NULL;