export const elements = {
    root_container:document.querySelector(".root_container")
}

              
export const themes = ["#9D4082","#744B8A","#144B8A","#334E70", "#BE493C","#744B8A","#144B8A","#334E70", "#BE493C","#FFE3F1","#C0336C","#FCB461","#8386F0"];

export const getThemebutton = () =>{
    let buttons = "";
    for (const iterator of themes) {
       buttons += `<button class="color" style="background-color: ${iterator};" value=${iterator}></button>`;
    }
    return buttons;
    // 
}

export const deviceIsMobile = () => {

    // this will be rendered from server
    if(config.isMobile != undefined) return config.isMobile;

    // if server is not available;

    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return true;

    return false;

}

export const convertToTimecode = (d) => {
    if (d < 0) {
        d = d * -1;
    }
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    if (h < 10 && h > 0) h = "0" + h + ":";
    else h = "";
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return h + m + ":" + s;
}

export const getIcons = (iconname) => {

    return `
    <svg class="create_icon">
    <use xlink:href="img/svg/sprite.svg#${iconname}"></use></svg>
    `;

}

export const getSpeedList = (lastValue) => {
    let list = '';
    for (const iterator of config.playBackSpeedList) {
        let isChecked = (iterator == lastValue) ? "checked" : '';  
        list += `<label class="value_checkbox ">
                    <input id='speed_radio' style="display:none" ${isChecked} value='${iterator}' name="speed_radio" type="radio" >
                    <span class="checkmark">${iterator}x</span>
                 </label>`;
       
    }
    return list;
}

export const getQualityList = (qualityList , selectedIndex) => {

    console.log(qualityList , "sasdad");

    let isChecked = (selectedIndex == -1) ? "checked" :"";
    
    let qualityHTML = `<label class="value_checkbox ">
        <input id='quality_radio' style="display:none" value=-1 ${isChecked} name="quality_radio" type="radio" >
         <span class="checkmark">auto</span>
    </label>`
    
    
    for (const iterator in qualityList) {
    
        isChecked = (iterator == selectedIndex) ? "checked" : "";
        
        qualityHTML += `<label class="value_checkbox">
        <input id='quality_radio' style="display:none" value=${iterator} ${isChecked} name="quality_radio" type="radio" >
         <span class="checkmark">${qualityList[iterator].height}p</span>
    </label>`
    }

    return qualityHTML;

}

export const getVolumeVolumeHTML =(isLive) => {
    let volumeSeekbar = deviceIsMobile() ? '' : `<input type="range" id="volume"  max="100" value="100" class="volSeekRange" >` ;

    if(!isLive){

        return `<svg class="create_icon  bg">
        <use xlink:href="img/svg/sprite.svg#icon-volume"></use></svg></button>
        ${volumeSeekbar}
       `;

    }else{

        return `<svg class="create_icon  bg">
        <use xlink:href="img/svg/sprite.svg#icon-mute"></use></svg></button>
        ${volumeSeekbar}}`
    }

}

export const getSavedLastDuration  = (isLive) => {

    
    if(isLive) return '00:00:00';

    
    if(localStorage.getItem(`currentTime-${config.videoid}`)){
        return convertToTimecode(parseInt(localStorage.getItem(`currentTime-${config.videoid}`)));
    }
    

    return "00:00:00";


}

export const isPIPSupported = () => {
    if( document.pictureInPictureEnabled && !video.disablePictureInPicture) return true;

    return false;
}

export const getPIPButton = () => {

    if(isPIPSupported()) return `<button  id='pip'><svg class="create_icon ">
    <use xlink:href="img/svg/sprite.svg#icon-pip"></use></svg>
</button>`;

    return '';

}

export let setThemeOnStart= () => {

    console.log("theme called");
    //set theme and color
    let darkmode = localStorage.getItem('dark');
    let last_main_color =  localStorage.getItem("--main-color");
    let last_main_color_hex = localStorage.getItem("--main-color-hexvalue");
   
    if(darkmode == 'true'){

        document.getElementById("darkmode").classList.add("dark");
        document.getElementById("darkmode").innerHTML = `Light mode ${getIcons("icon-sun")}`
        document.querySelector(':root').style.setProperty('--menu-bg-color', "#2B2F43");
        document.querySelector(':root').style.setProperty('--theme-backgorund', "#272B3E");
        
    }
    document.getElementById("color_picker").value = last_main_color_hex;
    document.querySelector(':root').style.setProperty('--main-color', last_main_color);
  //  document.getElementById("color_picker").value = last_main_color_hex;


}