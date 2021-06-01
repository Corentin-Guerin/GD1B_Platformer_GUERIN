var menu_credits;
var retour_accueil = false;
var bouton_retour_credits;

class MenuCredits extends Phaser.Scene {
    constructor() {
      super("MenuCredits");
      
    }
    preload (){ 
      this.load.image("menucredits", "assets/images/menucredits.png");
      this.load.spritesheet("boutonretour", "assets/images/boutonretour.png", { frameWidth:52, frameHeight: 40,});
    
    }

    create(){

      menu_credits = this.add.image(448,224, 'menucredits')
      .setDepth(1)
      .setScrollFactor(0);

      bouton_retour_credits = this.add.sprite(80,380, 'boutonretour')
      .setDepth(2)
      .setScrollFactor(0)
      .setInteractive({ cursor: 'pointer' });

      const anims = this.anims;
      anims.create({
        key: 'bouton_retour_no',
        frames: this.anims.generateFrameNumbers('boutonretour', { start: 0, end: 0 }),
        frameRate: 5,
      });

      anims.create({
      key: 'bouton_retour_yes',
      frames: this.anims.generateFrameNumbers('boutonretour', { start: 1, end: 1 }),
      frameRate: 5,
      });
     
    }

    update (){

      bouton_retour_credits.on('pointerover', function (event) {
        bouton_retour_credits.anims.play('bouton_retour_yes',true);
    });

    bouton_retour_credits.on('pointerout', function (event) {
      bouton_retour_credits.anims.play('bouton_retour_no',true);
    });

    bouton_retour_credits.on('pointerdown', function (pointer) {
      retour_accueil = true;   
    });

    if(retour_accueil === true ){
      retour_accueil = false ;
      this.scene.start("SceneMenu");
    }
      
  }
}
