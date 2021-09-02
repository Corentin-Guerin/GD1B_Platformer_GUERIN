var menu_victoire;
var bouton_restart_jeu;

class SceneGagne extends Phaser.Scene {
    constructor() {
      super("SceneGagne");
      
    }
    preload (){ 
      this.load.image("menuhappyend", "assets/images/menuhappyend.png");
      
      
    
    }

    create(){
      menu_victoire = this.add.image(448,224, 'menuhappyend')
      .setDepth(1)
      .setScrollFactor(0);

     
    }

    update (){
        this.input.on('pointerdown', function (pointer) {
		document.location.reload();
        
      
  }
}
