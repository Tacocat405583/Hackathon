document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveBtn');
    const form = document.getElementById('profileForm');
    const formInputs = form.querySelectorAll('input, textarea');
    
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
            // Reset form to original values once done
            form.reset();
        }
    });
    
    // Save button click handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the data to your backend but we're not doing that here
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // For demonstration, we'll just log the data but if I had more sleep I would have though of a better way to do it
        console.log('Saving profile data:', data);
        
        // Show success message, copied from klarn
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3';
        alert.textContent = 'Profile updated successfully!';
        form.appendChild(alert);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.remove();
        }, 3000);
        
        // Exit edit mode
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
