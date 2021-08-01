kaboom({
    global: true,
    width: 768,
    height: 768,
    scale: 1,
    debug: true,
    clearColor: [0, 1, 0, 0.7]
});

const MOVE_SPEED = 288

function getDir(x, y) {
    if (x === 0 && y === -1) {
        return 'up'
    }

    if (x === 0 && y === 1) {
        return 'down'
    }

    if (x === 1 && y === 0) {
        return 'right'
    }

    if (x === -1 && y === 0) {
        return 'left'
    }
}



function loadAssets() {
    loadRoot('https://i.imgur.com/')
    loadSprite('bomberman-going-down', 'PSOPusb.gif')
    loadSprite('bomberman-going-up', 'waYh8Ry.gif')
    loadSprite('bomberman-going-left', '3Yn85R7.gif')
    loadSprite('bomberman-going-right', 'DOUX7V8.gif')
    loadSprite('brick', 'ubkV4AJ.gif')
    loadSprite('metal', 'ueT6S19.gif')
    loadSprite('bomb', 'wFWcCSD.gif')
    loadSprite('boom', 'tZ4TmtL.gif')
    loadSprite('boom-up', 'kcSGqkI.gif')
    loadSprite('boom-down', 'iBy4HBG.gif')
    loadSprite('boom-left', 'XyLwCw9.gif')
    loadSprite('boom-right', 'OUoXDms.gif')
    loadSprite('boom-mid', 'y61qmEi.gif')
    loadSprite('boom-horizontal', 'mW8T9hA.gif')
    loadSprite('boom-vertical', 'mx6xZFB.gif')
}

loadAssets()
scene('main', () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = addLevel([
        "================",
        "=   #  ###     =",
        "=       =   ## =",
        "=   =  ##   =  =",
        "=   #          =",
        "= # #     ###  =",
        "= # =      =   =",
        "=   ##    ###  =",
        "=   =          =",
        "=       ##=#   =",
        "=       =      =",
        "=     ####=    =",
        "= #   =     ## =",
        "= #            =",
        "= #  ##=###    =",
        "================",
    ], {
        width: 48,
        height: 48,
        "=": [
            sprite("metal"),
            area(vec2(1), vec2(0.7)),
            solid(),
            "mat",

        ],
        "#": [
            sprite("brick"),
            area(vec2(1), vec2(0.7)),
            solid(),
            "mat",

        ]
    });

    const player = add([
        sprite('bomberman-going-down'),
        pos(64, 190),
        scale(vec2(0.85, 0.55)),

        {
            dir: vec2(0, 1),
        },
    ])


    player.action(() => {
        player.pushOutAll();
    })


    keyDown('left', () => {
        player.changeSprite('bomberman-going-left')
        player.move(-MOVE_SPEED, 0)
        player.dir = vec2(-1, 0)
    })

    keyDown('right', () => {
        player.changeSprite('bomberman-going-right')
        player.move(MOVE_SPEED, 0)
        player.dir = vec2(1, 0)
    })

    keyDown('up', () => {
        player.changeSprite('bomberman-going-up')
        player.move(0, -MOVE_SPEED)
        player.dir = vec2(0, -1)
    })

    keyDown('down', () => {
        player.changeSprite('bomberman-going-down')
        player.move(0, MOVE_SPEED)
        player.dir = vec2(0, 1)
    })

    function spawnBomb(p) {
        const bomb = add([sprite('bomb'), pos(p), scale(vec2(0.8, 0.8)), solid(), 'bomb'])
        wait(1.5, () => {
            destroy(bomb)
            add([
                sprite('boom-mid'),
                pos(p),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-horizontal'),
                pos(p.add(vec2(40, 6))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-horizontal'),
                pos(p.add(vec2(-40, 6))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-vertical'),
                pos(p.add(vec2(6, 40))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-vertical'),
                pos(p.add(vec2(6, -40))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-down'),
                pos(p.add(vec2(6, 77))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-up'),
                pos(p.add(vec2(6, -70))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-left'),
                pos(p.add(vec2(-77, 6))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            add([
                sprite('boom-right'),
                pos(p.add(vec2(80, 6))),
                scale(vec2(2.5, 2.5)),
                'boom'
            ])

            wait(0.5, () => {
                destroyAll("boom")
            })
        })
    }

    keyPress('space', () => {
        spawnBomb(player.pos.add(player.dir.scale(48)))

    })
})

go('main')



