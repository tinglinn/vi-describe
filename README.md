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


FUNCTION TO GET LATEST IMAGE:

const insertImageData = async () => {
        // Handle login logic here

        const { data, error } = await supabase
        .from('IMAGE_INFO')
        .insert(
            {image_id: 2, image_name: "IMG_FA1468EF1C2A-1.jpeg", url: "https://jdkwthcuizrwzcpulkex.supabase.co/storage/v1/object/sign/image-pngs/IMG_FA1468EF1C2A-1.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS1wbmdzL0lNR19GQTE0NjhFRjFDMkEtMS5qcGVnIiwiaWF0IjoxNjc2NzA5NDIzLCJleHAiOjE3MDgyNDU0MjN9.e8PnHP8soSMb_zkqPABpa_TcMd8Z2Et9V1WciPKYGUQ&t=2023-02-18T08%3A37%3A03.261Z", comment_ids: null, resolved: false, prompt: "Prompt"}
        )
    };

    const getLatestImage = async () => {
        const {data, error} = await supabase
        .rpc('test_sql_query');
        
        console.log(data, error)
    }
    
    
    SHIT SEAN WORKED ON THAT DOESNT WORK
    const { data, error } = await supabase
        .from('USERS_LIST')
        .select('password')
        .eq('username', email)
        //console.log(Object.keys(data))
        console.log(data)
        //console.log(typeof(data))
        if (Object.keys(data).length != 0) {
            //setEmailUsed(true);
            console.log(data.password)
            console.log(password_input)
            if (data.password != password_input) {
                //console.log("incorrect password!")
                
                setPasswordUsed(true);
            }
            else {
                navigation.navigate("Main", { userType });
            }
            
        }
