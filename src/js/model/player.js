
import {elements , convertToTimecode, getIcons, getThemebutton} from "./domelements";


export default class Player{

    constructor(x){
        console.log(x);
        this.renderControlsHolder(); ;
    }


    renderControlsHolder(){

        //t
        console.log();
       let elm = `<div class="root_controller-container">

       <div class="setting_container">

       <div class="pallate_creater_holder">
           <h1>Change theme</h1>

           <div class="pallates">
                ${getThemebutton()}
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

        document.querySelector(".pallates").addEventListener("click" , this.changeTheme)
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
        return;
    }
}