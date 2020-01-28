
var file_list = [];
var _brk = false;
var _is_upload = false;
var _is_stop   = false;
var _is_restart= false;
var _is_delete = false;
var _max_allowed_file = 200;
var _allowed_file_type = [
							'image/jpeg',
							'image/png',
							'image/jpg',
							'image/jpeg',
							'image/gif',
							'video/mp4'
						];

var _ctup;  

function check_files(This){

	$('#sd-file-contents').html('');

	window.file_list.length == 0 ? window.file_list = $("#sd-js-files").get(0).files : null; 

	if(window.file_list.length <= window._max_allowed_file){

		var _list = [];

	   	$.each(window.file_list,function(i,el){

		    var file = window.file_list[i];
		    var name = file.name;
		    var size = file.size;
		    var type = file.type;
		    var err  = "";
		    if(jQuery.inArray(type,_allowed_file_type) !== -1){
		    	_list.push(window.file_list[i]);
		    }else{
		    	err = "Not Allowed file";
		    }
		    show_images(window.file_list[i],i,err);
	   	});

	   	window.file_list = _list;

	}else{
		alert("Maximum allowed files is "+ _max_allowed_file);
		window.file_list = [];
		$("#sd-js-files").val('');
	}
}

function show_images(file,i,err = ""){
	var reader = new FileReader();
	reader.readAsDataURL(file);
    reader.onload = function(e) {
      //$('#blah').attr('src', e.target.result);

      var __file_type = file.type.split('/')[0];

      var __size = file.size / 1024;

      var __upld = file.hasOwnProperty('is_uploaded') ? file.is_uploaded : false;

      var __info = '<tr id="sd-js-section_'+i+'">';

      			if(__file_type == 'image'){

      				__info += '<td><img id="sd-img-show_'+i+'"src="" class="sd-js-img-preview rounded float-left" alt="'+name+'"></td>';
      			}

      			else if(__file_type == 'video'){

      				__info += '<td><video controls id="sd-img-show_'+i+'"src="" class="sd-js-img-preview rounded float-left" alt="'+name+'"></td>';
      			}

      			else{

      				__info += '<td><img src="images/file.jpg" class="sd-js-img-preview"></td>';
      			}
      					
      		  __info += '<td>'+file.name+'</td>'+
      					'<td>'+__size.toFixed(2)+' kb</td>';

      					if(__upld == false){

	      					__info += '<td>'+
				      						'<div class="progress">'+
										    	'<div class="progress-bar" id="sd-js-progress_'+i+'" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">0%</div>'+
				                    		'</div>'+
				                    		'<span class="sd-img-err_'+i+' sd-img-err">'+err+'</span>'+
				                    		'<span class="sd-img-spd_'+i+' sd-img-spd"></span>'+
				                    	'</td>'+ (err == "" ? 
				                    	//'<td><button class="btn btn-xs btn-primary upload-btn" onclick="upload_file('+i+')">Upload</button></td>' : "<td></td>" )+
				                    	'<td></td>' : "<td></td>" )+
				                    	'<td><button class="btn btn-xs btn-danger delete-btn" onclick="remove_file('+i+')">Delete</button></td>';
      					}else{
      						__info += '<td><span style="color:green;">Upload Complete</span></td>'+
	  						'<td></td>'+
      						'<td><button class="btn btn-xs btn-danger delete-btn" onclick="remove_file('+i+')">Delete</button></td>';
      					}

      				__info += '</tr>';


      $('#sd-file-contents').append(__info);
      if(__file_type == 'image' || __file_type == 'video'){
      	$('#sd-img-show_'+i).attr('src', e.target.result);
      }
    }
}

function upload_file(j,module= function(){}){

	if(window.file_list.hasOwnProperty(j) && window.file_list.length <= window._max_allowed_file){

		var url    = $('#sd-js-files-form').attr('action');
		var method = $('#sd-js-files-form').attr('method');

		if(url!="" && method!=""){

			/* Is flagged file */

			// if(window.file_list[j].hasOwnProperty('is_uploaded')){

			// }else{

				var formData = new FormData();

				formData.append('files',window.file_list[j]);
				formData.append('_token',$('input[name="_token"]').val());

				window._ctup = $.ajax({
					//"async": false,
					"crossDomain": true,
					"url": url,
					"method": method,
					"processData": false,
					"contentType": false,
					"mimeType": "multipart/form-data",
					"data": formData,
					xhr: function() {
					    var xhr 		= new window.XMLHttpRequest();
					    var started_at 	= new Date();
					    xhr.upload.addEventListener("progress", function(evt) {
					        
					        $('#sd-js-section_'+j).find('.upload-btn').attr('disabled','disabled');

					        if (evt.lengthComputable) {
					            var progress = (evt.loaded / evt.total) * 100;
					            //Do something with upload progress here
								$('#sd-js-progress_'+j).css('width',progress.toFixed(0)+'%');
					            $('#sd-js-progress_'+j).text(progress.toFixed(1)+'%');
					            //Connection Speed
					            var seconds_elapsed   = ( new Date().getTime() - started_at.getTime() )/1000;
				                var bytes_per_second  = seconds_elapsed ? evt.loaded / seconds_elapsed : 0 ;
				                var Kbytes_per_second = bytes_per_second / 1000 ;
				                var remaining_bytes   = evt.total - evt.loaded;
				                var seconds_remaining = seconds_elapsed ? remaining_bytes / bytes_per_second : 'calculating' ;
				                //End Connection Speed
					            window.file_list[j]["is_uploaded"] = true;
					            if(progress.toFixed(0) == 100) {
					                $('#sd-js-progress_'+j).css('background-color','green');
					                $('#sd-js-section_'+j).find('.upload-btn').attr('disabled','disabled');
					                module(true);
					                $('.sd-img-spd_'+j).html('');
					            }else{
				                	$('.sd-img-spd_'+j).html('S/p : '+ Kbytes_per_second.toFixed(1) + 'kb/s R/m : '+ (remaining_bytes/1024).toFixed(1) + 'Kbs C/p : ' + seconds_remaining.toFixed(1) + 'Sec');
					            }
					            window.file_list[j]["is_uploaded_size"] = evt.loaded;
					        }

					        //console.log(evt);

					   }, false);
					   return xhr;
					},
					success : function(response){
						var __res = typeof response != "object" && response != "" ? JSON.parse(response) : [];

						if(__res.status){

							window.file_list[j]["upload_info"] = __res.data;
							$('.sd-img-err_'+j).html(__res.message);
							$('.sd-img-err_'+j).css('color','green');

						}else{

							window.file_list[j]['is_uploaded'] = false;
							$('.sd-img-err_'+j).html(__res.message);
							$('.sd-img-err_'+j).css('color','red');
							$('#sd-js-progress_'+j).css('width','0%');
					        $('#sd-js-progress_'+j).text('0%');
					        $('#sd-js-progress_'+j).css('background-color','blue');
					        $('#sd-js-section_'+j).find('.upload-btn').removeAttr('disabled');
						}
					},
					fail: function(xhr, textStatus, errorThrown){
						window.file_list[j]['is_uploaded'] = false;
						$('.sd-img-err_'+j).html(errorThrown);
						console.log(errorThrown);
					}
				});
			//}

		}else{
			$('.sd-img-err_'+j).html("Form method & action is needed.");
		}

	}else{

		$('.sd-img-err_'+j).html("File Cannot Upload");
	}
}

function remove_file(j){

	var __list = [];
  
    $.each(window.file_list,function(i,el){	
    	if(j!=i){
    		__list.push(window.file_list[i]);
    	}
    });

	window.file_list = __list;

	if(__list.length <= 0){
		$('#sd-js-files').val('');
	}

	check_files();
}

function upload_all(i = 0){
	if(window.file_list.length && window._brk == false){
		if(i < window.file_list.length ){

			var __upld = window.file_list[i].hasOwnProperty('is_uploaded') ? window.file_list[i].is_uploaded : false;

			if(__upld == false){

				upload_file(i,function(data){
					if(data == true){
						i++;
						upload_all(i);
					}
				});
			}else{
				i++;
				upload_all(i);
			}
		}
	}
}

function start_all(){
	if(window.file_list.length){
		$('.sd-js-btn-upload-all').hide();
		window._brk = false;
		upload_all();
	}
}

function delete_all(){
	window.file_list = [];
	$('#sd-js-files').val('');
	check_files();
	window._brk = true;
	window._ctup != undefined ?  window._ctup.abort():null;
	$('.sd-js-btn-upload-all').show();
}

function stop_all(){
	if(window.file_list.length){
		window._brk = true;
		$('.sd-js-btn-stop-all').hide();
		$('.sd-js-btn-restart-all').show();
		window._ctup != undefined ?  window._ctup.abort():null;
		//$('.sd-js-btn-upload-all').show();
	}
}

function restart_all(){
	if(window.file_list.length){
		window._brk = false;
		upload_all();
		$('.sd-js-btn-stop-all').show();
		$('.sd-js-btn-restart-all').hide();
		$('.sd-js-btn-upload-all').hide();
	}
}
