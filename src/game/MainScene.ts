import Phaser from 'phaser';
// Vite automatically processes the asset and returns its final URL
import playerSprite from '../assets/Player/Player.png';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private playerSpeed: number = 150;
  private lastDirection: string = 'down';

  private targetPosition: Phaser.Math.Vector2 | null = null;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.spritesheet('player', playerSprite, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.anims.create({
      key: 'idle-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle-right',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle-up',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player', { start: 30, end: 35 }),
      frameRate: 10,
      repeat: -1,
    });

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.player = this.physics.add.sprite(centerX, centerY, 'player');
    
    this.player.setScale(2.5);
    this.player.body?.setSize(16, 20);
    this.player.body?.setOffset(8, 12);
    
    this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.player.setCollideWorldBounds(true);

    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasdKeys = this.input.keyboard.addKeys('W,A,S,D') as typeof this.wasdKeys;
    }

    // 마우스 클릭 또는 터치 입력 이벤트
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        this.targetPosition = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
    });
  }

  update() {
    if (!this.cursors || !this.wasdKeys || !this.player) return;

    const isUp = this.cursors.up.isDown || this.wasdKeys.W.isDown;
    const isDown = this.cursors.down.isDown || this.wasdKeys.S.isDown;
    const isLeft = this.cursors.left.isDown || this.wasdKeys.A.isDown;
    const isRight = this.cursors.right.isDown || this.wasdKeys.D.isDown;

    let velocityX = 0;
    let velocityY = 0;

    // 수동 입력(키보드)이 감지되면 클릭 이동 타겟 초기화
    if (isUp || isDown || isLeft || isRight) {
        this.targetPosition = null;

        if (isLeft) velocityX = -1;
        else if (isRight) velocityX = 1;

        if (isUp) velocityY = -1;
        else if (isDown) velocityY = 1;

        if (velocityX !== 0 || velocityY !== 0) {
            const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            velocityX /= length;
            velocityY /= length;
        }

        this.player.setVelocityX(velocityX * this.playerSpeed);
        this.player.setVelocityY(velocityY * this.playerSpeed);
    } 
    // 타겟 지점이 있으면 해당 위치로 이동
    else if (this.targetPosition) {
        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.targetPosition);
        
        // 목표에 거의 도달하면 정지
        if (distance < 5) {
            this.player.setVelocity(0);
            this.targetPosition = null;
        } else {
            const angle = Phaser.Math.Angle.BetweenPoints(this.player, this.targetPosition);
            velocityX = Math.cos(angle);
            velocityY = Math.sin(angle);
            
            this.player.setVelocityX(velocityX * this.playerSpeed);
            this.player.setVelocityY(velocityY * this.playerSpeed);
        }
    } else {
        this.player.setVelocity(0);
    }

    // 애니메이션 로직
    if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
        // 주된 이동 방향 파악 (가로 이동이 더 큰지 세로 이동이 더 큰지)
        if (Math.abs(velocityX) > Math.abs(velocityY)) {
            if (velocityX > 0) {
                this.player.anims.play('walk-right', true);
                this.player.setFlipX(false);
                this.lastDirection = 'right';
            } else {
                this.player.anims.play('walk-right', true);
                this.player.setFlipX(true);
                this.lastDirection = 'left';
            }
        } else {
            if (velocityY > 0) {
                this.player.anims.play('walk-down', true);
                this.lastDirection = 'down';
            } else {
                this.player.anims.play('walk-up', true);
                this.lastDirection = 'up';
            }
        }
    } else {
        // 아무 입력이 없거나 멈췄을 때
        if (this.lastDirection === 'down') {
            this.player.anims.play('idle-down', true);
        } else if (this.lastDirection === 'right') {
            this.player.anims.play('idle-right', true);
            this.player.setFlipX(false);
        } else if (this.lastDirection === 'left') {
            this.player.anims.play('idle-right', true);
            this.player.setFlipX(true);
        } else if (this.lastDirection === 'up') {
            this.player.anims.play('idle-up', true);
        }
    }
  }
}
