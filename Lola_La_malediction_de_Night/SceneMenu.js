var menu_accueil;
var play_accueil = false;
var start_accueil;
var controles_accueil;
var info_controle_accueil = false ;
var credits_accueil;
var info_credits_accueil = false ;

var menu_accuil_ou_game = false ; 

class SceneMenu extends Phaser.Scene {
    constructor() {
      super("SceneMenu");
    }

    

    preload (){ 
      this.load.image("menu_accueil", "assets/images/menu.png");
      this.load.spritesheet("boutonstart", "assets/images/boutonstart.png", { frameWidth:287, frameHeight: 72,});
      this.load.spritesheet("boutoncontroles", "assets/images/boutoncontroles.png", { frameWidth:135, frameHeight: 39,});
      this.load.spritesheet("boutoncredits", "assets/images/boutoncredits.png", { frameWidth:135, frameHeight: 39,});
    }

    create(){
      menu_accueil = this.add.image(448,224, 'menu_accueil')
      .setDepth(1)
      .setScrollFactor(0);

      start_accueil = this.add.sprite(660,350, 'boutonstart')
      .setDepth(2)
      .setScrollFactor(0)
      .setInteractive({ cursor: 'pointer' });

      
      controles_accueil = this.add.sprite(320,350, 'boutoncontroles')
      .setDepth(2)
      .setScrollFactor(0)
      .setInteractive({ cursor: 'pointer' });

      credits_accueil = this.add.sprite(150,350, 'boutoncredits')
      .setDepth(2)
      .setScrollFactor(0)
      .setInteractive({ cursor: 'pointer' });

      
      const anims = this.anims;
      anims.create({
        key: 'bouton_start_no',
        frames: this.anims.generateFrameNumbers('boutonstart', { start: 0, end: 0 }),
        frameRate: 5,
      });

      anims.create({
      key: 'bouton_start_yes',
      frames: this.anims.generateFrameNumbers('boutonstart', { start: 1, end: 1 }),
      frameRate: 5,
      });

      anims.create({
        key: 'bouton_controles_no',
        frames: this.anims.generateFrameNumbers('boutoncontroles', { start: 0, end: 0 }),
        frameRate: 5,
      });

      anims.create({
      key: 'bouton_controles_yes',
      frames: this.anims.generateFrameNumbers('boutoncontroles', { start: 1, end: 1 }),
      frameRate: 5,
      });
      
      anims.create({
        key: 'bouton_credits_no',
        frames: this.anims.generateFrameNumbers('boutoncredits', { start: 0, end: 0 }),
        frameRate: 5,
      });

      anims.create({
      key: 'bouton_credits_yes',
      frames: this.anims.generateFrameNumbers('boutoncredits', { start: 1, end: 1 }),
      frameRate: 5,
      });


    }

    update (){

      start_accueil.on('pointerover', function (event) {
        start_accueil.anims.play('bouton_start_yes',true);
    });

    start_accueil.on('pointerout', function (event) {
      start_accueil.anims.play('bouton_start_no',true);
    });

    start_accueil.on('pointerdown', function (pointer) {
      
      play_accueil = true;   
    });

    if(play_accueil === true ){
      play_accueil = false ;
      this.scene.start("playGame");
    }

    controles_accueil.on('pointerover', function (event) {
      controles_accueil.anims.play('bouton_controles_yes',true);
    });

    controles_accueil.on('pointerout', function (event) {
      controles_accueil.anims.play('bouton_controles_no',true);
    });

    controles_accueil.on('pointerdown', function (pointer) {
     
      info_controle_accueil = true;   
    });
    
    if(info_controle_accueil === true ){
      info_controle_accueil = false ;
      this.scene.start("MenuControles");
    }

    credits_accueil.on('pointerover', function (event) {
      credits_accueil.anims.play('bouton_credits_yes',true);
    });

    credits_accueil.on('pointerout', function (event) {
      credits_accueil.anims.play('bouton_credits_no',true);
    });

    credits_accueil.on('pointerdown', function (pointer) {
      
      info_credits_accueil = true;   
    });
    
    if(info_credits_accueil === true ){
      info_credits_accueil = false ;
      this.scene.start("MenuCredits");
    }


  }
}
