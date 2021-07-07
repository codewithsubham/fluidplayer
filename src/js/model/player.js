
import { elements, convertToTimecode, getIcons, getThemebutton, getSpeedList, getQualityList, getVolumeVolumeHTML, getSavedLastDuration, deviceIsMobile, isPIPSupported, getPIPButton } from "./domelements";


export default class Player {



    constructor(isLive) {

        this.isLive = isLive;
        this.mainMenuIsOpen = false;
        this.renderControlsHolder();
        this.isLock = false;
        this.speedCheckedIndex = 1;
        this.qualityList;
        this.selectedQualityIndex = -1;
        this.isVolumeUpdated = false;
        this.controlHideTimeOut;
        this.showKeyPressTimeOut;
        this.menuIsClosed = false;
        this.lockScreen = true;
        this.updatedTime = 0;
        if(!deviceIsMobile()) this.keyboardListner();

        this.drawLoader();

    }

    keyboardListner(){
        

window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 32:
            this.playPause(e);
            if(video.paused){
                this.showKeypresses(`` , getIcons("icon-pause"))
                break;
            }
            this.showKeypresses(`` , getIcons("icon-play"))
            break;
        case 39:
            this.seekForward(e);
            this.showKeypresses(`` , getIcons("icon-forward"))
            break;
        case 37:
            this.seekBackward(e)
            this.showKeypresses(`` , getIcons("icon-backward"))
            break;
        case 40:
            e.target.value = --(document.getElementById("volume").value);
            if(e.target.value >= 0){
                this.updateVolume(e)
                this.showKeypresses(`${e.target.value * 5} %` , getIcons("icon-volume"))
            }
            break;

        case 38:
            e.target.value = ++(document.getElementById("volume").value);
            if(e.target.value <= 20){
                this.updateVolume(e)
                this.showKeypresses(`${e.target.value * 5} %` , getIcons("icon-volume"))
            }
            break;
        case 70:
            this.fullScreen(e)
            break;
        case 77:
            this.chanageMuteStatus(e);
            if(video.muted){
                this.showKeypresses(`` , getIcons("icon-mute"))
                break
            }
            this.showKeypresses(`` , getIcons("icon-volume"))
    }
});
    }

    renderControlsHolder() {

        let elm = `<div class="root_controller-container">

       <div class="menu_container remove_setting_container">

       <div class="pallate_creater_holder">
           <h1>Change theme</h1>

           <div class="pallates light_theme_color">
                ${getThemebutton()}
           </div>
           <input id="color_picker"  style="visibility: hidden;position:absolute;" type="color">
            <label for="color_picker" class="color_picker_button light_theme_color">Be creative <span> ${getIcons("icon-palette")} </span></label>
            <button id="darkmode" class="color_picker_button light_theme_color">dark mode ${getIcons("icon-theme")}</button>
                               
       </div>
       <div class="pallate_creater_holder " id="setting_buttons-holder">
                            <h1>Settings</h1>
                 
                            <div class="options">

                                <button id="qualityMenu" class="color_picker_button light_theme_color">Quality ${getIcons("icon-settings")} </button>
                                <button id="seepMenu" class="color_picker_button light_theme_color">Speed ${getIcons("icon-meter")}</button>
                                <button id="lock" class="color_picker_button light_theme_color">lock screen ${getIcons("icon-pushpin")}</button>
                                <button id="reloadPlayer" class="color_picker_button light_theme_color">Reload ${getIcons("icon-reset")}</button>
                                
                            </div>

                            <div class="options_container remove_options_container">
                                <div class="backtooptions">
                                    <button id="returnToOption" class="light_theme_color"> Quality </button>
                                </div>
                                
                                <div class="value_selector light_theme_color">
                                <label class="value_checkbox" light_theme_color">
                                <input id='quality_radio' style="display:none" value='-1' name="quality_radio" type="radio" >
                                <span class="checkmark">auto</span>
                            </label>
                                <label class="value_checkbox light_theme_color">
                                    <input id='quality_radio' style="display:none" value='1' name="quality_radio" type="radio" >
                                    <span class="checkmark">1080 p</span>
                                </label>
                                
                                <label class="value_checkbox light_theme_color">
                                    <input id='quality_radio' style="display:none" value='2' name="quality_radio" type="radio">
                                    <span class="checkmark">720 p</span>
                                </label>
                                
                                <label class="value_checkbox light_theme_color">
                                <input id='quality_radio' style="display:none" value='2' name="quality_radio" type="radio">
                                <span class="checkmark">480 p</span>
                            </label>
                            
                            <label class="value_checkbox light_theme_color">
                            <input id='quality_radio' style="display:none" value='2' name="quality_radio" type="radio">
                            <span class="checkmark">260 p</span>
                        </label>
                        

                                </div>
                            
                            </div>
                        </div>

   </div>
        <div class="error_container"></div>
        <div  class="keypress_container"></div>
        <div  class="loader">
        
        </div>
        
       <button class="liveStatus" style="display:none" id="liveStatus"> LIVE </button>

                     <div class="control_container">
                        <div class="top-container">
                        <div id="seekbar-wrapper">
                            <div id="tooltip"></div>
                            <input type="range"  max="100" value="0"  step="1" class="slider" id="myRange">
                            <progress id="bufferProgress" max="100" value="0" class="bufferProgress"></progress>
                            <progress id="playbackProgress" max="100" value="0" class="playbackProgress"></progress>
                        </div>            
                    </div>
                    <div class="bottom-container">
                    <div class="first_section">
                    <button id="volumeChange">

                        ${getVolumeVolumeHTML(this.isLive)}
                        
                     
                </div>
                <div class="second_section">
                    <div class="timer" id="curenttime">
                         ${getSavedLastDuration(this.isLive)}
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

                    ${getPIPButton()}
                    
                <button id="settings"><svg class="create_icon  bg">
                            <use xlink:href="img/svg/sprite.svg#icon-settings"></use></svg>
                            <span class="hd">HD</span>
                </button>
                </div>
                    </div>
                </div>
               
            </div>
        `
        elements.root_container.insertAdjacentHTML("beforeend", elm);
        document.getElementById("myRange").addEventListener('input', this.changeSeekValue.bind(this));
        if (!deviceIsMobile()) document.getElementById("seekbar-wrapper").addEventListener('mousemove', this.showTooltip.bind(this));
        if (!deviceIsMobile()) document.getElementById("seekbar-wrapper").addEventListener('mouseout', this.hideTooltip.bind(this));

        elements.liveStatus = document.getElementById("liveStatus");

        document.getElementById("playPause").addEventListener("click", this.playPause.bind(this));
        document.getElementById("seekBackward").addEventListener("click", this.seekBackward.bind(this));
        document.getElementById("seekForward").addEventListener("click", this.seekForward.bind(this));
        if (isPIPSupported()) document.getElementById("pip").addEventListener("click", this.onBtnPipClick.bind(this));

        document.querySelector(".pallates").addEventListener("click", this.changeTheme.bind(this));

        document.getElementById("color_picker").addEventListener("input", this.showChangingColor.bind(this));
        document.getElementById("color_picker").addEventListener("change", this.changeColor);

        document.getElementById("settings").addEventListener("click", this.onSettingClick.bind(this));

        document.getElementById("qualityMenu").addEventListener("click", this.showQualityList.bind(this));
        document.getElementById("seepMenu").addEventListener("click", this.showSpeedList.bind(this));

        document.getElementById("lock").addEventListener("click", this.lockUnlock.bind(this));
        document.querySelector(".value_selector").addEventListener("click", this.changeValues.bind(this));

        document.getElementById("volumeChange").addEventListener("click", this.chanageMuteStatus.bind(this))
        if (!deviceIsMobile()) document.getElementById("volume").addEventListener("input", this.updateVolume.bind(this));
        document.querySelector(".options_container").addEventListener("click", this.removeToOptions.bind(this));


        document.querySelector(".root_controller-container").addEventListener("click", this.hideControls.bind(this));

        document.querySelector(".root_controller-container").addEventListener("mousemove", this.hideControlsMouseMove.bind(this));

        document.querySelector(".root_controller-container").addEventListener("dblclick", this.fullScreen.bind(this));
        document.getElementById("darkmode").addEventListener("click", this.toogleDarKMode.bind(this));
        if (!this.isLive) document.querySelector(".error_container").addEventListener("click", this.removeError);
        document.getElementById("reloadPlayer").addEventListener("click" , this.reloadVideoPlayer.bind(this));
        return true;

    }



    changeSeekValue(e) {

        //let x = 0;//document.querySelector(".control_container").offsetWidth*(2/100);
        e.target.value = this.updatedTime ? this.updatedTime : e.target.value;
        if (window.watchLiveDuration < (window.timeTollerance + 20)) return;
        document.getElementById("playbackProgress").value = parseInt(e.target.value);
        document.getElementById("myRange").value = parseInt(e.target.value);
        document.getElementById("curenttime").innerHTML = convertToTimecode(parseInt(e.target.value));
        video.currentTime = parseInt(e.target.value);
    }




    updateCurrentTime(currentTime) {

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

    playPause(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;
        if (video.paused) {
            document.getElementById("playPause").innerHTML = getIcons("icon-pause");
            video.play();
            return;
        }

        document.getElementById("playPause").innerHTML = getIcons("icon-play");
        video.pause();
        return;

    }

    seekForward(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;
        video.currentTime += config.seekValue;
    }
    seekBackward(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;
        video.currentTime -= config.seekValue;
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

    changeTheme(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (e.target.type != "submit") return;
        document.querySelector(':root').style.setProperty('--main-color', e.target.style.backgroundColor);
        localStorage.setItem(`--main-color`, e.target.style.backgroundColor);
        localStorage.setItem(`--main-color-hexvalue`, e.target.value)
        document.getElementById("color_picker").value = e.target.value;
        return;
    }

    changeColor(e) {

      //  console.log(e.target.value);

    }

    showChangingColor(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        document.querySelector(':root').style.setProperty('--main-color', e.target.value);
        return;
    }

    onSettingClick(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (!this.mainMenuIsOpen) {
            document.querySelector(".menu_container").classList.remove("remove_setting_container");
            this.mainMenuIsOpen = true;
            return
        }
        document.querySelector(".menu_container").classList.add("remove_setting_container");
        this.mainMenuIsOpen = false;
        return
    }

    showQualityList(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        document.querySelector(".options").classList.add("remove_options");
        document.querySelector(".options_container").classList.remove("remove_options_container")
        document.getElementById("returnToOption").innerHTML = `quality ${getIcons('icon-settings')}`;
        document.querySelector(".value_selector").innerHTML = getQualityList(this.qualityList, this.selectedQualityIndex);

        // this.classList.add("remove_options");
    }

    showSpeedList(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        document.querySelector(".options").classList.add("remove_options");
        document.querySelector(".options_container").classList.remove("remove_options_container")
        document.getElementById("returnToOption").innerHTML = `speeds ${getIcons('icon-meter')}`;
        document.querySelector(".value_selector").innerHTML = getSpeedList(this.speedCheckedIndex);

    }

    removeToOptions(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (e.target.id != "returnToOption") return;
        document.querySelector(".options").classList.remove("remove_options");
        document.querySelector(".options_container").classList.add("remove_options_container")
        return

    }

    lockUnlock(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (!this.isLock) {
            e.target.innerHTML = `unlock screen ${getIcons("icon-unlock")}`;

            e.target.style.backgroundColor = "var(--main-color)";
            e.target.style.color = "#fff";
            e.target.querySelector("svg").style.fill = "#fff";
            this.isLock = true;

            // lockScreen is to stop menu hide automatically and being checked closeMenu
            this.lockScreen = true;
            return;
        }
        this.lockScreen = false;
        e.target.innerHTML = `lock screen ${getIcons("icon-pushpin")}`;
        e.target.style.backgroundColor = "var(--theme-backgorund)";
        e.target.style.color = "var(--main-color)";
        e.target.querySelector("svg").style.fill = "var(--main-color)";
        this.isLock = false;
        return;
    }

    changeValues(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (e.target.type != "radio") return;

        if (e.target.name == "speed_radio") {
            //console.log(document.querySelector("input[type='radio'][name='speed_radio']:checked").value);
            this.speedCheckedIndex = document.querySelector("input[type='radio'][name='speed_radio']:checked").value;
            video.playbackRate = this.speedCheckedIndex;

        } else if (e.target.name == "quality_radio") {
            this.selectedQualityIndex = document.querySelector("input[type='radio'][name='quality_radio']:checked").value;
            window.hls.loadLevel = parseInt(this.selectedQualityIndex);

        }


        return


    }

    setQualityList(list) {
       
        this.qualityList = list;

    }

    chanageMuteStatus(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (video.muted) {

            document.getElementById("volumeChange").innerHTML = getIcons("icon-volume");
            video.muted = false;
            if (!deviceIsMobile()) document.getElementById("volume").value = video.volume * 100;
            return;
        }


        if (!deviceIsMobile()) document.getElementById("volume").value = 0;
        document.getElementById("volumeChange").innerHTML = getIcons("icon-mute");
        video.muted = true;
        return;
    }

    

    updateVolume(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        video.volume = parseInt(e.target.value) / 20;
        if (video.volume > 0) {
            if (!this.isVolumeUpdated) {
                video.muted = false;
                document.getElementById("volumeChange").innerHTML = getIcons("icon-volume");
                this.isVolumeUpdated = true;
            }
            return;
        }

        video.muted = true;
        document.getElementById("volumeChange").innerHTML = getIcons("icon-mute");
        this.isVolumeUpdated = false;


    }

    hideControls(e) {

        clearTimeout(this.controlHideTimeOut);
        if (e.target.className != "root_controller-container") return;
        if (this.mainMenuIsOpen) {
            this.onSettingClick(e);
        }

        this.closeMenu();

    }

    hideControlsMouseMove(e) {

        if (this.lockScreen) return;
        clearTimeout(this.controlHideTimeOut);
        if (this.mainMenuIsOpen) return;
        if (e.target.className != "root_controller-container") return;
        if (this.mainMenuIsOpen) {
            this.onSettingClick(e);
            return;
        }
        this.closeMenu();
    }

    closeMenu() {
        if (this.lockScreen) return;

        if (this.menuIsClosed) {
            document.querySelector(".control_container").style.bottom = "0";
            this.hideError(false);
        }

        this.controlHideTimeOut = setTimeout(() => {
            this.hideError(true);
            document.querySelector(".control_container").style.bottom = "-100%";
            this.menuIsClosed = true;
        }, 3000)
    }

    toogleDarKMode(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;

        if (!document.getElementById("darkmode").classList.contains("dark")) {
            //goes inside darkmode
            //--menu-bg-color: #ffffff;
            //--theme-backgorund: #ffffff;
            document.querySelector(':root').style.setProperty('--menu-bg-color', "#2B2F43");
            document.querySelector(':root').style.setProperty('--theme-backgorund', "#272B3E");

            localStorage.setItem(`dark`, true);


            //shows button for light mode
            document.getElementById("darkmode").innerHTML = `Light mode ${getIcons("icon-sun")}`
            document.getElementById("darkmode").classList.add("dark");
            return;
        }

        document.querySelector(':root').style.setProperty('--menu-bg-color', "#ffffff");
        document.querySelector(':root').style.setProperty('--theme-backgorund', "#ffffff");

        localStorage.setItem(`dark`, false);
        document.getElementById("darkmode").classList.remove("dark");
        document.getElementById("darkmode").innerHTML = `dark mode ${getIcons("icon-theme")}`

        return;
    }

    isFullscreen() {
        return (
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreen ||
            document.webkitIsFullScreen
        );
    }

    fullScreen(e) {
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;
        if (e.target.className == "root_controller-container" || e.keyCode == 70){
      
                if (!this.isFullscreen()) {
                    //element = container || video;
                    let element = document.getElementById("root_container");
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else {
                        element.webkitRequestFullScreen();
                    }
                    if(deviceIsMobile()) screen.orientation.lock("landscape-primary");
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else {
                        document.webkitCancelFullScreen();
                    }
                   if(deviceIsMobile()) screen.orientation.unlock();
                }
            };

    }
    calcSliderPos(e) {
        return (e.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'), 10);
    }
    showTooltip(e) {
        if (e.target.id != "myRange") return;
        if (!this.mainMenuIsOpen) {
            let tooltip = document.getElementById("tooltip");
            tooltip.style.display = "block"

            let w = e.target.offsetWidth;
            if (e.x > tooltip.offsetWidth - tooltip.offsetWidth / 4 && e.x < w - tooltip.offsetWidth / 4) {
                tooltip.style.left = e.x - tooltip.offsetWidth / 4;
            }else if (e.x > w - tooltip.offsetWidth){
                tooltip.style.left = e.x - tooltip.offsetWidth * .70;
            }else if(e.x < w - tooltip.offsetWidth / 4){
                tooltip.style.left = tooltip.offsetWidth / 2;
            }
              

            tooltip.innerHTML = convertToTimecode(this.calcSliderPos(e).toFixed(2));

        }
        this.updatedTime = this.calcSliderPos(e).toFixed(2);
    }

    hideTooltip(e) {
        document.getElementById("tooltip").style.display = "none"
    }

    hideError(hide) {
        if (this.isLive) return;
        if (!hide) {
            document.querySelector(".error_container").style.display = "block";
        } else {
            document.querySelector(".error_container").style.display = "none";
        }
    }

    removeError(e) {
        this.innerHTML = "";
    }

    reloadVideoPlayer(e){
        let sourceCapabilities = "sourceCapabilities" in e;
        if (this.sourceCapabilitiesIsAvailable(sourceCapabilities, e)) return;
        window.location.reload();
    }

    showKeypresses(text , icon){
        clearTimeout(this.showKeyPressTimeOut);

        document.querySelector(".keypress_container").innerHTML =  `<button class="keypress" > ${text} ${icon} </button>`;
      
        this.showKeyPressTimeOut = setTimeout(()=> {
            document.querySelector(".keypress_container").innerHTML = "";
        } , 300)
        
        
    }

    drawLoader(){
        document.querySelector(".loader").innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
    }
    removeLoader(){
        document.querySelector(".loader").innerHTML = "";
    }
}