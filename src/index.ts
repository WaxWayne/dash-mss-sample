import { MediaPlayer } from "dashjs";
import "dashjs/mss";

const url =
  "https://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest";
const player = MediaPlayer().create();
const videoElement = document.getElementsByTagName("video")[0];
if (!videoElement) {
  throw new Error("Fix your html: no video element present");
}
player.initialize(videoElement, url, true);
