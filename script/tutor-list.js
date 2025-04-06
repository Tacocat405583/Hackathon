$(document).ready(function() {
    // Add click handler for read more buttons
    $('.read-more').on('click', function() {
        const $details = $(this).prev();
        $details.toggleClass('expanded');
        $(this).text($details.hasClass('expanded') ? 'Read less' : 'Read more');
    });

    // Update meeting link, name, and availability from localStorage
    const savedLink = localStorage.getItem('meetingLink');
    if (savedLink) {
        const $liveLogoLink = $('.live-logo a');
        if ($liveLogoLink.length) {
            $liveLogoLink.attr('href', savedLink);
        }
    }

    // Update tutor name and availability for the card with live link
    const savedName = localStorage.getItem('tutorName');
    const savedAvailability = localStorage.getItem('availability');
    
    // Find the card with the live logo and update its content
    const $liveCard = $('.live-logo').closest('.tutor-card');
    if ($liveCard.length) {
        if (savedName) {
            $liveCard.find('.tutor-name').text(savedName);
        }
        if (savedAvailability) {
            // Replace the entire schedule grid with just the availability text
            const $scheduleGrid = $liveCard.find('.schedule-grid');
            $scheduleGrid.html(`<span class="schedule-day">Availability:</span><span>${savedAvailability}</span>`);
        }
    }

    // Listen for updates from the tutor custom page
    window.addEventListener('message', function(event) {
        if (event.data.type === 'updateTutorInfo') {
            const $liveCard = $('.live-logo').closest('.tutor-card');
            if ($liveCard.length) {
                $liveCard.find('.tutor-name').text(event.data.name);
                // Replace the entire schedule grid with just the availability text
                const $scheduleGrid = $liveCard.find('.schedule-grid');
                $scheduleGrid.html(`<span class="schedule-day">Availability:</span><span>${event.data.availability}</span>`);
            }
        }
    });
}); 