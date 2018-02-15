function updateBombs() {
    bombCount = document.getElementById("id_disappointment").value
    for(var el of document.getElementsByClassName("disChCover")) {
        if(el.id[el.id.length-1]<=bombCount)
            el.style.visibility="visible"
        else
            el.style.visibility="hidden"
    }
}    
function handleBombSelection(e) {
    var selectedValue = e.target.id[e.target.id.length-1]
    document.getElementById("id_disappointment").value = selectedValue
    updateBombs()
}
for(var el of Array.from(document.getElementsByClassName("disChCover")).concat(
              Array.from(document.getElementsByClassName("disChBackground"))))  {
    el.addEventListener('mousedown', handleBombSelection)
    el.addEventListener('touchstart', handleBombSelection)
    el.ondragstart = function() { return false; };
}
function handleZeroBombSelection(e) {
    document.getElementById("id_disappointment").value=0
    updateBombs()
}
document.getElementById("disZeroBomb").addEventListener("mousedown", handleZeroBombSelection)
document.getElementById("disZeroBomb").addEventListener("touchstart", handleZeroBombSelection)
document.getElementById("disZeroBomb").ondragstart = function() { return false; };

document.getElementById("id_disappointment").addEventListener("change", function(e) {
    updateBombs()
})
addEventListener("load", function(e) {
    updateBombs()
})

function setDisappointmentWidgetElementsInline() {
    for(var i of Array.from(document.getElementsByClassName('disChIconCon'))) { i.style.display='inline-block' }
    for(var i of Array.from(document.getElementsByClassName('disChBackground'))) { i.style.display='inline' }
    for(var i of Array.from(document.getElementsByClassName('disChCover'))) { i.style.display='inline' }
    document.getElementById('disZeroBomb').style.display='inline'
}

function setDisappointmentDivShape() {
    for(var i of Array.from(document.getElementsByClassName("disappointmentChooser"))) { i.style.height="2em" }
}

function disableFallbackDisappointmentWidget() {
    document.getElementById("id_disappointment").disabled=true
    document.getElementById("id_disappointment").style['-webkit-appearance']='none'
    document.getElementById("id_disappointment").style['-moz-appearance']='none'
    document.getElementById("postForm").addEventListener("submit", function(e) {
        document.getElementById("id_disappointment").disabled=false
    })
}

function switchFromSelectToBombWidget() {
    setDisappointmentWidgetElementsInline()
    disableFallbackDisappointmentWidget()
    setDisappointmentDivShape()
}

switchFromSelectToBombWidget()
