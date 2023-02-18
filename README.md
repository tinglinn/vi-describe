# vi-describe
TreeHacks 2023


TODO:
change storing password in USERS_LIST table: store the hash of the password along with a randomly generated key. 


SUPABASE:
SQL TABLES:

USERS_LIST: [username: text, user_id: int8, password: text, usertype: text]
IMAGE_INFO: [image_id: int8, created_at: timestampz, png: text, comment_ids: text, resolved: bool, prompt: text]
COMMENTS: []

BUCKETS:

There's a bucket called image-pngs, which will store all the uploaded images.
For each image, we can get the link with an API CALL https://supabase.com/docs/reference/javascript/storage-from-createsignedurl
(same thing as right clicking the file in supabase). We will store the image URL in the image-URL.
WARNING: Note that URLs are only valid for a specified finite time, 
so make sure that the database either deletes the image or entry in IMAGE_INFO table.


