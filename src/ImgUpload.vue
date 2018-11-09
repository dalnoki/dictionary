<template>
    <div>
        <div v-if="!url">
            <input type="file" accept="image/*" @change="onImageSelect"> 
        </div>
        <button @click="imageUpload">Upload</button>
        <button @click="removeImage">Remove image</button>
        <div id="preview">
            <img v-show="url" :src="url" :id="`uploaded-img${this.id}`"  />
        </div>
        <img v-if="localStorage && `localStorage.selectedImage${this.id}`" :src="localStorage.getItem(`selectedImage${this.id}`)">
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            url: null,
            localStorage : window.localStorage,
            id : this._uid
        }
    },
        
    methods : {
        convertImgToCanvas() {
            let image = document.getElementById("uploaded-img"+this.id)
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
            let img = document.getElementById('uploaded-img'+this.id); 
            let width = img.clientWidth;
            let height = img.clientHeight;
              // Save image into localStorage
            try {
                localStorage.setItem( `selectedImage${this.id}`, converted);
                localStorage.setItem("imgWidth"+this.id, width);
                localStorage.setItem("imgHeight"+this.id, height);
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
            localStorage.removeItem(`selectedImage${this.id}`);
            localStorage.removeItem("imgWidth"+this.id);
            localStorage.removeItem("imgHeight"+this.id);
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