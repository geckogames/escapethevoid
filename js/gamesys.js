var VoidGame = function (gos) {
    this.gos = gos
    this.level = 0
    this.loadLevel = true
    this.levels = [
        new level_1()
    ]
}
var game;
screens[1] = {
    name: "GAME_SCREEN",
    ticks: 0,
    update: function () {
        if (this.ticks === 0)
            {
                game = new VoidGame(new gos_alpha)
                game.gos.loadLevel(game.levels[game.level])
            }
        ctx.drawImage(document.querySelector("#" + game.levels[game.level].bgimg), 0 - game.gos.objects[0].x, 0)
        for(var i = 0; i < game.gos.objects.length; i++) {
            if (game.gos.objects[i] ) {
                game.gos.objects[i].update(game.gos, this.ticks)
                ctx.drawImage(document.querySelector("#" + game.gos.objects[i].image), game.gos.objects[i].x, game.gos.objects[i].y)
            }
        }
    }
}
