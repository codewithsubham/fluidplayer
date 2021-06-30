import {elements} from "./domelements";


export default class Player{

    constructor(x){
        console.log(x);
        this.renderControlsHolder(); ;
    }


    renderControlsHolder(){

        //t

       let elm = `<div class="root_controller-container">
                     <div class="control_container">
                        <div class="top-container">
                        <div id="seekbar-wrapper">
                            <input type="range"  max="100" value="50" class="slider" id="myRange">
                            <progress id="bufferProgress" max="100" value="70" class="bufferProgress"></progress>
                            <progress id="playbackProgress" max="100" value="50" class="playbackProgress"></progress>
                        </div>            
                    </div>
                    <div class="bottom-container">
                    </div>
                </div>
            </div>
        ` 
        elements.root_container.insertAdjacentHTML("beforeend" , elm);
        
        document.getElementById("myRange").addEventListener('input' , this.changeSeekValue);

        return true;

    }


    changeSeekValue(e){
            video.muted = false;
            document.getElementById("playbackProgress").value =  parseInt(e.target.value);
    }
}