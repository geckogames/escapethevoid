var gos_alpha = function () {
    this.name = "Escape the Void GOS Engine"
    this.objects = []
    this.loadLevel = function (level) {
        level.objects = (new level.constructor()).objects;
        this.objects = level.objects
        this.needtokill = level.needtokill
        nomusic();
        screens[1].music = level.music;
    }
}
