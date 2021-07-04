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
        list += `<label class="value_checkbox">
                    <input id='speed_radio' style="display:none" ${isChecked} value='${iterator}' name="speed_radio" type="radio" >
                    <span class="checkmark">${iterator}x</span>
                 </label>`;
       
    }
    return list;
}

export const getQualityList = (qualityList , selectedIndex) => {

    let isChecked = (selectedIndex == -1) ? "checked" :"";
    
    let qualityHTML = `<label class="value_checkbox">
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