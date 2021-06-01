var menu_victoire;
var bouton_restart_jeu;

class SceneGagne extends Phaser.Scene {
    constructor() {
      super("SceneGagne");
      
    }
    preload (){ 
      this.load.image("menucredits", "assets/images/menucredits.png");
      this.load.spritesheet("boutonretour", "assets/images/boutonretour.png", { frameWidth:52, frameHeight: 40,});
      
    
    }

    create(){
      menu_victoire = this.add.image(448,224, 'menucredits')
      .setDepth(1)
      .setScrollFactor(0);

     
    }

    update (){
      
  }
}
