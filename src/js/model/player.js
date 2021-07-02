
import {elements , convertToTimecode, getIcons, getThemebutton , getSpeedList} from "./domelements";


export default class Player{

    
    constructor(x){
        console.log(x);
        this.mainMenuIsOpen = false;
        this.renderControlsHolder(); 
        this.isLock = false;
        this.speedCheckedIndex = 1;
    }


    renderControlsHolder(){

        //t
        console.log();
       let elm = `<div class="root_controller-container">

       <div class="menu_container remove_setting_container">

       <div class="pallate_creater_holder">
           <h1>Change theme</h1>

           <div class="pallates">
                ${getThemebutton()}
           </div>
           <input id="color_picker"  style="visibility: hidden;position:absolute;" type="color">
            <label for="color_picker" class="color_picker_button">Be creative <span> ${getIcons("icon-palette")} </span></label>
            <button id="qualition_menu" class="color_picker_button">dark mode ${getIcons("icon-theme")}</button>
                               
       </div>
       <div class="pallate_creater_holder " id="setting_buttons-holder">
                            <h1>Settings</h1>
                 
                            <div class="options">

                                <button id="qualityMenu" class="color_picker_button">Quality ${getIcons("icon-settings")} </button>
                                <button id="seepMenu" class="color_picker_button">Speed ${getIcons("icon-meter")}</button>
                                <button id="lock" class="color_picker_button">lock screen ${getIcons("icon-pushpin")}</button>
                                <button id="qualition_meneu" class="color_picker_button">Bookmarks ${getIcons("icon-bookmark")}</button>
                                
                            </div>

                            <div class="options_container remove_options_container">
                                <div class="backtooptions">
                                    <button id="returnToOption"> Quality </button>
                                </div>
                                
                                <div class="value_selector">
                                <label class="value_checkbox">
                                    <input id='speed_radio' style="display:none" value='1' name="speed_radio" type="radio" >
                                    <span class="checkmark">two</span>
                                </label>
                                
                                <label class="value_checkbox">
                                    <input id='speed_radio' style="display:none" value='2' name="speed_radio" type="radio">
                                    <span class="checkmark">One</span>
                                </label>
                                
                                <label class="value_checkbox">
                                <input id='speed_radio' style="display:none" value='2' name="speed_radio" type="radio">
                                <span class="checkmark">One</span>
                            </label>
                            
                            <label class="value_checkbox">
                            <input id='speed_radio' style="display:none" value='2' name="speed_radio" type="radio">
                            <span class="checkmark">One</span>
                        </label>
                        

                                </div>
                            
                            </div>
                        </div>

   </div>

       <button class="liveStatus" style="display:none" id="liveStatus"> LIVE </button>

                     <div class="control_container">
                        <div class="top-container">
                        <div id="seekbar-wrapper">
                            <input type="range"  max="100" value="0" class="slider" id="myRange">
                            <progress id="bufferProgress" max="100" value="0" class="bufferProgress"></progress>
                            <progress id="playbackProgress" max="100" value="0" class="playbackProgress"></progress>
                        </div>            
                    </div>
                    <div class="bottom-container">
                    <div class="first_section">
                    <button class><svg class="create_icon  bg">
                        <use xlink:href="img/svg/sprite.svg#icon-volume"></use></svg></button>
                        <input type="range"  max="100" value="50" class="volSeekRange" >
                
                </div>
                <div class="second_section">
                    <div class="timer" id="curenttime">
                        00:00:00
                    </div>
                    <div class="center_control-container">
                        <button id="seekBackward"><svg class="create_icon">
                            <use xlink:href="img/svg/sprite.svg#icon-backward"></use></svg>
                        </button>
                        <button class="playPause" id='playPause'><svg class="create_icon ">
                                <use xlink:href="img/svg/sprite.svg#icon-play"></use></svg>
                        </button>
                        <button id="seekForward"><svg class="create_icon">
                                <use xlink:href="img/svg/sprite.svg#icon-forward"></use>
                            </svg>
                        </button>
                    </div>
                    <div class="timer" id="totaltime">
                        00:00:00
                    </div>
                </div>
                <div class="third_section">

                    <button  id='pip'><svg class="create_icon ">
                        <use xlink:href="img/svg/sprite.svg#icon-pip"></use></svg>
                </button>
                <button id="settings"><svg class="create_icon  bg">
                            <use xlink:href="img/svg/sprite.svg#icon-settings"></use></svg>
                            <span class="hd">HD</span>
                </button>
                </div>
                    </div>
                </div>
            </div>
        ` 
        elements.root_container.insertAdjacentHTML("beforeend" , elm);
        document.getElementById("myRange").addEventListener('input' , this.changeSeekValue);
        elements.liveStatus = document.getElementById("liveStatus");
        
        document.getElementById("playPause").addEventListener("click" , this.playPause);
        document.getElementById("seekBackward").addEventListener("click" , this.seekBackward);
        document.getElementById("seekForward").addEventListener("click" , this.seekForward);
        document.getElementById("pip").addEventListener("click" , this.onBtnPipClick.bind(this));

        document.querySelector(".pallates").addEventListener("click" , this.changeTheme);
        
        document.getElementById("color_picker").addEventListener("input" , this.showChangingColor);
        document.getElementById("color_picker").addEventListener("change" , this.changeColor);
        
        document.getElementById("settings").addEventListener("click" , this.onSettingClick.bind(this));

        document.getElementById("qualityMenu").addEventListener("click" , this.showQualityList);
        document.getElementById("seepMenu").addEventListener("click" , this.showSpeedList.bind(this));

        document.getElementById("lock").addEventListener("click" , this.lockUnlock.bind(this));
        document.querySelector(".value_selector").addEventListener("click" , this.changeValues.bind(this));

        document.querySelector(".options_container").addEventListener("click" , this.removeToOptions);
        

        return true;

    }


    changeSeekValue(e){

            if(window.watchLiveDuration < (window.timeTollerance + 20)) return;
            document.getElementById("playbackProgress").value = parseInt(e.target.value);
            document.getElementById("myRange").value = parseInt(e.target.value);
            document.getElementById("myRange").style.display = "initial"
            video.currentTime = parseInt(e.target.value);
    }


  

    updateCurrentTime(currentTime){
        
        document.getElementById("playbackProgress").value = currentTime;
        document.getElementById("myRange").value = currentTime;
        document.getElementById("curenttime").innerHTML = convertToTimecode(parseInt(currentTime));
        return;
    }

    onFragmentLoad() {
        if (video.buffered.length == 0) return;
        let progress;
        let i;
        for (i = 0; i < video.buffered.length; i++) {
            if (video.buffered.end(i) >= document.getElementById("myRange").value) {
                progress = video.buffered.end(i);
                document.getElementById("bufferProgress").value = progress;
                break;
            }
        }
    }

    playPause(){
        console.log(getIcons("icon-play"))

        if(video.paused){
            document.getElementById("playPause").innerHTML = getIcons("icon-pause");
            video.play();
            return;
        }

        document.getElementById("playPause").innerHTML = getIcons("icon-play");
        video.pause();
        return;

    }

    seekForward(){
        video.currentTime+= config.seekValue;
    }
    seekBackward(){
        video.currentTime-= config.seekValue;
    }
   
    async onBtnPipClick(e) {


        let sourceCapabilities = "sourceCapabilities" in e;
        
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        try {
            await video.requestPictureInPicture();
        } catch (error) {
            // TODO: Show error message to user.
        } finally {
            this.disabled = false;
        }
    }

     
    sourceCapabilitiesIsAvailable(sourceCapabilities, e) {
        if (sourceCapabilities) {
            if (!e.sourceCapabilities) {
                return true;
            }
        }
    
        return false;
    }

    changeTheme(e){
        if(e.target.type != "submit") return console.log("not a button");
        document.querySelector(':root').style.setProperty('--main-color', e.target.style.backgroundColor);
        
        document.getElementById("color_picker").value = e.target.value;
        return;
    }

    changeColor(e){

        console.log(e.target.value);     

    }

    showChangingColor(e){
        document.querySelector(':root').style.setProperty('--main-color', e.target.value);
        return;
    }

    onSettingClick(){
        console.log(this.mainMenuIsOpen);
        if(!this.mainMenuIsOpen){
            document.querySelector(".menu_container").classList.remove("remove_setting_container");
            this.mainMenuIsOpen = true;
            return
        }
        document.querySelector(".menu_container").classList.add("remove_setting_container");
        this.mainMenuIsOpen = false;
        return
    }

    showQualityList(){

        document.querySelector(".options").classList.add("remove_options");
        document.querySelector(".options_container").classList.remove("remove_options_container")

        document.getElementById("returnToOption").innerHTML = `quality ${getIcons('icon-settings')}`;


        document.querySelector(".value_selector").innerHTML = "quality list";
       // this.classList.add("remove_options");
    }

    showSpeedList(){

        console.log(this.speedCheckedIndex , "asdasd");
        document.querySelector(".options").classList.add("remove_options");
        document.querySelector(".options_container").classList.remove("remove_options_container")

        document.getElementById("returnToOption").innerHTML = `speeds ${getIcons('icon-meter')}`;

        document.querySelector(".value_selector").innerHTML = getSpeedList(this.speedCheckedIndex);
    }
    
    removeToOptions(e){
        if(e.target.id != "returnToOption") return;
        document.querySelector(".options").classList.remove("remove_options");
        document.querySelector(".options_container").classList.add("remove_options_container")
        return
    }
    lockUnlock(e){
         if(!this.isLock)  {
            e.target.innerHTML = `unlock screen ${getIcons("icon-unlock")}`;
            
         e.target.style.backgroundColor = "var(--main-color)";
         e.target.style.color = "#fff";
         e.target.querySelector("svg").style.fill = "#fff";
            this.isLock = true;
            return;
         } 
         e.target.innerHTML = `lock screen ${getIcons("icon-pushpin")}`;
         e.target.style.backgroundColor = "#fff";
         e.target.style.color = "var(--main-color)";
         e.target.querySelector("svg").style.fill = "var(--main-color)";
         this.isLock = false;
         return;
    }

    changeValues(e){
        if(e.target.type != "radio") return;

        if(e.target.name == "speed_radio"){
            //console.log(document.querySelector("input[type='radio'][name='speed_radio']:checked").value);
            this.speedCheckedIndex = document.querySelector("input[type='radio'][name='speed_radio']:checked").value;
            return;
        }
        
    }


}