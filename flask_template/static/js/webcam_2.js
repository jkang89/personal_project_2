

video = document.getElementById("video");
      navigator.webkitGetUserMedia({video:true, audio:true},
          function(stream) {
            video.src = window.webkitURL.createObjectURL(stream);
          }
      );