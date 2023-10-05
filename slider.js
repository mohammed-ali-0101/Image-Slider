
let img=document.getElementById("img")

let upload=document.getElementById("upload")

let saturate=document.getElementById("saturate")

let contrast=document.getElementById("contrast")

let brightness=document.getElementById("brightness")

let sepia=document.getElementById("sepia")

let grayscale=document.getElementById("grayscale")

let blur=document.getElementById("blur")

let hueRotate=document.getElementById("hue-rotate")

let download=document.getElementById("download")

let reset=document.getElementById("reset")

let imgBox=document.querySelector(".img-box")

let canvas=document.getElementById("our-canvas");

 let context=canvas.getContext("2d")

function resetValue(){
    saturate.value="100"
    contrast.value="100"
    brightness.value="100"
    sepia.value="0"
    grayscale.value="0"
    blur.value="0"
    hueRotate.value="0"
    img.style.filter="none"
}

window.onload=function(){
    download.style.display="none" 
    reset.style.display="none" 
    imgBox.style.display="none" 
}
upload.onchange=function(){
    resetValue()
    download.style.display="block" 
    reset.style.display="block" 
    imgBox.style.display="block" 
    let file=new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload=function(){
       img.src=file.result
    }
    img.onload=function(){
         canvas.width = img.width
         canvas.height= img.height
        context.drawImage(img ,0,0, canvas.width , canvas.height)
        img.style.display="none"
    }
}

// هذه الطريقة خاظئة لان كل ايفينت سوف يلغي عمل الايفينت الذي قبله
// saturate.addEventListener("input" , function(){
//   img.style.filter=`saturate(${saturate.value}%)`
// })
// contrast.addEventListener("input" , function(){
//   img.style.filter=`contrast(${contrast.value}%)`
// })

// الطريقة الصحيحة هي عن طريق جلب كل الفلاتر و عمل حلقة لتمر على كل فلتر لتنفذ المطلوب
let filters=document.querySelectorAll("ul li input");
filters.forEach(filter=>{
    filter.addEventListener("input" , function(){
        context.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
    `
     context.drawImage(img ,0,0, canvas.width , canvas.height)
    })
   
})

reset.onclick=function(){
resetValue()
}
//اللغة لا تدعم تحميل الصورة مع الفلاتر معها لذلك يجب التفكير بطرقة اخرى وهي ال canvase
 download.onclick=function(){
    download.href=canvas.toDataURL("image/jpeg")  //defailt value is PNG
 }

