<template>
    <div>
        <div>
            <input type="file" accept="image/*" @change="onImageSelect">
            <button @click="imageUpload">Upload</button>
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
    
    mounted () {
        if (localStorage.selectedImage) {
            let canvas = document.createElement("canvas");
            let image = new Image();
            image.src = localStorage.selectedImage;
            image.id = "loaded";
            let preview = document.getElementById("preview")
            preview.appendChild(image);
        }
        
    },
    
    methods : {
        convertImgToCanvas() {
            let image = document.getElementById("uploaded-img")
            let canvas = document.createElement("canvas");
            canvas.width = image.width
            canvas.height = image.height
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            console.log(canvas.toDataURL)
            return canvas.toDataURL() 
        },   

        imageUpload(){
            let converted = this.convertImgToCanvas()
            let img = document.getElementById('uploaded-img'); 

            let width = img.clientWidth;
            let height = img.clientHeight;
              // Save image into localStorage
            try {
                localStorage.setItem( "selectedImage", converted);
                localStorage.setItem("imgWidth", width);
                localStorage.setItem("imgHeight", height);
            }
            catch (e) {
                console.log("Storage failed: " + e);
            }
        },

        onImageSelect(event){
            let file = event.target.files[0] || event.dataTransfer.files[0]
            this.url = URL.createObjectURL(file);
            this.image = file;
            this.imageName = file.name;
            let loaded = document.getElementById("loaded");
            loaded.style.display = "none";
        },

        removeImage() {
            localStorage.removeItem(this.selectedImage);
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
