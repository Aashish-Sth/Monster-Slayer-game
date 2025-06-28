function random(max,min)
{
    return Math.floor(Math.random() *(max - min + 1) + min)
}

const obj={
    data(){
        return{
        monsterHp:100,
        playerHp:100,
        turn:0,
        spAtckCD:0,
        healCD:0,
        winner:null,
        log:[],
        visible:true,
        }
    },
    methods:{
        attackMonster()
        {
            const damage =random(12,5);
            this.monsterHp -=  damage;
            this.log.unshift("You deliver a clean hit for "+damage+" HP!");
            this.attackPlayer();
            this.turn++;
            if(this.monsterHp < 0)
            {
                this.monsterHp=0;
            }
            

        },
        attackPlayer()
        {
            const damage = random(15,8);
            this.playerHp -= damage;
            if(this.playerHp < 0)
            {
                this.playerHp=0;
            }
            this.log.unshift("The monster slashes wildly, dealing "+damage+" HP!")
        },
        specialAttack()
        {
            const damage =random(25,10);
            this.monsterHp -= damage ;
            this.log.unshift("You unleash a charged attack — the monster takes "+damage+"HP!");
            this.attackPlayer();
            this.spAtckCD = this.turn + 3;
            this.turn++;
            if(this.monsterHp < 0)
            {
                this.monsterHp=0;
            }
            
        },
        heal()
        {
            this.turn++;
            this.attackPlayer();
            this.healCD = this.turn + 3;
            const health=random(25,10);
            if(this.playerHp + health > 100)
            {
                this.playerHp = 100;
            }
            else{
                this.playerHp+= health;
            }
            this.log.unshift("You wrap a quick bandage — "+health+" HP restored.")
        },
        playAgain()
        {
            this.playerHp=100;
            this.monsterHp=100;
            this.turn=0;
            this.spAtckCD=0;
            this.healCD=0;
            this.winner=null;
            this.log=[];
        },
        surrender()
        {
            this.winner="monster";
            this.playerHp=0;
            this.log.unshift("You can’t go on. The battle ends here.")
        },
        tutorialDone()
        {
            this.visible = !this.visible
            
        }
    },
    watch:{
        playerHp(value)
        {
            if(value <=0 && this.monsterHp <= 0)
            {
                this.winner="draw"
            }
            else if(value <=0)
            {
                this.winner="monster"
            }
        },
        monsterHp(value)
        {
            if(value <=0 && this.playerHp <= 0)
            {
                this.winner="draw"
            }
            else if(value <=0)
            {
                this.winner="player"
            }
        }
    },
    computed:{
        monsterHealthBar()
        {
            return {width:this.monsterHp+'%'}
        },
        playerHealthBar()
        {
            return {width:this.playerHp+'%'}
        },
        spAtckCDT()
        {
            return this.spAtckCD>this.turn;
        },
        healCDT()
        {
            return this.healCD>this.turn;
        },
    }
}
Vue.createApp(obj).mount('#game');