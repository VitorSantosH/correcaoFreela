
/////////////////////////////////
 


jQuery(document).ready(function() {

	
	var password = 111111;
  jQuery('.mm-number-input-item:nth-child(1) input').focus();
 
	jQuery('.mm-number-input-item').each(function(index) {
		var item, id, input;
		item = jQuery(this);
		id = index + 1;
		input = item.children('input');
		item.addClass('mm-number-input-item-'+id);
		input.data('id',id);
	});

	jQuery('.mm-number-input-item input').on('keyup', function(e) {

    	var item, value, id, count, pass = [];
		item = jQuery(this);
		value = item.val();
		id = item.data('id');
		count = jQuery('.mm-number-input-item').length;

		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			jQuery('.mm-number-input-item-'+(id)+' input').val('');
		}
		else {
			if(!value) {
				jQuery('.mm-number-input-item-'+id+' input').focus().select();
			}
			else {
				if(id < count) {
					jQuery('.mm-number-input-item-'+(id+1)+' input').focus().select();
				}
				else {
					//
				}
			}

			jQuery('.mm-number-input-item input').each(function() {
				var x;
				x = jQuery(this);
				pass.push(x.val());
			});

			var number = pass.join("");
		}

		if(id === count) {
			if(parseInt(number) === password) {
				jQuery('.mm-number-input-container').addClass('bounceOutUp');
				setTimeout(function() {
					jQuery('.mm-number-input-container').removeClass('bounceOutUp').addClass('bounceInDown');
					setTimeout(function() {
						jQuery('.mm-number-input-container').removeClass('bounceInDown');
						jQuery('.mm-number-input-item input').val('');
						jQuery('.mm-number-input-item-1 input').focus();
					},500);
				},1500);
			}
			else {
				jQuery('.mm-number-input-item input').addClass('shake');
				setTimeout(function() {
					jQuery('.mm-number-input-item input').removeClass('shake');
					jQuery('.mm-number-input-item input').val('');
					jQuery('.mm-number-input-item-1 input').focus();
				},500);
			}
		}
		else {
			//
		}

	});

});
var swiper = new Swiper(".mySwiper", {
	slidesPerView: 4,
	spaceBetween: 30,
	slidesPerGroup: 1,
	loop: true,
	loopFillGroupWithBlank: true,
	pagination: {
	  clickable: true,
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
  });

  /*
Please try with devices with camera!
*/

/*
Reference: 
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en#stop-ended-and-active
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
*/

// reference to the current media stream
var mediaStream = null;

// Prefer camera resolution nearest to 1280x720.
var constraints = { 
  audio: false, 
  video: { 
    width: {ideal: 640}, 
    height: {ideal: 480},
    facingMode: "environment"
  } 
}; 

async function getMediaStream(constraints) {
  try {
    mediaStream =  await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById('cam');    
    video.srcObject = mediaStream;
    video.onloadedmetadata = (event) => {
      video.play();
    };
  } catch (err)  {    
    console.error(err.message);   
  }
};

async function switchCamera(cameraMode) {  
  try {
    // stop the current video stream
    if (mediaStream != null && mediaStream.active) {
      var tracks = mediaStream.getVideoTracks();
      tracks.forEach(track => {
        track.stop();
      })      
    }
    
    // set the video source to null
    document.getElementById('cam').srcObject = null;
    
    // change "facingMode"
    constraints.video.facingMode = cameraMode;
    
    // get new media stream
    await getMediaStream(constraints);
  } catch (err)  {    
    console.error(err.message); 
    alert(err.message);
  }
}

function takePicture() {  
  let canvas = document.getElementById('canvas');
  let video = document.getElementById('cam');
  let photo = document.getElementById('photo');  
  let context = canvas.getContext('2d');
  
  const height = video.videoHeight;
  const width = video.videoWidth;
  
  if (width && height) {    
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);    
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearphoto();
  }
}

function clearPhoto() {
  let canvas = document.getElementById('canvas');
  let photo = document.getElementById('photo');
  let context = canvas.getContext('2d');
  
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

document.getElementById('switchFrontBtn').onclick = (event) => {
  switchCamera("user");
}

document.getElementById('switchBackBtn').onclick = (event) => {  
  switchCamera("environment");
}

document.getElementById('snapBtn').onclick = (event) => {  
  takePicture();
  event.preventDefault();
}

clearPhoto();

////////////////////////////
