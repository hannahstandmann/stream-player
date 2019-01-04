import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Observable, of } from 'rxjs';
import { configFromSession } from '@ionic/core';
declare var jwplayer: any;

@Injectable()
export class MediaPlayerService {
  cfg;
  constructor() {
  }

  isLoggedIn(): Observable<any> {
    return of(jwplayer("myMediaDiv").setup(this.cfg));
  }
  loadMedia(media, isAutoPlay) {
    this.cfg = {
      title: media.Title,
      mediaid: media.Id,
      "preload": "none",
      "autostart": false,
      "controls": true,
      "mute": false,
      "useAudioTag": true,
       playlist: 'http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      "skin": "bekle",
      "stretching": "exactfit",
      "width": "100%",
      "volume": 50,
      "aspectratio": "16:9",
      image: "assets/logo.png",
      "primary": "html5",
      hlshtml: true,
      enableFullscreen: 'true',
      "logo": {
        hide: true
      }
    };
    return this.isLoggedIn().subscribe(playerInstance => {
      console.log('whatever');
      console.log(playerInstance.Location);
      if (isAutoPlay) {
        setTimeout(() => {
          console.log(playerInstance.Location);
          return playerInstance.play();
        }, 500);
      }
    });
  }
}