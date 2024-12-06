function createAsteroids (levelNumber: number) {
    for (let index = 0; index < 3 + levelNumber * 2; index++) {
        asteroid = sprites.create(img`
            . . . . . . . . b . . . . . . . 
            . . . . . . b d d c . . . . . . 
            . . . . . b 1 1 d d c . . . . . 
            . . . . b 1 1 1 d 1 1 b . . . . 
            . . . . c 1 1 1 d 1 1 1 c c . . 
            b b b c d 1 1 c c 1 1 d 1 1 b b 
            b d 1 1 d d b c c c b d 1 1 1 b 
            b 1 1 1 1 c c . . c d d 1 1 1 b 
            b 1 1 1 1 c c . . b 1 1 d d c . 
            . b 1 1 d d b c b b 1 1 b c c . 
            . . c b d d b 1 1 b b d b c . . 
            . . c 1 1 d d 1 1 1 d d d b . . 
            . b d 1 1 1 d 1 1 d 1 1 1 d b . 
            . b d 1 1 1 d b b d 1 1 1 1 b . 
            . . b 1 1 d c c b b d 1 1 d b . 
            . . b b b b . . . b b b b b b . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(asteroid, assets.tile`transparency16`)
        asteroid.setVelocity(randint(-30, 30), randint(-30, 30))
        asteroid.setBounceOnWall(true)
    }
}
function createLevel (levelNumber: number) {
    // Resources to collect increase with levels
    resourceCount = 5 + levelNumber * 3
    placeResources(resourceCount)
    createAsteroids(levelNumber)
    createEnemyShips(levelNumber)
    spaceship.setPosition(80, 100)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy) {
    projectile.destroy(effects.fire)
    enemy.destroy(effects.ashes)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . 2 1 1 1 2 . . . . . 
        . . . . . . 2 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceship, 0, -100)
    laser.setKind(SpriteKind.Projectile)
})
function placeResources (count: number) {
    for (let index = 0; index < count; index++) {
        resource = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . b 5 5 5 b . . . . . 
            . . . . . b b 5 5 5 b b . . . . 
            . . b b b b 5 5 5 1 1 b b b b . 
            . . b 5 5 5 5 5 5 1 1 5 5 5 b . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b d d 5 5 5 5 5 d d b . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c 5 5 d d b d d 5 5 c . . 
            . . . c 5 d d c c c d d 5 c . . 
            . . . c c c c . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnRandomTile(resource, assets.tile`transparency16`)
    }
}
function nextLevel () {
    if (Level < 3) {
        Level += 1
        createLevel(Level)
    } else {
        game.over(true, effects.confetti)
    }
}
function createEnemyShips (levelNumber: number) {
    for (let index = 0; index < levelNumber; index++) {
        enemyShip = sprites.create(img`
            ....ffffff.........ccc..
            ....ff99ccf.......cc9f..
            .....ffccccfff...cc99f..
            ....cc69996666cccc996f..
            ...c9b6666666666cc966f..
            ..c999b6666666666666fc..
            .c6b99111b666666666c66c.
            c666b111996666ccccccc66f
            f666666666666c666ccfffff
            .f6666666666996666f.....
            ..ff6666666cf996666f....
            ....ffffffffff996666c...
            .........f6cfffc6666c...
            .........fcc6ffffffff...
            ..........fc6ffff.......
            ...........fffff........
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemyShip, assets.tile`transparency16`)
        enemyShip.follow(spaceship, 40 + levelNumber * 10)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    resourceCount += -1
    otherSprite.destroy(effects.hearts)
    if (resourceCount <= 0) {
        nextLevel()
    }
})
function createSpaceship () {
    spaceship = sprites.create(img`
        ....ffffff.........ccc..
        ....ff22ccf.......cc4f..
        .....ffccccfff...cc44f..
        ....cc24442222cccc442f..
        ...c9b4422222222cc422f..
        ..c999b2222222222222fc..
        .c2b99111b222222222c22c.
        c222b111992222ccccccc22f
        f222222222222c222ccfffff
        .f2222222222442222f.....
        ..ff2222222cf442222f....
        ....ffffffffff442222c...
        .........f2cfffc2222c...
        .........fcc2ffffffff...
        ..........fc2ffff.......
        ...........fffff........
        `, SpriteKind.Player)
    controller.moveSprite(spaceship, 100, 100)
    spaceship.setStayInScreen(true)
    scene.cameraFollowSprite(spaceship)
}
let enemyShip: Sprite = null
let resource: Sprite = null
let laser: Sprite = null
let spaceship: Sprite = null
let resourceCount = 0
let asteroid: Sprite = null
let Level = 0
Level = 1
createSpaceship()
createLevel(Level)
info.setLife(5)
