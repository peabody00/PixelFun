const base_url = "http://localhost:3000"
const userService = new UserService(base_url)

let gridColor = document.getElementById('colorPicker');
let gridHeight = document.getElementById('inputHeight');
let gridWidth = document.getElementById('inputWidth');
const submitButton = document.getElementById("submitButton");
const fill = document.getElementById('fill');
const fillArea = document.getElementById('fillArea');
const eyedropper = document.getElementById('eyedropper');
const grid = document.getElementById('pixelGrid');

// MAKE GRID TABLE

submitButton.addEventListener('click' , function(x){
	grid.innerHTML = " ";
	x.preventDefault();
	if (gridHeight.value > 64 || gridWidth.value > 64) {
		alert("Grid measurements cannot be greater than 64.")
	} else {
		makeGrid();	
	}	
});

function makeGrid(x) {
	for(let i=0 ; i<gridHeight.value ; i++){
		const row = grid.insertRow(0);
		for(let j=0 ; j<gridWidth.value ; j++){
			row.insertCell(0);
		}
	}
}

//HEX TO RGB

function RGBToHex(rgb) {
	// Choose correct separator
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	// Turn "rgb(r,g,b)" into [r,g,b]
	rgb = rgb.substr(4).split(")")[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	return "#" + r + g + b;
}

// DRAW TOOL - SINGLE PIXEL or FILL or EYEDROPPER

let fillBoolean = false;

grid.addEventListener('mousedown', function(x) {
	if (eyedropperBoolean === true) {
		if(x.target.nodeName === 'TD' && eyedropperBoolean === true){
			gridColor.value = RGBToHex(x.target.style.backgroundColor); 
			eyedropperBoolean = false
		}
	} else {
		if(x.target.nodeName === 'TD' && fillBoolean === false){
			x.target.style.backgroundColor = gridColor.value; 
			} else {
				let targetPixel = x.target
				let targetColumns = x.target.parentNode.childNodes
				let targetRow = x.target.parentNode
				let rowNumber = [...grid.rows].indexOf(targetRow)
				let colNumber = [...targetColumns].indexOf(targetPixel)
				targetColor = x.target.style.backgroundColor
				currentColor = gridColor.value
				fillBoolean = false
				const original = grid.rows[rowNumber].cells[colNumber];
				// floodFill(rowNumber,colNumber, currentColor, targetColor)
				fillBucket(rowNumber,colNumber, currentColor, targetColor, original)
			}	
	}
	
});

// DRAW TOOL - HOLD DOWN TO DRAW

let eraseBoolean = false;

grid.addEventListener('mousedown', function(e) {
	eraseBoolean = true;
	grid.addEventListener('mouseup', function() {
		eraseBoolean = false;
	});

    grid.addEventListener('mouseleave', function() {
		eraseBoolean = false;
    });

    grid.addEventListener('mouseover', function(x) {
    const color = document.getElementById('colorPicker').value;
        if (eraseBoolean) {
            if (e.target.tagName === 'TD') {
            x.target.style.backgroundColor = color;
            }
        }
    });
});

// EYEDROPPER

let eyedropperBoolean = false

eyedropper.addEventListener('click', function(x) {
    x.preventDefault();
	eyedropperBoolean = true;
});

// DOUBLE CLICK TO ERASE

grid.addEventListener('dblclick', function(x) {
	x.target.style.backgroundColor = null; 
});

// FILL TOOLS

fill.addEventListener('click', function(x) {
    x.preventDefault();
    const color = document.getElementById('colorPicker').value;
    grid.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});

fillArea.addEventListener('click', function(x) {
    x.preventDefault();
	fillBoolean = true;
	
});

// function floodFill(sr, sc, currentColor, targetColor) {
//     //Get the input which needs to be replaced.
// 	if (grid.rows[sr]) {
// 		current = grid.rows[sr].cells[sc];
// 	}
//     // const current = grid.rows[sr].cells[sc];
    
//     //If the newColor is same as the existing 
//     //Then return the original image.
//     if(current.style.backgroundColor === currentColor){
// 		console.log("first function")
//         return;
//     }
    
//     //Other wise call the fill function which will fill in the existing image.
//     fillBucket(sr, sc, currentColor,targetColor, current);
// };

function fillBucket(sr, sc, newColor, targetColor, current) {
	if (grid.rows[sr]) {
		current = grid.rows[sr].cells[sc];
	}

	console.log(sr,sc)

	if (sr < 0) {
		console.log("row less than 0")
        return;
    }

	if (sc < 0) {
		console.log("column less than 0")
        return;
    }

	if (sr > gridHeight.value - 1) {
		console.log("row greater than height")
        return;
    }

	if (sc > gridWidth.value - 1) {
		console.log("column greater than width")
        return;
    }

	if (grid.rows[sr].cells[sc] !== current) {
        return;
    }

	if (current.style.backgroundColor === targetColor) {
		current.style.backgroundColor = newColor
	}

	fillBucket(sr - 1, sc, newColor, targetColor, current);
	// fillBucket(sr + 1, sc, newColor, targetColor, current);
	// fillBucket(sr, sc - 1, newColor, targetColor, current);
	// fillBucket(sr, sc + 1, newColor, targetColor, current);


	// let up = grid.rows[sr - 1].cells[sc]
	// let down = grid.rows[sr + 1].cells[sc]
	// let left = grid.rows[sr].cells[sc - 1]
	// let right = grid.rows[sr].cells[sc + 1]

	// if (up.style.backgroundColor === targetColor) {
	// 	up.style.backgroundColor = newColor
	// }

	// if (down.style.backgroundColor === targetColor) {
	// 	down.style.backgroundColor = newColor
	// }

	// if (left.style.backgroundColor === targetColor) {
	// 	left.style.backgroundColor = newColor
	// }

	// if (right.style.backgroundColor === targetColor) {
	// 	right.style.backgroundColor = newColor
	// }
};











// document.addEventListener('DOMContentLoaded', welcome)

// function welcome() {
//     const h2 = document.createElement('h2')
//     const h3 = document.createElement('h3')
//     const guestButton = document.createElement('button')
//     const container = document.getElementById('welcome-container')
//     container.append(h2)
//     h2.innerText = 'Welcome to Pixel Fun'
//     container.append(h3)
//     h3.innerText = 'Please select an option'
//     container.append(guestButton)
//     guestButton.innerText = 'Continue as Guest'
//     guestButton.setAttribute('onclick', 'guestArtwork()')

// }

// function guestArtwork() {
//     const container = document.getElementById('welcome-container')
//     container.innerHTML = ''
//     addTools();
//     // new Artwork()
// }