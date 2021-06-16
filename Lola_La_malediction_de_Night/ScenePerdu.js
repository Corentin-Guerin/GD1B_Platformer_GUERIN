var menu_defaite;
var bouton_restart_jeu;


class ScenePerdu extends Phaser.Scene {
    constructor() {
      super("ScenePerdu");
      
    }
    preload (){ 
      this.load.image("menucontroles", "assets/images/menucontrole.png");
      this.load.spritesheet("boutonretour", "assets/images/boutonretour.png", { frameWidth:52, frameHeight: 40,});
    
    }

    create(){

      menu_defaite = this.add.image(448,224, 'menucontroles')
      .setDepth(1)
      .setScrollFactor(0);
    
      /*
      bouton_restart_jeu = this.add.sprite(80,380, 'boutonretour')
      .setDepth(2)
      .setScrollFactor(0)
      .setInteractive({ cursor: 'pointer' });

      const anims = this.anims;
      anims.create({
        key: 'bouton_restart_no',
        frames: this.anims.generateFrameNumbers('boutonretour', { start: 0, end: 0 }),
        frameRate: 5,
      });

      anims.create({
      key: 'bouton_restart_yes',
      frames: this.anims.generateFrameNumbers('boutonretour', { start: 1, end: 1 }),
      frameRate: 5,
      });
     */
    }

    update (){
/*
      bouton_retour_controles.on('pointerover', function (event) {
        bouton_retour_controles.anims.play('bouton_retour_yes',true);
    });

    bouton_retour_controles.on('pointerout', function (event) {
      bouton_retour_controles.anims.play('bouton_retour_no',true);
    });

    bouton_retour_controles.on('pointerdown', function (pointer) {


    });
    */
  }
}
