var Player = function (x, y) {
    this.name = "Player"
    this.h = 64
    this.w = 32
    this.can_move_left_right = true
    this.velocity_x = 0
    this.velocity_y = 0
    this.gravity = 0.25
    this.friction = 0.6
    this.x = x
    this.y = y
    this.image = "player"
    this.update = function () {
        if(iskeydown(keybindings.D) && this.velocity_x > -6) { // Move Right
                this.velocity_x = 5
            }
            if(iskeydown(keybindings.A)) { // Move Left
                this.velocity_x = -5
            }
        if(!this.can_move_left_right && this.y > 500 - 129)
            this.can_move_left_right = true
        if(this.velocity_x && this.y === 500 - 128) {
            this.velocity_x += (this.velocity_x > 0) ? -this.friction : this.friction
        } else if (this.velocity_x) {
            this.velocity_x += (this.velocity_x > 0) ? -this.friction / 1.5 : this.friction / 1.5
        }
        if(this.velocity_y || this.y < (500 - 128)) {
            // Affect velocity with gravity
            this.velocity_y += this.gravity
            // Change YPos using velocity
            this.y += Math.floor(this.velocity_y)
            this.y = Math.floor(this.y)
        if(keys.W) {
            this.velocity_y = -3
        }
    }
}
}
