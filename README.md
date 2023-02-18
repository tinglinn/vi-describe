# vi-describe
TreeHacks 2023





SUPABASE:
SQL TABLES:



BUCKETS:

There's a bucket called image-pngs, which will store all the uploaded images.
For each image, we can get the link with an API CALL https://supabase.com/docs/reference/javascript/storage-from-createsignedurl
(same thing as right clicking the file in supabase). We will store the image URL in the image-URL.
WARNING: Note that URLs are only valid for a specified finite time, 
so make sure that the database either deletes the image or entry in IMAGE_INFO table.


