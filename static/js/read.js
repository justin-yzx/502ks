function toast(msg,duration){
    duration=isNaN(duration)?1500:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}


var appVue=new Vue({
    el:'#app',
    data:{
        content:document.getElementById('readbox').innerText,
        colorArr:['#d1f9d5','#f0e0c5','#ffddef','#e4e4e4'],
        bodyBg:'#d1f9d5', //整体背景
        borderIndex:0,//色块
        fontSize:'16',//字体大小
        nightDay:false,
        showMenu:false,
        setMenu:false,
        colorFont:'#333',
        readFlag:1,
        bookid:bookid,
        lastid:lastid,
        nuxtid:nuxtid,
        thisid:thisid,
        thistitle:thistitle,
    },
    created:function () {
        this.bodyBg=localStorage.getItem('bgSave')?localStorage.getItem('bgSave'):this.colorArr[0];
        this.borderIndex=localStorage.getItem('bgSaveIndex')?localStorage.getItem('bgSaveIndex'):0;
        this.fontSize=localStorage.getItem('fontSizeSave')?localStorage.getItem('fontSizeSave'):this.fontSize;
        this.colorFont=localStorage.getItem('colorFont')?localStorage.getItem('colorFont'):this.colorFont;
    },
    methods:{
        read(){
            try {
                if(this.readFlag === 1){
                    var msg = new SpeechSynthesisUtterance(this.content);
                    window.speechSynthesis.cancel()
                    setTimeout(()=>{
                        window.speechSynthesis.speak(msg);
                    },200)
                    this.readFlag=2
                }else if(this.readFlag === 2){
                    window.speechSynthesis.pause()
                    this.readFlag=3
                }else {
                    window.speechSynthesis.resume()
                    this.readFlag=2
                }
            }catch (e) {
                toast("您的浏览器暂不支持此功能，请下载最新版谷歌浏览器体验在线阅读",5000)
            }

        },
        back(){
            try {
                window.speechSynthesis.cancel()
            }catch (e) {}
            location.href='/bookinfo/'+this.bookid
        },
        mulu(){
            try {
                window.speechSynthesis.cancel()
            }catch (e) {}
            location.href='/chapterlist/'+this.bookid
        },
        previous(){
            try {
                window.speechSynthesis.cancel()
            }catch (e) {}
            if(!this.lastid){
                toast('已经是第一章喽~')
                return
            }
            location.href='/book/'+this.lastid
        },
        nuxt(){
            try {
                window.speechSynthesis.cancel()
            }catch (e) {}
            if(!this.nuxtid){
                toast('已经是最后一章喽~')
                return
            }
            location.href='/book/'+this.nuxtid
        },
        gohome(){
            location.href='/'
        },
        join(){
            //todo 加入书架
            toast('敬请期待')
        },
        changeBg(index){
            this.nightDay=false;
            this.bodyBg= this.colorArr[index];
            localStorage.setItem('bgSave',this.bodyBg);
            this.borderIndex=index;
            localStorage.setItem('bgSaveIndex',this.borderIndex);
            localStorage.setItem('colorFont','#333');
            this.colorFont="#333";
        },
        changeSize(way){
            if(way=='reduce'){
                if(this.fontSize==10){
                    toast('字体不能再小了..');
                    return false
                }
                this.fontSize=parseInt(this.fontSize)-2;
                localStorage.setItem('fontSizeSave',this.fontSize)
            }else if(way=='add'){
                if(this.fontSize==20){
                    toast('字体不能再大了..');
                    return false
                }
                this.fontSize=parseInt(this.fontSize)+2;
                localStorage.setItem('fontSizeSave',this.fontSize)
            }
        },
        //设置白天夜间模式
        setDayNight(mode){
            console.log(mode)
            if(mode=='day'){
                this.nightDay=false;
                this.colorFont="#333";
                localStorage.setItem('colorFont','#333');
                if(localStorage.getItem('bgSave')=='rgba(0,0,0,.7)'){
                    this.bodyBg=this.colorArr[this.borderIndex];
                }else{
                    this.bodyBg=localStorage.getItem('bgSave')?localStorage.getItem('bgSave'):this.bodyBg;

                }
                localStorage.setItem('bgSave',this.bodyBg);
            }else if(mode=='night'){
                this.nightDay=true;
                this.bodyBg='rgba(0,0,0,.7)';
                this.colorFont="#989898";
                localStorage.setItem('bgSave',this.bodyBg);
                localStorage.setItem('colorFont','#989898');
            }
        },

    }

});
