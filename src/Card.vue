<template>
    <div>
        <div>
            <input type="file" accept="image/*" @change="onImageSelect">
            <button @click="imageUpload">Upload</button>
            <button @click="imageLoadFromLocalS">Load image</button>
            <button @click="removeImage">Remove image</button>
        </div>
        <div id="preview">
          <img v-show="url" :src="url" id="uploaded-img" /> 
        </div>
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            url: null,
            image : null,
            imageName : null
        }
    },
    methods : {
        convertImgToCanvas() {
            console.log()
            let image = document.getElementById("uploaded-img")
         
            let canvas = document.createElement("canvas")

            canvas.width = image.width;
            canvas.height = image.height;
            
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);

            return canvas.toDataURL()
           
        },   

        imageUpload(){
            let converted = this.convertImgToCanvas()
            console.log(converted);
              // Save image into localStorage
            try {
                localStorage.setItem( this.imageName, converted);
            }
            catch (e) {
                console.log("Storage failed: " + e);
            }

            let preview = document.getElementById("uploaded-img")
            let dataURL = localStorage.getItem(this.imageName);
            preview.setAttribute('src', dataURL)
        
          


        },

        onImageSelect(event){
            let file = event.target.files[0] || event.dataTransfer.files[0]
            this.url = URL.createObjectURL(file);
            this.image = file;
            this.imageName = file.name;
            console.log(this.image)
        },

        imageLoadFromLocalS() {
            let dataURL = localStorage.getItem(this.imageName);
            let img = new Image;
            img.src = dataURL;
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            document.getElementById("uploaded-img").appendChild(img);
        },

        removeImage() {
            localStorage.removeItem(this.imageName);
            this.image = null;
            this.url = null;
        }
    }
}
</script>

<style>
#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 400px;
}
</style>
