const base_url = "http://localhost:3000"
const userService = new UserService(base_url)
// const artworkService = new ArtworkService(base_url)

let gridColor = document.getElementById('colorPicker')
let gridHeight = document.getElementById('inputHeight')
let gridWidth = document.getElementById('inputWidth')
const submitButton = document.getElementById("submitButton")
const fill = document.getElementById('fill')
const fillArea = document.getElementById('fillArea')
const eyedropper = document.getElementById('eyedropper')
const grid = document.getElementById('pixelGrid')

let currentUser = {}

window.oncontextmenu = (e) => {
	e.preventDefault()
}

// MAKE GRID TABLE

submitButton.addEventListener('click' , function(x){
	grid.innerHTML = ""
	x.preventDefault()
	if (gridHeight.value > 64 || gridWidth.value > 64 || gridHeight.value == 0 || gridWidth.value == 0) {
		alert("Grid measurements cannot be greater than 64 or 0.")
	} else {
		makeGrid();
		artworkTitle.value = ""
		hideUpdateShowSaveButton()
	}
})

function makeGrid() {
	for(let i=0 ; i<gridHeight.value ; i++){
		const row = grid.insertRow(0)
		for(let j=0 ; j<gridWidth.value ; j++){
			row.insertCell(0)
		}
	}
}

//HEX TO RGB

function RGBToHex(rgb) {
	// Choose correct separator
	let sep = rgb.indexOf(",") > -1 ? "," : " "
	// Turn "rgb(r,g,b)" into [r,g,b]
	rgb = rgb.substr(4).split(")")[0].split(sep)

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16)

	if (r.length == 1)
		r = "0" + r
	if (g.length == 1)
		g = "0" + g
	if (b.length == 1)
		b = "0" + b

	return "#" + r + g + b
}

// DRAW TOOL - SINGLE PIXEL or FILL or EYEDROPPER

let fillBoolean = false

grid.addEventListener('mousedown', function(x) {
	if (eyedropperBoolean === true) {
		if(x.target.nodeName === 'TD' && eyedropperBoolean === true){
			gridColor.value = RGBToHex(x.target.style.backgroundColor) 
			eyedropperBoolean = false
		}
	} else {
		if(x.target.nodeName === 'TD' && fillBoolean === false){
			x.target.style.backgroundColor = gridColor.value
			} else {
				let targetPixel = x.target
				let targetColumns = x.target.parentNode.childNodes
				let targetRow = x.target.parentNode
				let rowNumber = [...grid.rows].indexOf(targetRow)
				let colNumber = [...targetColumns].indexOf(targetPixel)
				targetColor = x.target.style.backgroundColor
				currentColor = gridColor.value
				fillBoolean = false
				const original = grid.rows[rowNumber].cells[colNumber]
				fillBucket(rowNumber,colNumber, currentColor, targetColor, original)
			}	
	}	
})

// DRAW TOOL - HOLD DOWN TO DRAW

let eraseBoolean = false

grid.addEventListener('mousedown', function(e) {
	eraseBoolean = true
	grid.addEventListener('mouseup', function() {
		eraseBoolean = false
	});

    grid.addEventListener('mouseleave', function() {
		eraseBoolean = false
    })

    grid.addEventListener('mouseover', function(x) {
    const color = document.getElementById('colorPicker').value
        if (eraseBoolean) {
            if (e.target.tagName === 'TD') {
            x.target.style.backgroundColor = color
            }
        }
    })
})

// EYEDROPPER

let eyedropperBoolean = false

eyedropper.addEventListener('click', function(x) {
    x.preventDefault()
	eyedropperBoolean = true
})

// RIGHT CLICK TO ERASE

grid.addEventListener('contextmenu', function(x) {
	x.target.style.backgroundColor = null
})

// FILL TOOLS

fill.addEventListener('click', function(x) {
    x.preventDefault()
    const color = document.getElementById('colorPicker').value;
    grid.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});

fillArea.addEventListener('click', function(x) {
    x.preventDefault()
	fillBoolean = true
})


function fillBucket(sr, sc, newColor, targetColor, current) {
	if (grid.rows[sr]) {
		current = grid.rows[sr].cells[sc]
	}

	if (sr < 0) {
        return
    }

	if (sc < 0) {
        return
    }

	if (sr > gridHeight.value - 1) {
        return
    }

	if (sc > gridWidth.value - 1) {
        return
    }

	if (grid.rows[sr].cells[sc] !== current) {
        return
    }

	if (current.style.backgroundColor === targetColor) {
		current.style.backgroundColor = newColor
	} else {
		return
	}

	fillBucket(sr - 1, sc, newColor, targetColor, current);
	fillBucket(sr + 1, sc, newColor, targetColor, current);
	fillBucket(sr, sc - 1, newColor, targetColor, current);
	fillBucket(sr, sc + 1, newColor, targetColor, current);
}