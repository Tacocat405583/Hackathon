document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('screen-sharing-video');

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

                // Handle stream stop
                stream.getVideoTracks()[0].addEventListener('ended', () => {
                    videoContainer.style.display = 'none';
                    video.srcObject = null;
                });

                // Update button text
                startButton.textContent = 'Stop Sharing';
                
                // Add click handler to stop sharing
                startButton.onclick = () => {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                    videoContainer.style.display = 'none';
                    video.srcObject = null;
                    startButton.textContent = 'Stream Now';
                    // Reset click handler
                    startButton.onclick = null;
                };

            } catch (err) {
                console.error("Error: " + err);
                alert('Unable to share screen: ' + err.message);
            }
        });
    }
});