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
    $('.read-item').off('click', 'dblclick').on('click', this.selectItem).on('dblclick', this.openItem)
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

exports.openItem = () => {
    if(!this.toReadItems.length) {
        return;
    }

    let targetItem = $('.read-item.is-active')
    let contentURL = encodeURIComponent(targetItem.data('url'))
    let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}`
    // Open item i new proxy BrowserWindow
    let readerWin = window.open(readerWinURL, targetItem.data('title'))

}   