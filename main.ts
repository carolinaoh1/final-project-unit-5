function createLevel (levelNumber: number) {
    // Resources to collect increase with levels
    resourceCount = 5 + levelNumber * 3
    spaceship.setPosition(80, 100)
}
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
let spaceship: Sprite = null
let resourceCount = 0
let Level = 1
createSpaceship()
createLevel(Level)
info.setLife(5)
