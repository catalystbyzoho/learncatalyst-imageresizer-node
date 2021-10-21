function triggerCircuit() {
    $.ajax({
        url: "/server/render_resized_images_function/triggerCircuit",
        type: "post",
        success: function (data) {
            console.log(data)
            alert('Started Image Processing');
        },
        error: function (error) {
            console.log(error);
            alert('Internal Server Error');
        }
    })
}

function getImages() {

    document.getElementById('right_part').style.visibility = "visible";
    document.getElementById('left_part').style.visibility = "visible";
    $.ajax({
        url: "/server/render_resized_images_function/getImageIds",
        type: "get",
        success: function (data) {
            document.getElementById('message').innerHTML = "";
            if (data.all.length != 0 && data.resized.length != 0) {
                document.getElementById('sample').src = "Processed.png";
                var actualImages = document.getElementById('actualImages');
                for (var i = 0; i < data.all.length; i++) {
                    if (data.all[i]) {
                        var imageContainer = document.createElement('div');
                        imageContainer.setAttribute("class", "mySlides fade");
                        imageContainer.style.display = 'none';
                        var image = document.createElement('img');
                        image.src = "/baas/v1/project/3296000000550149/folder/3296000000550192/file/" + data.all[i] + "/download?Environment=Development";
                        image.style.width = "100%";
                        imageContainer.appendChild(image);
                        actualImages.appendChild(imageContainer);
                    }
                }
                var a = document.createElement('a');
                a.className = "prev";
                a.href = "javascript:plusSlides(-1)";
                a.innerHTML = "&#10094;";
                actualImages.appendChild(a);
                var a = document.createElement('a');
                a.className = "next";
                a.href = "javascript:plusSlides(1)";
                a.innerHTML = "&#10095;";
                actualImages.appendChild(a);

                document.getElementById('samplez').src = "Processed.png";
                var resizedImages = document.getElementById('resizedImages');
                for (var i = 0; i < data.all.length; i++) {
                    if (data.resized[i]) {
                        var imageContainer = document.createElement('div');
                        imageContainer.setAttribute("class", "mySlidez fade");
                        imageContainer.style.display = 'none';
                        var image = document.createElement('img');
                        image.src = "/baas/v1/project/3296000000550149/folder/3296000000588147/file/" + data.resized[i] + "/download?Environment=Development";
                        image.style.width = "100%";
                        imageContainer.appendChild(image);
                        resizedImages.appendChild(imageContainer);
                    }
                }
                var a = document.createElement('a');
                a.className = "prev";
                a.href = "javascript:plusSlidez(-1)";
                a.innerHTML = "&#10094;";
                resizedImages.appendChild(a);
                var a = document.createElement('a');
                a.className = "next";
                a.href = "javascript:plusSlidez(1)";
                a.innerHTML = "&#10095;";
                resizedImages.appendChild(a);
            } else {
                document.getElementById('right_part').style.visibility = "hidden";
                document.getElementById('left_part').style.visibility = "hidden";
                document.getElementById('message').innerHTML = "Image Moderation still in Process. Please try again after sometime."
            }
        },
        error: function (error) {
            console.log(error);
            alert('Internal Server Error');
        }
    })
}