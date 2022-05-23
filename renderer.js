const filePathElement = document.getElementById('filePath')
const btn = document.getElementById('btn')

btn.addEventListener('click', async () => {
   const filePath = await window.electronAPI.openFile()
   filePathElement.innerText = filePath
})
