import { Circle } from './models/circle';
import drawCircle from './draw/draw-circle';
import wipeTheCanvasClean from './draw/wipe-the-canvas-clean';
import Track from './models/track';

const funStuff = () => {
    const canvas = document.getElementById('draw-on-me') as HTMLCanvasElement;
    const currentContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    const circles = [] as Circle[];

    for(let i =0; i < 10; i++) {
        const newCircle = {
            x: i * 100 + 100,
            y: 100,
            speed: 1,
            maxRadius: 50,
            currentRadius: 1,
            thickness: 1
        } as Circle;
        circles.push(newCircle);
    }

    const AudioController = (beatResolution: number) => {
        const audioContext = new window.AudioContext();
        const trackList = [];
        let onEveryFrame = null;

        const catchAnimationFrame = () => {
            window.requestAnimationFrame(catchAnimationFrame);
            for(let i =0 ; i < trackList.length; i++) {
                const thisTrack = trackList[i];
                thisTrack._analyzeFrame(10, .05, beatResolution);
            }

            if(onEveryFrame) {
                onEveryFrame();
            }
        }

        const StopAll = () => {
            trackList.forEach(track => track.Stop());
        }

        const SetOnEveryFrame = (callback) => {
            onEveryFrame = callback;
        }

        const PlayTrackList = (tracks) => {
            loadTrackList(tracks, ConnectBufferedTracksToDestination)
        };

        const loadTrackList = (tracks, callback) => {
            const allLoadedTracks = [];
            for (let i = 0; i < tracks.length; i++) {
                const thisTrack = tracks[i];
                loadSingleTrack(thisTrack, (loadedTrack) => {
                    allLoadedTracks.push(loadedTrack);
                    if (allLoadedTracks.length == tracks.length) {
                        callback(allLoadedTracks);
                    }
                });
            }
        };

        const loadSingleTrack = (track, callback) => {
            if (track.TrackUrl)
            {
                const request = new XMLHttpRequest();
                request.open('GET', track.TrackUrl, true);
                request.responseType = 'arraybuffer';

                request.onload = () => {
                    audioContext.decodeAudioData(request.response, (buffer) => {
                        const bufferSource = audioContext.createBufferSource();
                        bufferSource.buffer = buffer;
                        track.SetBufferSource(bufferSource);
                        trackList.push(track);
                        callback(track);
                    }, () => { alert("Error loading " + track.TrackUrl) });
                };

                request.send();
            } else if (track.BufferData) {
                audioContext.decodeAudioData(track.BufferData, (buffer) => {
                    const bufferSource = audioContext.createBufferSource()
                    bufferSource.buffer = buffer;
                    track.SetBufferSource(bufferSource);
                    trackList.push(track);
                    callback(track);
                }, function () { alert("Error loading track from file buffer") });
            }
        };

        const ConnectBufferedTracksToDestination = (bufferedTracks) => {

            for (let i = 0; i < bufferedTracks.length; i++) {
                const thisBufferedTrack = bufferedTracks[i];
                if (thisBufferedTrack._settings.Source) {
                    const newGainControl = audioContext.createGain();
                    const newAnalyzer = audioContext.createAnalyser();

                    thisBufferedTrack._settings.Source.connect(newGainControl);
                    newGainControl.connect(newAnalyzer);

                    thisBufferedTrack.SetGainNode(newGainControl);
                    thisBufferedTrack.SetAnalyzer(newAnalyzer);

                    newAnalyzer.connect(audioContext.destination);
                }
            }

            CallStartOnAllTracks();
        };

        const CallStartOnAllTracks = () => {
            trackList.forEach(track => track.Play(false));
        };

        catchAnimationFrame();

        return {
            StopAll,
            PlayTrackList,
            SetOnEveryFrame
        }
    }

    let audioController = AudioController(10);
    const dropLocation = document.getElementById('drop-on-me');

    dropLocation.ondragover = (e) => {
        e.preventDefault();
    }
    dropLocation.ondragenter = (e) => {
        e.preventDefault();
    }
    dropLocation.ondragleave = (e) => {
        e.preventDefault();
    }

    dropLocation.ondrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        audioController.StopAll();
        audioController = null
        audioController = AudioController(10);
        const droppedFiles = e.dataTransfer.files;

        const reader = new FileReader();
        reader.onload = (finishEvent) => {
            const data = finishEvent.target.result;

            const drumsTrack = new Track("complete", false, data)
            drumsTrack.OnBeat(function (hzGroup, volume) {
                const vol = Math.floor(volume); // between 0 and 255
                const targetCircle = circles[hzGroup];
                targetCircle.currentRadius = Math.max(targetCircle.maxRadius * (vol / 255), 0);
            });

            audioController.PlayTrackList([drumsTrack]);

            audioController.SetOnEveryFrame(() => {
                wipeTheCanvasClean(currentContext);
                circles.forEach(circle => {
                   drawCircle(currentContext, circle, true);
                });
            });


            let filename = 'an unknown file';

            if(droppedFiles[0].name)
            {
                filename = droppedFiles[0].name;
            }

            dropLocation.innerText = filename;
        }

        reader.readAsArrayBuffer(droppedFiles[0]);
    };

    window.setInterval(() => {
        circles.forEach(circle => {
           if (circle.currentRadius > 1) {
               circle.currentRadius-=.5;
           } else {
               circle.currentRadius = 1;
           }
        });
    }, 1000/60);
}

window.onload = funStuff;