$(document).ready(function() {
    // Initialize all star ratings
    $('.star-rating').each(function() {
        const rating = $(this).data('rating');
        const stars = $(this).find('i');
        
        // Set initial rating
        stars.each(function(index) {
            if (index < rating) {
                $(this).removeClass('fa-regular').addClass('fa-solid');
            }
        });
    });

    // Add hover effect
    $('.star-rating i').hover(
        function() {
            const value = $(this).data('value');
            const parent = $(this).parent();
            parent.find('i').each(function(index) {
                if (index < value) {
                    $(this).removeClass('fa-regular').addClass('fa-solid');
                } else {
                    $(this).removeClass('fa-solid').addClass('fa-regular');
                }
            });
        },
        function() {
            const parent = $(this).parent();
            const rating = parent.data('rating');
            parent.find('i').each(function(index) {
                if (index < rating) {
                    $(this).removeClass('fa-regular').addClass('fa-solid');
                } else {
                    $(this).removeClass('fa-solid').addClass('fa-regular');
                }
            });
        }
    );

    // Add click handler
    $('.star-rating i').click(function() {
        const value = $(this).data('value');
        const parent = $(this).parent();
        parent.data('rating', value);
        
        parent.find('i').each(function(index) {
            if (index < value) {
                $(this).removeClass('fa-regular').addClass('fa-solid');
            } else {
                $(this).removeClass('fa-solid').addClass('fa-regular');
            }
        });
    });
});