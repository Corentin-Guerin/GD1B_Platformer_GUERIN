var menu_defaite;
var bouton_restart_jeu;


class ScenePerdu extends Phaser.Scene {
    constructor() {
      super("ScenePerdu");
      
    }
    preload (){ 
      this.load.image("menubadend", "assets/images/menubadend.png");
     
    
    }

    create(){

      menu_defaite = this.add.image(448,224, 'menubadend')
      .setDepth(1)
      .setScrollFactor(0);
    
     
    }

    update (){

  }
}
