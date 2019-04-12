exports.toReadItems = JSON.parse(localStorage.getItem('toReadItems')) || []

exports.selectItem = (e) => {
    $('.read-item').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')
}
// Save items in localStorage
exports.saveItems = () => {
    localStorage.setItem('toReadItems', JSON.stringify(this.toReadItems))
}

exports.addItem = (item) => {
    // Hide 'no items message'
    $('#no-items').hide()

    // new item html
    let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                        <figure class="image has-shadow is-64x64 thumb">
                            <img src="${item.screenshot}">
                        </figure>
                        <h2 class="title is-4 column">${item.title}</h2>
                    </a>`
    $('#read-list').append(itemHTML)

    // Atach select event handler
    $('.read-item').off('click', 'dblclick').on('click', this.selectItem).on('dblclick', window.openItem)
}

exports.changeItem = (direction) => {
    // Get current active item
    let active = $('.read-item.is-active')

    let newItem = (direction === 'down') ? active.next('.read-item') : active.prev('.read-item')

    if(newItem.length) {
        active.removeClass('is-active')
        newItem.addClass('is-active')
    }
}

window.openItem = () => {
    if(!this.toReadItems.length) {
        return;
    }

    let targetItem = $('.read-item.is-active')
    let contentURL = encodeURIComponent(targetItem.data('url'))
    
    // Get item index to pass to proxy window
    let itemIndex = targetItem.index() - 1

    let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&index=${itemIndex}`
    // Open item i new proxy BrowserWindow
    let readerWin = window.open(readerWinURL, targetItem.data('title'))
}   

window.deleteItem = (i = false) => {

    // Set i to active item if not passed as argument
    if(i === false) {
        i = $('.read-item.is-active').index() - 1
    }
    $('.read-item').eq(i).remove()

    this.toReadItems = this.toReadItems.filter((item, index) => {
        return index !== i
    })

    // update storage
    this.saveItems()

    // Select prev item
    if(this.toReadItems.length) {
        // I first item was deleted, select new first item in list, else previous item
        let newIndex = (i === 0) ? 0 : i - 1

        $('.read-item').eq(newIndex).addClass('is-active')
    } else {
        $('#no-items').show()
    }
}

window.openInBrowser = () => {
    if (!this.toReadItems.length) {
        return
    }
    let targetItem = $('.read-item.is-active')

    require('electron').shell.openExternal(targetItem.data('url'))
}