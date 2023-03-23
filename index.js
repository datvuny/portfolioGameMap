const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i <collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const linkedinMap = []
for (let i = 0; i <linkedinData.length; i+=70){
    linkedinMap.push(linkedinData.slice(i, 70 + i))
}
const githubMap = []
for (let i = 0; i <githubData.length; i+=70){
    githubMap.push(githubData.slice(i, 70 + i))
}
const npmceedMap = []
for (let i = 0; i <npmceedData.length; i+=70){
    npmceedMap.push(npmceedData.slice(i, 70 + i))
}

const nftMap = []
for (let i = 0; i <nftData.length; i+=70){
    nftMap.push(nftData.slice(i, 70 + i))
}

const boundaries = []
const offset = {
    x:-380,
    y:-155
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if (symbol === 2952)
        boundaries.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

const linkedin = []
linkedinMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if (symbol === 2952)
        linkedin.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

const github = []
githubMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if (symbol === 2952)
        github.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

const npmceed = []
npmceedMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if (symbol === 2952)
        npmceed.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

const nft = []
nftMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if (symbol === 2952)
        nft.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

const image = new Image()
image.src = './img/portTownMap.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png' 

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'


const player = new Sprite({
    position: {
        x:canvas.width/2 - 192/2,
        y:canvas.height/2 - 68/2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, ...linkedin, ...github, ...npmceed, ...nft]
function rectangularCollision({ rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
     window.requestAnimationFrame(animate)
     background.draw()
     boundaries.forEach(boundary => {
        boundary.draw()
     })
     linkedin.forEach(linked => {
        linked.draw()
     })
     github.forEach(git => {
        git.draw()
     })
     npmceed.forEach(npm => {
        npm.draw()
     })
     nft.forEach(n => {
        n.draw()
     })

     player.draw()

     let navigationInProgress = false;
     if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed ) {
         if (!navigationInProgress) {
             for (let i = 0; i <linkedin.length; i++) {
                 const linked = linkedin[i]
                 if (rectangularCollision({ rectangle1: player, rectangle2: linked })) {
                     navigationInProgress = true;
                     window.location.href = "https://www.linkedin.com/in/dat-qvu/"
                     break;
                 }
             }
         }
     }
     if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed ) {
        if (!navigationInProgress) {
            for (let i = 0; i <github.length; i++) {
                const git = github[i]
                if (rectangularCollision({ rectangle1: player, rectangle2: git })) {
                    navigationInProgress = true;
                    window.location.href = "https://github.com/datvuny"
                    break;
                }
            }
        }
    }
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed ) {
        if (!navigationInProgress) {
            for (let i = 0; i <npmceed.length; i++) {
                const npm = npmceed[i]
                if (rectangularCollision({ rectangle1: player, rectangle2: npm })) {
                    navigationInProgress = true;
                    window.location.href = "https://npmceed-data-visualization.onrender.com/"
                    break;
                }
            }
        }
    }
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed ) {
        if (!navigationInProgress) {
            for (let i = 0; i <nft.length; i++) {
                const n = nft[i]
                if (rectangularCollision({ rectangle1: player, rectangle2: n })) {
                    navigationInProgress = true;
                    window.location.href = "https://opensea.io/collection/babyboredapepunks-collection"
                    break;
                }
            }
        }
    }

        
     let moving = true
     player.moving = false
        if (keys.w.pressed && lastKey === 'w') {
            player.moving = true
            player.image = player.sprites.up

            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
            rectangularCollision({
                rectangle1: player,
                rectangle2:{ ...boundary, 
                     position: {
                    x: boundary.position.x,
                    y: boundary.position.y +3
                }}
            })
        ) {
                moving = false
                break
        }
            }
            

            if (moving)
            movables.forEach(movable => {movable.position.y +=3})
            }
        else if (keys.a.pressed && lastKey === 'a') {
            player.moving = true
            player.image = player.sprites.left
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
            rectangularCollision({
                rectangle1: player,
                rectangle2:{ ...boundary, position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                }}
            })
        ) {
                moving = false
                break
        }
            }
            if (moving)
            movables.forEach(movable => {movable.position.x +=3})}
        else if (keys.s.pressed && lastKey === 's') {
            player.moving = true
            player.image = player.sprites.down
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
            rectangularCollision({
                rectangle1: player,
                rectangle2:{ ...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y -3
                }}
            })
        ) {
                moving = false
                break
        }
            }
            if (moving)
            movables.forEach(movable => {movable.position.y -=3})}
        else if (keys.d.pressed && lastKey === 'd') {
            player.moving = true
            player.image = player.sprites.right
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
            rectangularCollision({
                rectangle1: player,
                rectangle2:{ ...boundary, position: {
                    x: boundary.position.x-3,
                    y: boundary.position.y
                }}
            })
        ) {
                moving = false
                break
        }
            }
            if (moving)
            movables.forEach(movable => {movable.position.x -=3})}
    }

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
        case 'ArrowDown':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = false
            break
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = false
            break
        case 's':
        case 'ArrowDown':
            keys.s.pressed = false
            break
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = false
            break
    }
})

let clicked = false
addEventListener('click', () => {
    if (!clicked){
        audio.Map.play()
        clicked = true
    }
})
addEventListener('keydown', (event) => {
    if (!clicked){
        audio.Map.play()
        clicked = true
    }
})


// add touch event listeners to canvas
canvas.addEventListener('touchstart', handleTouchStart, false)
canvas.addEventListener('touchend', handleTouchEnd, false)
canvas.addEventListener('touchmove', handleTouchMove, false)

// initialize touch position variable
let touchPosition = null

// touch start event handler
function handleTouchStart(event) {
    // prevent default behavior of touch events
    event.preventDefault()
    
    // get the first touch position
    touchPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
    }
}

// touch end event handler
function handleTouchEnd(event) {
    // prevent default behavior of touch events
    event.preventDefault()

    // reset touch position
    touchPosition = null
}

// touch move event handler
function handleTouchMove(event) {
    // prevent default behavior of touch events
    event.preventDefault()

    // get the current touch position
    const currentTouchPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
    }

    // calculate the touch movement vector
    const touchVector = {
        x: currentTouchPosition.x - touchPosition.x,
        y: currentTouchPosition.y - touchPosition.y
    }

    // update the touch position
    touchPosition = currentTouchPosition

    // determine the direction of touch movement
    let direction = null
    if (Math.abs(touchVector.x) > Math.abs(touchVector.y)) {
        direction = touchVector.x > 0 ? 'right' : 'left'
    } else {
        direction = touchVector.y > 0 ? 'down' : 'up'
    }

    // update the keys object based on touch movement direction
    switch (direction) {
        case 'up':
            keys.w.pressed = true
            break
        case 'left':
            keys.a.pressed = true
            break
        case 'down':
            keys.s.pressed = true
            break
        case 'right':
            keys.d.pressed = true
            break
    }
}

// keyboard event listeners
document.addEventListener('keydown', event => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = true
            break
        case 'KeyA':
            keys.a.pressed = true
            break
        case 'KeyS':
            keys.s.pressed = true
            break
        case 'KeyD':
            keys.d.pressed = true
            break
    }
})

document.addEventListener('keyup', event => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = false
            break
        case 'KeyA':
            keys.a.pressed = false
            break
        case 'KeyS':
            keys.s.pressed = false
            break
        case 'KeyD':
            keys.d.pressed = false
            break
    }
})
