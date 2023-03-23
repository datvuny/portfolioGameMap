const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

// Add touch event listeners
canvas.addEventListener('touchstart', onTouchStart);
canvas.addEventListener('touchmove', onTouchMove);
canvas.addEventListener('touchend', onTouchEnd);

let touchStartPos = { x: 0, y: 0 };
let touchEndPos = { x: 0, y: 0 };

function onTouchStart(event) {
  touchStartPos.x = event.touches[0].pageX;
  touchStartPos.y = event.touches[0].pageY;
}

function onTouchMove(event) {
  event.preventDefault();
  touchEndPos.x = event.touches[0].pageX;
  touchEndPos.y = event.touches[0].pageY;
  movePlayer();
}

function onTouchEnd(event) {
  touchStartPos = { x: 0, y: 0 };
  touchEndPos = { x: 0, y: 0 };
}

function movePlayer() {
  const dx = touchEndPos.x - touchStartPos.x;
  const dy = touchEndPos.y - touchStartPos.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      // move right
      keys.d.pressed = true;
      keys.a.pressed = false;
      keys.w.pressed = false;
      keys.s.pressed = false;
    } else {
      // move left
      keys.a.pressed = true;
      keys.d.pressed = false;
      keys.w.pressed = false;
      keys.s.pressed = false;
    }
  } else {
    if (dy > 0) {
      // move down
      keys.s.pressed = true;
      keys.w.pressed = false;
      keys.a.pressed = false;
      keys.d.pressed = false;
    } else {
      // move up
      keys.w.pressed = true;
      keys.s.pressed = false;
      keys.a.pressed = false;
      keys.d.pressed = false;
    }
  }
}






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

