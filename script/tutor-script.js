$(document).ready(function() {
    const $editProfileBtn = $('#editProfileBtn');
    const $saveBtn = $('#saveBtn');
    const $form = $('#profileForm');
    const $formInputs = $form.find('input, textarea');
    const $meetingLink = $('#meetingLink');
    const $availability = $('#availability');
    const $nickAvailability = $('#nickAvailability');
    const $tutorName = $('.tutor-name');
    const $dynamicTutorName = $('#dynamicTutorName');
    const $fullNameInput = $form.find('input[type="text"]');
    
    // Load saved meeting link, availability, and name if exists
    if (localStorage.getItem('meetingLink')) {
        $meetingLink.val(localStorage.getItem('meetingLink'));
    }
    if (localStorage.getItem('availability')) {
        $availability.val(localStorage.getItem('availability'));
        if ($nickAvailability.length) {
            $nickAvailability.text(localStorage.getItem('availability'));
        }
    }
    if (localStorage.getItem('tutorName')) {
        $fullNameInput.val(localStorage.getItem('tutorName'));
        if ($tutorName.length) {
            $tutorName.text(localStorage.getItem('tutorName'));
        }
        if ($dynamicTutorName.length) {
            $dynamicTutorName.text(localStorage.getItem('tutorName'));
        }
    }
    
    // Function to toggle edit mode
    function toggleEditMode(isEditing) {
        $formInputs.prop('disabled', !isEditing);
        
        $editProfileBtn
            .text(isEditing ? 'Cancel' : 'Edit Profile')
            .toggleClass('btn-danger', isEditing)
            .toggleClass('btn-primary', !isEditing);
        
        $saveBtn.toggle(isEditing);
    }
    
    // Edit button click handler
    $editProfileBtn.on('click', function() {
        const isCurrentlyEditing = $editProfileBtn.text() === 'Cancel';
        toggleEditMode(!isCurrentlyEditing);
        
        if (isCurrentlyEditing) {
            // Reset form to original values
            $form[0].reset();
            // Restore saved meeting link, availability, and name
            if (localStorage.getItem('meetingLink')) {
                $meetingLink.val(localStorage.getItem('meetingLink'));
            }
            if (localStorage.getItem('availability')) {
                $availability.val(localStorage.getItem('availability'));
            }
            if (localStorage.getItem('tutorName')) {
                $fullNameInput.val(localStorage.getItem('tutorName'));
            }
        }
    });
    
    // Save button click handler
    $saveBtn.on('click', function(e) {
        e.preventDefault();
        
        // Save the meeting link, availability, and name
        localStorage.setItem('meetingLink', $meetingLink.val());
        localStorage.setItem('availability', $availability.val());
        localStorage.setItem('tutorName', $fullNameInput.val());
        
        // Update the tutor list page if it's open
        if (window.opener) {
            window.opener.postMessage({
                type: 'updateTutorInfo',
                name: $fullNameInput.val(),
                availability: $availability.val()
            }, '*');
        }
        
        if ($nickAvailability.length) {
            $nickAvailability.text($availability.val());
        }
        if ($tutorName.length) {
            $tutorName.text($fullNameInput.val());
        }
        if ($dynamicTutorName.length) {
            $dynamicTutorName.text($fullNameInput.val());
        }

        // Show a brief success message
        const $successMessage = $('<div>')
            .addClass('alert alert-success mt-3')
            .text('Profile updated successfully!');
        $form.append($successMessage);

        // Remove the message after 2 seconds
        setTimeout(() => {
            $successMessage.remove();
        }, 2000);

        toggleEditMode(false);
    });
    
    // Add animation to profile picture
    const $profilePic = $('.rounded-circle');
    if ($profilePic.length) {
        $profilePic.hover(
            function() {
                $(this).css('transform', 'scale(1.05)');
            },
            function() {
                $(this).css('transform', 'scale(1)');
            }
        );
    }
});
