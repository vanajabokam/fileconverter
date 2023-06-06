function convertImage() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    
    if (!file) {
      alert('Please select a file.');
      return;
    }
    
    if (file.type !== 'image/jpeg') {
      alert('Please select a JPEG image file.');
      return;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function(blob) {
          var downloadLink = document.getElementById('downloadLink');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = 'converted_image.png';
          downloadLink.style.display = 'inline';
        }, 'image/png');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  