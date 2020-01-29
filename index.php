<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- <script src="js/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
    <script src="js/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- Insert after js -->
    <script type="text/javascript" src="js/sd-js.js"></script>
    <link rel="stylesheet" type="text/css" href="css/sd-js.css">
  </head>
  <body>
  	<div class="container">
	  	<form method="post" action="upload/php-upload.php" enctype="multipart/form-data" id="sd-js-files-form">
	  		<div class="form-group">
		    	<input type="file" class="form-control-file" id="sd-js-files" multiple="" name="files" onchange="check_files($(this))">
		  	</div>
		  	<div class="form-group">
		    	<button type="button" class="btn btn-xs btn-success sd-js-btn-upload-all" onclick="start_all()">Upload All</button>
		    	<button type="button" class="btn btn-xs btn-danger sd-js-btn-delete-all" onclick="delete_all()">Delete All</button>
		    	<button type="button" class="btn btn-xs btn-danger sd-js-btn-stop-all" onclick="stop_all()">Stop All</button>
		    	<button type="button" class="btn btn-xs btn-warning sd-js-btn-restart-all" onclick="restart_all()" style="display: none;">Resume</button>
		  	</div>
	  	</form>
		<div class="row" id="sd-file-contents">
		  	<div class="col-md-3">
	            <div class="upload_indv_photos">
	              <div class="upload_indv_img">
	                <img src="sd-files/IMG_0388.JPG" />
	                <div class="upload_indv_on_img">
	                  <div class="upload_indv_ph_size">
	                    <span>625KB</span>
	                  </div>
	                  <div class="upload_indv_delete">
	                    <div class="upload_inv_del_icon"><a href="javascript:void(0);"><i class="fa fa-trash-o"></i></a></div>
	                  </div>
	                </div>
	                <div class="upload_indv_prog">
	                  <div class="progress"><div class="progress-bar" id="sd-js-progress_0" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:20%">20%</div></div>
	                </div>
	              </div>
	              <div class="upload_indv_title">
	                <div class="upload_indv_head">
	                  <h4>banner_img.jpg</h4>
	                </div>
	              </div>
	            </div>
	        </div>
	        <div class="col-md-3">
	            <div class="upload_indv_photos">
	              <div class="upload_indv_img">
	                <img src="sd-files/IMG_0388.JPG" />
	                <div class="upload_indv_on_img">
	                  <div class="upload_indv_ph_size">
	                    <span>625KB</span>
	                  </div>
	                  <div class="upload_indv_delete">
	                    <div class="upload_inv_del_icon"><a href="javascript:void(0);"><i class="fa fa-trash-o"></i></a></div>
	                  </div>
	                </div>
	                <div class="upload_indv_prog">
	                  <div class="progress"><div class="progress-bar" id="sd-js-progress_0" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:20%">20%</div></div>
	                  
	                </div>
	              </div>
	              <div class="upload_indv_title">
	                <div class="upload_indv_head">
	                  <h4>banner_img.jpg</h4>
	                </div>
	              </div>
	            </div>
	        </div>
		</div>
  	</div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    
  </body>
</html>