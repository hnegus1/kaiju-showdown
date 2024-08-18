import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');

        this.load.image('kaiju_sea_urchin', '/kaijus/sea_urchin.png')
        this.load.image('kaiju_sea_regular', '/kaijus/sea_regular.png')
        this.load.image('kaiju_sea_leviathan', '/kaijus/sea_leviathan.png')
        this.load.image('kaiju_sea_berzerk', '/kaijus/sea_berzerk.png')
        this.load.image('kaiju_sea_keyboard_warrior', '/kaijus/sea_keyboard_warrior.png')
        this.load.image('kaiju_sea_deal_closer', '/kaijus/sea_deal_closer.png')
        this.load.image('kaiju_sea_island_turtle', '/kaijus/sea_island_turtle.png')
        this.load.image('kaiju_sea_skyscraper_snacker', '/kaijus/sea_skyscraper_snacker.png')
        this.load.image('kaiju_sea_big_barracuda', '/kaijus/sea_big_barracuda.png')
        this.load.image('kaiju_sea_sea_serpent', '/kaijus/sea_sea_serpent.png')
        this.load.image('kaiju_sea_wall_street', '/kaijus/sea_wall_street.png')
        this.load.image('kaiju_sea_deal_closer', '/kaijus/sea_deal_closer.png')
        this.load.image('kaiju_sea_minnow', '/kaijus/sea_minnow.png')
        this.load.image('kaiju_sea_pufferfish', '/kaijus/sea_pufferfish.png')
        this.load.image('kaiju_sea_oyster', '/kaijus/sea_oyster.png')
        this.load.image('kaiju_sea_baby', '/kaijus/sea_baby.png')
        this.load.image('BG', '/bg_1.png')

        this.load.audio("sound_tadaa", '/sound/tada.mp3')
        this.load.audio("sound_drumroll", '/sound/drumroll.mp3')
        this.load.audio("sound_sad_trombone", '/sound/sad_trombone.mp3')

        this.load.audio("sound_pop", '/sound/pop.flac')
        this.load.audio("sound_money", '/sound/money.mp3')
        this.load.audio("sound_nuh_uh", '/sound/nuh_uh.mp3')
        this.load.audio("sound_wall_street", '/sound/wall_street.mp3')
        this.load.audio("sound_scream", '/sound/scream.mp3')
        this.load.audio("sound_roar", '/sound/roar.mp3')
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Game');
    }
}
