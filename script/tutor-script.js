document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveBtn');
    const form = document.getElementById('profileForm');
    const formInputs = form.querySelectorAll('input, textarea');
    const meetingLink = document.getElementById('meetingLink');
    
    // Load saved meeting link if exists
    if (localStorage.getItem('meetingLink')) {
        meetingLink.value = localStorage.getItem('meetingLink');
    }
    
    // Function to toggle edit mode
    function toggleEditMode(isEditing) {
        formInputs.forEach(input => {
            input.disabled = !isEditing;
        });
        
        editProfileBtn.textContent = isEditing ? 'Cancel' : 'Edit Profile';
        editProfileBtn.classList.toggle('btn-danger', isEditing);
        editProfileBtn.classList.toggle('btn-primary', !isEditing);
        
        saveBtn.style.display = isEditing ? 'block' : 'none';
    }
    
    // Edit button click handler
    editProfileBtn.addEventListener('click', function() {
        const isCurrentlyEditing = editProfileBtn.textContent === 'Cancel';
        toggleEditMode(!isCurrentlyEditing);
        
        if (isCurrentlyEditing) {
            // Reset form to original values
            form.reset();
            // Restore saved meeting link
            if (localStorage.getItem('meetingLink')) {
                meetingLink.value = localStorage.getItem('meetingLink');
            }
        }
    });
    
    // Save button click handler
    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Save the meeting link
        localStorage.setItem('meetingLink', meetingLink.value);

        // Show a brief success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Meeting link saved successfully!';
        form.appendChild(successMessage);

        // Remove the message after 2 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 2000);

        toggleEditMode(false);
    });
    
    // Add animation to profile picture, because I hate css
    const profilePic = document.querySelector('.rounded-circle');
    if (profilePic) {
        profilePic.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profilePic.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
});
