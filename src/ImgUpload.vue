<template>
    <div class="upload-wrapper"
    @dragover.prevent="enter"
    @dragenter.prevent="enter"
    @dragleave.prevent="leave"
    @dragend.prevent="leave"
    @drop.prevent="onImageSelect"
    v-bind:class="{ 'dragged' : isDraggedOver }">
        <input type="file" accept="image/*" @change="onImageSelect" class="file-input" id="file">
        <label for="file" @change="onImageSelect">Choose a file</label>
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
            dragAndDropCapable: false,
            id : this._uid,
            localStorage : window.localStorage,
            url: null,
            isDraggedOver: false
        }
    },
    mounted() {
        this.checkDragAndDropCapable();
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
        checkDragAndDropCapable() {
            let div = document.createElement('div');
            this.dragAndDropCapable = ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div );
            console.log(this.dragAndDropCapable)
        },
        enter () {
            this.isDraggedOver = true;
        },
        leave () {
            this.isDraggedOver = false;
        },
        imageUpload() {
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
            console.log(event)
            let file = "";
            if (event.target.files) {
                file = event.target.files[0]
            }
            else {
                file = event.dataTransfer.files[0]
            }
            this.url = URL.createObjectURL(file);
            this.leave();
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
label {
  border: 2px solid gray;
  color: gray;
  cursor: pointer;
  background-color: white;
  display: inline-block;
  font-size: 1.25em;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}
#preview img {
    max-width: 100%;
    max-height: 400px;
}

.dragged {
    border: 2px dotted black !important;
}

.file-input {
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.file-input:focus + label {
    outline: 1px dotted #000;
	outline: -webkit-focus-ring-color auto 5px;
}

.file-input:focus + label,
.file-input + label:hover {
    background-color: gray;
    color: white;
}

.upload-wrapper {
    border :  2px solid gray;
    border-radius: 10px;
    margin: 10px;

}

</style>