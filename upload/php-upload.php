<?php

$_ret = [
			'status' => false,
			'message'=> 'Upload failed',
			'data'	 => []
		];

$allowed = array('jpg', 'jpeg','png');

//var_dump(is_dir('./../sd-files'));die;

if(isset($_FILES['files']) && $_FILES['files']['error'] == 0){

    $extension = pathinfo($_FILES['files']['name'], PATHINFO_EXTENSION);

    if(!in_array(strtolower($extension), $allowed)){

       $_ret['message'] = "File Format Not Allowed";

    }else if(move_uploaded_file($_FILES['files']['tmp_name'], "./../sd-files/".$_FILES['files']['name'])){
       
       $_ret['message'] = "File Uploaded success.";
       $_ret['status']  = true;
    }
}

echo json_encode($_ret);

?>