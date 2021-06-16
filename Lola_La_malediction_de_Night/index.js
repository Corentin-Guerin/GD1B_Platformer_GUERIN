
var config = {
    type: Phaser.AUTO,
    width: 896,
    height: 448,
    parent: "game-container",
    backgroundColor : 0x000000,
    pixelArt: false,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1000 },
            debug: false,
            fps:60
            
        }
    },
    input : {gamepad:true},
    scene: [SceneMenu,MenuControles,MenuCredits, Scene2,ScenePerdu,SceneGagne],
    scale: {zoom:1,}

};

var game = new Phaser.Game(config);
