video = document.getElementById("video")

      navigator.webkitGetUserMedia("video",
          function(stream) {
            video.src = window.webkitURL.createObjectURL(stream)
          },
          function(err) {
            console.log("Unable to get video stream!")
          }
      )