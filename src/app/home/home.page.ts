import { Component } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { MediaPlayerService} from '../service/media-player.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private streamingMedia:StreamingMedia, private media: Media, private jwPlayer:MediaPlayerService){
    
  }
  videoLink = 'https://mts-live.morescreens.com/mts-a3/chunklist.m3u8';
  // 'http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
  audioLink = 'http://soundbible.com/grab.php?id=2196&type=mp3';
  streamLink='https://mts-live.morescreens.com/mts-a3/chunklist.m3u8';
  file: MediaObject;
  errorMessage: string = 'No Error';
 
  startVideo(){
    let options:StreamingVideoOptions = {
      successCallback: () => {this.errorMessage = 'play video'},
      errorCallback: (error) => {this.errorMessage = JSON.stringify(error)},
      orientation: 'landscape',
      controls: true
    }
    this.streamingMedia.playVideo(this.videoLink, options);
  }
  startAudio(){
    let options:StreamingAudioOptions = {
      successCallback: () => {console.log('play audio')},
      errorCallback: () => {console.log('error audio')},
      initFullscreen: false,
    }
    this.streamingMedia.playAudio(this.audioLink, options);
  }
  stopAudio(){
    this.streamingMedia.stopAudio();
  }

  setStream(){
    this.file = this.media.create(this.streamLink);
    this.file.onStatusUpdate.subscribe(status => {
      this.errorMessage = JSON.stringify(status);
      console.log("Status update" + status)
    });
    this.file.onError.subscribe(error => {
      this.errorMessage = JSON.stringify(error);
      console.log('Error!', error)
    });
  }
  startStream(){
    //this.file.play();
    this.jwPlayer.loadMedia({ "Id":"123", "Link":"http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", "Title":"mts"}, true)
  }
}

