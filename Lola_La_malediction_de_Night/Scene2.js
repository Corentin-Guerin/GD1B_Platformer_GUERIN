
var cursors;
var player;
var gameOver =false;
var invincible = false ;

var cursors2;
var direction = 'up';

var gamepad;
var paddle;
var padConnected;
var pad; 

var worldLayer;
var etat_brume = false ;
var ornement;
var brume;
var jauge_corruption;
var checkpoint = 0 ;

var onGround;

var corruption = 0 ;
var corrompu = false ;
var life = 3 ;
var compteurinvincible = 60;

var enemie1;
var enemies1;
var compteur_sens_enemie1 = 0;
var sens_enemie1;
var enemie2;
var enemies2;
var randomX;
var randomY;
var projectils;
var projectil;
var enemie3;
var enemies3;


var grille_activ = false ;
var grille ;
var boss;
var boss_spawn1;
var boss_spawn2;
var boss_spawn3;
var projectil_boss_etat = false;
var projectils_boss;
var projectil_boss;
var possistion_boss;
var cd_tire_boss = 0 ;
var boss_calm = true ;
var compteur_sens_boss = 0 ;
var compteur_boss_enrage = 0 ;
var sens_boss ;
var boss_vivant = false ;
var pv_boss = 3;
var invulenrableboss = false;

var get_item1 = false ;
var item1;
var doublejump = false;
var jump_count = 0;

var get_item2 = false ;
var item2;
var item_baton_du_temp = false;
var compteur_sort_baton = true ;
var sort_pause = false ;


var get_item3 = false ;
var item3;

var invincible_bouclier = false ;
var compteur_bouclier = 180 ;
var compteur_sort_bouclier = 0 ;


class Scene2 extends Phaser.Scene{
    constructor(){
      super("playGame");
    
    }
  
    preload (){ 


        this.load.image("tiles", "assets/tilesets/tiledset.png");
        this.load.image("ornement", "assets/decoecrant.png");
        this.load.image("baground", "assets/images/baground.png");
        this.load.image("baground1", "assets/images/baground1.png");
        this.load.image("baground2", "assets/images/baground2.png");
        this.load.image("baground25", "assets/images/baground25.png");
        this.load.image("baground3", "assets/images/baground3.png");
        this.load.image("baground4", "assets/images/baground4.png");
        this.load.image("brume", "assets/images/brume.png");
        this.load.image("brumes", "assets/images/brumes.png");
        this.load.image("grille", "assets/images/grille.png");
        this.load.spritesheet("jauge_corruption", 'assets/tilesets/corruption2.png', { frameWidth:198, frameHeight: 55,});

        //this.load.tilemapTiledJSON("map", "assets/tilemaps/maptest.json");
        this.load.tilemapTiledJSON("map", "assets/tilemaps/Niveau.json");
		this.load.spritesheet("Ennemie3", 'assets/tilesets/Ennemie3.png', { frameWidth:64, frameHeight: 64,});
        this.load.spritesheet("Ennemie2", 'assets/tilesets/Ennemie2.png', { frameWidth:64, frameHeight: 64,});
        this.load.spritesheet("Ennemie1", 'assets/tilesets/Ennemie1.png', { frameWidth:111, frameHeight: 80,});
        this.load.spritesheet("Boss", 'assets/tilesets/boss.png', { frameWidth:64, frameHeight: 64,});
        this.load.spritesheet("projectilboss", 'assets/tilesets/projectilboss.png', { frameWidth:64, frameHeight: 64,});
        this.load.spritesheet("projectil", 'assets/tilesets/projectil.png', { frameWidth:32, frameHeight: 32,});
        this.load.spritesheet("player", 'assets/Lola2.png', { frameWidth:64, frameHeight: 96,});
        
       
    }

    create(){
     
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tiledset", "tiles");

        map.createLayer("decorchateau", tileset, 0, 0);
 
        worldLayer = map.createLayer("wall", tileset, 0, 0);
        
        map.createLayer("sol", tileset, 0, 0);
        map.createLayer("deco", tileset, 0, 0);
        map.createLayer("deco2", tileset, 0, 0); 
        
        
        //const drapeau = map.createLayer("Drapeau", tileset, 0, 0);
        worldLayer.setCollisionByExclusion(-1,true) ;
        //drapeau.setCollisionByExclusion(-1,true) ;

        this.add.image(896,224, 'baground4').setDepth(-1).setScrollFactor(0.12).setScale(0.6);
        this.add.image(896,224, 'baground3').setDepth(-2).setScrollFactor(0.11).setScale(0.6);
        this.add.image(896,224, 'baground25').setDepth(-3).setScrollFactor(0.10).setScale(0.6);
        this.add.image(896,224, 'baground2').setDepth(-4).setScrollFactor(0.08).setScale(0.6);
        this.add.image(896,224, 'baground1').setDepth(-5).setScrollFactor(0.04).setScale(0.6);
        this.add.image(896,224, 'baground').setDepth(-6).setScrollFactor(0.0).setScale(0.6);
        this.add.image(4000,400, 'brumes').setDepth(2).setScrollFactor(1).setScale(1);

        ornement = this.add.image(448,224, 'ornement')
        .setDepth(5)
        .setScrollFactor(0)
        .setScale(1);
        
        jauge_corruption = this.physics.add.sprite(110,90, 'jauge_corruption')
        .setDepth(5)
        .setScrollFactor(0)
        .setScale(0.7);
        jauge_corruption.body.allowGravity = false;
        

        brume = this.add.image(448,224, 'brume')
        .setDepth(2)
        .setScrollFactor(0)
        .setScale(2)
        .setAlpha(0);
        
        if(checkpoint == 0){
        player = this.physics.add.sprite(280, 470,  'player')
                .setSize(64, 80,)
                .setOffset(0,16)
                .setScale(0.7);
        }
        if(checkpoint == 1){
            player = this.physics.add.sprite(2280, 420 ,  'player')
                    .setSize(64, 80,)
                    .setOffset(0,16)
                    .setScale(0.7);
        }
        if(checkpoint == 2){
            player = this.physics.add.sprite(5700, 140,  'player')
                    .setSize(64, 80,)
                    .setOffset(0,16)
                    .setScale(0.7);
        }
        if(checkpoint == 3){
            player = this.physics.add.sprite(6820, 610,  'player')
                    .setSize(64, 80,)
                    .setOffset(0,16)
                    .setScale(0.7);
        }


        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        
        if(get_item1){this.add.image(500,16, 'Bouclier')
        .setDepth(5)
        .setScrollFactor(0);}

        if(get_item2){this.add.image(450,32, 'Baton')
        .setDepth(5)
        .setScrollFactor(0);}
        
        if(get_item3){ this.add.image(400,16, 'Botte')
            .setDepth(5)
            .setScrollFactor(0);}


        //Enemie 1////////////////////////
        const enemie1Objects = map.getObjectLayer('Ennemie1').objects;
        enemies1 = this.physics.add.group({ allowGravity:false
        }); 
        for (const enemie1 of enemie1Objects) {
        enemies1.create(enemie1.x, enemie1.y, 'Ennemie1')
            .setDepth(1)
            .setScale(0.7)
            .setSize(110, 80)
            
        }
        for (const enemie1 of enemies1.children.entries) {
            enemie1.isDed = false;
            
        }  
        

        //Enemie 2////////////////////////
        const enemie2Objects = map.getObjectLayer('Ennemie2').objects;
        enemies2 = this.physics.add.group({ }); 

        for (const enemie2 of enemie2Objects) {
        enemies2.create(enemie2.x, enemie2.y, 'Ennemie2')
            .setDepth(1)
            .setScale(0.9)
            .setSize(64, 64 ,)
        }
        for (const enemie2 of enemies2.children.entries) {
            enemie2.isDed = false;
        }  

        projectils = this.physics.add.group({}); 
        

        //Enemie 3////////////////////////
        const enemie3Objects = map.getObjectLayer('Ennemie3').objects;
        enemies3 = this.physics.add.group({ Immovable:true}); 

        for (const enemie3 of enemie3Objects) {
        enemies3.create(enemie3.x, enemie3.y, 'Ennemie3')
            .setDepth(1)
            .setScale(1)
            .setSize(64, 32,)
            .setOffset(0, 32);
        }
        for (const enemie3 of enemies3.children.entries) {
            enemie3.isDed = false;
        } 

        //Boss ////////////////////////
        boss_spawn1 = map.findObject("Boss", obj => obj.name === "Boss1");
        boss_spawn2 = map.findObject("Boss", obj => obj.name === "Boss2");
        boss_spawn3 = map.findObject("Boss", obj => obj.name === "Boss3");

        boss = this.physics.add.sprite(boss_spawn2.x, boss_spawn2.y,"Boss")
        .setSize(32, 32,) 
        .setDepth(1) ;
        boss.body.allowGravity = false;

        projectils_boss = this.physics.add.group({});


        //Item 1 ////////////////////////////////////
        if(get_item1 === false){
            const creatitem1 = map.findObject("Item", obj => obj.name === "Item1");
            item1 = this.physics.add.sprite(creatitem1.x, creatitem1.y,"BotteFragment")
            .setSize(32, 32,) .setDepth(1) ;

            item1.body.allowGravity = false;
        }
		//Item 2 //////////////////////////////////// Ne fonctionne pas avec tout les ennemies (pb pour figé les ennemies)
        if(get_item2 === false){
            const creatitem2 = map.findObject("Item", obj => obj.name === "Item2");
            item2 = this.physics.add.sprite(creatitem2.x, creatitem2.y,"BatonFragment")
            .setSize(32, 32,) .setDepth(3) ;
			
            item2.body.allowGravity = false;
        }
		
        //Item 3 ////////////////////////////////////
        if(get_item3 === false){
            const creatitem3 = map.findObject("Item", obj => obj.name === "Item3");
            item3 = this.physics.add.sprite(creatitem3.x, creatitem3.y,"BouclierFragment")
            .setSize(32, 32,) .setDepth(1) ;
			
            item3.body.allowGravity = false;
        }

        
        //Physique/////////////////////////////////

        this.physics.add.overlap(player, item1,takeitem1, null, this);
        this.physics.add.overlap(player, item2,takeitem2, null, this);
        this.physics.add.overlap(player, item3,takeitem3, null, this);
    
        this.physics.add.collider(player, worldLayer);
        
        //this.physics.add.collider(player, drapeau,finniveau,null,this);

        this.physics.add.collider(enemies1, worldLayer);
        this.physics.add.collider(enemies2, worldLayer);
        this.physics.add.collider(enemies3, worldLayer);

        this.physics.add.overlap(player,projectils_boss,hit_projectil_player, null, this);
  

        this.physics.add.collider(projectils,worldLayer ,hitwall, null, this);

        this.physics.add.overlap(player,projectils,hitplayerprijectils, null, this);

        this.physics.add.collider(enemies1, player, hitenemies, null, this);
        this.physics.add.collider(enemies2, player, hitenemies, null, this);
        this.physics.add.collider(enemies3, player, hitenemies, null, this);


        //clavier/////////////////////////

        cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('A,Z,S,Q,D,T,E,space');
     

        //Animation//////////////////////////////////    

        const anims = this.anims;

        anims.create({
            key: 'animlolanone',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 5,
        });
        anims.create({
            key: 'animlolaleft',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6}),
            frameRate: 5,
        });

        anims.create({
            key: 'animlolaright',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
            frameRate: 5,
        });

        anims.create({
            key: 'animlolaup',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 7 }),
            frameRate: 5,
        });

        anims.create({
            key: 'animloladown',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 7 }),
            frameRate: 15,
            
        });

         /////Jauge_corruption
         anims.create({
            key: 'corruption0',
            frames: this.anims.generateFrameNumbers('jauge_corruption', { start: 5, end: 5 }),
            frameRate: 5,
        });
        anims.create({
            key: 'corruption1',
            frames: this.anims.generateFrameNumbers('jauge_corruption', { start: 4, end: 4 }),
            frameRate: 5,
        });
        anims.create({
            key: 'corruption2',
            frames: this.anims.generateFrameNumbers('jauge_corruption', { start: 3, end: 3 }),
            frameRate: 5,
        });
        anims.create({
            key: 'corruption3',
            frames: this.anims.generateFrameNumbers('jauge_corruption', { start: 2, end: 2 }),
            frameRate: 5,
        });
        anims.create({
            key: 'corruption4',
            frames: this.anims.generateFrameNumbers('jauge_corruption', { start: 1, end: 1 }),
            frameRate: 5,
        });
        anims.create({
            key: 'corruption5',
            frames: this.anims.generateFrameNumbers('jauge_corruption', { start: 0, end: 0 }),
            //frames:[{key:'jauge_corruption',  frame: 0}],
            frameRate: 5
        });

        //Ennemie1
        anims.create({
            key: 'animsennemie1',
            frames: this.anims.generateFrameNumbers('Ennemie1', { start: 0, end: 2 }),
            frameRate: 4
        });
         //Ennemie2
         anims.create({
            key: 'animsennemie2',
            frames: this.anims.generateFrameNumbers('Ennemie2', { start: 0, end: 2 }),
            frameRate: 4
        });
        anims.create({
            key: 'animsennemie2retour',
            frames: this.anims.generateFrameNumbers('Ennemie2', { start: 3, end: 5 }),
            frameRate: 4
        });
        //Ennemie3
        anims.create({
            key: 'sautennemie3',
            frames: this.anims.generateFrameNumbers('Ennemie3', { start: 0, end: 3 }),
            //frames:[{key:'jauge_corruption',  frame: 0}],
            frameRate: 10
        });

        //projectil////////////////
        anims.create({
            key: 'projectilanims',
            frames: this.anims.generateFrameNumbers('projectil', { start: 0, end: 1 }),
            frameRate: 2,
            repeat:0, 
            
        });

        //Boss//////////
         anims.create({
            key: 'Bosscalme1',
            frames: this.anims.generateFrameNumbers('Boss', { start: 0, end: 1}),
            frameRate: 10
        });
        anims.create({
            key: 'Bosscalme2',
            frames: this.anims.generateFrameNumbers('Boss', { start: 2, end: 3}),
            frameRate: 10
        });
        anims.create({
            key: 'Bosscolere',
            frames: this.anims.generateFrameNumbers('Boss', { start: 4, end: 7}),
            frameRate: 10
        });
        //projectilboss////////////////
        anims.create({
            key: 'projectilbossanims',
            frames: this.anims.generateFrameNumbers('projectilboss', { start: 0, end: 2 }),
            frameRate: 4,
            repeat:-1, 
        });

    }

    update (){

        if(player.x > 2280 && player.x < 2290  ){
            checkpoint = 1;
           
        }
        if(player.x > 5700 && player.x < 5710  ){
            checkpoint = 2;
            
        }
        if(player.x > 6820 && player.x < 6830  ){
            checkpoint = 3;
        
        }
        
        onGround = player.body.blocked.down;

        if(etat_brume){
	        brume.setAlpha(0.3);
           
        }
        if(!etat_brume){
	        brume.setAlpha(0);
        }
        

        if(corruption <20 ){
            jauge_corruption.anims.play("corruption0",true);
        
        } 
        if(corruption>=100){   
            jauge_corruption.anims.play('corruption5',true);
        }
        if (corruption <100 && corruption >= 80 ) {
            jauge_corruption.anims.play('corruption4',true);
        }
       if (corruption <80 && corruption >= 60 ) {
            jauge_corruption.anims.play('corruption3',true);
        }
        if (corruption <60 && corruption >= 40 ) {
            jauge_corruption.anims.play('corruption2',true);
        }
       if (corruption <40 && corruption >=20 ) {
        jauge_corruption.anims.play('corruption1',true);
        }



        if(life <0){
           
            gameOver = true ;
           
        }
        if (gameOver){ 
          /*  this.add.text(448, 224, "You Loose", { font: "18px monospace",fill: "#000000",padding: { x: 50, y: 25 },backgroundColor: "#ffffff"})
            .setDepth(1)
            .setScrollFactor(0);
        
        
            this.physics.pause();*/
            //changement vers scene game over//
          
            this.scene.start("ScenePerdu");
            //return;
        }


        if(invincible == true){
            compteurinvincible-- ;
            if(compteurinvincible == 0){
                compteurinvincible = 60;
                player.setTint(0xffffff);
                invincible = false ;
            }
        }
    
        if (player.y > worldLayer.height || corrompu) {
            
         
            life -- ;
           
        
            if(life>0){ 
                corruption = 0 ;
                corrompu = false ;
                pv_boss = 3 ;
                etat_brume = false ;

                this.scene.restart();
                //lance la scene "game over"
            } 
        }


		//Item 2 ///////////////////////////////////////


        const JustDownA = Phaser.Input.Keyboard.JustDown(cursors2.A)       
        if (JustDownA &&  get_item2 && compteur_sort_baton )
        {
            compteur_sort_baton = false;
            setTimeout(function(){ compteur_sort_baton = true ;}, 5000);
            sort_pause = true ;
            setTimeout(function(){ sort_pause = false ;}, 2000);
            player.setTint(0x0000ff);     
            setTimeout(function(){player.setTint(0xffffff);}, 2000);
        }


		//Item 3 ///////////////////////////////////////
		const activebouclier = Phaser.Input.Keyboard.JustDown(cursors2.E) 
		if(get_item3 && activebouclier && compteur_sort_bouclier <= 0){

                compteur_sort_bouclier = 360 ;
                player.setTint(0x00ffff);
                invincible_bouclier = true ;
                compteur_bouclier = 180               
		} 
        if(compteur_sort_bouclier > 0){
            compteur_sort_bouclier -- ;
        }
        if (compteur_bouclier > 0){
             compteur_bouclier-- ;
        }
        if(compteur_bouclier <= 0){
            compteur_bouclier = 180;
            invincible_bouclier = false ;
            player.setTint(0xffffff);
          }
		


        const speed = 250;
        const prevVelocity = player.body.velocity.clone();

        //Mouvement ennemie1/////////////////////
       
        if(sort_pause == false){ 

            compteur_sens_enemie1 += 1 ;

            if (compteur_sens_enemie1< 180 )
            {
                sens_enemie1 = true;
            }

            if (compteur_sens_enemie1 > 180 )
            {
                sens_enemie1 = false;
            }
            if(compteur_sens_enemie1 >= 360)
            {
                compteur_sens_enemie1 = 0 ; 
            }

        }
        for (const enemie1 of enemies1.children.entries) {
            
            if(!sort_pause){
                enemie1.anims.play("animsennemie1",true);
                if (!sens_enemie1) {
                    enemie1.direction = 'LEFT';  
                }
                if (sens_enemie1) {
                    enemie1.direction = 'RIGHT';
                }
                if (enemie1.direction === 'RIGHT') {
                    enemie1.setVelocityX(100);
                    enemie1.setFlipX(true);
                } else {
                    enemie1.setVelocityX(-100);
                    enemie1.setFlipX(false); 
                }
            }else {enemie1.setVelocityX(0)}

        }

        //Mouvement ennemie2/////////////////////
   
        for (const enemie2 of enemies2.children.entries) {
            if(sort_pause == false){
                if(compteur_sens_enemie1 == 200 ){

                    enemie2.anims.play("animsennemie2",true);

                        for (let i = 0; i < 5; i++) {
                        randomY =  Math.floor(Math.random() * Math.floor((-600) - (-500))+(-500));
                        randomX = Math.floor(Math.random() *Math.floor((250) - (-250))+(-250));
                        
                        projectil = projectils.create(enemie2.x,enemie2.y-16,'projectil');
                        projectil.setVelocityX(randomX);
                        projectil.setVelocityY(randomY);

                        if(randomX <= 0){
                             projectil.setFlipX(false);
                        }
                        else{
                             projectil.setFlipX(true);
                        }
                        projectil.anims.play("projectilanims",true);
                         
                       
                }
                
                    enemie2.anims.play("animsennemie2retour",true);
                    enemie2.anims.play("animsennemie2retour",false);
                }
            }
            

        }
        
        
        //Mouvement ennemie3/////////////////////
        for (const enemie3 of enemies3.children.entries) {
            if(enemie3.body.blocked.down){enemie3.anims.play("sautennemie3",false);}
            if(sort_pause== false){

                if (cursors2.space.isDown && enemie3.body.blocked.down) {
                    enemie3.anims.play("sautennemie3",true);
                    enemie3.body.setVelocityY(-speed*2);
                    enemie3.body.allowGravity = true;
                }
            }
        }




        if(player.x > 6900){
            if(grille_activ==false){
                grille = this.physics.add.sprite(6900,600,"grille").setSize(32, 64,) .setDepth(3) .setImmovable(1); 
                this.physics.add.collider(grille, player);
                this.physics.add.collider(grille, worldLayer);
                grille_activ = true;
            }
        }
        if(player.x < 6900){
            if(grille_activ){
                grille_activ = false;
                grille.destroy();
            }
        }


       //Mouvement Boss ////////////////////////

       if(pv_boss <=0){
           boss.destroy();
           etat_brume = false ;
           cd_tire_boss = 180 ; 
           boss_calm = true ; 
        } ;


        if(player.x > 6900 && pv_boss >0){
            if(!projectil_boss_etat && boss_calm ){
                boss.anims.play("Bosscalme1",true);
                if(!boss_vivant){
                    possistion_boss =  Math.floor(Math.random() * Math.floor(3));
                    if(possistion_boss == 0){
                        boss.destroy();
                        boss = this.physics.add.sprite(boss_spawn1.x, boss_spawn1.y,"Boss").setSize(32, 64,) .setDepth(1) .setImmovable(1); 
                        boss.body.Immovable = false; 
                    }
                    else if(possistion_boss == 1){
                        boss.destroy();
                        boss = this.physics.add.sprite(boss_spawn2.x, boss_spawn2.y,"Boss").setSize(32, 64,) .setDepth(1) .setImmovable(1); 
                        boss.body.Immovable = false; 
                    }
                    else if(possistion_boss == 2){
                        boss.destroy();
                        boss = this.physics.add.sprite(boss_spawn3.x, boss_spawn3.y,"Boss").setSize(32, 64,) .setDepth(1) .setImmovable(1); 
                    }
                    boss_vivant = true 
                    
                }

                if(cd_tire_boss >0){
                    cd_tire_boss--}

                if(cd_tire_boss <= 0){
                    projectil_boss = projectils_boss.create(7480,330,'projectilboss');
                    projectil_boss_etat = true ;
                    projectil_boss.anims.play("projectilbossanims",true);
                }
                this.physics.add.collider(boss, worldLayer);
                this.physics.add.collider(boss,projectils_boss,hit_projectil_boss, null, this);    
                
            }  
            
            if(projectil_boss_etat){
                this.physics.moveTo(projectil_boss, player.x, player.y, 200);
                boss.anims.play("Bosscalme2",true); 
                
            }


            if(sort_pause == false){ 
                compteur_sens_boss += 1 ;
                if (compteur_sens_boss< 60 ) {sens_boss = true; }
                if (compteur_sens_boss > 60 ){ sens_boss = false;}
                if(compteur_sens_boss >= 120){compteur_sens_boss = 0 ; }
            }

            if(sort_pause == false){ 
                if (compteur_boss_enrage >=0){
                    compteur_boss_enrage -- ;
                }
            }

            
            if(!boss_calm ){
                
                 
                if(compteur_boss_enrage > 0){
                    boss.setImmovable(0);
                    
                    this.physics.add.overlap(boss,player,hit_boss, null, this);  
                    if(!sort_pause){
                        boss.anims.play("Bosscolere",true);
                        if(compteur_sens_boss == 100 ){
                                for (let i = 0; i < 15; i++) {
                                randomY =  Math.floor(Math.random() * Math.floor((-600) - (-500))+(-500));
                                randomX = Math.floor(Math.random() *Math.floor((250) - (-250))+(-250));
                                projectil = projectils.create(boss.x,boss.y-16,'projectil');
                                projectil.setVelocityX(randomX);
                                projectil.setVelocityY(randomY);
                                if(randomX <= 0){
                                    projectil.setFlipX(false);
                               }
                               else{
                                    projectil.setFlipX(true);
                               }
                               projectil.anims.play("projectilanims",true);
                         
                                
                            }      
                        }
                        if (cursors2.space.isDown && boss.body.blocked.down) {
                        boss.body.setVelocityY(-speed*2);
                        }   
                        if (!sens_boss) {
                            boss.direction = 'LEFT';  
                        }
                        if (sens_boss) {
                            boss.direction = 'RIGHT';
                        }
                        if (boss.direction === 'RIGHT') {
                            boss.setVelocityX(300);
                            boss.setFlipX(false);
                        }else {
                            boss.setVelocityX(-300);
                            boss.setFlipX(true); 
                        }
                        
                    }else {boss.setVelocityX(0);}
                }
                if(compteur_boss_enrage <=0){
                    etat_brume = false ;
                    cd_tire_boss = 180 ; 
                    boss_calm = true ;
                    boss_vivant = false ;
                }
                
            }
        }

        //MOUVEMENT PLAYER//////////////////////
        //mouvement si rien n'est affecter
        player.body.setVelocityX(0);
        // Horizontal movement
        if (cursors2.Q.isDown) {
            player.body.setVelocityX(-speed);


            direction = 'right' ;

        } else if (cursors2.D.isDown) {
            player.body.setVelocityX(speed);
            direction = 'left' ;
        }
        // Vertical movement
        if (cursors2.S.isDown) {
            player.body.setVelocityY(speed);
            direction = 'down' ;
        }

                                                
    
        const isJumpJustDownup = Phaser.Input.Keyboard.JustDown(cursors2.space)
        if (isJumpJustDownup && onGround ) {
            player.body.setVelocityY(-speed*2);
            direction = 'up' ;
            jump_count ++ ;
         
           
        }
        if( isJumpJustDownup && doublejump && !onGround && jump_count < 2 ){
            player.body.setVelocityY(-speed*2);
            direction = 'up' ;
            jump_count ++ ;
        }

        if(onGround && !isJumpJustDownup){
            jump_count = 0 ;
        }

        if (cursors2.Q.isDown) {
            player.anims.play("animlolaleft", true);
        } else if (cursors2.D.isDown) {
            player.anims.play("animlolaright", true);
        } else if (cursors2.space.isDown) {
            player.anims.play("animlolaup", true);
        } else if (cursors2.S.isDown) {
            player.anims.play("animloladown", true);
        } else {
            player.anims.play("animlolanone", true);

        }  
    }
}

function finniveau(player,drapeau)
{
    /*this.add.text(448, 224, "You win", { font: "18px monospace",fill: "#000000",padding: { x: 50, y: 25 },backgroundColor: "#ffffff"})
    .setDepth(1)
    .setScrollFactor(0);


    this.physics.pause();
    gameOver = true ;*/
    this.scene.start("SceneGagne");
}


function hitenemies (player,enemies)
{   
    enemies.destroy();
   
    hitplayer ();
}

function hitwall (projectil,world)
{
    projectil.destroy();
}

function hitplayerprijectils(player,projectil)
{
    projectil.destroy();
    
    hitplayer ();

    
}


function hitplayer ()
{  
    if (!invincible_bouclier){

        if (!invincible)
        {
            
            corruption += 20 ;
         

            invincible = true;
            player.setTint(0xff0000);
        }
    }
    if(corruption >= 100)
    {
            corrompu = true;
        
    }
}

function takeitem1(player,item)
{
    item.destroy();
    
    this.add.image(400,16, 'Botte')
            .setDepth(5)
            .setScrollFactor(0);

    get_item1 = true ;
    doublejump = true ;

}

function takeitem2(player,item)
{
    item.destroy();
    
    this.add.image(450,32, 'Baton')
            .setDepth(5)
            .setScrollFactor(0);

    get_item2= true ;
	item_baton_du_temp = true ;


}

function takeitem3(player,item)
{
    item.destroy();
    
    this.add.image(500,16, 'Bouclier')
            .setDepth(5)
            .setScrollFactor(0);

    get_item3 = true ;
}
function hit_projectil_player(player,projectil_boss)
{
    projectil_boss.destroy();
    hitplayer ();
    projectil_boss_etat = false ;
    boss_vivant = false ;
    cd_tire_boss = 180 ; 
}

function hit_projectil_boss(boss,projectil_boss)
{
    
    projectil_boss.destroy();
    compteur_boss_enrage = 300 ;
    boss_calm = false ; 
    projectil_boss_etat = false ;
    etat_brume = true ;
    
}
function hit_boss(player,boss)
{
    if(invulenrableboss == false ){
        compteur_boss_enrage = 0 ;
        pv_boss = pv_boss - 1;
        
        invulenrableboss = true;
        setTimeout(function(){  invulenrableboss = false;},1000);
    }
    
}

