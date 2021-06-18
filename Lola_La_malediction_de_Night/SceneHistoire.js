var txthistoire;
var play_accueil = false;

class SceneHistoire extends Phaser.Scene {
    constructor() {
      super("SceneHistoire");
      
    }
    preload (){ 
      this.load.image("txthistoire", "assets/images/txthistoire.png");
      
    }

    create(){
      txthistoire = this.add.image(448,224, 'txthistoire')
      .setDepth(1)
      .setScrollFactor(0)
      .setInteractive({ cursor: 'pointer' });;
    }

    update (){

      txthistoire.on('pointerdown', function (pointer) {
        play_accueil = true;   
      });
  
      if(play_accueil === true ){
        play_accueil = false ;
        this.scene.start("playGame");
      }

  }
}
