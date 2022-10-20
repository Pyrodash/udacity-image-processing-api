window.addEventListener('load', () => {
    feather.replace()

    const el = document.getElementById('center')
    const fileInput = document.getElementById('fileInput')

    el.addEventListener('click', () => {
        fileInput.click()
    })

    el.addEventListener('dragover', (evt) => {
        evt.preventDefault()
    })

    el.addEventListener('drop', (evt) => {
        evt.preventDefault()

        const { files } = evt.dataTransfer

        for(let i = 0; i <)
    })
})
