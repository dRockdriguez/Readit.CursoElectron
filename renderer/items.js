exports.toReadItems = JSON.parse(localStorage.getItem('toReadItems')) || []

// Save items in localStorage
exports.saveItems = () => {
    localStorage.setItem('toReadItems', JSON.stringify(this.toReadItems))
}

exports.addItem = (item) => {
    // Hide 'no items message'
    $('#no-items').hide()

    // new item html
    let itemHTML = `<a class="panel-block read-item">
                        <figure class="image has-shadow is-64x64 thumb">
                            <img src="${item.screenshot}">
                        </figure>
                        <h2 class="title is-4 column">${item.title}</h2>
                    </a>`
    $('#read-list').append(itemHTML)
}