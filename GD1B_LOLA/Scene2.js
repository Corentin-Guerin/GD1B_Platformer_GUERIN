
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
var deco;
var brume;


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
var pv_boss = 300;

var getitem1 = false ;
var item1;
var doublejump = false;
var jump_count = 0;

var getitem2 = false ;
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


        this.load.image("tiles", "assets/tilesets/hOwGgR.gif");
        this.load.image("deco", "assets/decoecrant.png");
        this.load.image("brume", "assets/images/brume.jpg");

        this.load.tilemapTiledJSON("map", "assets/tilemaps/maptest.json");
        

        this.load.spritesheet("player", 'assets/Perso.png', { frameWidth:32, frameHeight: 64,});
       
    }

    create(){
     
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("azerty", "tiles");
        
        map.createLayer("fond", tileset, 0, 0);
        map.createLayer("grotte", tileset, 0, 0);
        worldLayer = map.createLayer("wall", tileset, 0, 0);
        map.createLayer("sol", tileset, 0, 0);
        const drapeau = map.createLayer("Drapeau", tileset, 0, 0);
        
        worldLayer.setCollisionByExclusion(-1,true) ;
        drapeau.setCollisionByExclusion(-1,true) ;

        
        deco = this.add.image(448,224, 'deco')
        .setDepth(3)
        .setScrollFactor(0)
        .setScale(1);
        
        brume = this.add.image(448,224, 'brume')
        .setDepth(3)
        .setScrollFactor(0)
        .setScale(2)
        .setAlpha(0);
        

        player = this.physics.add.sprite(200, 350,  'player')
                .setSize(32, 48,)
                .setOffset(0,16);
        


        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        


        //Enemie 1////////////////////////
        const enemie1Objects = map.getObjectLayer('Ennemie1').objects;
        enemies1 = this.physics.add.group({ allowGravity:false
        }); 
        for (const enemie1 of enemie1Objects) {
        enemies1.create(enemie1.x, enemie1.y, 'Enemie1')
            .setDepth(1)
            .setScale(1)
            .setSize(32, 32,)
        }
        for (const enemie1 of enemies1.children.entries) {
            enemie1.isDed = false;
        }  
        

        //Enemie 2////////////////////////
        const enemie2Objects = map.getObjectLayer('Ennemie2').objects;
        enemies2 = this.physics.add.group({ }); 

        for (const enemie2 of enemie2Objects) {
        enemies2.create(enemie2.x, enemie2.y, 'Enemie3')
            .setDepth(1)
            .setScale(1)
            .setSize(32, 32,)
        }
        for (const enemie2 of enemies2.children.entries) {
            enemie2.isDed = false;
        }  

        projectils = this.physics.add.group({}); 
        

        //Enemie 3////////////////////////
        const enemie3Objects = map.getObjectLayer('Ennemie3').objects;
        enemies3 = this.physics.add.group({ Immovable:true}); 

        for (const enemie3 of enemie3Objects) {
        enemies3.create(enemie3.x, enemie3.y, 'Enemie3')
            .setDepth(1)
            .setScale(1)
            .setSize(32, 32,)
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
        if(getitem1 === false){
            const creatitem1 = map.findObject("Item", obj => obj.name === "Item1");
            item1 = this.physics.add.sprite(creatitem1.x, creatitem1.y,"BotteFragment")
            .setSize(32, 32,) .setDepth(2) ;

            item1.body.allowGravity = false;
        }
		//Item 2 //////////////////////////////////// Ne fonctionne pas avec tout les ennemies (pb pour figé les ennemies)
        if(getitem2 === false){
            const creatitem2 = map.findObject("Item", obj => obj.name === "Item2");
            item2 = this.physics.add.sprite(creatitem2.x, creatitem2.y,"BatonFragment")
            .setSize(32, 32,) .setDepth(2) ;
			
            item2.body.allowGravity = false;
        }
		
        //Item 3 ////////////////////////////////////
        if(get_item3 === false){
            const creatitem3 = map.findObject("Item", obj => obj.name === "Item3");
            item3 = this.physics.add.sprite(creatitem3.x, creatitem3.y,"BouclierFragment")
            .setSize(32, 32,) .setDepth(2) ;
			
            item3.body.allowGravity = false;
        }

        
        //Physique/////////////////////////////////

        this.physics.add.overlap(player, item1,takeitem1, null, this);
        this.physics.add.overlap(player, item2,takeitem2, null, this);
        this.physics.add.overlap(player, item3,takeitem3, null, this);
    
        this.physics.add.collider(player, worldLayer);
        
        this.physics.add.collider(player, drapeau,finniveau,null,this);

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
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 5,
        });

        anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 5,
        });

        anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 5,
        });

        anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 5,
        });

    }

    update (){
        
        onGround = player.body.blocked.down;

        if(etat_brume){
	        brume.setAlpha(0.3);
           
        }
        if(!etat_brume){
	        brume.setAlpha(0);
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
           
        
            if(life>0 ){ 
                corruption = 0 ;
                corrompu = false ;
                getitem1 = false ;
                getitem2 = false ;
                get_item3 = false ;
                doublejump = false ;
                
                this.scene.restart();
                //lance la scene "game over"
            } 
        }


		//Item 2 ///////////////////////////////////////


        const JustDownA = Phaser.Input.Keyboard.JustDown(cursors2.A)       
        if (JustDownA &&  getitem2 && compteur_sort_baton )
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
                        for (let i = 0; i < 5; i++) {
                        randomY =  Math.floor(Math.random() * Math.floor((-600) - (-500))+(-500));
                        randomX = Math.floor(Math.random() *Math.floor((250) - (-250))+(-250));
                        
                        
                    /* randomY = randomY + (10*i);
                        randomX = randomX + (10*i);*/
                        projectil = projectils.create(enemie2.x,enemie2.y-16,'projectil');
                        projectil.setVelocityX(randomX);
                        projectil.setVelocityY(randomY);

                    }
                }
            }
        }

        //Mouvement ennemie3/////////////////////
        for (const enemie3 of enemies3.children.entries) {
            if(!sort_pause){

                if (cursors.up.isDown && enemie3.body.blocked.down) {
                    enemie3.body.setVelocityY(-speed*2);
                    enemie3.body.allowGravity = true;
                }
            }
           
                
        }

       //Mouvement Boss ////////////////////////

       if(pv_boss <=0){
           boss.destroy();
           etat_brume = false ;
           cd_tire_boss = 180 ; 
           boss_calm = true ; 
        } ;


        if(player.x > 5500 && pv_boss >0){
            if(!projectil_boss_etat && boss_calm ){
                if(!boss_vivant){
                    possistion_boss =  Math.floor(Math.random() * Math.floor(3));
                    console.log(possistion_boss);
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
                    projectil_boss = projectils_boss.create(boss.x,boss.y-120,'projectilboss');
                    projectil_boss_etat = true ;
                }
                this.physics.add.collider(boss, worldLayer);
                //this.physics.add.collider(boss, player);
                this.physics.add.collider(boss,projectils_boss,hit_projectil_boss, null, this);     
            }  
            
            if(projectil_boss_etat){
                this.physics.moveTo(projectil_boss, player.x, player.y, 200);
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
                    
                    this.physics.add.collider(boss,player,hit_boss, null, this);  
                    if(!sort_pause){
                        if(compteur_sens_boss == 100 ){
                                for (let i = 0; i < 15; i++) {
                                randomY =  Math.floor(Math.random() * Math.floor((-600) - (-500))+(-500));
                                randomX = Math.floor(Math.random() *Math.floor((250) - (-250))+(-250));
                                projectil = projectils.create(boss.x,boss.y-16,'projectil');
                                projectil.setVelocityX(randomX);
                                projectil.setVelocityY(randomY);
                            }      
                        }
                        if (cursors.up.isDown && boss.body.blocked.down) {
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
                            boss.setFlipX(true);
                        }else {
                            boss.setVelocityX(-300);
                            boss.setFlipX(false); 
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
        if (cursors.left.isDown) {
            player.body.setVelocityX(-speed);


            direction = 'right' ;

        } else if (cursors.right.isDown) {
            player.body.setVelocityX(speed);
            direction = 'left' ;
        }
        // Vertical movement
        if (cursors.down.isDown) {
            player.body.setVelocityY(speed);
            direction = 'down' ;
        }


        const isJumpJustDownup = Phaser.Input.Keyboard.JustDown(cursors.up)
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

        if (cursors.left.isDown) {
            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.anims.play("right", true);
        } else if (cursors.up.isDown) {
            player.anims.play("up", true);
        } else if (cursors.down.isDown) {
            player.anims.play("down", true);
        } else {
            player.anims.stop();

            if (prevVelocity.x < 0) player.setTexture('player');
            else if (prevVelocity.x > 0) player.setTexture('player');
            else if (prevVelocity.y < 0) player.setTexture('player');
            else if (prevVelocity.y > 0) player.setTexture('player');
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
            console.log(corruption);

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

    getitem1 = true ;
    doublejump = true ;

}

function takeitem2(player,item)
{
    item.destroy();
    
    this.add.image(450,32, 'Baton')
            .setDepth(5)
            .setScrollFactor(0);

    getitem2= true ;
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
    pv_boss -= 10 ;
    console.log("pv_boss")
    
}


/////// frame invicible boss
////// colider boss 1ere phase dans la fonction lacée
/////  overlap boss 2 emme phaseb