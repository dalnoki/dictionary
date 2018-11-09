<template>
    <div>
        <div>
            <input type="file" accept="image/*" @change="onImageSelect">
            <button @click="imageUpload">Upload</button>
            <button @click="removeImage">Remove image</button>
        </div>
        <div id="preview">
        
          <img v-show="url" :src="url" id="uploaded-img" />
          <img v-if="localStorage && localStorage.selectedImage" :src="localStorage.selectedImage">
        </div>
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            url: null,
            localStorage : window.localStorage
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
            return canvas.toDataURL("image/jpg", 1) 
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
        },
        removeImage() {
            localStorage.removeItem(this.selectedImage);
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