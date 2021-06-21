var menu_accueil;
var play_histoire = false;
var start_accueil;
var controles_accueil;
var info_controle_accueil = false ;
var credits_accueil;
var info_credits_accueil = false ;
var menu_accuil_ou_game = false ; 
var mobile_active = false;
var mobile_active_image;


class SceneMenu extends Phaser.Scene {
    constructor() {
      super("SceneMenu");
    }

    

    preload (){ 
      this.load.image("menu_accueil", "assets/images/menu.png");
      this.load.spritesheet("boutonstart", "assets/images/boutonstart.png", { frameWidth:287, frameHeight: 72,});
      this.load.spritesheet("boutoncontroles", "assets/images/boutoncontroles.png", { frameWidth:135, frameHeight: 39,});
      this.load.spritesheet("boutoncredits", "assets/images/boutoncredits.png", { frameWidth:135, frameHeight: 39,});
      this.load.spritesheet("mobile_active_image", "assets/images/activemobile.png", { frameWidth:60, frameHeight: 50,});
    }

    create(){

      mobile_active_image = this.add.sprite(190,400, 'mobile_active_image')
      .setDepth(2)
      .setScrollFactor(0)
      .setScale(0.7)
      .setInteractive({ cursor: 'pointer' });

      this.add.text(195, 382, "Version mobile ", {font: "18px monospace",fill: "#000000",padding: { x: 20, y: 10 }})
            .setDepth(12)
            .setScrollFactor(0);

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

      anims.create({
        key: 'bouton_mobile_non',
        frames: this.anims.generateFrameNumbers('mobile_active_image', { start: 0, end: 0 }),
        frameRate: 5,
        });
      
      anims.create({
        key: 'bouton_mobile_oui',
        frames: this.anims.generateFrameNumbers('mobile_active_image', { start: 1, end: 1 }),
        frameRate: 5,
        });
    }

    update (){

      mobile_active_image.on('pointerdown', function (pointer) {
        
        if(!mobile_active){
          setTimeout(function(){ mobile_active = true ;},300);
          mobile_active_image.anims.play('bouton_mobile_oui',true);
          console.log(mobile_active);
        }
        if(mobile_active){
           setTimeout(function(){ mobile_active = false ;},300);
           mobile_active_image.anims.play('bouton_mobile_non',true);
           console.log(mobile_active);
        }
      });
     

      start_accueil.on('pointerover', function (event) {
        start_accueil.anims.play('bouton_start_yes',true);
    });

    start_accueil.on('pointerout', function (event) {
      start_accueil.anims.play('bouton_start_no',true);
    });

    start_accueil.on('pointerdown', function (pointer) {
      
      play_histoire = true;   
    });

    if(play_histoire === true ){
      play_histoire = false ;
      this.scene.start("SceneHistoire");
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
