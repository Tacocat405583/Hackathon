document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('screen-sharing-video');

    function stopSharing(stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoContainer.style.display = 'none';
        video.srcObject = null;
        startButton.textContent = 'Stream Now';
    }

    if (startButton) {
        startButton.addEventListener('click', async () => {
            try {
                // Request screen sharing
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        cursor: "always"
                    },
                    audio: false
                });

                // Show the video container
                videoContainer.style.display = 'flex';
                
                // Play the stream in the video element
                video.srcObject = stream;

                // Handle stream stop from browser controls
                stream.getVideoTracks()[0].addEventListener('ended', () => {
                    stopSharing(stream);
                });

                // Handle stop button click
                stopButton.onclick = () => {
                    stopSharing(stream);
                };

            } catch (err) {
                console.error("Error: " + err);
                alert('Unable to share screen: ' + err.message);
            }
        });
    }
});