// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Show add-modal
$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active')
})
// hide add-modal
$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active')
})

// add-modal submission
$('#add-button').click(() => {
    // Get url from imput
    let newUrlValue = $('#item-input').val()
    if(newUrlValue) {
        
    }
})

// Simulate add click on enter
$('#item-input').keyup((e) => {
    if(e.key === 'Enter') {
        $('#add-button').click()
    }
})