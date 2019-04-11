// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')

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
    if (newUrlValue) {
        $('#item-input').prop('disabled', true)
        $('#add-button').addClass('is-loading')
        $('.close-add-modal').addClass('is-disabled')
        ipcRenderer.send('new-item', newUrlValue)
    }
})

// Simulate add click on enter
$('#item-input').keyup((e) => {
    if (e.key === 'Enter') {
        $('#add-button').click()
    }
})

// Recibe la vuelta desde el proceso main cuando se añade un nuevo item
ipcRenderer.on('new-item-success', (e, res) => {
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-disabled')
})